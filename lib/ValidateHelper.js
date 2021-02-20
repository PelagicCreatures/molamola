/**
	@PelagicCreatures/MolaMola

	@author Michael Rhodes
	@license MIT
	Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes
**/

import {
	MolaMolaHelper, registerHelperClass
}
	from './MolaMolaHelper'

import {
	utils
}
	from '@pelagiccreatures/sargasso'

import {
	getRealVal, ExtendedValidator
}
	from './utils'

import debounce from 'lodash/debounce'

const validationMessages = {
	isLength: 'Length between %s and %s',
	isEmail: 'Email address',
	notEmpty: 'Required',
	isPassword: 'At least one uppercase, one lowercase, and one number'
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

	handleChange (e) {
		if (e && e.srcElement && e.srcElement !== window) {
			const elem = e.srcElement
			utils.elementTools.addClass(elem.closest('form'), 'touched')
			const isDirty = elem.getAttribute('data-last-value') !== getRealVal(elem)
			elem.setAttribute('data-touched', true)
			elem.setAttribute('data-dirty', isDirty)
		}
		const errors = this.inputs.map(this.validateField.bind(this))
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

	getMessage (test, opts, overrideMessage) {
		let message = overrideMessage || validationMessages[test]
		if (!message) { // build a message
			message = test
			if (opts) {
				if (Array.isArray[opts]) {
					for (let i = 0; i < opts.length; i++) {
						message += ' %s'
					}
				}
			}
		}
		if (!opts) {
			return message
		}

		if (!Array.isArray(opts)) {
			const tmp = []
			for (const prop in opts) {
				tmp.push(opts[prop])
			}
			opts = tmp
		}

		let c = 0
		return message.replace(/%s/g, function () {
			const opt = opts[c++]
			return opt ? opt.toString() : ''
		})
	}

	validateField (element) {
		return new Promise((resolve, reject) => {
			const val = getRealVal(element).toString()
			let validations = {}
			let validationMessage = {}
			let errors = []

			try {
				validations = JSON.parse(element.getAttribute('data-validate') || '{}')
				validationMessage = JSON.parse(element.getAttribute('data-validate-message') || '{}')
			} catch (e) {
				errors = ['data-validation attribute parse error']
			}

			if (!validations.notEmpty && !val && !errors.length) {
				return resolve()
			}

			for (const test in validations) {
				const opts = validations[test]
				if (typeof opts === 'boolean') {
					if (!ExtendedValidator[test](val)) {
						errors.push(this.getMessage(test, undefined, validationMessage[test]))
					}
				} else if (Array.isArray(opts)) {
					const myopts = opts.slice()
					myopts.unshift(val)
					if (!ExtendedValidator[test].apply(ExtendedValidator, myopts)) {
						errors.push(this.getMessage(test, opts, validationMessage[test]))
					}
				} else {
					if (!ExtendedValidator[test](val, opts)) {
						errors.push(this.getMessage(test, opts, validationMessage[test]))
					}
				}
			}

			const matchSelector = element.getAttribute('data-match')
			if (matchSelector && getRealVal(this.form.element.querySelector(matchSelector)).toString() !== getRealVal(element).toString()) {
				errors.push('Does not match')
			}

			if (!element.getAttribute('data-lookup-endpoint')) {
				this.showErrors(element, errors)
				return resolve(errors)
			}

			if (val.length > 2 && !errors.length) {
				// show last error if unchanged
				if (element.getAttribute('data-last-lookup-val') === val) {
					if (element.getAttribute('data-last-lookup-result')) {
						errors.push(element.getAttribute('data-last-lookup-result'))
					}
					this.showErrors(element, errors)
					return resolve(errors)
				} else {
					element.setAttribute('data-last-lookup-val', val)
					this.lookup(element.getAttribute('data-lookup-endpoint'), val, element.hasAttribute('data-unique'))
						.then((e) => {
							if (e) {
								element.setAttribute('data-last-lookup-result', e)
								errors.push(e)
							} else {
								element.removeAttribute('data-last-lookup-result')
							}
							this.showErrors(element, errors)
							return resolve(errors)
						})
				}
			}
		})
	}

	showErrors (element, errors) {
		const inputGroup = element.closest('.input-group')
		if (inputGroup) {
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
	}

	lookup (endpoint, val, unique) {
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

registerHelperClass('ValidateHelper', ValidateHelper)

export {
	ValidateHelper, validationMessages
}
