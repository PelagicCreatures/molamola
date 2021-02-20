/**
	@PelagicCreatures/MolaMola

	@author Michael Rhodes
	@license MIT
	Made in Barbados 🇧🇧 Copyright © 2020 Michael Rhodes
**/

const registeredHelperClasses = {}
const registerHelperClass = (className, object) => {
	registeredHelperClasses[className] = object
}

class MolaMolaHelper {
	constructor (form) {
		this.form = form
	}

	// override these methods as needed
	pose () {} // pose form

	/*
		preFlight: about to submit this.form.payload to endpoint
		return a promise for any async behavior (like recAPTCHA defined in MolaMolaHelpers.hs)
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

export {
	MolaMolaHelper, registerHelperClass, registeredHelperClasses
}
