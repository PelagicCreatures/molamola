# @PelagicCreatures/MolaMola

### Sargasso supervised Forms and Input Validation

### STATUS: Preview. Under active development. Stable Soon.

[Demo Page](https://blog.myanti.social/demos/molamola)

```
@author Michael Rhodes
@license MIT
Made in Barbados 🇧🇧 Copyright © 2020 Michael Rhodes
```

Install in your project
```
npm install @PelagicCreatures/Sargasso
npm install @PelagicCreatures/MolaMola
```

MolaMolla provides a framework for building forms w/extensive validation, captcha, csrf and other capabilities.

### Form Tag
```html
<form id="test-form"  action="/form-post" method="POST" data-submitter=".submitter" data-status=".status" data-recaptcha="xxx">
  ....
  <button class="submitter">submit</button>
  <p class="status"></p>
</form>

```
Attributes:
* id: the id of the form (required)
* action: endpoint to transmit data to
* method: method (POST,GET,PATCH etc)
* data-submitter: css selector of the form submit button
* data-status: css selector of a container where errors are displayed
* data-recaptcha: public [reCaptchaV3](https://developers.google.com/recaptcha/docs/v3) API key.

### Form Elements
```html
<div class="input-group">
  <input type="text" name="email" placeholder="Email address" data-validate='{"isEmail":true,"notEmpty":true}' data-payload>
  <span class="input-errors"></span>
</div>
```
**Prerequisites:**
* All input elements must be wrapped in an .input-group
* All validated inputs must have an .input-errors container inside the .input-group

Field validation is implemented by [Validator](https://www.npmjs.com/package/validator) using  [Sequelize](https://www.npmjs.com/package/sequelize) extensions.

If using reCaptchaV3 it will be called on form submit and the token will be added to the payload (g-recaptcha-response) for backend validation and scoring.

**Input Attributes:**
* name: payload property (required)
* data-validate: JSON string detailing applicable Field validators
* data-payload: value should be included in API endpoint payload
* data-lookup-endpoint: endpoint to perform AJAX lookup as user types
* data-unique: if defined show error if lookup endpoint returns a patch

### Grouping selects, checkboxes and radio buttons
Normalizing input types for normalized JSON payloads

```html
<div class="input-group">
  <input type="text" name="checkbox-group" data-group='[type="checkbox"]' data-validate='{"notEmpty":true}' multiple data-payload>
  <input type="checkbox" value="1" checked> Check 1
  <input type="checkbox" value="2"> Check 2
  <input type="checkbox" value="3" checked> Check 3
  <span class="input-errors"></span>
</div>

<div class="input-group">
  <input type="text" name="radio-group" data-group='[type="radio"]' data-payload>
  <input type="radio" name="radio" value="1" checked> radio 1
  <input type="radio" name="radio" value="2"> radio 2
  <input type="radio" name="radio" value="3"> radio 3
  <span class="input-errors"></span>
</div>

<div class="input-group">
  <select name="select-single" data-validate='{"notEmpty":true}' data-payload>
    <option value="">---</option>
    <option value="1">option 1</option>
    <option value="2" selected>option 2</option>
    <option value="3">option 2</option>
  </select>
  <span class="input-errors"></span>
</div>

<div class="input-group">
  <select name="select-multiple" data-validate='{"notEmpty":true}' multiple data-payload>
    <option value="">---</option>
    <option value="1" selected>option 1</option>
    <option value="2" selected>option 2</option>
    <option value="3">option 2</option>
  </select>
  <span class="input-errors"></span>
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

## Form Helpers & Endpoint API

Prerequisites for API for the endpoint:
* 200 (ok) & 422 (unprocessable entity) are expected to return json. Use 422 for server side validation errors, the response payload is up to implementor and should be handled with a helper success method.

* Other http errors such as 401 (unauthorized) are handed to the helper error method

You will at least need to receive the payload of the response to take action after the form is submitted.

Subclass `MolaMolaHelper` and override the `success` and `error` methods to see the response payload and errors. This implementation is up to you. In our example response payload has some sugar to take some actions based on the response.

### Example Payload
```javascript
{
  "status": "ok",
  "didLogin": true,
  "message": "welcome back"
}
```

This example hooks up a helper to the form with the id `test-form`

### Form Helper
```javascript
class boilerplateHandler extends MolaMolaHelper {
  success (data) {
    if (data.didLogin) {
      tropicBird.pushSnackBar('info', 'Logged in')
    }
    if (data.didLogout) {
      tropicBird.pushSnackBar('info', 'Logged out')
    }
    if (data.message) {
      tropicBird.pushSnackBar('info', data.message)
    }
    if (data.errors) {
      for(let i = 0; i < data.errors.length; i++){
        tropicBird.pushSnackBar(data['error-level'] || 'info', data.errors[i])
      }
    }
    if (data.status === 'ok' && data.redirect) {
      loadPage(data.redirect)
    }
  }

  error (err) {
    tropicBird.pushSnackBar('error',err.message)
  }
}

// Instantiate the form
let form = new MolaMola(document.getElementById('test-form'))

// Register the form helper
registerMolaMolaHelper('test-form', new boilerplateHandler(form))

// Start watching for input
form.start()
```
