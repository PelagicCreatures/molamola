/**
	@PelagicCreatures/Krill

	@author Michael Rhodes
	@license MIT
	Made in Barbados 🇧🇧 Copyright © 2020 Michael Rhodes

	Form ID: an application unique identifier for the form EG: 'login', 'register'

	<form id="login" method="GET" action="/endpoint" data-sargasso-class="Krill" data-submitter=".submit-button" data-status=".status">

	Form handlers are used for handling form events.

	The following events can be handled by the handlers:

	registerFormHandler('myform',{
		submit: () => {},
		success: (response) => {},
		error: (statusCode, response) => {}
	})

*/

const formHandlers = {}

const registerKrillHelper = (formId, handler) => {
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

class KrillHelper {
	constructor (krill) {
		this.krill = krill
	}
}

class reCAPTCHAv3 extends KrillHelper {
	submit () {
		return new Promise((resolve, reject) => {
			try {
				grecaptcha.execute(this.krill.recaptcha, {
					action: 'social'
				}).then((token) => {
					// add g-recaptcha-response to payload
					this.krill.recaptchaToken = token
					resolve()
				})
			} catch (err) {
				reject(err)
			}
		})
	}
}

class submitterHandler extends KrillHelper {
	submit () {
		this.krill.disableSubmit()
	}

	success (data) {
		this.krill.enableSubmit()
	}

	error (statusCode, data) {
		this.krill.enableSubmit()
	}
}

class Krill extends Sargasso {
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
			registerKrillHelper(this.formId, new reCAPTCHAv3(this))
		}

		if (this.submitter) {
			registerKrillHelper(this.formId, new submitterHandler(this))
		}
	}

	start () {
		super.start()

		if (this.recaptcha) {
			elementTools.addClass(document.body, 'show-recaptcha', this)
		}

		this.submitHandler = (e) => {
			e.preventDefault()

			this.serializeForm()

			const handlers = getHelpersForEvent(this.formId, 'submit')
			Promise.all(handlers)
				.then(() => {
					this.submit()
				})
				.catch((error) => {
					this.status.innerHTML = error
				})
		}

		this.element.addEventListener('submit', this.submitHandler)
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
			.then((data) => {
				Promise.all(getHelpersForEvent(this.formId, 'success', [data]))
					.then(() => {})
					.catch((error) => {
						this.status.innerHTML = error
					})
			})
			.catch((error, response) => {
				this.lastError = error
				Promise.all(getHelpersForEvent(this.formId, 'error', [error, response]))
					.then(() => {})
					.catch((error) => {
						this.status.innerHTML = error
					})
			})
	}

	sleep () {
		if (this.recaptcha) {
			elementTools.removeClass(document.body, 'show-recaptcha')
		}
		this.element.removeEventListener('submit', this.submitHandler)
		super.sleep()
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

registerSargassoClass('Krill', Krill)

if (window) {
	window.Krill = Krill
	window.registerKrillHelper = registerKrillHelper
	window.KrillHelper = KrillHelper
}

export {
	Krill, registerKrillHelper, KrillHelper
}
