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
		submit: () => {},
		success: (response) => {},
		error: (statusCode, response) => {}
	})

	the API for the enpoint:
		200 (ok) & 422 (unprocessable entity) are expected to return json
		Use 422 for server side validation errors, the reponse payload is
		up to implementor and must be handled with a helper success method.

		Other http errors such as 401 (unauthorized) are handed to the helper
		error method
*/

import Validator from './node_modules/validator/es/index.js'

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
	}

	preFlight () {
		this.disableSubmit()
		// throw (new Error('error! errrrrrooooorr!'))
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
		this.dirty = false

		this.inputs = Array.from(this.form.element.querySelectorAll('[data-validate]'))

		this.changeHandler = (e) => {
			this.handleChange(e)
		}

		this.initInput(this.form.element)
		if (this.form.element.querySelector('[data-autofocus="true"]')) {
			this.form.element.querySelector('[data-autofocus="true"]').focus()
		}
	}

	destroy () {
		for (let i = 0; i < this.inputs.length; i++) {
			var input = this.inputs[i]
			input.removeEventListener('change', this.changeHandler)
			input.removeEventListener('blur', this.changeHandler)
			input.removeEventListener('focus', this.changeHandler)
			input.removeEventListener('keyup', this.changeHandler)
			input.removeEventListener('input', this.changeHandler)
		}
	}

	initInput (element) {
		for (let i = 0; i < this.inputs.length; i++) {
			var input = this.inputs[i]
			input.setAttribute('data-touched', false)
			input.setAttribute('data-dirty', false)
			input.setAttribute('data-last-value', this.getRealVal(input))
			input.setAttribute('data-original-value', this.getRealVal(input))
			if (input.getAttribute('checked')) {
				input.setAttribute('checked', 'checked')
			}

			input.addEventListener('change', this.changeHandler, false)
			input.addEventListener('blur', this.changeHandler, false)
			input.addEventListener('focus', this.changeHandler, false)
			input.addEventListener('keyup', this.changeHandler, false)
			input.addEventListener('input', this.changeHandler, false)
		}
	}

	handleChange (e) {
		const errors = this.inputs.map(this.validateField.bind(this))
		let errorCount = 0
		for (var i = 0; i < this.inputs.length; i++) {
			const input = this.inputs[i]
			if (errors[i] && errors[i].length) {
				++errorCount
				input.parentElement.getElementsByClassName('input-errors')[0].innerHTML = errors[i].join(', ')
			} else {
				input.parentElement.getElementsByClassName('input-errors')[0].innerHTML = ''
			}
		}

		if (errorCount) {
			this.disableSubmit()
		} else {
			this.enableSubmit()
		}
	}

	getMessage (test, opts) {
		const messages = {
			len: 'Length between %s and %s',
			notEmpty: 'Required',
			isEmail: 'Not an email address',
			isPassword: 'At least one uppercase, one lowercase and one number'
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

	validateField (element) {
		const val = this.getRealVal(element)
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

		return errors
	}

	getRealVal (elem) {
		let value

		if (elem.getAttribute('type') === 'checkbox' || elem.getAttribute('type') === 'radio') {
			value = !!elem.checked
		} else if (elem.tagName === 'SELECT') {
			const selected = elem.querySelectorAll('option:checked')
			const values = Array.from(selected).map(el => el.value)
			if (values) {
				value = values.length > 1 ? values : values[0]
			}
		} else {
			value = elem.value
		}

		return value ? value.toString() : ''
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

		registerMolaMolaHelper(this.formId, new DataValidator(this))
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
		var elements = this.element.querySelectorAll('input, select, textarea')
		for (let i = 0; i < elements.length; i++) {
			const element = elements[i]
			const k = element.getAttribute('name')
			const v = element.value
			this.payload[k] = v
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
						e.response.errorCode = response.status
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
