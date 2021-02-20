/**
	@PelagicCreatures/MolaMola

	@author Michael Rhodes
	@license MIT
	Made in Barbados 🇧🇧 Copyright © 2020 Michael Rhodes
**/

import {
	Sargasso, utils
}
	from '@pelagiccreatures/sargasso'

import {
	registeredHelperClasses
}
	from './MolaMolaHelper'

import {
	ReCAPTCHAv3Helper, SubmitterHelper, StatusHelper
}
	from './MolaMolaHelpers'

import {
	ValidateHelper
}
	from './ValidateHelper'

import {
	getRealVal
}
	from './utils'

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

		this.submitHandler = (e) => {
			e.preventDefault()

			this.serializeForm()

			Promise.all(this.tellHelpers('preFlight')).then(() => {
				this.submit()
			}).catch((err) => {
				this.tellHelpers('error', [err])
			})
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

	tellHelpers (event, params) {
		return this.getHelpersForEvent(event, params)
	}
}

utils.registerSargassoClass('MolaMola', MolaMola)

export {
	MolaMola
}
