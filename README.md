# @PelagicCreatures/MolaMola

### Sargasso supervised Forms and Input Validation

[Demo Page](https://blog.PelagicCreatures.com/demos/molamola)

```
@author Michael Rhodes
@license MIT
Made in Barbados 🇧🇧 Copyright © 2020 Michael Rhodes
```

MolaMolla provides a framework for building forms unified validation, captcha, csrf and other capabilities.

### Form Tag
```html
<form id="test-form" data-sargasso-class="MolaMola" action="/form-post" method="POST" data-submitter=".submitter" data-status=".status" data-recaptcha="xxx" data-helpers="HelperOne,HelperTwo">
  ....
  <button class="submitter">submit</button>
  <p class="status"></p>
</form>

```
Attributes:
* `id`: the id of the form (required)
* `action`: endpoint to transmit data to
* `method`: method (POST,GET,PATCH etc)
* `data-submitter`: css selector of the form submit button
* `data-status`: css selector of a container where errors are displayed
* `data-recaptcha`: public [reCaptchaV3](https://developers.google.com/recaptcha/docs/v3) API key.
* `data-helpers`: list of MolaMola Helper classes for handling errors and response payload etc.


Field validation is implemented by [Validator](https://www.npmjs.com/package/validator) using  [Sequelize](https://www.npmjs.com/package/sequelize) extensions.

If using reCaptchaV3 it will be called on form submit and the token will be added to the payload (g-recaptcha-response) for backend validation and scoring.

### Form Element Layout

```html
<div class="input-group">
  <input type="text" name="email" placeholder="Email address" data-validate='{"isEmail":true,"notEmpty":true}' data-payload>
  <span class="validation-help"></span>
</div>
```

**Input Attributes:**
* `name`: payload property (required)
* `data-validate`: JSON string detailing applicable Field validators
* `data-validate-message`: message to display on validation error (default messages are somewhat cryptic)
* `data-payload`: set if the field should be included in form payload

### Validation Helper
The built in validation helper marks input errors and displays input error messages

Prerequisites for validation behavior:
* All input elements must be wrapped in an `.input-group` container
* All validated inputs must have an `.validation-help` container inside the `.input-group`

CSS rules to reveal validation messages on input error
```css
.validation-help { opacity:0; }
.touched .error .validation-help { opacity: 1}
```

Example validators [See Validator for details](https://www.npmjs.com/package/validator):
* `data-validate='{"isEmail":true,"notEmpty":true}'`
* `data-validate='{"isInt":{"min":1,"max":2}}' data-validate-message='{"isInt":"integer between %s and %s"}'`
* `data-validate='{"isLength":{"min":0,"max":10}}'`

Note: the format of the attributes must be valid JSON (double quotes required)

### Grouping selects, checkboxes and radio buttons
Grouping payloads for multiple and single select, checkboxes and radio buttons

```html
<div class="input-group">
  <input type="text" name="checkbox-group" data-group='[type="checkbox"]' data-validate='{"notEmpty":true}' multiple data-payload>
  <input type="checkbox" value="1" checked> Check 1
  <input type="checkbox" value="2"> Check 2
  <input type="checkbox" value="3" checked> Check 3
  <span class="validation-help"></span>
</div>

<div class="input-group">
  <input type="text" name="radio-group" data-group='[type="radio"]' data-payload>
  <input type="radio" name="radio" value="1" checked> radio 1
  <input type="radio" name="radio" value="2"> radio 2
  <input type="radio" name="radio" value="3"> radio 3
  <span class="validation-help"></span>
</div>

<div class="input-group">
  <select name="select-single" data-validate='{"notEmpty":true}' data-payload>
    <option value="">---</option>
    <option value="1">option 1</option>
    <option value="2" selected>option 2</option>
    <option value="3">option 2</option>
  </select>
  <span class="validation-help"></span>
</div>

<div class="input-group">
  <select name="select-multiple" data-validate='{"notEmpty":true}' multiple data-payload>
    <option value="">---</option>
    <option value="1" selected>option 1</option>
    <option value="2" selected>option 2</option>
    <option value="3">option 2</option>
  </select>
  <span class="validation-help"></span>
</div>
```

The resulting payload groups multiple and single selects in a consistent manner
```json
{
  "checkbox-group" : [2,3],
  "radio-group": 1,
  "select-single": 2,
  "select-multiple": [1,2]
}
```

### Lookup / unique endpoints
Make an API call on change to validate uniqueness or existence for a field value

TODO: need example

### Endpoint API

Backend API prerequisites for the endpoint:

* 200 (ok) & 422 (unprocessable entity) are expected to return json. Use 422 for server side validation errors, the response payload is up to implementor and should be handled with a helper `success` method.

* Other http errors such as 401 (unauthorized) are handed to the helper `error` method

You will at least need to receive the payload of the response to take action after the form is submitted and probably show a confirmation page in success or something like that.

Subclass `MolaMolaHelper` and override the `success` and `error` methods to see the response payload and errors. This implementation is up to you. In our example response payload has some sugar to take some actions based on the response.

### Form Helper
This example hooks up a helper to a form

```javascript
class ExampleHandler extends MolaMolaModule.MolaMolaHelper {

	// A chance to modify the payload or implement a captcha or something before submit.
  preFlight() {

  }

  // use this method to handle 200 (ok) and 422 (unprocessable entity) responses
	// this example expects a JSON response. The specification of the payload is up to you.
  success(data) {
    alert('submitted')
  }

  // use this method to handle all other http responses
  error(err) {
    alert('error ' + err.message)
  }
}

MolaMolaModule.molaMolaUtils.registerHelperClass('ExampleHandler', ExampleHandler)

```

```html
<form id="test-form" data-sargasso-class="MolaMola"  action="/form-post" method="POST" data-submitter=".submitter" data-status=".status" data-helpers="ExampleHandler">
```
