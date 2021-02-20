/**
	@PelagicCreatures/MolaMola

	@author Michael Rhodes
	@license MIT
	Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes

	Form ID: an application unique identifier for the form EG: 'login', 'register'

	<form
		id="login"
		method="GET"
		action="/endpoint"
		data-sargasso-class="MolaMola"
		data-helpers="MyForm"
		data-submitter=".submit-button"
		data-status=".status">
	</form>

	Form helpers are used for handling form events.

	The following events can be handled by the handlers:

	class MyForm extends MolaMolaHelper {
		success (response) {},
		error (statusCode, response) {}
	}
	registerFormHandler('MyForm',MyForm)

	the API for the endpoint:
		200 (ok) & 422 (unprocessable entity) are expected to return json
		Use 422 for server side validation errors, the reponse payload is
		up to implementor and should be handled with a helper success method.

		Other http errors such as 401 (unauthorized) are handed to the helper
		error method
*/

import {
	MolaMola
}
	from './lib/MolaMola'

import {
	MolaMolaHelper, registerHelperClass
}
	from './lib/MolaMolaHelper'

import {
	ReCAPTCHAv3Helper, SubmitterHelper, StatusHelper
}
	from './lib/MolaMolaHelpers'

import {
	ValidateHelper
}
	from './lib/ValidateHelper'

const molaMolaUtils = {
	registerHelperClass: registerHelperClass,
	ReCAPTCHAv3Helper: ReCAPTCHAv3Helper,
	SubmitterHelper: SubmitterHelper,
	StatusHelper: StatusHelper,
	ValidateHelper: ValidateHelper
}

export {
	MolaMola, MolaMolaHelper, molaMolaUtils
}
