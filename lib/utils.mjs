/**
	@PelagicCreatures/MolaMola

	@author Michael Rhodes
	@license MIT
	Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes
**/

// make a clone of validator and add extensions to conform to Sequelize
// to allow frontend/backend validation to be identical.
import Validator from 'validator'
import cloneDeep from 'lodash/cloneDeep'
import forEach from 'lodash/forEach'

const ExtendedValidator = cloneDeep(Validator)

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
			value = element.value || ""
		}
	}

	return value
}

export {
	getRealVal, ExtendedValidator
}
