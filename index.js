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

	pose () {}

	submit () {}

	success () {}

	error () {}

	destroy () {}
}

class ReCAPTCHAv3 extends MolaMolaHelper {
	pose () {
		elementTools.addClass(document.body, 'show-recaptcha', this)
	}

	async submit () {
		const token = await grecaptcha.execute(this.form.recaptcha, {
			action: 'social'
		})

		this.form.recaptchaToken = token
	}

	destroy () {
		elementTools.removeClass(document.body, 'show-recaptcha')
	}
}

class SubmitterHandler extends MolaMolaHelper {
	submit () {
		this.form.disableSubmit()
	}

	success (data) {
		this.form.enableSubmit()
	}

	error (statusCode, data) {
		this.form.enableSubmit()
	}
}

class MolaMola extends Sargasso {
	constructor (elem, options) {
		super(elem, options)

		this.formId = this.element.getAttribute('id')
		this.endpoint = this.element.getAttribute('action')
		this.method = this.element.getAttribute('method') || 'POST'
		this.recaptcha = this.element.getAttribute('data-recaptcha')
		this.status = this.element.querySelector(this.element.getAttribute('data-status'))

		// set up the submitter button busy state
		this.submitter = this.element.querySelector(this.element.getAttribute('data-submitter'))
		this.submitterContent = this.submitter.innerHTML
		this.submitter.style.width = this.submitter.width

		if (this.recaptcha) {
			registerMolaMolaHelper(this.formId, new ReCAPTCHAv3(this))
		}

		if (this.submitter) {
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
				await this.tellHelpers('submit')
				this.submit()
			} catch (err) {
				this.status.innerHTML = err
			}
		}

		this.element.addEventListener('submit', this.submitHandler)

		const handlers = getHelpersForEvent(this.formId, 'pose')
		Promise.all(handlers)
			.then(() => {})
			.catch((error) => {
				this.status.innerHTML = error
			})
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

		if (this.recaptcha) {
			this.payload['g-recaptcha-response'] = this.recaptchaToken
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

		fetch(url, options)
			.then((response) => {
				if (response.status !== 200 && response.status !== 422) {
					return Promise.reject(new Error(response.statusText), response)
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
				await this.tellHelpers('error', [error, response])
			})
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

	disableSubmit () {
		this.submitter.setAttribute('disabled', true)
		this.submitter.innerHTML = 'working...'
	}

	enableSubmit () {
		this.submitter.removeAttribute('disabled')
		this.submitter.innerHTML = this.submitterContent
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
