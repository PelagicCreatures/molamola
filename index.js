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

import Validator from './node_modules/validator/es/index.js'
import debounce from 'lodash/debounce'

const formHandlers = {}

const registerMolaMolaHelper = (formId, handler) => {
	if (!formHandlers[formId]) {
		formHandlers[formId] = []
	}
	formHandlers[formId].push(handler)
}

const getHelpersForEvent = (formId, event, params) => {
	const handlers = []
	if (formHandlers[formId]) {
		for (var i = 0; i < formHandlers[formId].length; i++) {
			if (formHandlers[formId][i][event]) {
				const p = formHandlers[formId][i][event].apply(formHandlers[formId][i], params)
				handlers.push(p)
			}
		}
	}
	return handlers
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

	success (data) {} // 200 or 422 response all is well deal with response payload

	error (err) {} // can be result of preFlight or from endpoint

	destroy () {} // cleanup
}

class ReCAPTCHAv3 extends MolaMolaHelper {
	constructor (form) {
		super(form)
		this.recaptcha = this.form.element.getAttribute('data-recaptcha')
	}

	pose () {
		elementTools.addClass(document.body, 'show-recaptcha', this)
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
		elementTools.removeClass(document.body, 'show-recaptcha')
	}
}

class SubmitterHandler extends MolaMolaHelper {
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

class StatusHandler extends MolaMolaHelper {
	constructor (form) {
		super(form)

		this.status = this.form.element.querySelector(this.form.element.getAttribute('data-status'))
		this.submitter = this.form.element.querySelector(this.form.element.getAttribute('data-submitter'))
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

class DataValidator extends MolaMolaHelper {
	constructor (form, validators) {
		super(form)
		this.validators = validators || Validator

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
			input.addEventListener('blur', this.changeHandler, false)
			input.addEventListener('focus', this.changeHandler, false)
			input.addEventListener('keyup', this.changeHandler, false)
			input.addEventListener('input', this.changeHandler, false)
			input.addEventListener('change', this.changeHandler, false)
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
			var input = this.inputs[i]
			input.setAttribute('data-touched', false)
			input.setAttribute('data-last-value', getRealVal(input).toString())
			if (input.getAttribute('checked')) {
				input.checked = true
			}
		}
	}

	async handleChange (e) {
		const errors = this.inputs.map(await this.validateField.bind(this))
		Promise.all(errors).then((errors) => {
			let errorCount = 0
			for (var i = 0; i < errors.length; i++) {
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
		const messages = {
			isLength: 'Length between %s and %s',
			isEmail: 'Not an email address'
		}

		let message = messages[test]
		if (!messages[test]) {
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

		if (!validations.isLength && !val) {
			return null
		}

		const errors = []
		for (const test in validations) {
			const opts = validations[test]
			if (typeof opts === 'boolean') {
				if (!this.validators[test](val)) {
					errors.push(this.getMessage(test))
				}
			} else {
				const myopts = opts.slice()
				myopts.unshift(val)
				if (!this.validators[test].apply(Validator, myopts)) {
					errors.push(this.getMessage(test, opts))
				}
			}
		}

		const matchSelector = element.getAttribute('data-match')
		if (matchSelector && getRealVal(this.element.querySelector(matchSelector)).toString() !== getRealVal(element).toString()) {
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

		if (errors.length) {
			elementTools.addClass(element.closest('.input-group'), 'error')
			element.closest('.input-group').getElementsByClassName('input-errors')[0].innerHTML = errors.join(', ')
		} else {
			elementTools.removeClass(element.closest('.input-group'), 'error')
			element.closest('.input-group').getElementsByClassName('input-errors')[0].innerHTML = ''
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

		if (this.element.getAttribute('data-recaptcha')) {
			registerMolaMolaHelper(this.formId, new ReCAPTCHAv3(this))
		}

		if (this.element.getAttribute('data-submitter')) {
			registerMolaMolaHelper(this.formId, new SubmitterHandler(this))
		}

		if (this.element.getAttribute('data-status')) {
			registerMolaMolaHelper(this.formId, new StatusHandler(this))
		}

		if (this.element.querySelectorAll('[data-validate]').length) {
			registerMolaMolaHelper(this.formId, new DataValidator(this))
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

	serializeForm () {
		this.payload = {}
		var elements = this.element.querySelectorAll('[data-payload]')
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
		const handlers = getHelpersForEvent(this.formId, event, params)
		return Promise.all(handlers)
	}
}

registerSargassoClass('MolaMola', MolaMola)

if (window) {
	window.MolaMola = MolaMola
	window.registerMolaMolaHelper = registerMolaMolaHelper
	window.MolaMolaHelper = MolaMolaHelper
}

export {
	MolaMola, registerMolaMolaHelper, MolaMolaHelper
}
