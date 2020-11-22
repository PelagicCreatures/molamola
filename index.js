/**
	@PelagicCreatures/MolaMola

	@author Michael Rhodes
	@license MIT
	Made in Barbados 🇧🇧 Copyright © 2020 Michael Rhodes

	Form ID: an application unique identifier for the form EG: 'login', 'register'

	<form id="login" method="GET" action="/endpoint" data-sargasso-class="MolaMola" data-submitter=".submit-button" data-status=".status">

	Form handlers are used for handling form events.

	The following events can be handled by the handlers:

	registerFormHandler('myform',{
		preFlight: () => {},
		success: (response) => {},
		error: (statusCode, response) => {}
	})

	the API for the endpoint:
		200 (ok) & 422 (unprocessable entity) are expected to return json
		Use 422 for server side validation errors, the reponse payload is
		up to implementor and should be handled with a helper success method.

		Other http errors such as 401 (unauthorized) are handed to the helper
		error method
*/

import {
	Sargasso, utils
}
	from '@pelagiccreatures/sargasso'

import debounce from 'lodash/debounce'
import cloneDeep from 'lodash/cloneDeep'
import forEach from 'lodash/forEach'

// make a clone of validator and add extensions to conform to Sequelize
// to allow frontend/backend validation to be identical.
import Validator from 'validator'

const ExtendedValidator = cloneDeep(Validator)

const validationMessages = {
	isLength: 'Length between %s and %s',
	isEmail: 'Email address',
	notEmpty: 'Required',
	isPassword: 'At least one uppercase, one lowercase, and one number'
}

const extensions = {
	extend (name, fn) {
		this[name] = fn
		return this
	},
	notEmpty (str) {
		return !str.match(/^[\s\t\r\n]*$/)
	},
	len (str, min, max) {
		return this.isLength(str, min, max)
	},
	isUrl (str) {
		return this.isURL(str)
	},
	isIPv6 (str) {
		return this.isIP(str, 6)
	},
	isIPv4 (str) {
		return this.isIP(str, 4)
	},
	notIn (str, values) {
		return !this.isIn(str, values)
	},
	regex (str, pattern, modifiers) {
		str += ''
		if (Object.prototype.toString.call(pattern).slice(8, -1) !== 'RegExp') {
			pattern = new RegExp(pattern, modifiers)
		}
		return str.match(pattern)
	},
	notRegex (str, pattern, modifiers) {
		return !this.regex(str, pattern, modifiers)
	},
	isDecimal (str) {
		return str !== '' && !!str.match(/^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][+-]?(?:[0-9]+))?$/)
	},
	min (str, val) {
		const number = parseFloat(str)
		return isNaN(number) || number >= val
	},
	max (str, val) {
		const number = parseFloat(str)
		return isNaN(number) || number <= val
	},
	not (str, pattern, modifiers) {
		return this.notRegex(str, pattern, modifiers)
	},
	contains (str, elem) {
		return !!elem && str.includes(elem)
	},
	notContains (str, elem) {
		return !this.contains(str, elem)
	},
	is (str, pattern, modifiers) {
		return this.regex(str, pattern, modifiers)
	},
	notNull (str) {
		return str !== null && str !== undefined
	},
	isPassword (str) {
		return this.notEmpty(str) && this.len(str, 8, 20) && this.is(str, '(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])', '')
	},
	notHTML (str) {
		return !str.match(/<\s*[^>]*>(.*?)<\s*\/[^>]*>/) && !str.match(/<[^>]*>/)
	}
}

forEach(extensions, (extend, key) => {
	ExtendedValidator[key] = extend
})

const registeredHelperClasses = {}
const registerHelperClass = (className, object) => {
	registeredHelperClasses[className] = object
}

/*
	Normalize value from an input.
	returns an array of values for groups and <select multiple>
*/
const getRealVal = (element) => {
	let value = ''

	// collection of checkboxes or other inputs results in array of values
	if (element.getAttribute('data-group')) {
		const group = element.closest('.input-group').querySelectorAll(element.getAttribute('data-group'))
		const values = []
		for (let i = 0; i < group.length; i++) {
			if (getRealVal(group[i])) {
				values.push(getRealVal(group[i]))
			}
			if (element.hasAttribute('multiple')) {
				value = values
			} else {
				value = values.length ? values[0] : ''
			}
		}
	} else {
		if (element.getAttribute('type') === 'checkbox' || element.getAttribute('type') === 'radio') {
			if (element.checked) {
				const v = element.getAttribute('value')
				if (v) {
					value = v
				} else {
					value = !!element.checked
				}
			}
		} else if (element.tagName === 'SELECT') {
			const selected = element.querySelectorAll('option:checked')
			const values = Array.from(selected).map(el => el.value)
			if (element.hasAttribute('multiple')) {
				value = Array.from(values)
			} else {
				value = values[0]
			}
		} else {
			value = element.value
		}
	}

	return value
}

