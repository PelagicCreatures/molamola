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

		const errors = []
		if (err) {
			errors.push(err.message)
		}
		if (err.statusCode) {
			errors.push('http status ' + err.statusCode)
		}
		this.form.status.innerHTML = errors.join(',')
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

class MolaMola extends Sargasso {
	constructor (elem, options) {
		super(elem, options)

		this.formId = this.element.getAttribute('id')
		this.endpoint = this.element.getAttribute('action')
		this.method = this.element.getAttribute('method') || 'POST'
		this.status = this.element.querySelector(this.element.getAttribute('data-status'))

		if (this.element.getAttribute('data-recaptcha')) {
			registerMolaMolaHelper(this.formId, new ReCAPTCHAv3(this))
		}

		if (this.element.getAttribute('data-submitter')) {
			registerMolaMolaHelper(this.formId, new SubmitterHandler(this))
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
				await this.tellHelpers('error', [err])
			}
		}

		this.element.addEventListener('submit', this.submitHandler)

		const handlers = getHelpersForEvent(this.formId, 'pose')
		Promise.all(handlers)
			.then(() => {})
			.catch((error) => {})
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
				.then(async (data) => {
					await this.tellHelpers('success', [data])
				})
				.catch(async (error, response) => {
					await this.tellHelpers('error', [error])
				})
		} catch (err) {
			this.tellHelpers('error', [err])
		}
	}

	async sleep () {
		await this.tellHelpers('destroy')
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
