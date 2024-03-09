/**
	@PelagicCreatures/MolaMola

	@author Michael Rhodes
	@license MIT
	Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes
**/

import {
	utils
}
	from '@pelagiccreatures/sargasso'

import {
	MolaMolaHelper, registerHelperClass
}
	from './MolaMolaHelper'

class ReCAPTCHAv3Helper extends MolaMolaHelper {
	constructor (form) {
		super(form)
		this.recaptcha = this.form.element.getAttribute('data-recaptcha')
		this.action = this.form.element.getAttribute('data-recaptcha-action') || 'login';
	}

	pose () {
		utils.elementTools.addClass(document.body, 'show-recaptcha', this)
	}

	preFlight () {
		return new Promise((resolve, reject) => {
			try {
				grecaptcha.execute(this.recaptcha, {
					action: this.action
				}).then((token) => {
					this.form.payload['g-recaptcha-response'] = token
					resolve()
				})
			} catch (err) {
				reject(err || new Error('reCaptchaV3 network error')) // OK google... network errors come back empty.
			}
		})
	}

	destroy () {
		utils.elementTools.removeClass(document.body, 'show-recaptcha')
	}
}

registerHelperClass('ReCAPTCHAv3Helper', ReCAPTCHAv3Helper)

class SubmitterHelper extends MolaMolaHelper {
	constructor (form) {
		super(form)
		this.submitter = this.form.element.querySelector(this.form.element.getAttribute('data-submitter'))
		this.submitterContent = this.submitter.innerHTML
		this.submitter.style.width = this.submitter.width
		// this.submitter.setAttribute('disabled', true) TODO check this (for forms w/no validation maybe better to fix in validate helper?) 
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

registerHelperClass('SubmitterHelper', SubmitterHelper)

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

registerHelperClass('StatusHelper', StatusHelper)

export {
	ReCAPTCHAv3Helper, SubmitterHelper, StatusHelper
}