class MolaMolaHelper {
	constructor (form) {
		this.form = form
	}

	// override these methods as needed
	pose () {} // pose form

	/*
		preFlight: about to submit this.form.payload to endpoint
		return a promise for any async behavior (like recAPTCHA below)
		throw an error to prevent submit
	*/
	preFlight () {}

	// 200 or 422 response all is well deal with response payload
	success (data) {}

	// can be result of preFlight or from endpoint
	error (err) {}

	// cleanup
	destroy () {}
}

class ReCAPTCHAv3Helper extends MolaMolaHelper {
	constructor (form) {
		super(form)
		this.recaptcha = this.form.element.getAttribute('data-recaptcha')
	}

	pose () {
		utils.elementTools.addClass(document.body, 'show-recaptcha', this)
	}

	async preFlight () {
		try {
			const token = await grecaptcha.execute(this.recaptcha, {
				action: 'social'
			})
			this.form.payload['g-recaptcha-response'] = token
		} catch (err) {
			throw (err || new Error('reCaptchaV3 network error')) // OK google... network errors come back empty.
		}
	}

	destroy () {
		utils.elementTools.removeClass(document.body, 'show-recaptcha')
	}
}

class SubmitterHelper extends MolaMolaHelper {
	constructor (form) {
		super(form)
		this.submitter = this.form.element.querySelector(this.form.element.getAttribute('data-submitter'))
		this.submitterContent = this.submitter.innerHTML
		this.submitter.style.width = this.submitter.width
		this.submitter.setAttribute('disabled', true)
	}

	preFlight () {
		this.disableSubmit()
	}

	success (data) {
		this.enableSubmit()
	}

	error (err) {
		this.enableSubmit()
	}

	disableSubmit () {
		this.submitter.setAttribute('disabled', true)
		this.submitter.innerHTML = 'working...'
	}

	enableSubmit () {
		this.submitter.removeAttribute('disabled')
		this.submitter.innerHTML = this.submitterContent
	}
}

class StatusHelper extends MolaMolaHelper {
	constructor (form) {
		super(form)
		this.status = this.form.element.querySelector(this.form.element.getAttribute('data-status'))
	}

	error (err) {
		const errors = []
		if (err) {
			errors.push(err.message)
		}
		if (err.statusCode) {
			errors.push('http status ' + err.statusCode)
		}
		this.status.innerHTML = errors.join(',')
	}
}

class ValidateHelper extends MolaMolaHelper {
	constructor (form) {
		super(form)

		this.valid = false
		this.submitter = this.form.element.querySelector(this.form.element.getAttribute('data-submitter'))
		this.uniqueDebounce = null
		this.lookupDebounce = null

		this.inputs = Array.from(this.form.element.querySelectorAll('[data-validate]'))

		this.changeHandler = debounce((e) => {
			this.handleChange(e)
		}, 500)

		this.initInput(this.form.element)
		if (this.form.element.querySelector('[data-autofocus="true"]')) {
			this.form.element.querySelector('[data-autofocus="true"]').focus()
		}

		this.allInputs = Array.from(this.form.element.querySelectorAll('input, select, textarea, button'))
		for (let i = 0; i < this.allInputs.length; i++) {
			const input = this.allInputs[i]
			input.addEventListener('blur', this.changeHandler, true)
			input.addEventListener('focus', this.changeHandler, true)
			input.addEventListener('keyup', this.changeHandler, true)
			input.addEventListener('input', this.changeHandler, true)
			input.addEventListener('change', this.changeHandler, true)
		}

		this.handleChange()
	}

	destroy () {
		for (let i = 0; i < this.allInputs.length; i++) {
			const input = this.allInputs[i]
			input.removeEventListener('blur', this.changeHandler)
			input.removeEventListener('focus', this.changeHandler)
			input.removeEventListener('keyup', this.changeHandler)
			input.removeEventListener('input', this.changeHandler)
			input.removeEventListener('change', this.changeHandler)
		}
	}

	initInput (element) {
		for (let i = 0; i < this.inputs.length; i++) {
			const input = this.inputs[i]
			input.setAttribute('data-touched', false)
			input.setAttribute('data-last-value', getRealVal(input).toString())
			if (input.getAttribute('checked')) {
				input.checked = true
			}
		}
	}

	async handleChange (e) {
		if (e && e.srcElement && e.srcElement !== window) {
			const elem = e.srcElement
			utils.elementTools.addClass(elem.closest('form'), 'touched')
			const isDirty = elem.getAttribute('data-last-value') !== getRealVal(elem)
			elem.setAttribute('data-touched', true)
			elem.setAttribute('data-dirty', isDirty)
		}
		const errors = this.inputs.map(await this.validateField.bind(this))
		Promise.all(errors).then((errors) => {
			let errorCount = 0
			for (let i = 0; i < errors.length; i++) {
				if (errors[i] && errors[i].length) {
					errorCount += errors[i].length
				}
			}

			if (errorCount) {
				this.valid = false
				this.disableSubmit()
			} else {
				this.valid = true
				this.enableSubmit()
			}
		})
	}

	getMessage (test, opts) {
		let message = validationMessages[test]
		if (!message) {
			message = test
			if (opts) {
				for (let i = 0; i < opts.length; i++) {
					message += ' %s'
				}
			}
		}
		if (!opts) {
			return message
		}
		let c = 0
		return message.replace(/%s/g, function () {
			const opt = opts[c++]
			return opt ? opt.toString() : ''
		})
	}

	async validateField (element) {
		const val = getRealVal(element).toString()
		const validations = JSON.parse(element.getAttribute('data-validate'))

		if (!validations.notEmpty && !val) {
			return null
		}

		const errors = []
		for (const test in validations) {
			const opts = validations[test]
			if (typeof opts === 'boolean') {
				if (!ExtendedValidator[test](val)) {
					errors.push(this.getMessage(test))
				}
			} else {
				const myopts = opts.slice()
				myopts.unshift(val)
				if (!ExtendedValidator[test].apply(ExtendedValidator, myopts)) {
					errors.push(this.getMessage(test, opts))
				}
			}
		}

		const matchSelector = element.getAttribute('data-match')
		if (matchSelector && getRealVal(this.form.element.querySelector(matchSelector)).toString() !== getRealVal(element).toString()) {
			errors.push('Does not match')
		}

		if (element.getAttribute('data-lookup-endpoint')) {
			if (val.length > 2 && !errors.length) {
				if (element.getAttribute('data-last-lookup-val') !== val) {
					element.setAttribute('data-last-lookup-val', val)
					const e = await this.lookup(element.getAttribute('data-lookup-endpoint'), val, element.hasAttribute('data-unique'))
					if (e) {
						element.setAttribute('data-last-lookup-result', e)
						errors.push(e)
					} else {
						element.removeAttribute('data-last-lookup-result')
					}
				} else {
					if (element.getAttribute('data-last-lookup-result')) {
						errors.push(element.getAttribute('data-last-lookup-result'))
					}
				}
			}
		}

		const inputGroup = element.closest('.input-group')
		if (!inputGroup) {
			console.log('Warning: document structure error - validated inputs must be in container with class "input-group"')
		} else {
			if (errors.length) {
				utils.elementTools.removeClass(inputGroup, 'input-ok')
				utils.elementTools.addClass(inputGroup, 'error')
				inputGroup.getElementsByClassName('validation-help')[0].innerHTML = errors.join(', ')
			} else {
				utils.elementTools.removeClass(inputGroup, 'error')
				utils.elementTools.addClass(inputGroup, 'input-ok')
				inputGroup.getElementsByClassName('validation-help')[0].innerHTML = ''
			}
		}

		return errors
	}

	async lookup (endpoint, val, unique) {
		return new Promise((resolve, reject) => {
			const options = {
				method: 'POST',
				dataType: 'json',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					value: val
				})
			}
			try {
				fetch(endpoint, options)
					.then((response) => {
						if (response.status !== 200) {
							const e = new Error(response.statusText)
							e.errorCode = response.status
							return Promise.reject(e)
						}
						return Promise.resolve(response)
					})
					.then((response) => {
						return response.json()
					})
					.then((data) => {
						let e = null
						if (unique) {
							e = data.found ? 'Already exists' : null
						} else {
							e = !data.found ? 'Not Found' : null
						}
						resolve(e)
					})
					.catch((err, response) => {
						resolve('error checking unique ' + err.message)
					})
			} catch (err) {
				resolve('error checking unique' + err.message)
			}
		})
	}

	preFlight () {}

	disableSubmit () {
		this.submitter.setAttribute('disabled', true)
	}

	enableSubmit () {
		this.submitter.removeAttribute('disabled')
	}
}

class MolaMola extends Sargasso {
	constructor (elem, options) {
		super(elem, options)

		this.formId = this.element.getAttribute('id')
		this.endpoint = this.element.getAttribute('action')
		this.method = this.element.getAttribute('method') || 'POST'
		this.formHandlers = []

		if (this.element.getAttribute('data-helpers')) {
			const helperClasses = this.element.getAttribute('data-helpers').split(/\s*,\s*/)
			for (let i = 0; i < helperClasses.length; i++) {
				try {
					this.registerHelper(registeredHelperClasses[helperClasses[i]])
				} catch (e) {
					console.log('error instantiating ' + helperClasses[i], e, registeredHelperClasses)
				}
			}
		}
		if (this.element.getAttribute('data-recaptcha')) {
			this.registerHelper(ReCAPTCHAv3Helper)
		}

		if (this.element.getAttribute('data-submitter')) {
			this.registerHelper(SubmitterHelper)
		}

		if (this.element.getAttribute('data-status')) {
			this.registerHelper(StatusHelper)
		}

		if (this.element.querySelectorAll('[data-validate]').length) {
			this.registerHelper(ValidateHelper)
		}
	}

	start () {
		super.start()

		if (this.recaptcha) {}

		this.submitHandler = async (e) => {
			e.preventDefault()

			this.serializeForm()

			try {
				await this.tellHelpers('preFlight')
				this.submit()
			} catch (err) {
				this.tellHelpers('error', [err])
			}
		}

		this.element.addEventListener('submit', this.submitHandler)

		this.tellHelpers('pose')
	}

	registerHelper (HelperClass) {
		this.formHandlers.push(new HelperClass(this))
	}

	getHelpersForEvent (event, params) {
		const handlers = []
		for (let i = 0; i < this.formHandlers.length; i++) {
			if (this.formHandlers[i][event]) {
				const p = this.formHandlers[i][event].apply(this.formHandlers[i], params)
				handlers.push(p)
			}
		}
		return handlers
	}

	serializeForm () {
		this.payload = {}
		const elements = this.element.querySelectorAll('[data-payload]')
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i]
			const k = element.getAttribute('name')
			if (k) { // must be named
				const v = getRealVal(element)
				this.payload[k] = v
			}
		}
	}

	submit () {
		let url = this.endpoint

		const options = {
			method: this.method,
			dataType: 'json',
			headers: {
				'Content-Type': 'application/json'
			}
		}

		if (this.payload) {
			if (this.method.match(/^(POST|PUT|PATCH)$/i)) {
				options.body = JSON.stringify(this.payload)
			} else {
				url += '?' + Object.keys(this.payload).map((key) => {
					return encodeURIComponent(key) + '=' + encodeURIComponent(this.payload[key])
				}).join('&')
			}
		}

		try {
			fetch(url, options)
				.then((response) => {
					if (response.status !== 200 && response.status !== 422) {
						const e = new Error(response.statusText)
						e.errorCode = response.status
						return Promise.reject(e)
					}
					return Promise.resolve(response)
				})
				.then((response) => {
					return response.json()
				})
				.then((data) => {
					this.tellHelpers('success', [data])
				})
				.catch((error, response) => {
					this.tellHelpers('error', [error])
				})
		} catch (err) {
			this.tellHelpers('error', [err])
		}
	}

	sleep () {
		this.tellHelpers('destroy')
		this.element.removeEventListener('submit', this.submitHandler)
		super.sleep()
	}

	async tellHelpers (event, params) {
		const handlers = this.getHelpersForEvent(event, params)
		return Promise.all(handlers)
	}
}

utils.registerSargassoClass('MolaMola', MolaMola)

const molaMolaUtils = {
	registerHelperClass: registerHelperClass,
	ReCAPTCHAv3Helper: ReCAPTCHAv3Helper,
	SubmitterHelper: SubmitterHelper,
	StatusHelper: StatusHelper,
	ValidateHelper: ValidateHelper
}

export {
	MolaMola, MolaMolaHelper, molaMolaUtils
}
