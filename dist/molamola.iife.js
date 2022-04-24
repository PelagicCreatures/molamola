var MolaMolaModule = (function (exports, sargasso) {
	'use strict';

	/**
		@PelagicCreatures/MolaMola

		@author Michael Rhodes
		@license MIT
		Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes
	**/

	const registeredHelperClasses = {};
	const registerHelperClass = (className, object) => {
		registeredHelperClasses[className] = object;
	};

	class MolaMolaHelper {
		constructor (form) {
			this.form = form;
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

	/**
		@PelagicCreatures/MolaMola

		@author Michael Rhodes
		@license MIT
		Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes
	**/

	class ReCAPTCHAv3Helper extends MolaMolaHelper {
		constructor (form) {
			super(form);
			this.recaptcha = this.form.element.getAttribute('data-recaptcha');
		}

		pose () {
			sargasso.utils.elementTools.addClass(document.body, 'show-recaptcha', this);
		}

		preFlight () {
			return new Promise((resolve, reject) => {
				try {
					grecaptcha.execute(this.recaptcha, {
						action: 'social'
					}).then((token) => {
						this.form.payload['g-recaptcha-response'] = token;
						resolve();
					});
				} catch (err) {
					reject(err || new Error('reCaptchaV3 network error')); // OK google... network errors come back empty.
				}
			})
		}

		destroy () {
			sargasso.utils.elementTools.removeClass(document.body, 'show-recaptcha');
		}
	}

	registerHelperClass('ReCAPTCHAv3Helper', ReCAPTCHAv3Helper);

	class SubmitterHelper extends MolaMolaHelper {
		constructor (form) {
			super(form);
			this.submitter = this.form.element.querySelector(this.form.element.getAttribute('data-submitter'));
			this.submitterContent = this.submitter.innerHTML;
			this.submitter.style.width = this.submitter.width;
			this.submitter.setAttribute('disabled', true);
		}

		preFlight () {
			this.disableSubmit();
		}

		success (data) {
			this.enableSubmit();
		}

		error (err) {
			this.enableSubmit();
		}

		disableSubmit () {
			this.submitter.setAttribute('disabled', true);
			this.submitter.innerHTML = 'working...';
		}

		enableSubmit () {
			this.submitter.removeAttribute('disabled');
			this.submitter.innerHTML = this.submitterContent;
		}
	}

	registerHelperClass('SubmitterHelper', SubmitterHelper);

	class StatusHelper extends MolaMolaHelper {
		constructor (form) {
			super(form);
			this.status = this.form.element.querySelector(this.form.element.getAttribute('data-status'));
		}

		error (err) {
			const errors = [];
			if (err) {
				errors.push(err.message);
			}
			if (err.statusCode) {
				errors.push('http status ' + err.statusCode);
			}
			this.status.innerHTML = errors.join(',');
		}
	}

	registerHelperClass('StatusHelper', StatusHelper);

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getDefaultExportFromNamespaceIfPresent (n) {
		return n && Object.prototype.hasOwnProperty.call(n, 'default') ? n['default'] : n;
	}

	function getDefaultExportFromNamespaceIfNotNamed (n) {
		return n && Object.prototype.hasOwnProperty.call(n, 'default') && Object.keys(n).length === 1 ? n['default'] : n;
	}

	function getAugmentedNamespace(n) {
	  var f = n.default;
		if (typeof f == "function") {
			var a = function () {
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var validator = {exports: {}};

	var toDate$1 = {exports: {}};

	var assertString$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = assertString;

		function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

		function assertString(input) {
		  var isString = typeof input === 'string' || input instanceof String;

		  if (!isString) {
		    var invalidType = _typeof(input);

		    if (input === null) invalidType = 'null';else if (invalidType === 'object') invalidType = input.constructor.name;
		    throw new TypeError("Expected a string but received a ".concat(invalidType));
		  }
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (assertString$1, assertString$1.exports));

	var assertString = /*@__PURE__*/getDefaultExportFromCjs(assertString$1.exports);

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = toDate;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function toDate(date) {
		  (0, _assertString.default)(date);
		  date = Date.parse(date);
		  return !isNaN(date) ? new Date(date) : null;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (toDate$1, toDate$1.exports));

	var toDate = /*@__PURE__*/getDefaultExportFromCjs(toDate$1.exports);

	var toFloat$1 = {exports: {}};

	var isFloat$1 = {};

	var alpha$1 = {};

	"use strict";

	Object.defineProperty(alpha$1, "__esModule", {
	  value: true
	});
	var commaDecimal_1 = alpha$1.commaDecimal = dotDecimal_1 = alpha$1.dotDecimal = farsiLocales_1 = alpha$1.farsiLocales = arabicLocales_1 = alpha$1.arabicLocales = englishLocales_1 = alpha$1.englishLocales = decimal_1 = alpha$1.decimal = alphanumeric_1 = alpha$1.alphanumeric = alpha_2 = alpha$1.alpha = void 0;
	var alpha = {
	  'en-US': /^[A-Z]+$/i,
	  'az-AZ': /^[A-VXYZÇƏĞİıÖŞÜ]+$/i,
	  'bg-BG': /^[А-Я]+$/i,
	  'cs-CZ': /^[A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
	  'da-DK': /^[A-ZÆØÅ]+$/i,
	  'de-DE': /^[A-ZÄÖÜß]+$/i,
	  'el-GR': /^[Α-ώ]+$/i,
	  'es-ES': /^[A-ZÁÉÍÑÓÚÜ]+$/i,
	  'fa-IR': /^[ابپتثجچحخدذرزژسشصضطظعغفقکگلمنوهی]+$/i,
	  'fi-FI': /^[A-ZÅÄÖ]+$/i,
	  'fr-FR': /^[A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
	  'it-IT': /^[A-ZÀÉÈÌÎÓÒÙ]+$/i,
	  'nb-NO': /^[A-ZÆØÅ]+$/i,
	  'nl-NL': /^[A-ZÁÉËÏÓÖÜÚ]+$/i,
	  'nn-NO': /^[A-ZÆØÅ]+$/i,
	  'hu-HU': /^[A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
	  'pl-PL': /^[A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
	  'pt-PT': /^[A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
	  'ru-RU': /^[А-ЯЁ]+$/i,
	  'sl-SI': /^[A-ZČĆĐŠŽ]+$/i,
	  'sk-SK': /^[A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
	  'sr-RS@latin': /^[A-ZČĆŽŠĐ]+$/i,
	  'sr-RS': /^[А-ЯЂЈЉЊЋЏ]+$/i,
	  'sv-SE': /^[A-ZÅÄÖ]+$/i,
	  'th-TH': /^[ก-๐\s]+$/i,
	  'tr-TR': /^[A-ZÇĞİıÖŞÜ]+$/i,
	  'uk-UA': /^[А-ЩЬЮЯЄIЇҐі]+$/i,
	  'vi-VN': /^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
	  'ku-IQ': /^[ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
	  ar: /^[ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
	  he: /^[א-ת]+$/,
	  fa: /^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i,
	  'hi-IN': /^[\u0900-\u0961]+[\u0972-\u097F]*$/i
	};
	var alpha_2 = alpha$1.alpha = alpha;
	var alphanumeric = {
	  'en-US': /^[0-9A-Z]+$/i,
	  'az-AZ': /^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,
	  'bg-BG': /^[0-9А-Я]+$/i,
	  'cs-CZ': /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
	  'da-DK': /^[0-9A-ZÆØÅ]+$/i,
	  'de-DE': /^[0-9A-ZÄÖÜß]+$/i,
	  'el-GR': /^[0-9Α-ω]+$/i,
	  'es-ES': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
	  'fi-FI': /^[0-9A-ZÅÄÖ]+$/i,
	  'fr-FR': /^[0-9A-ZÀÂÆÇÉÈÊËÏÎÔŒÙÛÜŸ]+$/i,
	  'it-IT': /^[0-9A-ZÀÉÈÌÎÓÒÙ]+$/i,
	  'hu-HU': /^[0-9A-ZÁÉÍÓÖŐÚÜŰ]+$/i,
	  'nb-NO': /^[0-9A-ZÆØÅ]+$/i,
	  'nl-NL': /^[0-9A-ZÁÉËÏÓÖÜÚ]+$/i,
	  'nn-NO': /^[0-9A-ZÆØÅ]+$/i,
	  'pl-PL': /^[0-9A-ZĄĆĘŚŁŃÓŻŹ]+$/i,
	  'pt-PT': /^[0-9A-ZÃÁÀÂÄÇÉÊËÍÏÕÓÔÖÚÜ]+$/i,
	  'ru-RU': /^[0-9А-ЯЁ]+$/i,
	  'sl-SI': /^[0-9A-ZČĆĐŠŽ]+$/i,
	  'sk-SK': /^[0-9A-ZÁČĎÉÍŇÓŠŤÚÝŽĹŔĽÄÔ]+$/i,
	  'sr-RS@latin': /^[0-9A-ZČĆŽŠĐ]+$/i,
	  'sr-RS': /^[0-9А-ЯЂЈЉЊЋЏ]+$/i,
	  'sv-SE': /^[0-9A-ZÅÄÖ]+$/i,
	  'th-TH': /^[ก-๙\s]+$/i,
	  'tr-TR': /^[0-9A-ZÇĞİıÖŞÜ]+$/i,
	  'uk-UA': /^[0-9А-ЩЬЮЯЄIЇҐі]+$/i,
	  'ku-IQ': /^[٠١٢٣٤٥٦٧٨٩0-9ئابپتجچحخدرڕزژسشعغفڤقکگلڵمنوۆھەیێيطؤثآإأكضصةظذ]+$/i,
	  'vi-VN': /^[0-9A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴĐÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸ]+$/i,
	  ar: /^[٠١٢٣٤٥٦٧٨٩0-9ءآأؤإئابةتثجحخدذرزسشصضطظعغفقكلمنهوىيًٌٍَُِّْٰ]+$/,
	  he: /^[0-9א-ת]+$/,
	  fa: /^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i,
	  'hi-IN': /^[\u0900-\u0963]+[\u0966-\u097F]*$/i
	};
	var alphanumeric_1 = alpha$1.alphanumeric = alphanumeric;
	var decimal = {
	  'en-US': '.',
	  ar: '٫'
	};
	var decimal_1 = alpha$1.decimal = decimal;
	var englishLocales = ['AU', 'GB', 'HK', 'IN', 'NZ', 'ZA', 'ZM'];
	var englishLocales_1 = alpha$1.englishLocales = englishLocales;

	for (var locale, i = 0; i < englishLocales.length; i++) {
	  locale = "en-".concat(englishLocales[i]);
	  alpha[locale] = alpha['en-US'];
	  alphanumeric[locale] = alphanumeric['en-US'];
	  decimal[locale] = decimal['en-US'];
	} // Source: http://www.localeplanet.com/java/


	var arabicLocales = ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'QM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'];
	var arabicLocales_1 = alpha$1.arabicLocales = arabicLocales;

	for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
	  _locale = "ar-".concat(arabicLocales[_i]);
	  alpha[_locale] = alpha.ar;
	  alphanumeric[_locale] = alphanumeric.ar;
	  decimal[_locale] = decimal.ar;
	}

	var farsiLocales = ['IR', 'AF'];
	var farsiLocales_1 = alpha$1.farsiLocales = farsiLocales;

	for (var _locale2, _i2 = 0; _i2 < farsiLocales.length; _i2++) {
	  _locale2 = "fa-".concat(farsiLocales[_i2]);
	  alphanumeric[_locale2] = alphanumeric.fa;
	  decimal[_locale2] = decimal.ar;
	} // Source: https://en.wikipedia.org/wiki/Decimal_mark


	var dotDecimal = ['ar-EG', 'ar-LB', 'ar-LY'];
	var dotDecimal_1 = alpha$1.dotDecimal = dotDecimal;
	var commaDecimal = ['bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-ZM', 'es-ES', 'fr-CA', 'fr-FR', 'id-ID', 'it-IT', 'ku-IQ', 'hi-IN', 'hu-HU', 'nb-NO', 'nn-NO', 'nl-NL', 'pl-PL', 'pt-PT', 'ru-RU', 'sl-SI', 'sr-RS@latin', 'sr-RS', 'sv-SE', 'tr-TR', 'uk-UA', 'vi-VN'];
	commaDecimal_1 = alpha$1.commaDecimal = commaDecimal;

	for (var _i3 = 0; _i3 < dotDecimal.length; _i3++) {
	  decimal[dotDecimal[_i3]] = decimal['en-US'];
	}

	for (var _i4 = 0; _i4 < commaDecimal.length; _i4++) {
	  decimal[commaDecimal[_i4]] = ',';
	}

	alpha['fr-CA'] = alpha['fr-FR'];
	alphanumeric['fr-CA'] = alphanumeric['fr-FR'];
	alpha['pt-BR'] = alpha['pt-PT'];
	alphanumeric['pt-BR'] = alphanumeric['pt-PT'];
	decimal['pt-BR'] = decimal['pt-PT']; // see #862

	alpha['pl-Pl'] = alpha['pl-PL'];
	alphanumeric['pl-Pl'] = alphanumeric['pl-PL'];
	decimal['pl-Pl'] = decimal['pl-PL']; // see #1455

	alpha['fa-AF'] = alpha.fa;

	"use strict";

	Object.defineProperty(isFloat$1, "__esModule", {
	  value: true
	});
	var _default$a = isFloat$1.default = isFloat;
	var locales_1$5 = isFloat$1.locales = void 0;

	var _assertString$a = _interopRequireDefault$a(assertString$1.exports);

	var _alpha$2 = alpha$1;

	function _interopRequireDefault$a(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isFloat(str, options) {
	  (0, _assertString$a.default)(str);
	  options = options || {};
	  var float = new RegExp("^(?:[-+])?(?:[0-9]+)?(?:\\".concat(options.locale ? _alpha$2.decimal[options.locale] : '.', "[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"));

	  if (str === '' || str === '.' || str === '-' || str === '+') {
	    return false;
	  }

	  var value = parseFloat(str.replace(',', '.'));
	  return float.test(str) && (!options.hasOwnProperty('min') || value >= options.min) && (!options.hasOwnProperty('max') || value <= options.max) && (!options.hasOwnProperty('lt') || value < options.lt) && (!options.hasOwnProperty('gt') || value > options.gt);
	}

	var locales$5 = Object.keys(_alpha$2.decimal);
	locales_1$5 = isFloat$1.locales = locales$5;

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = toFloat;

		var _isFloat = _interopRequireDefault(isFloat$1);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function toFloat(str) {
		  if (!(0, _isFloat.default)(str)) return NaN;
		  return parseFloat(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (toFloat$1, toFloat$1.exports));

	var toFloat = /*@__PURE__*/getDefaultExportFromCjs(toFloat$1.exports);

	var toInt$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = toInt;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function toInt(str, radix) {
		  (0, _assertString.default)(str);
		  return parseInt(str, radix || 10);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (toInt$1, toInt$1.exports));

	var toInt = /*@__PURE__*/getDefaultExportFromCjs(toInt$1.exports);

	var toBoolean$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = toBoolean;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function toBoolean(str, strict) {
		  (0, _assertString.default)(str);

		  if (strict) {
		    return str === '1' || /^true$/i.test(str);
		  }

		  return str !== '0' && !/^false$/i.test(str) && str !== '';
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (toBoolean$1, toBoolean$1.exports));

	var toBoolean = /*@__PURE__*/getDefaultExportFromCjs(toBoolean$1.exports);

	var equals$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = equals;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function equals(str, comparison) {
		  (0, _assertString.default)(str);
		  return str === comparison;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (equals$1, equals$1.exports));

	var equals = /*@__PURE__*/getDefaultExportFromCjs(equals$1.exports);

	var contains$1 = {exports: {}};

	var toString$2 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = toString;

		function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

		function toString(input) {
		  if (_typeof(input) === 'object' && input !== null) {
		    if (typeof input.toString === 'function') {
		      input = input.toString();
		    } else {
		      input = '[object Object]';
		    }
		  } else if (input === null || typeof input === 'undefined' || isNaN(input) && !input.length) {
		    input = '';
		  }

		  return String(input);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (toString$2, toString$2.exports));

	var toString$1 = /*@__PURE__*/getDefaultExportFromCjs(toString$2.exports);

	var merge$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = merge;

		function merge() {
		  var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
		  var defaults = arguments.length > 1 ? arguments[1] : undefined;

		  for (var key in defaults) {
		    if (typeof obj[key] === 'undefined') {
		      obj[key] = defaults[key];
		    }
		  }

		  return obj;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (merge$1, merge$1.exports));

	var merge = /*@__PURE__*/getDefaultExportFromCjs(merge$1.exports);

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = contains;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _toString = _interopRequireDefault(toString$2.exports);

		var _merge = _interopRequireDefault(merge$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var defaulContainsOptions = {
		  ignoreCase: false,
		  minOccurrences: 1
		};

		function contains(str, elem, options) {
		  (0, _assertString.default)(str);
		  options = (0, _merge.default)(options, defaulContainsOptions);

		  if (options.ignoreCase) {
		    return str.toLowerCase().split((0, _toString.default)(elem).toLowerCase()).length > options.minOccurrences;
		  }

		  return str.split((0, _toString.default)(elem)).length > options.minOccurrences;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (contains$1, contains$1.exports));

	var contains = /*@__PURE__*/getDefaultExportFromCjs(contains$1.exports);

	var matches$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = matches;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function matches(str, pattern, modifiers) {
		  (0, _assertString.default)(str);

		  if (Object.prototype.toString.call(pattern) !== '[object RegExp]') {
		    pattern = new RegExp(pattern, modifiers);
		  }

		  return pattern.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (matches$1, matches$1.exports));

	var matches = /*@__PURE__*/getDefaultExportFromCjs(matches$1.exports);

	var isEmail$1 = {exports: {}};

	var isByteLength$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isByteLength;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

		/* eslint-disable prefer-rest-params */
		function isByteLength(str, options) {
		  (0, _assertString.default)(str);
		  var min;
		  var max;

		  if (_typeof(options) === 'object') {
		    min = options.min || 0;
		    max = options.max;
		  } else {
		    // backwards compatibility: isByteLength(str, min [, max])
		    min = arguments[1];
		    max = arguments[2];
		  }

		  var len = encodeURI(str).split(/%..|./).length - 1;
		  return len >= min && (typeof max === 'undefined' || len <= max);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isByteLength$1, isByteLength$1.exports));

	var isByteLength = /*@__PURE__*/getDefaultExportFromCjs(isByteLength$1.exports);

	var isFQDN$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isFQDN;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _merge = _interopRequireDefault(merge$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var default_fqdn_options = {
		  require_tld: true,
		  allow_underscores: false,
		  allow_trailing_dot: false,
		  allow_numeric_tld: false,
		  allow_wildcard: false
		};

		function isFQDN(str, options) {
		  (0, _assertString.default)(str);
		  options = (0, _merge.default)(options, default_fqdn_options);
		  /* Remove the optional trailing dot before checking validity */

		  if (options.allow_trailing_dot && str[str.length - 1] === '.') {
		    str = str.substring(0, str.length - 1);
		  }
		  /* Remove the optional wildcard before checking validity */


		  if (options.allow_wildcard === true && str.indexOf('*.') === 0) {
		    str = str.substring(2);
		  }

		  var parts = str.split('.');
		  var tld = parts[parts.length - 1];

		  if (options.require_tld) {
		    // disallow fqdns without tld
		    if (parts.length < 2) {
		      return false;
		    }

		    if (!/^([a-z\u00A1-\u00A8\u00AA-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
		      return false;
		    } // disallow spaces


		    if (/\s/.test(tld)) {
		      return false;
		    }
		  } // reject numeric TLDs


		  if (!options.allow_numeric_tld && /^\d+$/.test(tld)) {
		    return false;
		  }

		  return parts.every(function (part) {
		    if (part.length > 63) {
		      return false;
		    }

		    if (!/^[a-z_\u00a1-\uffff0-9-]+$/i.test(part)) {
		      return false;
		    } // disallow full-width chars


		    if (/[\uff01-\uff5e]/.test(part)) {
		      return false;
		    } // disallow parts starting or ending with hyphen


		    if (/^-|-$/.test(part)) {
		      return false;
		    }

		    if (!options.allow_underscores && /_/.test(part)) {
		      return false;
		    }

		    return true;
		  });
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isFQDN$1, isFQDN$1.exports));

	var isFQDN = /*@__PURE__*/getDefaultExportFromCjs(isFQDN$1.exports);

	var isIP$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isIP;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/**
		11.3.  Examples

		   The following addresses

		             fe80::1234 (on the 1st link of the node)
		             ff02::5678 (on the 5th link of the node)
		             ff08::9abc (on the 10th organization of the node)

		   would be represented as follows:

		             fe80::1234%1
		             ff02::5678%5
		             ff08::9abc%10

		   (Here we assume a natural translation from a zone index to the
		   <zone_id> part, where the Nth zone of any scope is translated into
		   "N".)

		   If we use interface names as <zone_id>, those addresses could also be
		   represented as follows:

		            fe80::1234%ne0
		            ff02::5678%pvc1.3
		            ff08::9abc%interface10

		   where the interface "ne0" belongs to the 1st link, "pvc1.3" belongs
		   to the 5th link, and "interface10" belongs to the 10th organization.
		 * * */
		var IPv4SegmentFormat = '(?:[0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])';
		var IPv4AddressFormat = "(".concat(IPv4SegmentFormat, "[.]){3}").concat(IPv4SegmentFormat);
		var IPv4AddressRegExp = new RegExp("^".concat(IPv4AddressFormat, "$"));
		var IPv6SegmentFormat = '(?:[0-9a-fA-F]{1,4})';
		var IPv6AddressRegExp = new RegExp('^(' + "(?:".concat(IPv6SegmentFormat, ":){7}(?:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){6}(?:").concat(IPv4AddressFormat, "|:").concat(IPv6SegmentFormat, "|:)|") + "(?:".concat(IPv6SegmentFormat, ":){5}(?::").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,2}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){4}(?:(:").concat(IPv6SegmentFormat, "){0,1}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,3}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){3}(?:(:").concat(IPv6SegmentFormat, "){0,2}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,4}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){2}(?:(:").concat(IPv6SegmentFormat, "){0,3}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,5}|:)|") + "(?:".concat(IPv6SegmentFormat, ":){1}(?:(:").concat(IPv6SegmentFormat, "){0,4}:").concat(IPv4AddressFormat, "|(:").concat(IPv6SegmentFormat, "){1,6}|:)|") + "(?::((?::".concat(IPv6SegmentFormat, "){0,5}:").concat(IPv4AddressFormat, "|(?::").concat(IPv6SegmentFormat, "){1,7}|:))") + ')(%[0-9a-zA-Z-.:]{1,})?$');

		function isIP(str) {
		  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
		  (0, _assertString.default)(str);
		  version = String(version);

		  if (!version) {
		    return isIP(str, 4) || isIP(str, 6);
		  }

		  if (version === '4') {
		    if (!IPv4AddressRegExp.test(str)) {
		      return false;
		    }

		    var parts = str.split('.').sort(function (a, b) {
		      return a - b;
		    });
		    return parts[3] <= 255;
		  }

		  if (version === '6') {
		    return !!IPv6AddressRegExp.test(str);
		  }

		  return false;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isIP$1, isIP$1.exports));

	var isIP = /*@__PURE__*/getDefaultExportFromCjs(isIP$1.exports);

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isEmail;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _merge = _interopRequireDefault(merge$1.exports);

		var _isByteLength = _interopRequireDefault(isByteLength$1.exports);

		var _isFQDN = _interopRequireDefault(isFQDN$1.exports);

		var _isIP = _interopRequireDefault(isIP$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var default_email_options = {
		  allow_display_name: false,
		  require_display_name: false,
		  allow_utf8_local_part: true,
		  require_tld: true,
		  blacklisted_chars: '',
		  ignore_max_length: false,
		  host_blacklist: []
		};
		/* eslint-disable max-len */

		/* eslint-disable no-control-regex */

		var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)</i;
		var emailUserPart = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~]+$/i;
		var gmailUserPart = /^[a-z\d]+$/;
		var quotedEmailUser = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f]))*$/i;
		var emailUserUtf8Part = /^[a-z\d!#\$%&'\*\+\-\/=\?\^_`{\|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+$/i;
		var quotedEmailUserUtf8 = /^([\s\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|(\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*$/i;
		var defaultMaxEmailLength = 254;
		/* eslint-enable max-len */

		/* eslint-enable no-control-regex */

		/**
		 * Validate display name according to the RFC2822: https://tools.ietf.org/html/rfc2822#appendix-A.1.2
		 * @param {String} display_name
		 */

		function validateDisplayName(display_name) {
		  var display_name_without_quotes = display_name.replace(/^"(.+)"$/, '$1'); // display name with only spaces is not valid

		  if (!display_name_without_quotes.trim()) {
		    return false;
		  } // check whether display name contains illegal character


		  var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);

		  if (contains_illegal) {
		    // if contains illegal characters,
		    // must to be enclosed in double-quotes, otherwise it's not a valid display name
		    if (display_name_without_quotes === display_name) {
		      return false;
		    } // the quotes in display name must start with character symbol \


		    var all_start_with_back_slash = display_name_without_quotes.split('"').length === display_name_without_quotes.split('\\"').length;

		    if (!all_start_with_back_slash) {
		      return false;
		    }
		  }

		  return true;
		}

		function isEmail(str, options) {
		  (0, _assertString.default)(str);
		  options = (0, _merge.default)(options, default_email_options);

		  if (options.require_display_name || options.allow_display_name) {
		    var display_email = str.match(splitNameAddress);

		    if (display_email) {
		      var display_name = display_email[1]; // Remove display name and angle brackets to get email address
		      // Can be done in the regex but will introduce a ReDOS (See  #1597 for more info)

		      str = str.replace(display_name, '').replace(/(^<|>$)/g, ''); // sometimes need to trim the last space to get the display name
		      // because there may be a space between display name and email address
		      // eg. myname <address@gmail.com>
		      // the display name is `myname` instead of `myname `, so need to trim the last space

		      if (display_name.endsWith(' ')) {
		        display_name = display_name.substr(0, display_name.length - 1);
		      }

		      if (!validateDisplayName(display_name)) {
		        return false;
		      }
		    } else if (options.require_display_name) {
		      return false;
		    }
		  }

		  if (!options.ignore_max_length && str.length > defaultMaxEmailLength) {
		    return false;
		  }

		  var parts = str.split('@');
		  var domain = parts.pop();
		  var lower_domain = domain.toLowerCase();

		  if (options.host_blacklist.includes(lower_domain)) {
		    return false;
		  }

		  var user = parts.join('@');

		  if (options.domain_specific_validation && (lower_domain === 'gmail.com' || lower_domain === 'googlemail.com')) {
		    /*
		      Previously we removed dots for gmail addresses before validating.
		      This was removed because it allows `multiple..dots@gmail.com`
		      to be reported as valid, but it is not.
		      Gmail only normalizes single dots, removing them from here is pointless,
		      should be done in normalizeEmail
		    */
		    user = user.toLowerCase(); // Removing sub-address from username before gmail validation

		    var username = user.split('+')[0]; // Dots are not included in gmail length restriction

		    if (!(0, _isByteLength.default)(username.replace(/\./g, ''), {
		      min: 6,
		      max: 30
		    })) {
		      return false;
		    }

		    var _user_parts = username.split('.');

		    for (var i = 0; i < _user_parts.length; i++) {
		      if (!gmailUserPart.test(_user_parts[i])) {
		        return false;
		      }
		    }
		  }

		  if (options.ignore_max_length === false && (!(0, _isByteLength.default)(user, {
		    max: 64
		  }) || !(0, _isByteLength.default)(domain, {
		    max: 254
		  }))) {
		    return false;
		  }

		  if (!(0, _isFQDN.default)(domain, {
		    require_tld: options.require_tld
		  })) {
		    if (!options.allow_ip_domain) {
		      return false;
		    }

		    if (!(0, _isIP.default)(domain)) {
		      if (!domain.startsWith('[') || !domain.endsWith(']')) {
		        return false;
		      }

		      var noBracketdomain = domain.substr(1, domain.length - 2);

		      if (noBracketdomain.length === 0 || !(0, _isIP.default)(noBracketdomain)) {
		        return false;
		      }
		    }
		  }

		  if (user[0] === '"') {
		    user = user.slice(1, user.length - 1);
		    return options.allow_utf8_local_part ? quotedEmailUserUtf8.test(user) : quotedEmailUser.test(user);
		  }

		  var pattern = options.allow_utf8_local_part ? emailUserUtf8Part : emailUserPart;
		  var user_parts = user.split('.');

		  for (var _i = 0; _i < user_parts.length; _i++) {
		    if (!pattern.test(user_parts[_i])) {
		      return false;
		    }
		  }

		  if (options.blacklisted_chars) {
		    if (user.search(new RegExp("[".concat(options.blacklisted_chars, "]+"), 'g')) !== -1) return false;
		  }

		  return true;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isEmail$1, isEmail$1.exports));

	var isEmail = /*@__PURE__*/getDefaultExportFromCjs(isEmail$1.exports);

	var isURL$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isURL;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _isFQDN = _interopRequireDefault(isFQDN$1.exports);

		var _isIP = _interopRequireDefault(isIP$1.exports);

		var _merge = _interopRequireDefault(merge$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

		function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

		function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

		function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

		function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

		function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

		/*
		options for isURL method

		require_protocol - if set as true isURL will return false if protocol is not present in the URL
		require_valid_protocol - isURL will check if the URL's protocol is present in the protocols option
		protocols - valid protocols can be modified with this option
		require_host - if set as false isURL will not check if host is present in the URL
		require_port - if set as true isURL will check if port is present in the URL
		allow_protocol_relative_urls - if set as true protocol relative URLs will be allowed
		validate_length - if set as false isURL will skip string length validation (IE maximum is 2083)

		*/
		var default_url_options = {
		  protocols: ['http', 'https', 'ftp'],
		  require_tld: true,
		  require_protocol: false,
		  require_host: true,
		  require_port: false,
		  require_valid_protocol: true,
		  allow_underscores: false,
		  allow_trailing_dot: false,
		  allow_protocol_relative_urls: false,
		  allow_fragments: true,
		  allow_query_components: true,
		  validate_length: true
		};
		var wrapped_ipv6 = /^\[([^\]]+)\](?::([0-9]+))?$/;

		function isRegExp(obj) {
		  return Object.prototype.toString.call(obj) === '[object RegExp]';
		}

		function checkHost(host, matches) {
		  for (var i = 0; i < matches.length; i++) {
		    var match = matches[i];

		    if (host === match || isRegExp(match) && match.test(host)) {
		      return true;
		    }
		  }

		  return false;
		}

		function isURL(url, options) {
		  (0, _assertString.default)(url);

		  if (!url || /[\s<>]/.test(url)) {
		    return false;
		  }

		  if (url.indexOf('mailto:') === 0) {
		    return false;
		  }

		  options = (0, _merge.default)(options, default_url_options);

		  if (options.validate_length && url.length >= 2083) {
		    return false;
		  }

		  if (!options.allow_fragments && url.includes('#')) {
		    return false;
		  }

		  if (!options.allow_query_components && (url.includes('?') || url.includes('&'))) {
		    return false;
		  }

		  var protocol, auth, host, hostname, port, port_str, split, ipv6;
		  split = url.split('#');
		  url = split.shift();
		  split = url.split('?');
		  url = split.shift();
		  split = url.split('://');

		  if (split.length > 1) {
		    protocol = split.shift().toLowerCase();

		    if (options.require_valid_protocol && options.protocols.indexOf(protocol) === -1) {
		      return false;
		    }
		  } else if (options.require_protocol) {
		    return false;
		  } else if (url.substr(0, 2) === '//') {
		    if (!options.allow_protocol_relative_urls) {
		      return false;
		    }

		    split[0] = url.substr(2);
		  }

		  url = split.join('://');

		  if (url === '') {
		    return false;
		  }

		  split = url.split('/');
		  url = split.shift();

		  if (url === '' && !options.require_host) {
		    return true;
		  }

		  split = url.split('@');

		  if (split.length > 1) {
		    if (options.disallow_auth) {
		      return false;
		    }

		    if (split[0] === '') {
		      return false;
		    }

		    auth = split.shift();

		    if (auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
		      return false;
		    }

		    var _auth$split = auth.split(':'),
		        _auth$split2 = _slicedToArray(_auth$split, 2),
		        user = _auth$split2[0],
		        password = _auth$split2[1];

		    if (user === '' && password === '') {
		      return false;
		    }
		  }

		  hostname = split.join('@');
		  port_str = null;
		  ipv6 = null;
		  var ipv6_match = hostname.match(wrapped_ipv6);

		  if (ipv6_match) {
		    host = '';
		    ipv6 = ipv6_match[1];
		    port_str = ipv6_match[2] || null;
		  } else {
		    split = hostname.split(':');
		    host = split.shift();

		    if (split.length) {
		      port_str = split.join(':');
		    }
		  }

		  if (port_str !== null && port_str.length > 0) {
		    port = parseInt(port_str, 10);

		    if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
		      return false;
		    }
		  } else if (options.require_port) {
		    return false;
		  }

		  if (options.host_whitelist) {
		    return checkHost(host, options.host_whitelist);
		  }

		  if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, _isIP.default)(ipv6, 6))) {
		    return false;
		  }

		  host = host || ipv6;

		  if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
		    return false;
		  }

		  return true;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isURL$1, isURL$1.exports));

	var isURL = /*@__PURE__*/getDefaultExportFromCjs(isURL$1.exports);

	var isMACAddress$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isMACAddress;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var macAddress = /^(?:[0-9a-fA-F]{2}([-:\s]))([0-9a-fA-F]{2}\1){4}([0-9a-fA-F]{2})$/;
		var macAddressNoSeparators = /^([0-9a-fA-F]){12}$/;
		var macAddressWithDots = /^([0-9a-fA-F]{4}\.){2}([0-9a-fA-F]{4})$/;

		function isMACAddress(str, options) {
		  (0, _assertString.default)(str);
		  /**
		   * @deprecated `no_colons` TODO: remove it in the next major
		  */

		  if (options && (options.no_colons || options.no_separators)) {
		    return macAddressNoSeparators.test(str);
		  }

		  return macAddress.test(str) || macAddressWithDots.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isMACAddress$1, isMACAddress$1.exports));

	var isMACAddress = /*@__PURE__*/getDefaultExportFromCjs(isMACAddress$1.exports);

	var isIPRange$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isIPRange;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _isIP = _interopRequireDefault(isIP$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var subnetMaybe = /^\d{1,3}$/;
		var v4Subnet = 32;
		var v6Subnet = 128;

		function isIPRange(str) {
		  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
		  (0, _assertString.default)(str);
		  var parts = str.split('/'); // parts[0] -> ip, parts[1] -> subnet

		  if (parts.length !== 2) {
		    return false;
		  }

		  if (!subnetMaybe.test(parts[1])) {
		    return false;
		  } // Disallow preceding 0 i.e. 01, 02, ...


		  if (parts[1].length > 1 && parts[1].startsWith('0')) {
		    return false;
		  }

		  var isValidIP = (0, _isIP.default)(parts[0], version);

		  if (!isValidIP) {
		    return false;
		  } // Define valid subnet according to IP's version


		  var expectedSubnet = null;

		  switch (String(version)) {
		    case '4':
		      expectedSubnet = v4Subnet;
		      break;

		    case '6':
		      expectedSubnet = v6Subnet;
		      break;

		    default:
		      expectedSubnet = (0, _isIP.default)(parts[0], '6') ? v6Subnet : v4Subnet;
		  }

		  return parts[1] <= expectedSubnet && parts[1] >= 0;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isIPRange$1, isIPRange$1.exports));

	var isIPRange = /*@__PURE__*/getDefaultExportFromCjs(isIPRange$1.exports);

	var isDate$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isDate;

		var _merge = _interopRequireDefault(merge$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

		function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

		function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

		function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

		function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

		function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

		function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

		var default_date_options = {
		  format: 'YYYY/MM/DD',
		  delimiters: ['/', '-'],
		  strictMode: false
		};

		function isValidFormat(format) {
		  return /(^(y{4}|y{2})[.\/-](m{1,2})[.\/-](d{1,2})$)|(^(m{1,2})[.\/-](d{1,2})[.\/-]((y{4}|y{2})$))|(^(d{1,2})[.\/-](m{1,2})[.\/-]((y{4}|y{2})$))/gi.test(format);
		}

		function zip(date, format) {
		  var zippedArr = [],
		      len = Math.min(date.length, format.length);

		  for (var i = 0; i < len; i++) {
		    zippedArr.push([date[i], format[i]]);
		  }

		  return zippedArr;
		}

		function isDate(input, options) {
		  if (typeof options === 'string') {
		    // Allow backward compatbility for old format isDate(input [, format])
		    options = (0, _merge.default)({
		      format: options
		    }, default_date_options);
		  } else {
		    options = (0, _merge.default)(options, default_date_options);
		  }

		  if (typeof input === 'string' && isValidFormat(options.format)) {
		    var formatDelimiter = options.delimiters.find(function (delimiter) {
		      return options.format.indexOf(delimiter) !== -1;
		    });
		    var dateDelimiter = options.strictMode ? formatDelimiter : options.delimiters.find(function (delimiter) {
		      return input.indexOf(delimiter) !== -1;
		    });
		    var dateAndFormat = zip(input.split(dateDelimiter), options.format.toLowerCase().split(formatDelimiter));
		    var dateObj = {};

		    var _iterator = _createForOfIteratorHelper(dateAndFormat),
		        _step;

		    try {
		      for (_iterator.s(); !(_step = _iterator.n()).done;) {
		        var _step$value = _slicedToArray(_step.value, 2),
		            dateWord = _step$value[0],
		            formatWord = _step$value[1];

		        if (dateWord.length !== formatWord.length) {
		          return false;
		        }

		        dateObj[formatWord.charAt(0)] = dateWord;
		      }
		    } catch (err) {
		      _iterator.e(err);
		    } finally {
		      _iterator.f();
		    }

		    return new Date("".concat(dateObj.m, "/").concat(dateObj.d, "/").concat(dateObj.y)).getDate() === +dateObj.d;
		  }

		  if (!options.strictMode) {
		    return Object.prototype.toString.call(input) === '[object Date]' && isFinite(input);
		  }

		  return false;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isDate$1, isDate$1.exports));

	var isDate = /*@__PURE__*/getDefaultExportFromCjs(isDate$1.exports);

	var isBoolean$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isBoolean;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var defaultOptions = {
		  loose: false
		};
		var strictBooleans = ['true', 'false', '1', '0'];
		var looseBooleans = [].concat(strictBooleans, ['yes', 'no']);

		function isBoolean(str) {
		  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
		  (0, _assertString.default)(str);

		  if (options.loose) {
		    return looseBooleans.includes(str.toLowerCase());
		  }

		  return strictBooleans.includes(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isBoolean$1, isBoolean$1.exports));

	var isBoolean = /*@__PURE__*/getDefaultExportFromCjs(isBoolean$1.exports);

	var isLocale$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isLocale;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var localeReg = /^[A-Za-z]{2,4}([_-]([A-Za-z]{4}|[\d]{3}))?([_-]([A-Za-z]{2}|[\d]{3}))?$/;

		function isLocale(str) {
		  (0, _assertString.default)(str);

		  if (str === 'en_US_POSIX' || str === 'ca_ES_VALENCIA') {
		    return true;
		  }

		  return localeReg.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isLocale$1, isLocale$1.exports));

	var isLocale = /*@__PURE__*/getDefaultExportFromCjs(isLocale$1.exports);

	var isAlpha$1 = {};

	"use strict";

	Object.defineProperty(isAlpha$1, "__esModule", {
	  value: true
	});
	var _default$9 = isAlpha$1.default = isAlpha;
	var locales_1$4 = isAlpha$1.locales = void 0;

	var _assertString$9 = _interopRequireDefault$9(assertString$1.exports);

	var _alpha$1 = alpha$1;

	function _interopRequireDefault$9(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isAlpha(_str) {
	  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  (0, _assertString$9.default)(_str);
	  var str = _str;
	  var ignore = options.ignore;

	  if (ignore) {
	    if (ignore instanceof RegExp) {
	      str = str.replace(ignore, '');
	    } else if (typeof ignore === 'string') {
	      str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&'), "]"), 'g'), ''); // escape regex for ignore
	    } else {
	      throw new Error('ignore should be instance of a String or RegExp');
	    }
	  }

	  if (locale in _alpha$1.alpha) {
	    return _alpha$1.alpha[locale].test(str);
	  }

	  throw new Error("Invalid locale '".concat(locale, "'"));
	}

	var locales$4 = Object.keys(_alpha$1.alpha);
	locales_1$4 = isAlpha$1.locales = locales$4;

	var isAlphanumeric$1 = {};

	"use strict";

	Object.defineProperty(isAlphanumeric$1, "__esModule", {
	  value: true
	});
	var _default$8 = isAlphanumeric$1.default = isAlphanumeric;
	var locales_1$3 = isAlphanumeric$1.locales = void 0;

	var _assertString$8 = _interopRequireDefault$8(assertString$1.exports);

	var _alpha = alpha$1;

	function _interopRequireDefault$8(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isAlphanumeric(_str) {
	  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
	  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	  (0, _assertString$8.default)(_str);
	  var str = _str;
	  var ignore = options.ignore;

	  if (ignore) {
	    if (ignore instanceof RegExp) {
	      str = str.replace(ignore, '');
	    } else if (typeof ignore === 'string') {
	      str = str.replace(new RegExp("[".concat(ignore.replace(/[-[\]{}()*+?.,\\^$|#\\s]/g, '\\$&'), "]"), 'g'), ''); // escape regex for ignore
	    } else {
	      throw new Error('ignore should be instance of a String or RegExp');
	    }
	  }

	  if (locale in _alpha.alphanumeric) {
	    return _alpha.alphanumeric[locale].test(str);
	  }

	  throw new Error("Invalid locale '".concat(locale, "'"));
	}

	var locales$3 = Object.keys(_alpha.alphanumeric);
	locales_1$3 = isAlphanumeric$1.locales = locales$3;

	var isNumeric$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isNumeric;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _alpha = alpha$1;

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var numericNoSymbols = /^[0-9]+$/;

		function isNumeric(str, options) {
		  (0, _assertString.default)(str);

		  if (options && options.no_symbols) {
		    return numericNoSymbols.test(str);
		  }

		  return new RegExp("^[+-]?([0-9]*[".concat((options || {}).locale ? _alpha.decimal[options.locale] : '.', "])?[0-9]+$")).test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isNumeric$1, isNumeric$1.exports));

	var isNumeric = /*@__PURE__*/getDefaultExportFromCjs(isNumeric$1.exports);

	var isPassportNumber$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isPassportNumber;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/**
		 * Reference:
		 * https://en.wikipedia.org/ -- Wikipedia
		 * https://docs.microsoft.com/en-us/microsoft-365/compliance/eu-passport-number -- EU Passport Number
		 * https://countrycode.org/ -- Country Codes
		 */
		var passportRegexByCountryCode = {
		  AM: /^[A-Z]{2}\d{7}$/,
		  // ARMENIA
		  AR: /^[A-Z]{3}\d{6}$/,
		  // ARGENTINA
		  AT: /^[A-Z]\d{7}$/,
		  // AUSTRIA
		  AU: /^[A-Z]\d{7}$/,
		  // AUSTRALIA
		  BE: /^[A-Z]{2}\d{6}$/,
		  // BELGIUM
		  BG: /^\d{9}$/,
		  // BULGARIA
		  BR: /^[A-Z]{2}\d{6}$/,
		  // BRAZIL
		  BY: /^[A-Z]{2}\d{7}$/,
		  // BELARUS
		  CA: /^[A-Z]{2}\d{6}$/,
		  // CANADA
		  CH: /^[A-Z]\d{7}$/,
		  // SWITZERLAND
		  CN: /^G\d{8}$|^E(?![IO])[A-Z0-9]\d{7}$/,
		  // CHINA [G=Ordinary, E=Electronic] followed by 8-digits, or E followed by any UPPERCASE letter (except I and O) followed by 7 digits
		  CY: /^[A-Z](\d{6}|\d{8})$/,
		  // CYPRUS
		  CZ: /^\d{8}$/,
		  // CZECH REPUBLIC
		  DE: /^[CFGHJKLMNPRTVWXYZ0-9]{9}$/,
		  // GERMANY
		  DK: /^\d{9}$/,
		  // DENMARK
		  DZ: /^\d{9}$/,
		  // ALGERIA
		  EE: /^([A-Z]\d{7}|[A-Z]{2}\d{7})$/,
		  // ESTONIA (K followed by 7-digits), e-passports have 2 UPPERCASE followed by 7 digits
		  ES: /^[A-Z0-9]{2}([A-Z0-9]?)\d{6}$/,
		  // SPAIN
		  FI: /^[A-Z]{2}\d{7}$/,
		  // FINLAND
		  FR: /^\d{2}[A-Z]{2}\d{5}$/,
		  // FRANCE
		  GB: /^\d{9}$/,
		  // UNITED KINGDOM
		  GR: /^[A-Z]{2}\d{7}$/,
		  // GREECE
		  HR: /^\d{9}$/,
		  // CROATIA
		  HU: /^[A-Z]{2}(\d{6}|\d{7})$/,
		  // HUNGARY
		  IE: /^[A-Z0-9]{2}\d{7}$/,
		  // IRELAND
		  IN: /^[A-Z]{1}-?\d{7}$/,
		  // INDIA
		  ID: /^[A-C]\d{7}$/,
		  // INDONESIA
		  IR: /^[A-Z]\d{8}$/,
		  // IRAN
		  IS: /^(A)\d{7}$/,
		  // ICELAND
		  IT: /^[A-Z0-9]{2}\d{7}$/,
		  // ITALY
		  JP: /^[A-Z]{2}\d{7}$/,
		  // JAPAN
		  KR: /^[MS]\d{8}$/,
		  // SOUTH KOREA, REPUBLIC OF KOREA, [S=PS Passports, M=PM Passports]
		  LT: /^[A-Z0-9]{8}$/,
		  // LITHUANIA
		  LU: /^[A-Z0-9]{8}$/,
		  // LUXEMBURG
		  LV: /^[A-Z0-9]{2}\d{7}$/,
		  // LATVIA
		  LY: /^[A-Z0-9]{8}$/,
		  // LIBYA
		  MT: /^\d{7}$/,
		  // MALTA
		  MZ: /^([A-Z]{2}\d{7})|(\d{2}[A-Z]{2}\d{5})$/,
		  // MOZAMBIQUE
		  MY: /^[AHK]\d{8}$/,
		  // MALAYSIA
		  NL: /^[A-Z]{2}[A-Z0-9]{6}\d$/,
		  // NETHERLANDS
		  PL: /^[A-Z]{2}\d{7}$/,
		  // POLAND
		  PT: /^[A-Z]\d{6}$/,
		  // PORTUGAL
		  RO: /^\d{8,9}$/,
		  // ROMANIA
		  RU: /^\d{9}$/,
		  // RUSSIAN FEDERATION
		  SE: /^\d{8}$/,
		  // SWEDEN
		  SL: /^(P)[A-Z]\d{7}$/,
		  // SLOVANIA
		  SK: /^[0-9A-Z]\d{7}$/,
		  // SLOVAKIA
		  TR: /^[A-Z]\d{8}$/,
		  // TURKEY
		  UA: /^[A-Z]{2}\d{6}$/,
		  // UKRAINE
		  US: /^\d{9}$/ // UNITED STATES

		};
		/**
		 * Check if str is a valid passport number
		 * relative to provided ISO Country Code.
		 *
		 * @param {string} str
		 * @param {string} countryCode
		 * @return {boolean}
		 */

		function isPassportNumber(str, countryCode) {
		  (0, _assertString.default)(str);
		  /** Remove All Whitespaces, Convert to UPPERCASE */

		  var normalizedStr = str.replace(/\s/g, '').toUpperCase();
		  return countryCode.toUpperCase() in passportRegexByCountryCode && passportRegexByCountryCode[countryCode].test(normalizedStr);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isPassportNumber$1, isPassportNumber$1.exports));

	var isPassportNumber = /*@__PURE__*/getDefaultExportFromCjs(isPassportNumber$1.exports);

	var isPort$1 = {exports: {}};

	var isInt$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isInt;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var int = /^(?:[-+]?(?:0|[1-9][0-9]*))$/;
		var intLeadingZeroes = /^[-+]?[0-9]+$/;

		function isInt(str, options) {
		  (0, _assertString.default)(str);
		  options = options || {}; // Get the regex to use for testing, based on whether
		  // leading zeroes are allowed or not.

		  var regex = options.hasOwnProperty('allow_leading_zeroes') && !options.allow_leading_zeroes ? int : intLeadingZeroes; // Check min/max/lt/gt

		  var minCheckPassed = !options.hasOwnProperty('min') || str >= options.min;
		  var maxCheckPassed = !options.hasOwnProperty('max') || str <= options.max;
		  var ltCheckPassed = !options.hasOwnProperty('lt') || str < options.lt;
		  var gtCheckPassed = !options.hasOwnProperty('gt') || str > options.gt;
		  return regex.test(str) && minCheckPassed && maxCheckPassed && ltCheckPassed && gtCheckPassed;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isInt$1, isInt$1.exports));

	var isInt = /*@__PURE__*/getDefaultExportFromCjs(isInt$1.exports);

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isPort;

		var _isInt = _interopRequireDefault(isInt$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function isPort(str) {
		  return (0, _isInt.default)(str, {
		    min: 0,
		    max: 65535
		  });
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isPort$1, isPort$1.exports));

	var isPort = /*@__PURE__*/getDefaultExportFromCjs(isPort$1.exports);

	var isLowercase$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isLowercase;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function isLowercase(str) {
		  (0, _assertString.default)(str);
		  return str === str.toLowerCase();
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isLowercase$1, isLowercase$1.exports));

	var isLowercase = /*@__PURE__*/getDefaultExportFromCjs(isLowercase$1.exports);

	var isUppercase$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isUppercase;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function isUppercase(str) {
		  (0, _assertString.default)(str);
		  return str === str.toUpperCase();
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isUppercase$1, isUppercase$1.exports));

	var isUppercase = /*@__PURE__*/getDefaultExportFromCjs(isUppercase$1.exports);

	var isIMEI$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isIMEI;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var imeiRegexWithoutHypens = /^[0-9]{15}$/;
		var imeiRegexWithHypens = /^\d{2}-\d{6}-\d{6}-\d{1}$/;

		function isIMEI(str, options) {
		  (0, _assertString.default)(str);
		  options = options || {}; // default regex for checking imei is the one without hyphens

		  var imeiRegex = imeiRegexWithoutHypens;

		  if (options.allow_hyphens) {
		    imeiRegex = imeiRegexWithHypens;
		  }

		  if (!imeiRegex.test(str)) {
		    return false;
		  }

		  str = str.replace(/-/g, '');
		  var sum = 0,
		      mul = 2,
		      l = 14;

		  for (var i = 0; i < l; i++) {
		    var digit = str.substring(l - i - 1, l - i);
		    var tp = parseInt(digit, 10) * mul;

		    if (tp >= 10) {
		      sum += tp % 10 + 1;
		    } else {
		      sum += tp;
		    }

		    if (mul === 1) {
		      mul += 1;
		    } else {
		      mul -= 1;
		    }
		  }

		  var chk = (10 - sum % 10) % 10;

		  if (chk !== parseInt(str.substring(14, 15), 10)) {
		    return false;
		  }

		  return true;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isIMEI$1, isIMEI$1.exports));

	var isIMEI = /*@__PURE__*/getDefaultExportFromCjs(isIMEI$1.exports);

	var isAscii$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isAscii;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/* eslint-disable no-control-regex */
		var ascii = /^[\x00-\x7F]+$/;
		/* eslint-enable no-control-regex */

		function isAscii(str) {
		  (0, _assertString.default)(str);
		  return ascii.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isAscii$1, isAscii$1.exports));

	var isAscii = /*@__PURE__*/getDefaultExportFromCjs(isAscii$1.exports);

	var isFullWidth$1 = {};

	"use strict";

	Object.defineProperty(isFullWidth$1, "__esModule", {
	  value: true
	});
	var _default$7 = isFullWidth$1.default = isFullWidth;
	var fullWidth_1 = isFullWidth$1.fullWidth = void 0;

	var _assertString$7 = _interopRequireDefault$7(assertString$1.exports);

	function _interopRequireDefault$7(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
	fullWidth_1 = isFullWidth$1.fullWidth = fullWidth;

	function isFullWidth(str) {
	  (0, _assertString$7.default)(str);
	  return fullWidth.test(str);
	}

	var isHalfWidth$1 = {};

	"use strict";

	Object.defineProperty(isHalfWidth$1, "__esModule", {
	  value: true
	});
	var _default$6 = isHalfWidth$1.default = isHalfWidth;
	var halfWidth_1 = isHalfWidth$1.halfWidth = void 0;

	var _assertString$6 = _interopRequireDefault$6(assertString$1.exports);

	function _interopRequireDefault$6(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
	halfWidth_1 = isHalfWidth$1.halfWidth = halfWidth;

	function isHalfWidth(str) {
	  (0, _assertString$6.default)(str);
	  return halfWidth.test(str);
	}

	var isVariableWidth$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isVariableWidth;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _isFullWidth = isFullWidth$1;

		var _isHalfWidth = isHalfWidth$1;

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function isVariableWidth(str) {
		  (0, _assertString.default)(str);
		  return _isFullWidth.fullWidth.test(str) && _isHalfWidth.halfWidth.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isVariableWidth$1, isVariableWidth$1.exports));

	var isVariableWidth = /*@__PURE__*/getDefaultExportFromCjs(isVariableWidth$1.exports);

	var isMultibyte$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isMultibyte;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/* eslint-disable no-control-regex */
		var multibyte = /[^\x00-\x7F]/;
		/* eslint-enable no-control-regex */

		function isMultibyte(str) {
		  (0, _assertString.default)(str);
		  return multibyte.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isMultibyte$1, isMultibyte$1.exports));

	var isMultibyte = /*@__PURE__*/getDefaultExportFromCjs(isMultibyte$1.exports);

	var isSemVer$1 = {exports: {}};

	var multilineRegex$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = multilineRegexp;

		/**
		 * Build RegExp object from an array
		 * of multiple/multi-line regexp parts
		 *
		 * @param {string[]} parts
		 * @param {string} flags
		 * @return {object} - RegExp object
		 */
		function multilineRegexp(parts, flags) {
		  var regexpAsStringLiteral = parts.join('');
		  return new RegExp(regexpAsStringLiteral, flags);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (multilineRegex$1, multilineRegex$1.exports));

	var multilineRegex = /*@__PURE__*/getDefaultExportFromCjs(multilineRegex$1.exports);

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isSemVer;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _multilineRegex = _interopRequireDefault(multilineRegex$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/**
		 * Regular Expression to match
		 * semantic versioning (SemVer)
		 * built from multi-line, multi-parts regexp
		 * Reference: https://semver.org/
		 */
		var semanticVersioningRegex = (0, _multilineRegex.default)(['^(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)', '(?:-((?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-z-][0-9a-z-]*))*))', '?(?:\\+([0-9a-z-]+(?:\\.[0-9a-z-]+)*))?$'], 'i');

		function isSemVer(str) {
		  (0, _assertString.default)(str);
		  return semanticVersioningRegex.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isSemVer$1, isSemVer$1.exports));

	var isSemVer = /*@__PURE__*/getDefaultExportFromCjs(isSemVer$1.exports);

	var isSurrogatePair$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isSurrogatePair;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

		function isSurrogatePair(str) {
		  (0, _assertString.default)(str);
		  return surrogatePair.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isSurrogatePair$1, isSurrogatePair$1.exports));

	var isSurrogatePair = /*@__PURE__*/getDefaultExportFromCjs(isSurrogatePair$1.exports);

	var isDecimal$1 = {exports: {}};

	var includes$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = void 0;

		var includes = function includes(arr, val) {
		  return arr.some(function (arrVal) {
		    return val === arrVal;
		  });
		};

		var _default = includes;
		exports.default = _default;
		module.exports = exports.default;
		module.exports.default = exports.default;
	} (includes$1, includes$1.exports));

	var includes = /*@__PURE__*/getDefaultExportFromCjs(includes$1.exports);

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isDecimal;

		var _merge = _interopRequireDefault(merge$1.exports);

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _includes = _interopRequireDefault(includes$1.exports);

		var _alpha = alpha$1;

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function decimalRegExp(options) {
		  var regExp = new RegExp("^[-+]?([0-9]+)?(\\".concat(_alpha.decimal[options.locale], "[0-9]{").concat(options.decimal_digits, "})").concat(options.force_decimal ? '' : '?', "$"));
		  return regExp;
		}

		var default_decimal_options = {
		  force_decimal: false,
		  decimal_digits: '1,',
		  locale: 'en-US'
		};
		var blacklist = ['', '-', '+'];

		function isDecimal(str, options) {
		  (0, _assertString.default)(str);
		  options = (0, _merge.default)(options, default_decimal_options);

		  if (options.locale in _alpha.decimal) {
		    return !(0, _includes.default)(blacklist, str.replace(/ /g, '')) && decimalRegExp(options).test(str);
		  }

		  throw new Error("Invalid locale '".concat(options.locale, "'"));
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isDecimal$1, isDecimal$1.exports));

	var isDecimal = /*@__PURE__*/getDefaultExportFromCjs(isDecimal$1.exports);

	var isHexadecimal$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isHexadecimal;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;

		function isHexadecimal(str) {
		  (0, _assertString.default)(str);
		  return hexadecimal.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isHexadecimal$1, isHexadecimal$1.exports));

	var isHexadecimal = /*@__PURE__*/getDefaultExportFromCjs(isHexadecimal$1.exports);

	var isOctal$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isOctal;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var octal = /^(0o)?[0-7]+$/i;

		function isOctal(str) {
		  (0, _assertString.default)(str);
		  return octal.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isOctal$1, isOctal$1.exports));

	var isOctal = /*@__PURE__*/getDefaultExportFromCjs(isOctal$1.exports);

	var isDivisibleBy$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isDivisibleBy;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _toFloat = _interopRequireDefault(toFloat$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function isDivisibleBy(str, num) {
		  (0, _assertString.default)(str);
		  return (0, _toFloat.default)(str) % parseInt(num, 10) === 0;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isDivisibleBy$1, isDivisibleBy$1.exports));

	var isDivisibleBy = /*@__PURE__*/getDefaultExportFromCjs(isDivisibleBy$1.exports);

	var isHexColor$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isHexColor;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;

		function isHexColor(str) {
		  (0, _assertString.default)(str);
		  return hexcolor.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isHexColor$1, isHexColor$1.exports));

	var isHexColor = /*@__PURE__*/getDefaultExportFromCjs(isHexColor$1.exports);

	var isRgbColor$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isRgbColor;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var rgbColor = /^rgb\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){2}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\)$/;
		var rgbaColor = /^rgba\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)$/;
		var rgbColorPercent = /^rgb\((([0-9]%|[1-9][0-9]%|100%),){2}([0-9]%|[1-9][0-9]%|100%)\)/;
		var rgbaColorPercent = /^rgba\((([0-9]%|[1-9][0-9]%|100%),){3}(0?\.\d|1(\.0)?|0(\.0)?)\)/;

		function isRgbColor(str) {
		  var includePercentValues = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
		  (0, _assertString.default)(str);

		  if (!includePercentValues) {
		    return rgbColor.test(str) || rgbaColor.test(str);
		  }

		  return rgbColor.test(str) || rgbaColor.test(str) || rgbColorPercent.test(str) || rgbaColorPercent.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isRgbColor$1, isRgbColor$1.exports));

	var isRgbColor = /*@__PURE__*/getDefaultExportFromCjs(isRgbColor$1.exports);

	var isHSL$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isHSL;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var hslComma = /^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(,(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}(,((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?))?\)$/i;
		var hslSpace = /^hsla?\(((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn)?(\s(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s?(\/\s((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s?)?\)$/i;

		function isHSL(str) {
		  (0, _assertString.default)(str); // Strip duplicate spaces before calling the validation regex (See  #1598 for more info)

		  var strippedStr = str.replace(/\s+/g, ' ').replace(/\s?(hsla?\(|\)|,)\s?/ig, '$1');

		  if (strippedStr.indexOf(',') !== -1) {
		    return hslComma.test(strippedStr);
		  }

		  return hslSpace.test(strippedStr);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isHSL$1, isHSL$1.exports));

	var isHSL = /*@__PURE__*/getDefaultExportFromCjs(isHSL$1.exports);

	var isISRC$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isISRC;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		// see http://isrc.ifpi.org/en/isrc-standard/code-syntax
		var isrc = /^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;

		function isISRC(str) {
		  (0, _assertString.default)(str);
		  return isrc.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isISRC$1, isISRC$1.exports));

	var isISRC = /*@__PURE__*/getDefaultExportFromCjs(isISRC$1.exports);

	var isIBAN$1 = {};

	"use strict";

	Object.defineProperty(isIBAN$1, "__esModule", {
	  value: true
	});
	var _default$5 = isIBAN$1.default = isIBAN;
	var locales_1$2 = isIBAN$1.locales = void 0;

	var _assertString$5 = _interopRequireDefault$5(assertString$1.exports);

	function _interopRequireDefault$5(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * List of country codes with
	 * corresponding IBAN regular expression
	 * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
	 */
	var ibanRegexThroughCountryCode = {
	  AD: /^(AD[0-9]{2})\d{8}[A-Z0-9]{12}$/,
	  AE: /^(AE[0-9]{2})\d{3}\d{16}$/,
	  AL: /^(AL[0-9]{2})\d{8}[A-Z0-9]{16}$/,
	  AT: /^(AT[0-9]{2})\d{16}$/,
	  AZ: /^(AZ[0-9]{2})[A-Z0-9]{4}\d{20}$/,
	  BA: /^(BA[0-9]{2})\d{16}$/,
	  BE: /^(BE[0-9]{2})\d{12}$/,
	  BG: /^(BG[0-9]{2})[A-Z]{4}\d{6}[A-Z0-9]{8}$/,
	  BH: /^(BH[0-9]{2})[A-Z]{4}[A-Z0-9]{14}$/,
	  BR: /^(BR[0-9]{2})\d{23}[A-Z]{1}[A-Z0-9]{1}$/,
	  BY: /^(BY[0-9]{2})[A-Z0-9]{4}\d{20}$/,
	  CH: /^(CH[0-9]{2})\d{5}[A-Z0-9]{12}$/,
	  CR: /^(CR[0-9]{2})\d{18}$/,
	  CY: /^(CY[0-9]{2})\d{8}[A-Z0-9]{16}$/,
	  CZ: /^(CZ[0-9]{2})\d{20}$/,
	  DE: /^(DE[0-9]{2})\d{18}$/,
	  DK: /^(DK[0-9]{2})\d{14}$/,
	  DO: /^(DO[0-9]{2})[A-Z]{4}\d{20}$/,
	  EE: /^(EE[0-9]{2})\d{16}$/,
	  EG: /^(EG[0-9]{2})\d{25}$/,
	  ES: /^(ES[0-9]{2})\d{20}$/,
	  FI: /^(FI[0-9]{2})\d{14}$/,
	  FO: /^(FO[0-9]{2})\d{14}$/,
	  FR: /^(FR[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
	  GB: /^(GB[0-9]{2})[A-Z]{4}\d{14}$/,
	  GE: /^(GE[0-9]{2})[A-Z0-9]{2}\d{16}$/,
	  GI: /^(GI[0-9]{2})[A-Z]{4}[A-Z0-9]{15}$/,
	  GL: /^(GL[0-9]{2})\d{14}$/,
	  GR: /^(GR[0-9]{2})\d{7}[A-Z0-9]{16}$/,
	  GT: /^(GT[0-9]{2})[A-Z0-9]{4}[A-Z0-9]{20}$/,
	  HR: /^(HR[0-9]{2})\d{17}$/,
	  HU: /^(HU[0-9]{2})\d{24}$/,
	  IE: /^(IE[0-9]{2})[A-Z0-9]{4}\d{14}$/,
	  IL: /^(IL[0-9]{2})\d{19}$/,
	  IQ: /^(IQ[0-9]{2})[A-Z]{4}\d{15}$/,
	  IR: /^(IR[0-9]{2})0\d{2}0\d{18}$/,
	  IS: /^(IS[0-9]{2})\d{22}$/,
	  IT: /^(IT[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
	  JO: /^(JO[0-9]{2})[A-Z]{4}\d{22}$/,
	  KW: /^(KW[0-9]{2})[A-Z]{4}[A-Z0-9]{22}$/,
	  KZ: /^(KZ[0-9]{2})\d{3}[A-Z0-9]{13}$/,
	  LB: /^(LB[0-9]{2})\d{4}[A-Z0-9]{20}$/,
	  LC: /^(LC[0-9]{2})[A-Z]{4}[A-Z0-9]{24}$/,
	  LI: /^(LI[0-9]{2})\d{5}[A-Z0-9]{12}$/,
	  LT: /^(LT[0-9]{2})\d{16}$/,
	  LU: /^(LU[0-9]{2})\d{3}[A-Z0-9]{13}$/,
	  LV: /^(LV[0-9]{2})[A-Z]{4}[A-Z0-9]{13}$/,
	  MC: /^(MC[0-9]{2})\d{10}[A-Z0-9]{11}\d{2}$/,
	  MD: /^(MD[0-9]{2})[A-Z0-9]{20}$/,
	  ME: /^(ME[0-9]{2})\d{18}$/,
	  MK: /^(MK[0-9]{2})\d{3}[A-Z0-9]{10}\d{2}$/,
	  MR: /^(MR[0-9]{2})\d{23}$/,
	  MT: /^(MT[0-9]{2})[A-Z]{4}\d{5}[A-Z0-9]{18}$/,
	  MU: /^(MU[0-9]{2})[A-Z]{4}\d{19}[A-Z]{3}$/,
	  MZ: /^(MZ[0-9]{2})\d{21}$/,
	  NL: /^(NL[0-9]{2})[A-Z]{4}\d{10}$/,
	  NO: /^(NO[0-9]{2})\d{11}$/,
	  PK: /^(PK[0-9]{2})[A-Z0-9]{4}\d{16}$/,
	  PL: /^(PL[0-9]{2})\d{24}$/,
	  PS: /^(PS[0-9]{2})[A-Z0-9]{4}\d{21}$/,
	  PT: /^(PT[0-9]{2})\d{21}$/,
	  QA: /^(QA[0-9]{2})[A-Z]{4}[A-Z0-9]{21}$/,
	  RO: /^(RO[0-9]{2})[A-Z]{4}[A-Z0-9]{16}$/,
	  RS: /^(RS[0-9]{2})\d{18}$/,
	  SA: /^(SA[0-9]{2})\d{2}[A-Z0-9]{18}$/,
	  SC: /^(SC[0-9]{2})[A-Z]{4}\d{20}[A-Z]{3}$/,
	  SE: /^(SE[0-9]{2})\d{20}$/,
	  SI: /^(SI[0-9]{2})\d{15}$/,
	  SK: /^(SK[0-9]{2})\d{20}$/,
	  SM: /^(SM[0-9]{2})[A-Z]{1}\d{10}[A-Z0-9]{12}$/,
	  SV: /^(SV[0-9]{2})[A-Z0-9]{4}\d{20}$/,
	  TL: /^(TL[0-9]{2})\d{19}$/,
	  TN: /^(TN[0-9]{2})\d{20}$/,
	  TR: /^(TR[0-9]{2})\d{5}[A-Z0-9]{17}$/,
	  UA: /^(UA[0-9]{2})\d{6}[A-Z0-9]{19}$/,
	  VA: /^(VA[0-9]{2})\d{18}$/,
	  VG: /^(VG[0-9]{2})[A-Z0-9]{4}\d{16}$/,
	  XK: /^(XK[0-9]{2})\d{16}$/
	};
	/**
	 * Check whether string has correct universal IBAN format
	 * The IBAN consists of up to 34 alphanumeric characters, as follows:
	 * Country Code using ISO 3166-1 alpha-2, two letters
	 * check digits, two digits and
	 * Basic Bank Account Number (BBAN), up to 30 alphanumeric characters.
	 * NOTE: Permitted IBAN characters are: digits [0-9] and the 26 latin alphabetic [A-Z]
	 *
	 * @param {string} str - string under validation
	 * @return {boolean}
	 */

	function hasValidIbanFormat(str) {
	  // Strip white spaces and hyphens
	  var strippedStr = str.replace(/[\s\-]+/gi, '').toUpperCase();
	  var isoCountryCode = strippedStr.slice(0, 2).toUpperCase();
	  return isoCountryCode in ibanRegexThroughCountryCode && ibanRegexThroughCountryCode[isoCountryCode].test(strippedStr);
	}
	/**
	   * Check whether string has valid IBAN Checksum
	   * by performing basic mod-97 operation and
	   * the remainder should equal 1
	   * -- Start by rearranging the IBAN by moving the four initial characters to the end of the string
	   * -- Replace each letter in the string with two digits, A -> 10, B = 11, Z = 35
	   * -- Interpret the string as a decimal integer and
	   * -- compute the remainder on division by 97 (mod 97)
	   * Reference: https://en.wikipedia.org/wiki/International_Bank_Account_Number
	   *
	   * @param {string} str
	   * @return {boolean}
	   */


	function hasValidIbanChecksum(str) {
	  var strippedStr = str.replace(/[^A-Z0-9]+/gi, '').toUpperCase(); // Keep only digits and A-Z latin alphabetic

	  var rearranged = strippedStr.slice(4) + strippedStr.slice(0, 4);
	  var alphaCapsReplacedWithDigits = rearranged.replace(/[A-Z]/g, function (char) {
	    return char.charCodeAt(0) - 55;
	  });
	  var remainder = alphaCapsReplacedWithDigits.match(/\d{1,7}/g).reduce(function (acc, value) {
	    return Number(acc + value) % 97;
	  }, '');
	  return remainder === 1;
	}

	function isIBAN(str) {
	  (0, _assertString$5.default)(str);
	  return hasValidIbanFormat(str) && hasValidIbanChecksum(str);
	}

	var locales$2 = Object.keys(ibanRegexThroughCountryCode);
	locales_1$2 = isIBAN$1.locales = locales$2;

	var isBIC$1 = {exports: {}};

	var isISO31661Alpha2$1 = {};

	"use strict";

	Object.defineProperty(isISO31661Alpha2$1, "__esModule", {
	  value: true
	});
	var _default$4 = isISO31661Alpha2$1.default = isISO31661Alpha2;
	var CountryCodes_1 = isISO31661Alpha2$1.CountryCodes = void 0;

	var _assertString$4 = _interopRequireDefault$4(assertString$1.exports);

	function _interopRequireDefault$4(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
	var validISO31661Alpha2CountriesCodes = new Set(['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW']);

	function isISO31661Alpha2(str) {
	  (0, _assertString$4.default)(str);
	  return validISO31661Alpha2CountriesCodes.has(str.toUpperCase());
	}

	var CountryCodes = validISO31661Alpha2CountriesCodes;
	CountryCodes_1 = isISO31661Alpha2$1.CountryCodes = CountryCodes;

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isBIC;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _isISO31661Alpha = isISO31661Alpha2$1;

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		// https://en.wikipedia.org/wiki/ISO_9362
		var isBICReg = /^[A-Za-z]{6}[A-Za-z0-9]{2}([A-Za-z0-9]{3})?$/;

		function isBIC(str) {
		  (0, _assertString.default)(str); // toUpperCase() should be removed when a new major version goes out that changes
		  // the regex to [A-Z] (per the spec).

		  if (!_isISO31661Alpha.CountryCodes.has(str.slice(4, 6).toUpperCase())) {
		    return false;
		  }

		  return isBICReg.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isBIC$1, isBIC$1.exports));

	var isBIC = /*@__PURE__*/getDefaultExportFromCjs(isBIC$1.exports);

	var isMD5$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isMD5;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var md5 = /^[a-f0-9]{32}$/;

		function isMD5(str) {
		  (0, _assertString.default)(str);
		  return md5.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isMD5$1, isMD5$1.exports));

	var isMD5 = /*@__PURE__*/getDefaultExportFromCjs(isMD5$1.exports);

	var isHash$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isHash;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var lengths = {
		  md5: 32,
		  md4: 32,
		  sha1: 40,
		  sha256: 64,
		  sha384: 96,
		  sha512: 128,
		  ripemd128: 32,
		  ripemd160: 40,
		  tiger128: 32,
		  tiger160: 40,
		  tiger192: 48,
		  crc32: 8,
		  crc32b: 8
		};

		function isHash(str, algorithm) {
		  (0, _assertString.default)(str);
		  var hash = new RegExp("^[a-fA-F0-9]{".concat(lengths[algorithm], "}$"));
		  return hash.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isHash$1, isHash$1.exports));

	var isHash = /*@__PURE__*/getDefaultExportFromCjs(isHash$1.exports);

	var isJWT$1 = {exports: {}};

	var isBase64$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isBase64;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _merge = _interopRequireDefault(merge$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var notBase64 = /[^A-Z0-9+\/=]/i;
		var urlSafeBase64 = /^[A-Z0-9_\-]*$/i;
		var defaultBase64Options = {
		  urlSafe: false
		};

		function isBase64(str, options) {
		  (0, _assertString.default)(str);
		  options = (0, _merge.default)(options, defaultBase64Options);
		  var len = str.length;

		  if (options.urlSafe) {
		    return urlSafeBase64.test(str);
		  }

		  if (len % 4 !== 0 || notBase64.test(str)) {
		    return false;
		  }

		  var firstPaddingChar = str.indexOf('=');
		  return firstPaddingChar === -1 || firstPaddingChar === len - 1 || firstPaddingChar === len - 2 && str[len - 1] === '=';
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isBase64$1, isBase64$1.exports));

	var isBase64 = /*@__PURE__*/getDefaultExportFromCjs(isBase64$1.exports);

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isJWT;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _isBase = _interopRequireDefault(isBase64$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function isJWT(str) {
		  (0, _assertString.default)(str);
		  var dotSplit = str.split('.');
		  var len = dotSplit.length;

		  if (len > 3 || len < 2) {
		    return false;
		  }

		  return dotSplit.reduce(function (acc, currElem) {
		    return acc && (0, _isBase.default)(currElem, {
		      urlSafe: true
		    });
		  }, true);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isJWT$1, isJWT$1.exports));

	var isJWT = /*@__PURE__*/getDefaultExportFromCjs(isJWT$1.exports);

	var isJSON$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isJSON;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _merge = _interopRequireDefault(merge$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

		var default_json_options = {
		  allow_primitives: false
		};

		function isJSON(str, options) {
		  (0, _assertString.default)(str);

		  try {
		    options = (0, _merge.default)(options, default_json_options);
		    var primitives = [];

		    if (options.allow_primitives) {
		      primitives = [null, false, true];
		    }

		    var obj = JSON.parse(str);
		    return primitives.includes(obj) || !!obj && _typeof(obj) === 'object';
		  } catch (e) {
		    /* ignore */
		  }

		  return false;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isJSON$1, isJSON$1.exports));

	var isJSON = /*@__PURE__*/getDefaultExportFromCjs(isJSON$1.exports);

	var isEmpty$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isEmpty;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _merge = _interopRequireDefault(merge$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var default_is_empty_options = {
		  ignore_whitespace: false
		};

		function isEmpty(str, options) {
		  (0, _assertString.default)(str);
		  options = (0, _merge.default)(options, default_is_empty_options);
		  return (options.ignore_whitespace ? str.trim().length : str.length) === 0;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isEmpty$1, isEmpty$1.exports));

	var isEmpty = /*@__PURE__*/getDefaultExportFromCjs(isEmpty$1.exports);

	var isLength$4 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isLength;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

		/* eslint-disable prefer-rest-params */
		function isLength(str, options) {
		  (0, _assertString.default)(str);
		  var min;
		  var max;

		  if (_typeof(options) === 'object') {
		    min = options.min || 0;
		    max = options.max;
		  } else {
		    // backwards compatibility: isLength(str, min [, max])
		    min = arguments[1] || 0;
		    max = arguments[2];
		  }

		  var surrogatePairs = str.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g) || [];
		  var len = str.length - surrogatePairs.length;
		  return len >= min && (typeof max === 'undefined' || len <= max);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isLength$4, isLength$4.exports));

	var isLength$3 = /*@__PURE__*/getDefaultExportFromCjs(isLength$4.exports);

	var isUUID$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isUUID;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var uuid = {
		  1: /^[0-9A-F]{8}-[0-9A-F]{4}-1[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
		  2: /^[0-9A-F]{8}-[0-9A-F]{4}-2[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
		  3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
		  4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
		  5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
		  all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
		};

		function isUUID(str, version) {
		  (0, _assertString.default)(str);
		  var pattern = uuid[![undefined, null].includes(version) ? version : 'all'];
		  return !!pattern && pattern.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isUUID$1, isUUID$1.exports));

	var isUUID = /*@__PURE__*/getDefaultExportFromCjs(isUUID$1.exports);

	var isMongoId$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isMongoId;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _isHexadecimal = _interopRequireDefault(isHexadecimal$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function isMongoId(str) {
		  (0, _assertString.default)(str);
		  return (0, _isHexadecimal.default)(str) && str.length === 24;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isMongoId$1, isMongoId$1.exports));

	var isMongoId = /*@__PURE__*/getDefaultExportFromCjs(isMongoId$1.exports);

	var isAfter$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isAfter;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _toDate = _interopRequireDefault(toDate$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function isAfter(str) {
		  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : String(new Date());
		  (0, _assertString.default)(str);
		  var comparison = (0, _toDate.default)(date);
		  var original = (0, _toDate.default)(str);
		  return !!(original && comparison && original > comparison);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isAfter$1, isAfter$1.exports));

	var isAfter = /*@__PURE__*/getDefaultExportFromCjs(isAfter$1.exports);

	var isBefore$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isBefore;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _toDate = _interopRequireDefault(toDate$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function isBefore(str) {
		  var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : String(new Date());
		  (0, _assertString.default)(str);
		  var comparison = (0, _toDate.default)(date);
		  var original = (0, _toDate.default)(str);
		  return !!(original && comparison && original < comparison);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isBefore$1, isBefore$1.exports));

	var isBefore = /*@__PURE__*/getDefaultExportFromCjs(isBefore$1.exports);

	var isIn$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isIn;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _toString = _interopRequireDefault(toString$2.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

		function isIn(str, options) {
		  (0, _assertString.default)(str);
		  var i;

		  if (Object.prototype.toString.call(options) === '[object Array]') {
		    var array = [];

		    for (i in options) {
		      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
		      // istanbul ignore else
		      if ({}.hasOwnProperty.call(options, i)) {
		        array[i] = (0, _toString.default)(options[i]);
		      }
		    }

		    return array.indexOf(str) >= 0;
		  } else if (_typeof(options) === 'object') {
		    return options.hasOwnProperty(str);
		  } else if (options && typeof options.indexOf === 'function') {
		    return options.indexOf(str) >= 0;
		  }

		  return false;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isIn$1, isIn$1.exports));

	var isIn = /*@__PURE__*/getDefaultExportFromCjs(isIn$1.exports);

	var isCreditCard$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isCreditCard;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/* eslint-disable max-len */
		var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14}|^(81[0-9]{14,17}))$/;
		/* eslint-enable max-len */

		function isCreditCard(str) {
		  (0, _assertString.default)(str);
		  var sanitized = str.replace(/[- ]+/g, '');

		  if (!creditCard.test(sanitized)) {
		    return false;
		  }

		  var sum = 0;
		  var digit;
		  var tmpNum;
		  var shouldDouble;

		  for (var i = sanitized.length - 1; i >= 0; i--) {
		    digit = sanitized.substring(i, i + 1);
		    tmpNum = parseInt(digit, 10);

		    if (shouldDouble) {
		      tmpNum *= 2;

		      if (tmpNum >= 10) {
		        sum += tmpNum % 10 + 1;
		      } else {
		        sum += tmpNum;
		      }
		    } else {
		      sum += tmpNum;
		    }

		    shouldDouble = !shouldDouble;
		  }

		  return !!(sum % 10 === 0 ? sanitized : false);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isCreditCard$1, isCreditCard$1.exports));

	var isCreditCard = /*@__PURE__*/getDefaultExportFromCjs(isCreditCard$1.exports);

	var isIdentityCard$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isIdentityCard;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _isInt = _interopRequireDefault(isInt$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var validators = {
		  PL: function PL(str) {
		    (0, _assertString.default)(str);
		    var weightOfDigits = {
		      1: 1,
		      2: 3,
		      3: 7,
		      4: 9,
		      5: 1,
		      6: 3,
		      7: 7,
		      8: 9,
		      9: 1,
		      10: 3,
		      11: 0
		    };

		    if (str != null && str.length === 11 && (0, _isInt.default)(str, {
		      allow_leading_zeroes: true
		    })) {
		      var digits = str.split('').slice(0, -1);
		      var sum = digits.reduce(function (acc, digit, index) {
		        return acc + Number(digit) * weightOfDigits[index + 1];
		      }, 0);
		      var modulo = sum % 10;
		      var lastDigit = Number(str.charAt(str.length - 1));

		      if (modulo === 0 && lastDigit === 0 || lastDigit === 10 - modulo) {
		        return true;
		      }
		    }

		    return false;
		  },
		  ES: function ES(str) {
		    (0, _assertString.default)(str);
		    var DNI = /^[0-9X-Z][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKE]$/;
		    var charsValue = {
		      X: 0,
		      Y: 1,
		      Z: 2
		    };
		    var controlDigits = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E']; // sanitize user input

		    var sanitized = str.trim().toUpperCase(); // validate the data structure

		    if (!DNI.test(sanitized)) {
		      return false;
		    } // validate the control digit


		    var number = sanitized.slice(0, -1).replace(/[X,Y,Z]/g, function (char) {
		      return charsValue[char];
		    });
		    return sanitized.endsWith(controlDigits[number % 23]);
		  },
		  FI: function FI(str) {
		    // https://dvv.fi/en/personal-identity-code#:~:text=control%20character%20for%20a-,personal,-identity%20code%20calculated
		    (0, _assertString.default)(str);

		    if (str.length !== 11) {
		      return false;
		    }

		    if (!str.match(/^\d{6}[\-A\+]\d{3}[0-9ABCDEFHJKLMNPRSTUVWXY]{1}$/)) {
		      return false;
		    }

		    var checkDigits = '0123456789ABCDEFHJKLMNPRSTUVWXY';
		    var idAsNumber = parseInt(str.slice(0, 6), 10) * 1000 + parseInt(str.slice(7, 10), 10);
		    var remainder = idAsNumber % 31;
		    var checkDigit = checkDigits[remainder];
		    return checkDigit === str.slice(10, 11);
		  },
		  IN: function IN(str) {
		    var DNI = /^[1-9]\d{3}\s?\d{4}\s?\d{4}$/; // multiplication table

		    var d = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]]; // permutation table

		    var p = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]]; // sanitize user input

		    var sanitized = str.trim(); // validate the data structure

		    if (!DNI.test(sanitized)) {
		      return false;
		    }

		    var c = 0;
		    var invertedArray = sanitized.replace(/\s/g, '').split('').map(Number).reverse();
		    invertedArray.forEach(function (val, i) {
		      c = d[c][p[i % 8][val]];
		    });
		    return c === 0;
		  },
		  IR: function IR(str) {
		    if (!str.match(/^\d{10}$/)) return false;
		    str = "0000".concat(str).substr(str.length - 6);
		    if (parseInt(str.substr(3, 6), 10) === 0) return false;
		    var lastNumber = parseInt(str.substr(9, 1), 10);
		    var sum = 0;

		    for (var i = 0; i < 9; i++) {
		      sum += parseInt(str.substr(i, 1), 10) * (10 - i);
		    }

		    sum %= 11;
		    return sum < 2 && lastNumber === sum || sum >= 2 && lastNumber === 11 - sum;
		  },
		  IT: function IT(str) {
		    if (str.length !== 9) return false;
		    if (str === 'CA00000AA') return false; // https://it.wikipedia.org/wiki/Carta_d%27identit%C3%A0_elettronica_italiana

		    return str.search(/C[A-Z][0-9]{5}[A-Z]{2}/i) > -1;
		  },
		  NO: function NO(str) {
		    var sanitized = str.trim();
		    if (isNaN(Number(sanitized))) return false;
		    if (sanitized.length !== 11) return false;
		    if (sanitized === '00000000000') return false; // https://no.wikipedia.org/wiki/F%C3%B8dselsnummer

		    var f = sanitized.split('').map(Number);
		    var k1 = (11 - (3 * f[0] + 7 * f[1] + 6 * f[2] + 1 * f[3] + 8 * f[4] + 9 * f[5] + 4 * f[6] + 5 * f[7] + 2 * f[8]) % 11) % 11;
		    var k2 = (11 - (5 * f[0] + 4 * f[1] + 3 * f[2] + 2 * f[3] + 7 * f[4] + 6 * f[5] + 5 * f[6] + 4 * f[7] + 3 * f[8] + 2 * k1) % 11) % 11;
		    if (k1 !== f[9] || k2 !== f[10]) return false;
		    return true;
		  },
		  TH: function TH(str) {
		    if (!str.match(/^[1-8]\d{12}$/)) return false; // validate check digit

		    var sum = 0;

		    for (var i = 0; i < 12; i++) {
		      sum += parseInt(str[i], 10) * (13 - i);
		    }

		    return str[12] === ((11 - sum % 11) % 10).toString();
		  },
		  LK: function LK(str) {
		    var old_nic = /^[1-9]\d{8}[vx]$/i;
		    var new_nic = /^[1-9]\d{11}$/i;
		    if (str.length === 10 && old_nic.test(str)) return true;else if (str.length === 12 && new_nic.test(str)) return true;
		    return false;
		  },
		  'he-IL': function heIL(str) {
		    var DNI = /^\d{9}$/; // sanitize user input

		    var sanitized = str.trim(); // validate the data structure

		    if (!DNI.test(sanitized)) {
		      return false;
		    }

		    var id = sanitized;
		    var sum = 0,
		        incNum;

		    for (var i = 0; i < id.length; i++) {
		      incNum = Number(id[i]) * (i % 2 + 1); // Multiply number by 1 or 2

		      sum += incNum > 9 ? incNum - 9 : incNum; // Sum the digits up and add to total
		    }

		    return sum % 10 === 0;
		  },
		  'ar-LY': function arLY(str) {
		    // Libya National Identity Number NIN is 12 digits, the first digit is either 1 or 2
		    var NIN = /^(1|2)\d{11}$/; // sanitize user input

		    var sanitized = str.trim(); // validate the data structure

		    if (!NIN.test(sanitized)) {
		      return false;
		    }

		    return true;
		  },
		  'ar-TN': function arTN(str) {
		    var DNI = /^\d{8}$/; // sanitize user input

		    var sanitized = str.trim(); // validate the data structure

		    if (!DNI.test(sanitized)) {
		      return false;
		    }

		    return true;
		  },
		  'zh-CN': function zhCN(str) {
		    var provincesAndCities = ['11', // 北京
		    '12', // 天津
		    '13', // 河北
		    '14', // 山西
		    '15', // 内蒙古
		    '21', // 辽宁
		    '22', // 吉林
		    '23', // 黑龙江
		    '31', // 上海
		    '32', // 江苏
		    '33', // 浙江
		    '34', // 安徽
		    '35', // 福建
		    '36', // 江西
		    '37', // 山东
		    '41', // 河南
		    '42', // 湖北
		    '43', // 湖南
		    '44', // 广东
		    '45', // 广西
		    '46', // 海南
		    '50', // 重庆
		    '51', // 四川
		    '52', // 贵州
		    '53', // 云南
		    '54', // 西藏
		    '61', // 陕西
		    '62', // 甘肃
		    '63', // 青海
		    '64', // 宁夏
		    '65', // 新疆
		    '71', // 台湾
		    '81', // 香港
		    '82', // 澳门
		    '91' // 国外
		    ];
		    var powers = ['7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9', '10', '5', '8', '4', '2'];
		    var parityBit = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];

		    var checkAddressCode = function checkAddressCode(addressCode) {
		      return provincesAndCities.includes(addressCode);
		    };

		    var checkBirthDayCode = function checkBirthDayCode(birDayCode) {
		      var yyyy = parseInt(birDayCode.substring(0, 4), 10);
		      var mm = parseInt(birDayCode.substring(4, 6), 10);
		      var dd = parseInt(birDayCode.substring(6), 10);
		      var xdata = new Date(yyyy, mm - 1, dd);

		      if (xdata > new Date()) {
		        return false; // eslint-disable-next-line max-len
		      } else if (xdata.getFullYear() === yyyy && xdata.getMonth() === mm - 1 && xdata.getDate() === dd) {
		        return true;
		      }

		      return false;
		    };

		    var getParityBit = function getParityBit(idCardNo) {
		      var id17 = idCardNo.substring(0, 17);
		      var power = 0;

		      for (var i = 0; i < 17; i++) {
		        power += parseInt(id17.charAt(i), 10) * parseInt(powers[i], 10);
		      }

		      var mod = power % 11;
		      return parityBit[mod];
		    };

		    var checkParityBit = function checkParityBit(idCardNo) {
		      return getParityBit(idCardNo) === idCardNo.charAt(17).toUpperCase();
		    };

		    var check15IdCardNo = function check15IdCardNo(idCardNo) {
		      var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/.test(idCardNo);
		      if (!check) return false;
		      var addressCode = idCardNo.substring(0, 2);
		      check = checkAddressCode(addressCode);
		      if (!check) return false;
		      var birDayCode = "19".concat(idCardNo.substring(6, 12));
		      check = checkBirthDayCode(birDayCode);
		      if (!check) return false;
		      return true;
		    };

		    var check18IdCardNo = function check18IdCardNo(idCardNo) {
		      var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
		      if (!check) return false;
		      var addressCode = idCardNo.substring(0, 2);
		      check = checkAddressCode(addressCode);
		      if (!check) return false;
		      var birDayCode = idCardNo.substring(6, 14);
		      check = checkBirthDayCode(birDayCode);
		      if (!check) return false;
		      return checkParityBit(idCardNo);
		    };

		    var checkIdCardNo = function checkIdCardNo(idCardNo) {
		      var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
		      if (!check) return false;

		      if (idCardNo.length === 15) {
		        return check15IdCardNo(idCardNo);
		      }

		      return check18IdCardNo(idCardNo);
		    };

		    return checkIdCardNo(str);
		  },
		  'zh-TW': function zhTW(str) {
		    var ALPHABET_CODES = {
		      A: 10,
		      B: 11,
		      C: 12,
		      D: 13,
		      E: 14,
		      F: 15,
		      G: 16,
		      H: 17,
		      I: 34,
		      J: 18,
		      K: 19,
		      L: 20,
		      M: 21,
		      N: 22,
		      O: 35,
		      P: 23,
		      Q: 24,
		      R: 25,
		      S: 26,
		      T: 27,
		      U: 28,
		      V: 29,
		      W: 32,
		      X: 30,
		      Y: 31,
		      Z: 33
		    };
		    var sanitized = str.trim().toUpperCase();
		    if (!/^[A-Z][0-9]{9}$/.test(sanitized)) return false;
		    return Array.from(sanitized).reduce(function (sum, number, index) {
		      if (index === 0) {
		        var code = ALPHABET_CODES[number];
		        return code % 10 * 9 + Math.floor(code / 10);
		      }

		      if (index === 9) {
		        return (10 - sum % 10 - Number(number)) % 10 === 0;
		      }

		      return sum + Number(number) * (9 - index);
		    }, 0);
		  }
		};

		function isIdentityCard(str, locale) {
		  (0, _assertString.default)(str);

		  if (locale in validators) {
		    return validators[locale](str);
		  } else if (locale === 'any') {
		    for (var key in validators) {
		      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
		      // istanbul ignore else
		      if (validators.hasOwnProperty(key)) {
		        var validator = validators[key];

		        if (validator(str)) {
		          return true;
		        }
		      }
		    }

		    return false;
		  }

		  throw new Error("Invalid locale '".concat(locale, "'"));
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isIdentityCard$1, isIdentityCard$1.exports));

	var isIdentityCard = /*@__PURE__*/getDefaultExportFromCjs(isIdentityCard$1.exports);

	var isEAN$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isEAN;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/**
		 * The most commonly used EAN standard is
		 * the thirteen-digit EAN-13, while the
		 * less commonly used 8-digit EAN-8 barcode was
		 * introduced for use on small packages.
		 * Also EAN/UCC-14 is used for Grouping of individual
		 * trade items above unit level(Intermediate, Carton or Pallet).
		 * For more info about EAN-14 checkout: https://www.gtin.info/itf-14-barcodes/
		 * EAN consists of:
		 * GS1 prefix, manufacturer code, product code and check digit
		 * Reference: https://en.wikipedia.org/wiki/International_Article_Number
		 * Reference: https://www.gtin.info/
		 */

		/**
		 * Define EAN Lenghts; 8 for EAN-8; 13 for EAN-13; 14 for EAN-14
		 * and Regular Expression for valid EANs (EAN-8, EAN-13, EAN-14),
		 * with exact numberic matching of 8 or 13 or 14 digits [0-9]
		 */
		var LENGTH_EAN_8 = 8;
		var LENGTH_EAN_14 = 14;
		var validEanRegex = /^(\d{8}|\d{13}|\d{14})$/;
		/**
		 * Get position weight given:
		 * EAN length and digit index/position
		 *
		 * @param {number} length
		 * @param {number} index
		 * @return {number}
		 */

		function getPositionWeightThroughLengthAndIndex(length, index) {
		  if (length === LENGTH_EAN_8 || length === LENGTH_EAN_14) {
		    return index % 2 === 0 ? 3 : 1;
		  }

		  return index % 2 === 0 ? 1 : 3;
		}
		/**
		 * Calculate EAN Check Digit
		 * Reference: https://en.wikipedia.org/wiki/International_Article_Number#Calculation_of_checksum_digit
		 *
		 * @param {string} ean
		 * @return {number}
		 */


		function calculateCheckDigit(ean) {
		  var checksum = ean.slice(0, -1).split('').map(function (char, index) {
		    return Number(char) * getPositionWeightThroughLengthAndIndex(ean.length, index);
		  }).reduce(function (acc, partialSum) {
		    return acc + partialSum;
		  }, 0);
		  var remainder = 10 - checksum % 10;
		  return remainder < 10 ? remainder : 0;
		}
		/**
		 * Check if string is valid EAN:
		 * Matches EAN-8/EAN-13/EAN-14 regex
		 * Has valid check digit.
		 *
		 * @param {string} str
		 * @return {boolean}
		 */


		function isEAN(str) {
		  (0, _assertString.default)(str);
		  var actualCheckDigit = Number(str.slice(-1));
		  return validEanRegex.test(str) && actualCheckDigit === calculateCheckDigit(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isEAN$1, isEAN$1.exports));

	var isEAN = /*@__PURE__*/getDefaultExportFromCjs(isEAN$1.exports);

	var isISIN$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isISIN;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/; // this link details how the check digit is calculated:
		// https://www.isin.org/isin-format/. it is a little bit
		// odd in that it works with digits, not numbers. in order
		// to make only one pass through the ISIN characters, the
		// each alpha character is handled as 2 characters within
		// the loop.

		function isISIN(str) {
		  (0, _assertString.default)(str);

		  if (!isin.test(str)) {
		    return false;
		  }

		  var double = true;
		  var sum = 0; // convert values

		  for (var i = str.length - 2; i >= 0; i--) {
		    if (str[i] >= 'A' && str[i] <= 'Z') {
		      var value = str[i].charCodeAt(0) - 55;
		      var lo = value % 10;
		      var hi = Math.trunc(value / 10); // letters have two digits, so handle the low order
		      // and high order digits separately.

		      for (var _i = 0, _arr = [lo, hi]; _i < _arr.length; _i++) {
		        var digit = _arr[_i];

		        if (double) {
		          if (digit >= 5) {
		            sum += 1 + (digit - 5) * 2;
		          } else {
		            sum += digit * 2;
		          }
		        } else {
		          sum += digit;
		        }

		        double = !double;
		      }
		    } else {
		      var _digit = str[i].charCodeAt(0) - '0'.charCodeAt(0);

		      if (double) {
		        if (_digit >= 5) {
		          sum += 1 + (_digit - 5) * 2;
		        } else {
		          sum += _digit * 2;
		        }
		      } else {
		        sum += _digit;
		      }

		      double = !double;
		    }
		  }

		  var check = Math.trunc((sum + 9) / 10) * 10 - sum;
		  return +str[str.length - 1] === check;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isISIN$1, isISIN$1.exports));

	var isISIN = /*@__PURE__*/getDefaultExportFromCjs(isISIN$1.exports);

	var isISBN$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isISBN;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var isbn10Maybe = /^(?:[0-9]{9}X|[0-9]{10})$/;
		var isbn13Maybe = /^(?:[0-9]{13})$/;
		var factor = [1, 3];

		function isISBN(str) {
		  var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
		  (0, _assertString.default)(str);
		  version = String(version);

		  if (!version) {
		    return isISBN(str, 10) || isISBN(str, 13);
		  }

		  var sanitized = str.replace(/[\s-]+/g, '');
		  var checksum = 0;
		  var i;

		  if (version === '10') {
		    if (!isbn10Maybe.test(sanitized)) {
		      return false;
		    }

		    for (i = 0; i < 9; i++) {
		      checksum += (i + 1) * sanitized.charAt(i);
		    }

		    if (sanitized.charAt(9) === 'X') {
		      checksum += 10 * 10;
		    } else {
		      checksum += 10 * sanitized.charAt(9);
		    }

		    if (checksum % 11 === 0) {
		      return !!sanitized;
		    }
		  } else if (version === '13') {
		    if (!isbn13Maybe.test(sanitized)) {
		      return false;
		    }

		    for (i = 0; i < 12; i++) {
		      checksum += factor[i % 2] * sanitized.charAt(i);
		    }

		    if (sanitized.charAt(12) - (10 - checksum % 10) % 10 === 0) {
		      return !!sanitized;
		    }
		  }

		  return false;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isISBN$1, isISBN$1.exports));

	var isISBN = /*@__PURE__*/getDefaultExportFromCjs(isISBN$1.exports);

	var isISSN$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isISSN;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var issn = '^\\d{4}-?\\d{3}[\\dX]$';

		function isISSN(str) {
		  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		  (0, _assertString.default)(str);
		  var testIssn = issn;
		  testIssn = options.require_hyphen ? testIssn.replace('?', '') : testIssn;
		  testIssn = options.case_sensitive ? new RegExp(testIssn) : new RegExp(testIssn, 'i');

		  if (!testIssn.test(str)) {
		    return false;
		  }

		  var digits = str.replace('-', '').toUpperCase();
		  var checksum = 0;

		  for (var i = 0; i < digits.length; i++) {
		    var digit = digits[i];
		    checksum += (digit === 'X' ? 10 : +digit) * (8 - i);
		  }

		  return checksum % 11 === 0;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isISSN$1, isISSN$1.exports));

	var isISSN = /*@__PURE__*/getDefaultExportFromCjs(isISSN$1.exports);

	var isTaxID$1 = {exports: {}};

	var algorithms = {};

	"use strict";

	Object.defineProperty(algorithms, "__esModule", {
	  value: true
	});
	var iso7064Check_1 = algorithms.iso7064Check = iso7064Check;
	var luhnCheck_1 = algorithms.luhnCheck = luhnCheck;
	var reverseMultiplyAndSum_1 = algorithms.reverseMultiplyAndSum = reverseMultiplyAndSum;
	var verhoeffCheck_1 = algorithms.verhoeffCheck = verhoeffCheck;

	/**
	 * Algorithmic validation functions
	 * May be used as is or implemented in the workflow of other validators.
	 */

	/*
	 * ISO 7064 validation function
	 * Called with a string of numbers (incl. check digit)
	 * to validate according to ISO 7064 (MOD 11, 10).
	 */
	function iso7064Check(str) {
	  var checkvalue = 10;

	  for (var i = 0; i < str.length - 1; i++) {
	    checkvalue = (parseInt(str[i], 10) + checkvalue) % 10 === 0 ? 10 * 2 % 11 : (parseInt(str[i], 10) + checkvalue) % 10 * 2 % 11;
	  }

	  checkvalue = checkvalue === 1 ? 0 : 11 - checkvalue;
	  return checkvalue === parseInt(str[10], 10);
	}
	/*
	 * Luhn (mod 10) validation function
	 * Called with a string of numbers (incl. check digit)
	 * to validate according to the Luhn algorithm.
	 */


	function luhnCheck(str) {
	  var checksum = 0;
	  var second = false;

	  for (var i = str.length - 1; i >= 0; i--) {
	    if (second) {
	      var product = parseInt(str[i], 10) * 2;

	      if (product > 9) {
	        // sum digits of product and add to checksum
	        checksum += product.toString().split('').map(function (a) {
	          return parseInt(a, 10);
	        }).reduce(function (a, b) {
	          return a + b;
	        }, 0);
	      } else {
	        checksum += product;
	      }
	    } else {
	      checksum += parseInt(str[i], 10);
	    }

	    second = !second;
	  }

	  return checksum % 10 === 0;
	}
	/*
	 * Reverse TIN multiplication and summation helper function
	 * Called with an array of single-digit integers and a base multiplier
	 * to calculate the sum of the digits multiplied in reverse.
	 * Normally used in variations of MOD 11 algorithmic checks.
	 */


	function reverseMultiplyAndSum(digits, base) {
	  var total = 0;

	  for (var i = 0; i < digits.length; i++) {
	    total += digits[i] * (base - i);
	  }

	  return total;
	}
	/*
	 * Verhoeff validation helper function
	 * Called with a string of numbers
	 * to validate according to the Verhoeff algorithm.
	 */


	function verhoeffCheck(str) {
	  var d_table = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 2, 3, 4, 0, 6, 7, 8, 9, 5], [2, 3, 4, 0, 1, 7, 8, 9, 5, 6], [3, 4, 0, 1, 2, 8, 9, 5, 6, 7], [4, 0, 1, 2, 3, 9, 5, 6, 7, 8], [5, 9, 8, 7, 6, 0, 4, 3, 2, 1], [6, 5, 9, 8, 7, 1, 0, 4, 3, 2], [7, 6, 5, 9, 8, 2, 1, 0, 4, 3], [8, 7, 6, 5, 9, 3, 2, 1, 0, 4], [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]];
	  var p_table = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 5, 7, 6, 2, 8, 3, 0, 9, 4], [5, 8, 0, 3, 7, 9, 6, 1, 4, 2], [8, 9, 1, 6, 0, 4, 3, 5, 2, 7], [9, 4, 5, 3, 1, 2, 6, 8, 7, 0], [4, 2, 8, 6, 5, 7, 3, 9, 0, 1], [2, 7, 9, 3, 8, 0, 6, 4, 1, 5], [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]]; // Copy (to prevent replacement) and reverse

	  var str_copy = str.split('').reverse().join('');
	  var checksum = 0;

	  for (var i = 0; i < str_copy.length; i++) {
	    checksum = d_table[checksum][p_table[i % 8][parseInt(str_copy[i], 10)]];
	  }

	  return checksum === 0;
	}

	(function (module, exports) {
		"use strict";

		function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isTaxID;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var algorithms$1 = _interopRequireWildcard(algorithms);

		var _isDate = _interopRequireDefault(isDate$1.exports);

		function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

		function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

		function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

		function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

		function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

		function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

		/**
		 * TIN Validation
		 * Validates Tax Identification Numbers (TINs) from the US, EU member states and the United Kingdom.
		 *
		 * EU-UK:
		 * National TIN validity is calculated using public algorithms as made available by DG TAXUD.
		 *
		 * See `https://ec.europa.eu/taxation_customs/tin/specs/FS-TIN%20Algorithms-Public.docx` for more information.
		 *
		 * US:
		 * An Employer Identification Number (EIN), also known as a Federal Tax Identification Number,
		 *  is used to identify a business entity.
		 *
		 * NOTES:
		 *  - Prefix 47 is being reserved for future use
		 *  - Prefixes 26, 27, 45, 46 and 47 were previously assigned by the Philadelphia campus.
		 *
		 * See `http://www.irs.gov/Businesses/Small-Businesses-&-Self-Employed/How-EINs-are-Assigned-and-Valid-EIN-Prefixes`
		 * for more information.
		 */
		// Locale functions

		/*
		 * bg-BG validation function
		 * (Edinen graždanski nomer (EGN/ЕГН), persons only)
		 * Checks if birth date (first six digits) is valid and calculates check (last) digit
		 */
		function bgBgCheck(tin) {
		  // Extract full year, normalize month and check birth date validity
		  var century_year = tin.slice(0, 2);
		  var month = parseInt(tin.slice(2, 4), 10);

		  if (month > 40) {
		    month -= 40;
		    century_year = "20".concat(century_year);
		  } else if (month > 20) {
		    month -= 20;
		    century_year = "18".concat(century_year);
		  } else {
		    century_year = "19".concat(century_year);
		  }

		  if (month < 10) {
		    month = "0".concat(month);
		  }

		  var date = "".concat(century_year, "/").concat(month, "/").concat(tin.slice(4, 6));

		  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
		    return false;
		  } // split digits into an array for further processing


		  var digits = tin.split('').map(function (a) {
		    return parseInt(a, 10);
		  }); // Calculate checksum by multiplying digits with fixed values

		  var multip_lookup = [2, 4, 8, 5, 10, 9, 7, 3, 6];
		  var checksum = 0;

		  for (var i = 0; i < multip_lookup.length; i++) {
		    checksum += digits[i] * multip_lookup[i];
		  }

		  checksum = checksum % 11 === 10 ? 0 : checksum % 11;
		  return checksum === digits[9];
		}
		/*
		 * cs-CZ validation function
		 * (Rodné číslo (RČ), persons only)
		 * Checks if birth date (first six digits) is valid and divisibility by 11
		 * Material not in DG TAXUD document sourced from:
		 * -`https://lorenc.info/3MA381/overeni-spravnosti-rodneho-cisla.htm`
		 * -`https://www.mvcr.cz/clanek/rady-a-sluzby-dokumenty-rodne-cislo.aspx`
		 */


		function csCzCheck(tin) {
		  tin = tin.replace(/\W/, ''); // Extract full year from TIN length

		  var full_year = parseInt(tin.slice(0, 2), 10);

		  if (tin.length === 10) {
		    if (full_year < 54) {
		      full_year = "20".concat(full_year);
		    } else {
		      full_year = "19".concat(full_year);
		    }
		  } else {
		    if (tin.slice(6) === '000') {
		      return false;
		    } // Three-zero serial not assigned before 1954


		    if (full_year < 54) {
		      full_year = "19".concat(full_year);
		    } else {
		      return false; // No 18XX years seen in any of the resources
		    }
		  } // Add missing zero if needed


		  if (full_year.length === 3) {
		    full_year = [full_year.slice(0, 2), '0', full_year.slice(2)].join('');
		  } // Extract month from TIN and normalize


		  var month = parseInt(tin.slice(2, 4), 10);

		  if (month > 50) {
		    month -= 50;
		  }

		  if (month > 20) {
		    // Month-plus-twenty was only introduced in 2004
		    if (parseInt(full_year, 10) < 2004) {
		      return false;
		    }

		    month -= 20;
		  }

		  if (month < 10) {
		    month = "0".concat(month);
		  } // Check date validity


		  var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));

		  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
		    return false;
		  } // Verify divisibility by 11


		  if (tin.length === 10) {
		    if (parseInt(tin, 10) % 11 !== 0) {
		      // Some numbers up to and including 1985 are still valid if
		      // check (last) digit equals 0 and modulo of first 9 digits equals 10
		      var checkdigit = parseInt(tin.slice(0, 9), 10) % 11;

		      if (parseInt(full_year, 10) < 1986 && checkdigit === 10) {
		        if (parseInt(tin.slice(9), 10) !== 0) {
		          return false;
		        }
		      } else {
		        return false;
		      }
		    }
		  }

		  return true;
		}
		/*
		 * de-AT validation function
		 * (Abgabenkontonummer, persons/entities)
		 * Verify TIN validity by calling luhnCheck()
		 */


		function deAtCheck(tin) {
		  return algorithms$1.luhnCheck(tin);
		}
		/*
		 * de-DE validation function
		 * (Steueridentifikationsnummer (Steuer-IdNr.), persons only)
		 * Tests for single duplicate/triplicate value, then calculates ISO 7064 check (last) digit
		 * Partial implementation of spec (same result with both algorithms always)
		 */


		function deDeCheck(tin) {
		  // Split digits into an array for further processing
		  var digits = tin.split('').map(function (a) {
		    return parseInt(a, 10);
		  }); // Fill array with strings of number positions

		  var occurences = [];

		  for (var i = 0; i < digits.length - 1; i++) {
		    occurences.push('');

		    for (var j = 0; j < digits.length - 1; j++) {
		      if (digits[i] === digits[j]) {
		        occurences[i] += j;
		      }
		    }
		  } // Remove digits with one occurence and test for only one duplicate/triplicate


		  occurences = occurences.filter(function (a) {
		    return a.length > 1;
		  });

		  if (occurences.length !== 2 && occurences.length !== 3) {
		    return false;
		  } // In case of triplicate value only two digits are allowed next to each other


		  if (occurences[0].length === 3) {
		    var trip_locations = occurences[0].split('').map(function (a) {
		      return parseInt(a, 10);
		    });
		    var recurrent = 0; // Amount of neighbour occurences

		    for (var _i = 0; _i < trip_locations.length - 1; _i++) {
		      if (trip_locations[_i] + 1 === trip_locations[_i + 1]) {
		        recurrent += 1;
		      }
		    }

		    if (recurrent === 2) {
		      return false;
		    }
		  }

		  return algorithms$1.iso7064Check(tin);
		}
		/*
		 * dk-DK validation function
		 * (CPR-nummer (personnummer), persons only)
		 * Checks if birth date (first six digits) is valid and assigned to century (seventh) digit,
		 * and calculates check (last) digit
		 */


		function dkDkCheck(tin) {
		  tin = tin.replace(/\W/, ''); // Extract year, check if valid for given century digit and add century

		  var year = parseInt(tin.slice(4, 6), 10);
		  var century_digit = tin.slice(6, 7);

		  switch (century_digit) {
		    case '0':
		    case '1':
		    case '2':
		    case '3':
		      year = "19".concat(year);
		      break;

		    case '4':
		    case '9':
		      if (year < 37) {
		        year = "20".concat(year);
		      } else {
		        year = "19".concat(year);
		      }

		      break;

		    default:
		      if (year < 37) {
		        year = "20".concat(year);
		      } else if (year > 58) {
		        year = "18".concat(year);
		      } else {
		        return false;
		      }

		      break;
		  } // Add missing zero if needed


		  if (year.length === 3) {
		    year = [year.slice(0, 2), '0', year.slice(2)].join('');
		  } // Check date validity


		  var date = "".concat(year, "/").concat(tin.slice(2, 4), "/").concat(tin.slice(0, 2));

		  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
		    return false;
		  } // Split digits into an array for further processing


		  var digits = tin.split('').map(function (a) {
		    return parseInt(a, 10);
		  });
		  var checksum = 0;
		  var weight = 4; // Multiply by weight and add to checksum

		  for (var i = 0; i < 9; i++) {
		    checksum += digits[i] * weight;
		    weight -= 1;

		    if (weight === 1) {
		      weight = 7;
		    }
		  }

		  checksum %= 11;

		  if (checksum === 1) {
		    return false;
		  }

		  return checksum === 0 ? digits[9] === 0 : digits[9] === 11 - checksum;
		}
		/*
		 * el-CY validation function
		 * (Arithmos Forologikou Mitroou (AFM/ΑΦΜ), persons only)
		 * Verify TIN validity by calculating ASCII value of check (last) character
		 */


		function elCyCheck(tin) {
		  // split digits into an array for further processing
		  var digits = tin.slice(0, 8).split('').map(function (a) {
		    return parseInt(a, 10);
		  });
		  var checksum = 0; // add digits in even places

		  for (var i = 1; i < digits.length; i += 2) {
		    checksum += digits[i];
		  } // add digits in odd places


		  for (var _i2 = 0; _i2 < digits.length; _i2 += 2) {
		    if (digits[_i2] < 2) {
		      checksum += 1 - digits[_i2];
		    } else {
		      checksum += 2 * (digits[_i2] - 2) + 5;

		      if (digits[_i2] > 4) {
		        checksum += 2;
		      }
		    }
		  }

		  return String.fromCharCode(checksum % 26 + 65) === tin.charAt(8);
		}
		/*
		 * el-GR validation function
		 * (Arithmos Forologikou Mitroou (AFM/ΑΦΜ), persons/entities)
		 * Verify TIN validity by calculating check (last) digit
		 * Algorithm not in DG TAXUD document- sourced from:
		 * - `http://epixeirisi.gr/%CE%9A%CE%A1%CE%99%CE%A3%CE%99%CE%9C%CE%91-%CE%98%CE%95%CE%9C%CE%91%CE%A4%CE%91-%CE%A6%CE%9F%CE%A1%CE%9F%CE%9B%CE%9F%CE%93%CE%99%CE%91%CE%A3-%CE%9A%CE%91%CE%99-%CE%9B%CE%9F%CE%93%CE%99%CE%A3%CE%A4%CE%99%CE%9A%CE%97%CE%A3/23791/%CE%91%CF%81%CE%B9%CE%B8%CE%BC%CF%8C%CF%82-%CE%A6%CE%BF%CF%81%CE%BF%CE%BB%CE%BF%CE%B3%CE%B9%CE%BA%CE%BF%CF%8D-%CE%9C%CE%B7%CF%84%CF%81%CF%8E%CE%BF%CF%85`
		 */


		function elGrCheck(tin) {
		  // split digits into an array for further processing
		  var digits = tin.split('').map(function (a) {
		    return parseInt(a, 10);
		  });
		  var checksum = 0;

		  for (var i = 0; i < 8; i++) {
		    checksum += digits[i] * Math.pow(2, 8 - i);
		  }

		  return checksum % 11 % 10 === digits[8];
		}
		/*
		 * en-GB validation function (should go here if needed)
		 * (National Insurance Number (NINO) or Unique Taxpayer Reference (UTR),
		 * persons/entities respectively)
		 */

		/*
		 * en-IE validation function
		 * (Personal Public Service Number (PPS No), persons only)
		 * Verify TIN validity by calculating check (second to last) character
		 */


		function enIeCheck(tin) {
		  var checksum = algorithms$1.reverseMultiplyAndSum(tin.split('').slice(0, 7).map(function (a) {
		    return parseInt(a, 10);
		  }), 8);

		  if (tin.length === 9 && tin[8] !== 'W') {
		    checksum += (tin[8].charCodeAt(0) - 64) * 9;
		  }

		  checksum %= 23;

		  if (checksum === 0) {
		    return tin[7].toUpperCase() === 'W';
		  }

		  return tin[7].toUpperCase() === String.fromCharCode(64 + checksum);
		} // Valid US IRS campus prefixes


		var enUsCampusPrefix = {
		  andover: ['10', '12'],
		  atlanta: ['60', '67'],
		  austin: ['50', '53'],
		  brookhaven: ['01', '02', '03', '04', '05', '06', '11', '13', '14', '16', '21', '22', '23', '25', '34', '51', '52', '54', '55', '56', '57', '58', '59', '65'],
		  cincinnati: ['30', '32', '35', '36', '37', '38', '61'],
		  fresno: ['15', '24'],
		  internet: ['20', '26', '27', '45', '46', '47'],
		  kansas: ['40', '44'],
		  memphis: ['94', '95'],
		  ogden: ['80', '90'],
		  philadelphia: ['33', '39', '41', '42', '43', '46', '48', '62', '63', '64', '66', '68', '71', '72', '73', '74', '75', '76', '77', '81', '82', '83', '84', '85', '86', '87', '88', '91', '92', '93', '98', '99'],
		  sba: ['31']
		}; // Return an array of all US IRS campus prefixes

		function enUsGetPrefixes() {
		  var prefixes = [];

		  for (var location in enUsCampusPrefix) {
		    // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
		    // istanbul ignore else
		    if (enUsCampusPrefix.hasOwnProperty(location)) {
		      prefixes.push.apply(prefixes, _toConsumableArray(enUsCampusPrefix[location]));
		    }
		  }

		  return prefixes;
		}
		/*
		 * en-US validation function
		 * Verify that the TIN starts with a valid IRS campus prefix
		 */


		function enUsCheck(tin) {
		  return enUsGetPrefixes().indexOf(tin.substr(0, 2)) !== -1;
		}
		/*
		 * es-ES validation function
		 * (Documento Nacional de Identidad (DNI)
		 * or Número de Identificación de Extranjero (NIE), persons only)
		 * Verify TIN validity by calculating check (last) character
		 */


		function esEsCheck(tin) {
		  // Split characters into an array for further processing
		  var chars = tin.toUpperCase().split(''); // Replace initial letter if needed

		  if (isNaN(parseInt(chars[0], 10)) && chars.length > 1) {
		    var lead_replace = 0;

		    switch (chars[0]) {
		      case 'Y':
		        lead_replace = 1;
		        break;

		      case 'Z':
		        lead_replace = 2;
		        break;

		      default:
		    }

		    chars.splice(0, 1, lead_replace); // Fill with zeros if smaller than proper
		  } else {
		    while (chars.length < 9) {
		      chars.unshift(0);
		    }
		  } // Calculate checksum and check according to lookup


		  var lookup = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
		  chars = chars.join('');
		  var checksum = parseInt(chars.slice(0, 8), 10) % 23;
		  return chars[8] === lookup[checksum];
		}
		/*
		 * et-EE validation function
		 * (Isikukood (IK), persons only)
		 * Checks if birth date (century digit and six following) is valid and calculates check (last) digit
		 * Material not in DG TAXUD document sourced from:
		 * - `https://www.oecd.org/tax/automatic-exchange/crs-implementation-and-assistance/tax-identification-numbers/Estonia-TIN.pdf`
		 */


		function etEeCheck(tin) {
		  // Extract year and add century
		  var full_year = tin.slice(1, 3);
		  var century_digit = tin.slice(0, 1);

		  switch (century_digit) {
		    case '1':
		    case '2':
		      full_year = "18".concat(full_year);
		      break;

		    case '3':
		    case '4':
		      full_year = "19".concat(full_year);
		      break;

		    default:
		      full_year = "20".concat(full_year);
		      break;
		  } // Check date validity


		  var date = "".concat(full_year, "/").concat(tin.slice(3, 5), "/").concat(tin.slice(5, 7));

		  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
		    return false;
		  } // Split digits into an array for further processing


		  var digits = tin.split('').map(function (a) {
		    return parseInt(a, 10);
		  });
		  var checksum = 0;
		  var weight = 1; // Multiply by weight and add to checksum

		  for (var i = 0; i < 10; i++) {
		    checksum += digits[i] * weight;
		    weight += 1;

		    if (weight === 10) {
		      weight = 1;
		    }
		  } // Do again if modulo 11 of checksum is 10


		  if (checksum % 11 === 10) {
		    checksum = 0;
		    weight = 3;

		    for (var _i3 = 0; _i3 < 10; _i3++) {
		      checksum += digits[_i3] * weight;
		      weight += 1;

		      if (weight === 10) {
		        weight = 1;
		      }
		    }

		    if (checksum % 11 === 10) {
		      return digits[10] === 0;
		    }
		  }

		  return checksum % 11 === digits[10];
		}
		/*
		 * fi-FI validation function
		 * (Henkilötunnus (HETU), persons only)
		 * Checks if birth date (first six digits plus century symbol) is valid
		 * and calculates check (last) digit
		 */


		function fiFiCheck(tin) {
		  // Extract year and add century
		  var full_year = tin.slice(4, 6);
		  var century_symbol = tin.slice(6, 7);

		  switch (century_symbol) {
		    case '+':
		      full_year = "18".concat(full_year);
		      break;

		    case '-':
		      full_year = "19".concat(full_year);
		      break;

		    default:
		      full_year = "20".concat(full_year);
		      break;
		  } // Check date validity


		  var date = "".concat(full_year, "/").concat(tin.slice(2, 4), "/").concat(tin.slice(0, 2));

		  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
		    return false;
		  } // Calculate check character


		  var checksum = parseInt(tin.slice(0, 6) + tin.slice(7, 10), 10) % 31;

		  if (checksum < 10) {
		    return checksum === parseInt(tin.slice(10), 10);
		  }

		  checksum -= 10;
		  var letters_lookup = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y'];
		  return letters_lookup[checksum] === tin.slice(10);
		}
		/*
		 * fr/nl-BE validation function
		 * (Numéro national (N.N.), persons only)
		 * Checks if birth date (first six digits) is valid and calculates check (last two) digits
		 */


		function frBeCheck(tin) {
		  // Zero month/day value is acceptable
		  if (tin.slice(2, 4) !== '00' || tin.slice(4, 6) !== '00') {
		    // Extract date from first six digits of TIN
		    var date = "".concat(tin.slice(0, 2), "/").concat(tin.slice(2, 4), "/").concat(tin.slice(4, 6));

		    if (!(0, _isDate.default)(date, 'YY/MM/DD')) {
		      return false;
		    }
		  }

		  var checksum = 97 - parseInt(tin.slice(0, 9), 10) % 97;
		  var checkdigits = parseInt(tin.slice(9, 11), 10);

		  if (checksum !== checkdigits) {
		    checksum = 97 - parseInt("2".concat(tin.slice(0, 9)), 10) % 97;

		    if (checksum !== checkdigits) {
		      return false;
		    }
		  }

		  return true;
		}
		/*
		 * fr-FR validation function
		 * (Numéro fiscal de référence (numéro SPI), persons only)
		 * Verify TIN validity by calculating check (last three) digits
		 */


		function frFrCheck(tin) {
		  tin = tin.replace(/\s/g, '');
		  var checksum = parseInt(tin.slice(0, 10), 10) % 511;
		  var checkdigits = parseInt(tin.slice(10, 13), 10);
		  return checksum === checkdigits;
		}
		/*
		 * fr/lb-LU validation function
		 * (numéro d’identification personnelle, persons only)
		 * Verify birth date validity and run Luhn and Verhoeff checks
		 */


		function frLuCheck(tin) {
		  // Extract date and check validity
		  var date = "".concat(tin.slice(0, 4), "/").concat(tin.slice(4, 6), "/").concat(tin.slice(6, 8));

		  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
		    return false;
		  } // Run Luhn check


		  if (!algorithms$1.luhnCheck(tin.slice(0, 12))) {
		    return false;
		  } // Remove Luhn check digit and run Verhoeff check


		  return algorithms$1.verhoeffCheck("".concat(tin.slice(0, 11)).concat(tin[12]));
		}
		/*
		 * hr-HR validation function
		 * (Osobni identifikacijski broj (OIB), persons/entities)
		 * Verify TIN validity by calling iso7064Check(digits)
		 */


		function hrHrCheck(tin) {
		  return algorithms$1.iso7064Check(tin);
		}
		/*
		 * hu-HU validation function
		 * (Adóazonosító jel, persons only)
		 * Verify TIN validity by calculating check (last) digit
		 */


		function huHuCheck(tin) {
		  // split digits into an array for further processing
		  var digits = tin.split('').map(function (a) {
		    return parseInt(a, 10);
		  });
		  var checksum = 8;

		  for (var i = 1; i < 9; i++) {
		    checksum += digits[i] * (i + 1);
		  }

		  return checksum % 11 === digits[9];
		}
		/*
		 * lt-LT validation function (should go here if needed)
		 * (Asmens kodas, persons/entities respectively)
		 * Current validation check is alias of etEeCheck- same format applies
		 */

		/*
		 * it-IT first/last name validity check
		 * Accepts it-IT TIN-encoded names as a three-element character array and checks their validity
		 * Due to lack of clarity between resources ("Are only Italian consonants used?
		 * What happens if a person has X in their name?" etc.) only two test conditions
		 * have been implemented:
		 * Vowels may only be followed by other vowels or an X character
		 * and X characters after vowels may only be followed by other X characters.
		 */


		function itItNameCheck(name) {
		  // true at the first occurence of a vowel
		  var vowelflag = false; // true at the first occurence of an X AFTER vowel
		  // (to properly handle last names with X as consonant)

		  var xflag = false;

		  for (var i = 0; i < 3; i++) {
		    if (!vowelflag && /[AEIOU]/.test(name[i])) {
		      vowelflag = true;
		    } else if (!xflag && vowelflag && name[i] === 'X') {
		      xflag = true;
		    } else if (i > 0) {
		      if (vowelflag && !xflag) {
		        if (!/[AEIOU]/.test(name[i])) {
		          return false;
		        }
		      }

		      if (xflag) {
		        if (!/X/.test(name[i])) {
		          return false;
		        }
		      }
		    }
		  }

		  return true;
		}
		/*
		 * it-IT validation function
		 * (Codice fiscale (TIN-IT), persons only)
		 * Verify name, birth date and codice catastale validity
		 * and calculate check character.
		 * Material not in DG-TAXUD document sourced from:
		 * `https://en.wikipedia.org/wiki/Italian_fiscal_code`
		 */


		function itItCheck(tin) {
		  // Capitalize and split characters into an array for further processing
		  var chars = tin.toUpperCase().split(''); // Check first and last name validity calling itItNameCheck()

		  if (!itItNameCheck(chars.slice(0, 3))) {
		    return false;
		  }

		  if (!itItNameCheck(chars.slice(3, 6))) {
		    return false;
		  } // Convert letters in number spaces back to numbers if any


		  var number_locations = [6, 7, 9, 10, 12, 13, 14];
		  var number_replace = {
		    L: '0',
		    M: '1',
		    N: '2',
		    P: '3',
		    Q: '4',
		    R: '5',
		    S: '6',
		    T: '7',
		    U: '8',
		    V: '9'
		  };

		  for (var _i4 = 0, _number_locations = number_locations; _i4 < _number_locations.length; _i4++) {
		    var i = _number_locations[_i4];

		    if (chars[i] in number_replace) {
		      chars.splice(i, 1, number_replace[chars[i]]);
		    }
		  } // Extract month and day, and check date validity


		  var month_replace = {
		    A: '01',
		    B: '02',
		    C: '03',
		    D: '04',
		    E: '05',
		    H: '06',
		    L: '07',
		    M: '08',
		    P: '09',
		    R: '10',
		    S: '11',
		    T: '12'
		  };
		  var month = month_replace[chars[8]];
		  var day = parseInt(chars[9] + chars[10], 10);

		  if (day > 40) {
		    day -= 40;
		  }

		  if (day < 10) {
		    day = "0".concat(day);
		  }

		  var date = "".concat(chars[6]).concat(chars[7], "/").concat(month, "/").concat(day);

		  if (!(0, _isDate.default)(date, 'YY/MM/DD')) {
		    return false;
		  } // Calculate check character by adding up even and odd characters as numbers


		  var checksum = 0;

		  for (var _i5 = 1; _i5 < chars.length - 1; _i5 += 2) {
		    var char_to_int = parseInt(chars[_i5], 10);

		    if (isNaN(char_to_int)) {
		      char_to_int = chars[_i5].charCodeAt(0) - 65;
		    }

		    checksum += char_to_int;
		  }

		  var odd_convert = {
		    // Maps of characters at odd places
		    A: 1,
		    B: 0,
		    C: 5,
		    D: 7,
		    E: 9,
		    F: 13,
		    G: 15,
		    H: 17,
		    I: 19,
		    J: 21,
		    K: 2,
		    L: 4,
		    M: 18,
		    N: 20,
		    O: 11,
		    P: 3,
		    Q: 6,
		    R: 8,
		    S: 12,
		    T: 14,
		    U: 16,
		    V: 10,
		    W: 22,
		    X: 25,
		    Y: 24,
		    Z: 23,
		    0: 1,
		    1: 0
		  };

		  for (var _i6 = 0; _i6 < chars.length - 1; _i6 += 2) {
		    var _char_to_int = 0;

		    if (chars[_i6] in odd_convert) {
		      _char_to_int = odd_convert[chars[_i6]];
		    } else {
		      var multiplier = parseInt(chars[_i6], 10);
		      _char_to_int = 2 * multiplier + 1;

		      if (multiplier > 4) {
		        _char_to_int += 2;
		      }
		    }

		    checksum += _char_to_int;
		  }

		  if (String.fromCharCode(65 + checksum % 26) !== chars[15]) {
		    return false;
		  }

		  return true;
		}
		/*
		 * lv-LV validation function
		 * (Personas kods (PK), persons only)
		 * Check validity of birth date and calculate check (last) digit
		 * Support only for old format numbers (not starting with '32', issued before 2017/07/01)
		 * Material not in DG TAXUD document sourced from:
		 * `https://boot.ritakafija.lv/forums/index.php?/topic/88314-personas-koda-algoritms-%C4%8Deksumma/`
		 */


		function lvLvCheck(tin) {
		  tin = tin.replace(/\W/, ''); // Extract date from TIN

		  var day = tin.slice(0, 2);

		  if (day !== '32') {
		    // No date/checksum check if new format
		    var month = tin.slice(2, 4);

		    if (month !== '00') {
		      // No date check if unknown month
		      var full_year = tin.slice(4, 6);

		      switch (tin[6]) {
		        case '0':
		          full_year = "18".concat(full_year);
		          break;

		        case '1':
		          full_year = "19".concat(full_year);
		          break;

		        default:
		          full_year = "20".concat(full_year);
		          break;
		      } // Check date validity


		      var date = "".concat(full_year, "/").concat(tin.slice(2, 4), "/").concat(day);

		      if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
		        return false;
		      }
		    } // Calculate check digit


		    var checksum = 1101;
		    var multip_lookup = [1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

		    for (var i = 0; i < tin.length - 1; i++) {
		      checksum -= parseInt(tin[i], 10) * multip_lookup[i];
		    }

		    return parseInt(tin[10], 10) === checksum % 11;
		  }

		  return true;
		}
		/*
		 * mt-MT validation function
		 * (Identity Card Number or Unique Taxpayer Reference, persons/entities)
		 * Verify Identity Card Number structure (no other tests found)
		 */


		function mtMtCheck(tin) {
		  if (tin.length !== 9) {
		    // No tests for UTR
		    var chars = tin.toUpperCase().split(''); // Fill with zeros if smaller than proper

		    while (chars.length < 8) {
		      chars.unshift(0);
		    } // Validate format according to last character


		    switch (tin[7]) {
		      case 'A':
		      case 'P':
		        if (parseInt(chars[6], 10) === 0) {
		          return false;
		        }

		        break;

		      default:
		        {
		          var first_part = parseInt(chars.join('').slice(0, 5), 10);

		          if (first_part > 32000) {
		            return false;
		          }

		          var second_part = parseInt(chars.join('').slice(5, 7), 10);

		          if (first_part === second_part) {
		            return false;
		          }
		        }
		    }
		  }

		  return true;
		}
		/*
		 * nl-NL validation function
		 * (Burgerservicenummer (BSN) or Rechtspersonen Samenwerkingsverbanden Informatie Nummer (RSIN),
		 * persons/entities respectively)
		 * Verify TIN validity by calculating check (last) digit (variant of MOD 11)
		 */


		function nlNlCheck(tin) {
		  return algorithms$1.reverseMultiplyAndSum(tin.split('').slice(0, 8).map(function (a) {
		    return parseInt(a, 10);
		  }), 9) % 11 === parseInt(tin[8], 10);
		}
		/*
		 * pl-PL validation function
		 * (Powszechny Elektroniczny System Ewidencji Ludności (PESEL)
		 * or Numer identyfikacji podatkowej (NIP), persons/entities)
		 * Verify TIN validity by validating birth date (PESEL) and calculating check (last) digit
		 */


		function plPlCheck(tin) {
		  // NIP
		  if (tin.length === 10) {
		    // Calculate last digit by multiplying with lookup
		    var lookup = [6, 5, 7, 2, 3, 4, 5, 6, 7];
		    var _checksum = 0;

		    for (var i = 0; i < lookup.length; i++) {
		      _checksum += parseInt(tin[i], 10) * lookup[i];
		    }

		    _checksum %= 11;

		    if (_checksum === 10) {
		      return false;
		    }

		    return _checksum === parseInt(tin[9], 10);
		  } // PESEL
		  // Extract full year using month


		  var full_year = tin.slice(0, 2);
		  var month = parseInt(tin.slice(2, 4), 10);

		  if (month > 80) {
		    full_year = "18".concat(full_year);
		    month -= 80;
		  } else if (month > 60) {
		    full_year = "22".concat(full_year);
		    month -= 60;
		  } else if (month > 40) {
		    full_year = "21".concat(full_year);
		    month -= 40;
		  } else if (month > 20) {
		    full_year = "20".concat(full_year);
		    month -= 20;
		  } else {
		    full_year = "19".concat(full_year);
		  } // Add leading zero to month if needed


		  if (month < 10) {
		    month = "0".concat(month);
		  } // Check date validity


		  var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));

		  if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
		    return false;
		  } // Calculate last digit by mulitplying with odd one-digit numbers except 5


		  var checksum = 0;
		  var multiplier = 1;

		  for (var _i7 = 0; _i7 < tin.length - 1; _i7++) {
		    checksum += parseInt(tin[_i7], 10) * multiplier % 10;
		    multiplier += 2;

		    if (multiplier > 10) {
		      multiplier = 1;
		    } else if (multiplier === 5) {
		      multiplier += 2;
		    }
		  }

		  checksum = 10 - checksum % 10;
		  return checksum === parseInt(tin[10], 10);
		}
		/*
		* pt-BR validation function
		* (Cadastro de Pessoas Físicas (CPF, persons)
		* Cadastro Nacional de Pessoas Jurídicas (CNPJ, entities)
		* Both inputs will be validated
		*/


		function ptBrCheck(tin) {
		  if (tin.length === 11) {
		    var _sum;

		    var remainder;
		    _sum = 0;
		    if ( // Reject known invalid CPFs
		    tin === '11111111111' || tin === '22222222222' || tin === '33333333333' || tin === '44444444444' || tin === '55555555555' || tin === '66666666666' || tin === '77777777777' || tin === '88888888888' || tin === '99999999999' || tin === '00000000000') return false;

		    for (var i = 1; i <= 9; i++) {
		      _sum += parseInt(tin.substring(i - 1, i), 10) * (11 - i);
		    }

		    remainder = _sum * 10 % 11;
		    if (remainder === 10) remainder = 0;
		    if (remainder !== parseInt(tin.substring(9, 10), 10)) return false;
		    _sum = 0;

		    for (var _i8 = 1; _i8 <= 10; _i8++) {
		      _sum += parseInt(tin.substring(_i8 - 1, _i8), 10) * (12 - _i8);
		    }

		    remainder = _sum * 10 % 11;
		    if (remainder === 10) remainder = 0;
		    if (remainder !== parseInt(tin.substring(10, 11), 10)) return false;
		    return true;
		  }

		  if ( // Reject know invalid CNPJs
		  tin === '00000000000000' || tin === '11111111111111' || tin === '22222222222222' || tin === '33333333333333' || tin === '44444444444444' || tin === '55555555555555' || tin === '66666666666666' || tin === '77777777777777' || tin === '88888888888888' || tin === '99999999999999') {
		    return false;
		  }

		  var length = tin.length - 2;
		  var identifiers = tin.substring(0, length);
		  var verificators = tin.substring(length);
		  var sum = 0;
		  var pos = length - 7;

		  for (var _i9 = length; _i9 >= 1; _i9--) {
		    sum += identifiers.charAt(length - _i9) * pos;
		    pos -= 1;

		    if (pos < 2) {
		      pos = 9;
		    }
		  }

		  var result = sum % 11 < 2 ? 0 : 11 - sum % 11;

		  if (result !== parseInt(verificators.charAt(0), 10)) {
		    return false;
		  }

		  length += 1;
		  identifiers = tin.substring(0, length);
		  sum = 0;
		  pos = length - 7;

		  for (var _i10 = length; _i10 >= 1; _i10--) {
		    sum += identifiers.charAt(length - _i10) * pos;
		    pos -= 1;

		    if (pos < 2) {
		      pos = 9;
		    }
		  }

		  result = sum % 11 < 2 ? 0 : 11 - sum % 11;

		  if (result !== parseInt(verificators.charAt(1), 10)) {
		    return false;
		  }

		  return true;
		}
		/*
		 * pt-PT validation function
		 * (Número de identificação fiscal (NIF), persons/entities)
		 * Verify TIN validity by calculating check (last) digit (variant of MOD 11)
		 */


		function ptPtCheck(tin) {
		  var checksum = 11 - algorithms$1.reverseMultiplyAndSum(tin.split('').slice(0, 8).map(function (a) {
		    return parseInt(a, 10);
		  }), 9) % 11;

		  if (checksum > 9) {
		    return parseInt(tin[8], 10) === 0;
		  }

		  return checksum === parseInt(tin[8], 10);
		}
		/*
		 * ro-RO validation function
		 * (Cod Numeric Personal (CNP) or Cod de înregistrare fiscală (CIF),
		 * persons only)
		 * Verify CNP validity by calculating check (last) digit (test not found for CIF)
		 * Material not in DG TAXUD document sourced from:
		 * `https://en.wikipedia.org/wiki/National_identification_number#Romania`
		 */


		function roRoCheck(tin) {
		  if (tin.slice(0, 4) !== '9000') {
		    // No test found for this format
		    // Extract full year using century digit if possible
		    var full_year = tin.slice(1, 3);

		    switch (tin[0]) {
		      case '1':
		      case '2':
		        full_year = "19".concat(full_year);
		        break;

		      case '3':
		      case '4':
		        full_year = "18".concat(full_year);
		        break;

		      case '5':
		      case '6':
		        full_year = "20".concat(full_year);
		        break;

		      default:
		    } // Check date validity


		    var date = "".concat(full_year, "/").concat(tin.slice(3, 5), "/").concat(tin.slice(5, 7));

		    if (date.length === 8) {
		      if (!(0, _isDate.default)(date, 'YY/MM/DD')) {
		        return false;
		      }
		    } else if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
		      return false;
		    } // Calculate check digit


		    var digits = tin.split('').map(function (a) {
		      return parseInt(a, 10);
		    });
		    var multipliers = [2, 7, 9, 1, 4, 6, 3, 5, 8, 2, 7, 9];
		    var checksum = 0;

		    for (var i = 0; i < multipliers.length; i++) {
		      checksum += digits[i] * multipliers[i];
		    }

		    if (checksum % 11 === 10) {
		      return digits[12] === 1;
		    }

		    return digits[12] === checksum % 11;
		  }

		  return true;
		}
		/*
		 * sk-SK validation function
		 * (Rodné číslo (RČ) or bezvýznamové identifikačné číslo (BIČ), persons only)
		 * Checks validity of pre-1954 birth numbers (rodné číslo) only
		 * Due to the introduction of the pseudo-random BIČ it is not possible to test
		 * post-1954 birth numbers without knowing whether they are BIČ or RČ beforehand
		 */


		function skSkCheck(tin) {
		  if (tin.length === 9) {
		    tin = tin.replace(/\W/, '');

		    if (tin.slice(6) === '000') {
		      return false;
		    } // Three-zero serial not assigned before 1954
		    // Extract full year from TIN length


		    var full_year = parseInt(tin.slice(0, 2), 10);

		    if (full_year > 53) {
		      return false;
		    }

		    if (full_year < 10) {
		      full_year = "190".concat(full_year);
		    } else {
		      full_year = "19".concat(full_year);
		    } // Extract month from TIN and normalize


		    var month = parseInt(tin.slice(2, 4), 10);

		    if (month > 50) {
		      month -= 50;
		    }

		    if (month < 10) {
		      month = "0".concat(month);
		    } // Check date validity


		    var date = "".concat(full_year, "/").concat(month, "/").concat(tin.slice(4, 6));

		    if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
		      return false;
		    }
		  }

		  return true;
		}
		/*
		 * sl-SI validation function
		 * (Davčna številka, persons/entities)
		 * Verify TIN validity by calculating check (last) digit (variant of MOD 11)
		 */


		function slSiCheck(tin) {
		  var checksum = 11 - algorithms$1.reverseMultiplyAndSum(tin.split('').slice(0, 7).map(function (a) {
		    return parseInt(a, 10);
		  }), 8) % 11;

		  if (checksum === 10) {
		    return parseInt(tin[7], 10) === 0;
		  }

		  return checksum === parseInt(tin[7], 10);
		}
		/*
		 * sv-SE validation function
		 * (Personnummer or samordningsnummer, persons only)
		 * Checks validity of birth date and calls luhnCheck() to validate check (last) digit
		 */


		function svSeCheck(tin) {
		  // Make copy of TIN and normalize to two-digit year form
		  var tin_copy = tin.slice(0);

		  if (tin.length > 11) {
		    tin_copy = tin_copy.slice(2);
		  } // Extract date of birth


		  var full_year = '';
		  var month = tin_copy.slice(2, 4);
		  var day = parseInt(tin_copy.slice(4, 6), 10);

		  if (tin.length > 11) {
		    full_year = tin.slice(0, 4);
		  } else {
		    full_year = tin.slice(0, 2);

		    if (tin.length === 11 && day < 60) {
		      // Extract full year from centenarian symbol
		      // Should work just fine until year 10000 or so
		      var current_year = new Date().getFullYear().toString();
		      var current_century = parseInt(current_year.slice(0, 2), 10);
		      current_year = parseInt(current_year, 10);

		      if (tin[6] === '-') {
		        if (parseInt("".concat(current_century).concat(full_year), 10) > current_year) {
		          full_year = "".concat(current_century - 1).concat(full_year);
		        } else {
		          full_year = "".concat(current_century).concat(full_year);
		        }
		      } else {
		        full_year = "".concat(current_century - 1).concat(full_year);

		        if (current_year - parseInt(full_year, 10) < 100) {
		          return false;
		        }
		      }
		    }
		  } // Normalize day and check date validity


		  if (day > 60) {
		    day -= 60;
		  }

		  if (day < 10) {
		    day = "0".concat(day);
		  }

		  var date = "".concat(full_year, "/").concat(month, "/").concat(day);

		  if (date.length === 8) {
		    if (!(0, _isDate.default)(date, 'YY/MM/DD')) {
		      return false;
		    }
		  } else if (!(0, _isDate.default)(date, 'YYYY/MM/DD')) {
		    return false;
		  }

		  return algorithms$1.luhnCheck(tin.replace(/\W/, ''));
		} // Locale lookup objects

		/*
		 * Tax id regex formats for various locales
		 *
		 * Where not explicitly specified in DG-TAXUD document both
		 * uppercase and lowercase letters are acceptable.
		 */


		var taxIdFormat = {
		  'bg-BG': /^\d{10}$/,
		  'cs-CZ': /^\d{6}\/{0,1}\d{3,4}$/,
		  'de-AT': /^\d{9}$/,
		  'de-DE': /^[1-9]\d{10}$/,
		  'dk-DK': /^\d{6}-{0,1}\d{4}$/,
		  'el-CY': /^[09]\d{7}[A-Z]$/,
		  'el-GR': /^([0-4]|[7-9])\d{8}$/,
		  'en-GB': /^\d{10}$|^(?!GB|NK|TN|ZZ)(?![DFIQUV])[A-Z](?![DFIQUVO])[A-Z]\d{6}[ABCD ]$/i,
		  'en-IE': /^\d{7}[A-W][A-IW]{0,1}$/i,
		  'en-US': /^\d{2}[- ]{0,1}\d{7}$/,
		  'es-ES': /^(\d{0,8}|[XYZKLM]\d{7})[A-HJ-NP-TV-Z]$/i,
		  'et-EE': /^[1-6]\d{6}(00[1-9]|0[1-9][0-9]|[1-6][0-9]{2}|70[0-9]|710)\d$/,
		  'fi-FI': /^\d{6}[-+A]\d{3}[0-9A-FHJ-NPR-Y]$/i,
		  'fr-BE': /^\d{11}$/,
		  'fr-FR': /^[0-3]\d{12}$|^[0-3]\d\s\d{2}(\s\d{3}){3}$/,
		  // Conforms both to official spec and provided example
		  'fr-LU': /^\d{13}$/,
		  'hr-HR': /^\d{11}$/,
		  'hu-HU': /^8\d{9}$/,
		  'it-IT': /^[A-Z]{6}[L-NP-V0-9]{2}[A-EHLMPRST][L-NP-V0-9]{2}[A-ILMZ][L-NP-V0-9]{3}[A-Z]$/i,
		  'lv-LV': /^\d{6}-{0,1}\d{5}$/,
		  // Conforms both to DG TAXUD spec and original research
		  'mt-MT': /^\d{3,7}[APMGLHBZ]$|^([1-8])\1\d{7}$/i,
		  'nl-NL': /^\d{9}$/,
		  'pl-PL': /^\d{10,11}$/,
		  'pt-BR': /(?:^\d{11}$)|(?:^\d{14}$)/,
		  'pt-PT': /^\d{9}$/,
		  'ro-RO': /^\d{13}$/,
		  'sk-SK': /^\d{6}\/{0,1}\d{3,4}$/,
		  'sl-SI': /^[1-9]\d{7}$/,
		  'sv-SE': /^(\d{6}[-+]{0,1}\d{4}|(18|19|20)\d{6}[-+]{0,1}\d{4})$/
		}; // taxIdFormat locale aliases

		taxIdFormat['lb-LU'] = taxIdFormat['fr-LU'];
		taxIdFormat['lt-LT'] = taxIdFormat['et-EE'];
		taxIdFormat['nl-BE'] = taxIdFormat['fr-BE']; // Algorithmic tax id check functions for various locales

		var taxIdCheck = {
		  'bg-BG': bgBgCheck,
		  'cs-CZ': csCzCheck,
		  'de-AT': deAtCheck,
		  'de-DE': deDeCheck,
		  'dk-DK': dkDkCheck,
		  'el-CY': elCyCheck,
		  'el-GR': elGrCheck,
		  'en-IE': enIeCheck,
		  'en-US': enUsCheck,
		  'es-ES': esEsCheck,
		  'et-EE': etEeCheck,
		  'fi-FI': fiFiCheck,
		  'fr-BE': frBeCheck,
		  'fr-FR': frFrCheck,
		  'fr-LU': frLuCheck,
		  'hr-HR': hrHrCheck,
		  'hu-HU': huHuCheck,
		  'it-IT': itItCheck,
		  'lv-LV': lvLvCheck,
		  'mt-MT': mtMtCheck,
		  'nl-NL': nlNlCheck,
		  'pl-PL': plPlCheck,
		  'pt-BR': ptBrCheck,
		  'pt-PT': ptPtCheck,
		  'ro-RO': roRoCheck,
		  'sk-SK': skSkCheck,
		  'sl-SI': slSiCheck,
		  'sv-SE': svSeCheck
		}; // taxIdCheck locale aliases

		taxIdCheck['lb-LU'] = taxIdCheck['fr-LU'];
		taxIdCheck['lt-LT'] = taxIdCheck['et-EE'];
		taxIdCheck['nl-BE'] = taxIdCheck['fr-BE']; // Regexes for locales where characters should be omitted before checking format

		var allsymbols = /[-\\\/!@#$%\^&\*\(\)\+\=\[\]]+/g;
		var sanitizeRegexes = {
		  'de-AT': allsymbols,
		  'de-DE': /[\/\\]/g,
		  'fr-BE': allsymbols
		}; // sanitizeRegexes locale aliases

		sanitizeRegexes['nl-BE'] = sanitizeRegexes['fr-BE'];
		/*
		 * Validator function
		 * Return true if the passed string is a valid tax identification number
		 * for the specified locale.
		 * Throw an error exception if the locale is not supported.
		 */

		function isTaxID(str) {
		  var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
		  (0, _assertString.default)(str); // Copy TIN to avoid replacement if sanitized

		  var strcopy = str.slice(0);

		  if (locale in taxIdFormat) {
		    if (locale in sanitizeRegexes) {
		      strcopy = strcopy.replace(sanitizeRegexes[locale], '');
		    }

		    if (!taxIdFormat[locale].test(strcopy)) {
		      return false;
		    }

		    if (locale in taxIdCheck) {
		      return taxIdCheck[locale](strcopy);
		    } // Fallthrough; not all locales have algorithmic checks


		    return true;
		  }

		  throw new Error("Invalid locale '".concat(locale, "'"));
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isTaxID$1, isTaxID$1.exports));

	var isTaxID = /*@__PURE__*/getDefaultExportFromCjs(isTaxID$1.exports);

	var isMobilePhone$1 = {};

	"use strict";

	Object.defineProperty(isMobilePhone$1, "__esModule", {
	  value: true
	});
	var _default$3 = isMobilePhone$1.default = isMobilePhone;
	var locales_1$1 = isMobilePhone$1.locales = void 0;

	var _assertString$3 = _interopRequireDefault$3(assertString$1.exports);

	function _interopRequireDefault$3(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/* eslint-disable max-len */
	var phones = {
	  'am-AM': /^(\+?374|0)((10|[9|7][0-9])\d{6}$|[2-4]\d{7}$)/,
	  'ar-AE': /^((\+?971)|0)?5[024568]\d{7}$/,
	  'ar-BH': /^(\+?973)?(3|6)\d{7}$/,
	  'ar-DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
	  'ar-LB': /^(\+?961)?((3|81)\d{6}|7\d{7})$/,
	  'ar-EG': /^((\+?20)|0)?1[0125]\d{8}$/,
	  'ar-IQ': /^(\+?964|0)?7[0-9]\d{8}$/,
	  'ar-JO': /^(\+?962|0)?7[789]\d{7}$/,
	  'ar-KW': /^(\+?965)[569]\d{7}$/,
	  'ar-LY': /^((\+?218)|0)?(9[1-6]\d{7}|[1-8]\d{7,9})$/,
	  'ar-MA': /^(?:(?:\+|00)212|0)[5-7]\d{8}$/,
	  'ar-OM': /^((\+|00)968)?(9[1-9])\d{6}$/,
	  'ar-PS': /^(\+?970|0)5[6|9](\d{7})$/,
	  'ar-SA': /^(!?(\+?966)|0)?5\d{8}$/,
	  'ar-SY': /^(!?(\+?963)|0)?9\d{8}$/,
	  'ar-TN': /^(\+?216)?[2459]\d{7}$/,
	  'az-AZ': /^(\+994|0)(5[015]|7[07]|99)\d{7}$/,
	  'bs-BA': /^((((\+|00)3876)|06))((([0-3]|[5-6])\d{6})|(4\d{7}))$/,
	  'be-BY': /^(\+?375)?(24|25|29|33|44)\d{7}$/,
	  'bg-BG': /^(\+?359|0)?8[789]\d{7}$/,
	  'bn-BD': /^(\+?880|0)1[13456789][0-9]{8}$/,
	  'ca-AD': /^(\+376)?[346]\d{5}$/,
	  'cs-CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
	  'da-DK': /^(\+?45)?\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2}$/,
	  'de-DE': /^((\+49|0)[1|3])([0|5][0-45-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7,9}$/,
	  'de-AT': /^(\+43|0)\d{1,4}\d{3,12}$/,
	  'de-CH': /^(\+41|0)([1-9])\d{1,9}$/,
	  'de-LU': /^(\+352)?((6\d1)\d{6})$/,
	  'dv-MV': /^(\+?960)?(7[2-9]|91|9[3-9])\d{7}$/,
	  'el-GR': /^(\+?30|0)?(69\d{8})$/,
	  'en-AU': /^(\+?61|0)4\d{8}$/,
	  'en-BM': /^(\+?1)?441(((3|7)\d{6}$)|(5[0-3][0-9]\d{4}$)|(59\d{5}))/,
	  'en-GB': /^(\+?44|0)7\d{9}$/,
	  'en-GG': /^(\+?44|0)1481\d{6}$/,
	  'en-GH': /^(\+233|0)(20|50|24|54|27|57|26|56|23|28|55|59)\d{7}$/,
	  'en-GY': /^(\+592|0)6\d{6}$/,
	  'en-HK': /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
	  'en-MO': /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
	  'en-IE': /^(\+?353|0)8[356789]\d{7}$/,
	  'en-IN': /^(\+?91|0)?[6789]\d{9}$/,
	  'en-KE': /^(\+?254|0)(7|1)\d{8}$/,
	  'en-KI': /^((\+686|686)?)?( )?((6|7)(2|3|8)[0-9]{6})$/,
	  'en-MT': /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
	  'en-MU': /^(\+?230|0)?\d{8}$/,
	  'en-NA': /^(\+?264|0)(6|8)\d{7}$/,
	  'en-NG': /^(\+?234|0)?[789]\d{9}$/,
	  'en-NZ': /^(\+?64|0)[28]\d{7,9}$/,
	  'en-PK': /^((00|\+)?92|0)3[0-6]\d{8}$/,
	  'en-PH': /^(09|\+639)\d{9}$/,
	  'en-RW': /^(\+?250|0)?[7]\d{8}$/,
	  'en-SG': /^(\+65)?[3689]\d{7}$/,
	  'en-SL': /^(\+?232|0)\d{8}$/,
	  'en-TZ': /^(\+?255|0)?[67]\d{8}$/,
	  'en-UG': /^(\+?256|0)?[7]\d{8}$/,
	  'en-US': /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
	  'en-ZA': /^(\+?27|0)\d{9}$/,
	  'en-ZM': /^(\+?26)?09[567]\d{7}$/,
	  'en-ZW': /^(\+263)[0-9]{9}$/,
	  'en-BW': /^(\+?267)?(7[1-8]{1})\d{6}$/,
	  'es-AR': /^\+?549(11|[2368]\d)\d{8}$/,
	  'es-BO': /^(\+?591)?(6|7)\d{7}$/,
	  'es-CO': /^(\+?57)?3(0(0|1|2|4|5)|1\d|2[0-4]|5(0|1))\d{7}$/,
	  'es-CL': /^(\+?56|0)[2-9]\d{1}\d{7}$/,
	  'es-CR': /^(\+506)?[2-8]\d{7}$/,
	  'es-CU': /^(\+53|0053)?5\d{7}/,
	  'es-DO': /^(\+?1)?8[024]9\d{7}$/,
	  'es-HN': /^(\+?504)?[9|8]\d{7}$/,
	  'es-EC': /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
	  'es-ES': /^(\+?34)?[6|7]\d{8}$/,
	  'es-PE': /^(\+?51)?9\d{8}$/,
	  'es-MX': /^(\+?52)?(1|01)?\d{10,11}$/,
	  'es-PA': /^(\+?507)\d{7,8}$/,
	  'es-PY': /^(\+?595|0)9[9876]\d{7}$/,
	  'es-SV': /^(\+?503)?[67]\d{7}$/,
	  'es-UY': /^(\+598|0)9[1-9][\d]{6}$/,
	  'es-VE': /^(\+?58)?(2|4)\d{9}$/,
	  'et-EE': /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
	  'fa-IR': /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
	  'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
	  'fj-FJ': /^(\+?679)?\s?\d{3}\s?\d{4}$/,
	  'fo-FO': /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
	  'fr-BF': /^(\+226|0)[67]\d{7}$/,
	  'fr-CM': /^(\+?237)6[0-9]{8}$/,
	  'fr-FR': /^(\+?33|0)[67]\d{8}$/,
	  'fr-GF': /^(\+?594|0|00594)[67]\d{8}$/,
	  'fr-GP': /^(\+?590|0|00590)[67]\d{8}$/,
	  'fr-MQ': /^(\+?596|0|00596)[67]\d{8}$/,
	  'fr-PF': /^(\+?689)?8[789]\d{6}$/,
	  'fr-RE': /^(\+?262|0|00262)[67]\d{8}$/,
	  'he-IL': /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
	  'hu-HU': /^(\+?36|06)(20|30|31|50|70)\d{7}$/,
	  'id-ID': /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
	  'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
	  'it-SM': /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
	  'ja-JP': /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
	  'ka-GE': /^(\+?995)?(5|79)\d{7}$/,
	  'kk-KZ': /^(\+?7|8)?7\d{9}$/,
	  'kl-GL': /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
	  'ko-KR': /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
	  'lt-LT': /^(\+370|8)\d{8}$/,
	  'lv-LV': /^(\+?371)2\d{7}$/,
	  'ms-MY': /^(\+?6?01){1}(([0145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
	  'mz-MZ': /^(\+?258)?8[234567]\d{7}$/,
	  'nb-NO': /^(\+?47)?[49]\d{7}$/,
	  'ne-NP': /^(\+?977)?9[78]\d{8}$/,
	  'nl-BE': /^(\+?32|0)4\d{8}$/,
	  'nl-NL': /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
	  'nn-NO': /^(\+?47)?[49]\d{7}$/,
	  'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
	  'pt-BR': /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[2-9]{1}\d{3}\-?\d{4}))$/,
	  'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
	  'pt-AO': /^(\+244)\d{9}$/,
	  'ro-RO': /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
	  'ru-RU': /^(\+?7|8)?9\d{9}$/,
	  'si-LK': /^(?:0|94|\+94)?(7(0|1|2|4|5|6|7|8)( |-)?)\d{7}$/,
	  'sl-SI': /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
	  'sk-SK': /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
	  'sq-AL': /^(\+355|0)6[789]\d{6}$/,
	  'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
	  'sv-SE': /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
	  'tg-TJ': /^(\+?992)?[5][5]\d{7}$/,
	  'th-TH': /^(\+66|66|0)\d{9}$/,
	  'tr-TR': /^(\+?90|0)?5\d{9}$/,
	  'tk-TM': /^(\+993|993|8)\d{8}$/,
	  'uk-UA': /^(\+?38|8)?0\d{9}$/,
	  'uz-UZ': /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
	  'vi-VN': /^((\+?84)|0)((3([2-9]))|(5([25689]))|(7([0|6-9]))|(8([1-9]))|(9([0-9])))([0-9]{7})$/,
	  'zh-CN': /^((\+|00)86)?(1[3-9]|9[28])\d{9}$/,
	  'zh-TW': /^(\+?886\-?|0)?9\d{8}$/,
	  'dz-BT': /^(\+?975|0)?(17|16|77|02)\d{6}$/
	};
	/* eslint-enable max-len */
	// aliases

	phones['en-CA'] = phones['en-US'];
	phones['fr-CA'] = phones['en-CA'];
	phones['fr-BE'] = phones['nl-BE'];
	phones['zh-HK'] = phones['en-HK'];
	phones['zh-MO'] = phones['en-MO'];
	phones['ga-IE'] = phones['en-IE'];
	phones['fr-CH'] = phones['de-CH'];
	phones['it-CH'] = phones['fr-CH'];

	function isMobilePhone(str, locale, options) {
	  (0, _assertString$3.default)(str);

	  if (options && options.strictMode && !str.startsWith('+')) {
	    return false;
	  }

	  if (Array.isArray(locale)) {
	    return locale.some(function (key) {
	      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
	      // istanbul ignore else
	      if (phones.hasOwnProperty(key)) {
	        var phone = phones[key];

	        if (phone.test(str)) {
	          return true;
	        }
	      }

	      return false;
	    });
	  } else if (locale in phones) {
	    return phones[locale].test(str); // alias falsey locale as 'any'
	  } else if (!locale || locale === 'any') {
	    for (var key in phones) {
	      // istanbul ignore else
	      if (phones.hasOwnProperty(key)) {
	        var phone = phones[key];

	        if (phone.test(str)) {
	          return true;
	        }
	      }
	    }

	    return false;
	  }

	  throw new Error("Invalid locale '".concat(locale, "'"));
	}

	var locales$1 = Object.keys(phones);
	locales_1$1 = isMobilePhone$1.locales = locales$1;

	var isEthereumAddress$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isEthereumAddress;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var eth = /^(0x)[0-9a-f]{40}$/i;

		function isEthereumAddress(str) {
		  (0, _assertString.default)(str);
		  return eth.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isEthereumAddress$1, isEthereumAddress$1.exports));

	var isEthereumAddress = /*@__PURE__*/getDefaultExportFromCjs(isEthereumAddress$1.exports);

	var isCurrency$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isCurrency;

		var _merge = _interopRequireDefault(merge$1.exports);

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function currencyRegex(options) {
		  var decimal_digits = "\\d{".concat(options.digits_after_decimal[0], "}");
		  options.digits_after_decimal.forEach(function (digit, index) {
		    if (index !== 0) decimal_digits = "".concat(decimal_digits, "|\\d{").concat(digit, "}");
		  });
		  var symbol = "(".concat(options.symbol.replace(/\W/, function (m) {
		    return "\\".concat(m);
		  }), ")").concat(options.require_symbol ? '' : '?'),
		      negative = '-?',
		      whole_dollar_amount_without_sep = '[1-9]\\d*',
		      whole_dollar_amount_with_sep = "[1-9]\\d{0,2}(\\".concat(options.thousands_separator, "\\d{3})*"),
		      valid_whole_dollar_amounts = ['0', whole_dollar_amount_without_sep, whole_dollar_amount_with_sep],
		      whole_dollar_amount = "(".concat(valid_whole_dollar_amounts.join('|'), ")?"),
		      decimal_amount = "(\\".concat(options.decimal_separator, "(").concat(decimal_digits, "))").concat(options.require_decimal ? '' : '?');
		  var pattern = whole_dollar_amount + (options.allow_decimal || options.require_decimal ? decimal_amount : ''); // default is negative sign before symbol, but there are two other options (besides parens)

		  if (options.allow_negatives && !options.parens_for_negatives) {
		    if (options.negative_sign_after_digits) {
		      pattern += negative;
		    } else if (options.negative_sign_before_digits) {
		      pattern = negative + pattern;
		    }
		  } // South African Rand, for example, uses R 123 (space) and R-123 (no space)


		  if (options.allow_negative_sign_placeholder) {
		    pattern = "( (?!\\-))?".concat(pattern);
		  } else if (options.allow_space_after_symbol) {
		    pattern = " ?".concat(pattern);
		  } else if (options.allow_space_after_digits) {
		    pattern += '( (?!$))?';
		  }

		  if (options.symbol_after_digits) {
		    pattern += symbol;
		  } else {
		    pattern = symbol + pattern;
		  }

		  if (options.allow_negatives) {
		    if (options.parens_for_negatives) {
		      pattern = "(\\(".concat(pattern, "\\)|").concat(pattern, ")");
		    } else if (!(options.negative_sign_before_digits || options.negative_sign_after_digits)) {
		      pattern = negative + pattern;
		    }
		  } // ensure there's a dollar and/or decimal amount, and that
		  // it doesn't start with a space or a negative sign followed by a space


		  return new RegExp("^(?!-? )(?=.*\\d)".concat(pattern, "$"));
		}

		var default_currency_options = {
		  symbol: '$',
		  require_symbol: false,
		  allow_space_after_symbol: false,
		  symbol_after_digits: false,
		  allow_negatives: true,
		  parens_for_negatives: false,
		  negative_sign_before_digits: false,
		  negative_sign_after_digits: false,
		  allow_negative_sign_placeholder: false,
		  thousands_separator: ',',
		  decimal_separator: '.',
		  allow_decimal: true,
		  require_decimal: false,
		  digits_after_decimal: [2],
		  allow_space_after_digits: false
		};

		function isCurrency(str, options) {
		  (0, _assertString.default)(str);
		  options = (0, _merge.default)(options, default_currency_options);
		  return currencyRegex(options).test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isCurrency$1, isCurrency$1.exports));

	var isCurrency = /*@__PURE__*/getDefaultExportFromCjs(isCurrency$1.exports);

	var isBtcAddress$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isBtcAddress;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		// supports Bech32 addresses
		var bech32 = /^(bc1)[a-z0-9]{25,39}$/;
		var base58 = /^(1|3)[A-HJ-NP-Za-km-z1-9]{25,39}$/;

		function isBtcAddress(str) {
		  (0, _assertString.default)(str); // check for bech32

		  if (str.startsWith('bc1')) {
		    return bech32.test(str);
		  }

		  return base58.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isBtcAddress$1, isBtcAddress$1.exports));

	var isBtcAddress = /*@__PURE__*/getDefaultExportFromCjs(isBtcAddress$1.exports);

	var isISO8601$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isISO8601;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/* eslint-disable max-len */
		// from http://goo.gl/0ejHHW
		var iso8601 = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/; // same as above, except with a strict 'T' separator between date and time

		var iso8601StrictSeparator = /^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-3])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T]((([01]\d|2[0-3])((:?)[0-5]\d)?|24:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;
		/* eslint-enable max-len */

		var isValidDate = function isValidDate(str) {
		  // str must have passed the ISO8601 check
		  // this check is meant to catch invalid dates
		  // like 2009-02-31
		  // first check for ordinal dates
		  var ordinalMatch = str.match(/^(\d{4})-?(\d{3})([ T]{1}\.*|$)/);

		  if (ordinalMatch) {
		    var oYear = Number(ordinalMatch[1]);
		    var oDay = Number(ordinalMatch[2]); // if is leap year

		    if (oYear % 4 === 0 && oYear % 100 !== 0 || oYear % 400 === 0) return oDay <= 366;
		    return oDay <= 365;
		  }

		  var match = str.match(/(\d{4})-?(\d{0,2})-?(\d*)/).map(Number);
		  var year = match[1];
		  var month = match[2];
		  var day = match[3];
		  var monthString = month ? "0".concat(month).slice(-2) : month;
		  var dayString = day ? "0".concat(day).slice(-2) : day; // create a date object and compare

		  var d = new Date("".concat(year, "-").concat(monthString || '01', "-").concat(dayString || '01'));

		  if (month && day) {
		    return d.getUTCFullYear() === year && d.getUTCMonth() + 1 === month && d.getUTCDate() === day;
		  }

		  return true;
		};

		function isISO8601(str) {
		  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
		  (0, _assertString.default)(str);
		  var check = options.strictSeparator ? iso8601StrictSeparator.test(str) : iso8601.test(str);
		  if (check && options.strict) return isValidDate(str);
		  return check;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isISO8601$1, isISO8601$1.exports));

	var isISO8601 = /*@__PURE__*/getDefaultExportFromCjs(isISO8601$1.exports);

	var isRFC3339$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isRFC3339;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/* Based on https://tools.ietf.org/html/rfc3339#section-5.6 */
		var dateFullYear = /[0-9]{4}/;
		var dateMonth = /(0[1-9]|1[0-2])/;
		var dateMDay = /([12]\d|0[1-9]|3[01])/;
		var timeHour = /([01][0-9]|2[0-3])/;
		var timeMinute = /[0-5][0-9]/;
		var timeSecond = /([0-5][0-9]|60)/;
		var timeSecFrac = /(\.[0-9]+)?/;
		var timeNumOffset = new RegExp("[-+]".concat(timeHour.source, ":").concat(timeMinute.source));
		var timeOffset = new RegExp("([zZ]|".concat(timeNumOffset.source, ")"));
		var partialTime = new RegExp("".concat(timeHour.source, ":").concat(timeMinute.source, ":").concat(timeSecond.source).concat(timeSecFrac.source));
		var fullDate = new RegExp("".concat(dateFullYear.source, "-").concat(dateMonth.source, "-").concat(dateMDay.source));
		var fullTime = new RegExp("".concat(partialTime.source).concat(timeOffset.source));
		var rfc3339 = new RegExp("^".concat(fullDate.source, "[ tT]").concat(fullTime.source, "$"));

		function isRFC3339(str) {
		  (0, _assertString.default)(str);
		  return rfc3339.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isRFC3339$1, isRFC3339$1.exports));

	var isRFC3339 = /*@__PURE__*/getDefaultExportFromCjs(isRFC3339$1.exports);

	var isISO31661Alpha3$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isISO31661Alpha3;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		// from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
		var validISO31661Alpha3CountriesCodes = new Set(['AFG', 'ALA', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BES', 'BIH', 'BWA', 'BVT', 'BRA', 'IOT', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', 'CCK', 'COL', 'COM', 'COG', 'COD', 'COK', 'CRI', 'CIV', 'HRV', 'CUB', 'CUW', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', 'VAT', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MKD', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'REU', 'ROU', 'RUS', 'RWA', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SXM', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWZ', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'UMI', 'URY', 'UZB', 'VUT', 'VEN', 'VNM', 'VGB', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE']);

		function isISO31661Alpha3(str) {
		  (0, _assertString.default)(str);
		  return validISO31661Alpha3CountriesCodes.has(str.toUpperCase());
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isISO31661Alpha3$1, isISO31661Alpha3$1.exports));

	var isISO31661Alpha3 = /*@__PURE__*/getDefaultExportFromCjs(isISO31661Alpha3$1.exports);

	var isISO4217$1 = {};

	"use strict";

	Object.defineProperty(isISO4217$1, "__esModule", {
	  value: true
	});
	var _default$2 = isISO4217$1.default = isISO4217;
	var CurrencyCodes_1 = isISO4217$1.CurrencyCodes = void 0;

	var _assertString$2 = _interopRequireDefault$2(assertString$1.exports);

	function _interopRequireDefault$2(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// from https://en.wikipedia.org/wiki/ISO_4217
	var validISO4217CurrencyCodes = new Set(['AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD', 'BND', 'BOB', 'BOV', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHE', 'CHF', 'CHW', 'CLF', 'CLP', 'CNY', 'COP', 'COU', 'CRC', 'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS', 'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD', 'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRU', 'MUR', 'MVR', 'MWK', 'MXN', 'MXV', 'MYR', 'MZN', 'NAD', 'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB', 'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STN', 'SVC', 'SYP', 'SZL', 'THB', 'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'USN', 'UYI', 'UYU', 'UYW', 'UZS', 'VES', 'VND', 'VUV', 'WST', 'XAF', 'XAG', 'XAU', 'XBA', 'XBB', 'XBC', 'XBD', 'XCD', 'XDR', 'XOF', 'XPD', 'XPF', 'XPT', 'XSU', 'XTS', 'XUA', 'XXX', 'YER', 'ZAR', 'ZMW', 'ZWL']);

	function isISO4217(str) {
	  (0, _assertString$2.default)(str);
	  return validISO4217CurrencyCodes.has(str.toUpperCase());
	}

	var CurrencyCodes = validISO4217CurrencyCodes;
	CurrencyCodes_1 = isISO4217$1.CurrencyCodes = CurrencyCodes;

	var isBase32$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isBase32;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var base32 = /^[A-Z2-7]+=*$/;

		function isBase32(str) {
		  (0, _assertString.default)(str);
		  var len = str.length;

		  if (len % 8 === 0 && base32.test(str)) {
		    return true;
		  }

		  return false;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isBase32$1, isBase32$1.exports));

	var isBase32 = /*@__PURE__*/getDefaultExportFromCjs(isBase32$1.exports);

	var isBase58$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isBase58;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		// Accepted chars - 123456789ABCDEFGH JKLMN PQRSTUVWXYZabcdefghijk mnopqrstuvwxyz
		var base58Reg = /^[A-HJ-NP-Za-km-z1-9]*$/;

		function isBase58(str) {
		  (0, _assertString.default)(str);

		  if (base58Reg.test(str)) {
		    return true;
		  }

		  return false;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isBase58$1, isBase58$1.exports));

	var isBase58 = /*@__PURE__*/getDefaultExportFromCjs(isBase58$1.exports);

	var isDataURI$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isDataURI;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var validMediaType = /^[a-z]+\/[a-z0-9\-\+]+$/i;
		var validAttribute = /^[a-z\-]+=[a-z0-9\-]+$/i;
		var validData = /^[a-z0-9!\$&'\(\)\*\+,;=\-\._~:@\/\?%\s]*$/i;

		function isDataURI(str) {
		  (0, _assertString.default)(str);
		  var data = str.split(',');

		  if (data.length < 2) {
		    return false;
		  }

		  var attributes = data.shift().trim().split(';');
		  var schemeAndMediaType = attributes.shift();

		  if (schemeAndMediaType.substr(0, 5) !== 'data:') {
		    return false;
		  }

		  var mediaType = schemeAndMediaType.substr(5);

		  if (mediaType !== '' && !validMediaType.test(mediaType)) {
		    return false;
		  }

		  for (var i = 0; i < attributes.length; i++) {
		    if (!(i === attributes.length - 1 && attributes[i].toLowerCase() === 'base64') && !validAttribute.test(attributes[i])) {
		      return false;
		    }
		  }

		  for (var _i = 0; _i < data.length; _i++) {
		    if (!validData.test(data[_i])) {
		      return false;
		    }
		  }

		  return true;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isDataURI$1, isDataURI$1.exports));

	var isDataURI = /*@__PURE__*/getDefaultExportFromCjs(isDataURI$1.exports);

	var isMagnetURI$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isMagnetURI;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var magnetURI = /^magnet:\?xt(?:\.1)?=urn:(?:aich|bitprint|btih|ed2k|ed2khash|kzhash|md5|sha1|tree:tiger):[a-z0-9]{32}(?:[a-z0-9]{8})?($|&)/i;

		function isMagnetURI(url) {
		  (0, _assertString.default)(url);
		  return magnetURI.test(url.trim());
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isMagnetURI$1, isMagnetURI$1.exports));

	var isMagnetURI = /*@__PURE__*/getDefaultExportFromCjs(isMagnetURI$1.exports);

	var isMimeType$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isMimeType;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		/*
		  Checks if the provided string matches to a correct Media type format (MIME type)

		  This function only checks is the string format follows the
		  etablished rules by the according RFC specifications.
		  This function supports 'charset' in textual media types
		  (https://tools.ietf.org/html/rfc6657).

		  This function does not check against all the media types listed
		  by the IANA (https://www.iana.org/assignments/media-types/media-types.xhtml)
		  because of lightness purposes : it would require to include
		  all these MIME types in this librairy, which would weigh it
		  significantly. This kind of effort maybe is not worth for the use that
		  this function has in this entire librairy.

		  More informations in the RFC specifications :
		  - https://tools.ietf.org/html/rfc2045
		  - https://tools.ietf.org/html/rfc2046
		  - https://tools.ietf.org/html/rfc7231#section-3.1.1.1
		  - https://tools.ietf.org/html/rfc7231#section-3.1.1.5
		*/
		// Match simple MIME types
		// NB :
		//   Subtype length must not exceed 100 characters.
		//   This rule does not comply to the RFC specs (what is the max length ?).
		var mimeTypeSimple = /^(application|audio|font|image|message|model|multipart|text|video)\/[a-zA-Z0-9\.\-\+]{1,100}$/i; // eslint-disable-line max-len
		// Handle "charset" in "text/*"

		var mimeTypeText = /^text\/[a-zA-Z0-9\.\-\+]{1,100};\s?charset=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?$/i; // eslint-disable-line max-len
		// Handle "boundary" in "multipart/*"

		var mimeTypeMultipart = /^multipart\/[a-zA-Z0-9\.\-\+]{1,100}(;\s?(boundary|charset)=("[a-zA-Z0-9\.\-\+\s]{0,70}"|[a-zA-Z0-9\.\-\+]{0,70})(\s?\([a-zA-Z0-9\.\-\+\s]{1,20}\))?){0,2}$/i; // eslint-disable-line max-len

		function isMimeType(str) {
		  (0, _assertString.default)(str);
		  return mimeTypeSimple.test(str) || mimeTypeText.test(str) || mimeTypeMultipart.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isMimeType$1, isMimeType$1.exports));

	var isMimeType = /*@__PURE__*/getDefaultExportFromCjs(isMimeType$1.exports);

	var isLatLong$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isLatLong;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _merge = _interopRequireDefault(merge$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var lat = /^\(?[+-]?(90(\.0+)?|[1-8]?\d(\.\d+)?)$/;
		var long = /^\s?[+-]?(180(\.0+)?|1[0-7]\d(\.\d+)?|\d{1,2}(\.\d+)?)\)?$/;
		var latDMS = /^(([1-8]?\d)\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|90\D+0\D+0)\D+[NSns]?$/i;
		var longDMS = /^\s*([1-7]?\d{1,2}\D+([1-5]?\d|60)\D+([1-5]?\d|60)(\.\d+)?|180\D+0\D+0)\D+[EWew]?$/i;
		var defaultLatLongOptions = {
		  checkDMS: false
		};

		function isLatLong(str, options) {
		  (0, _assertString.default)(str);
		  options = (0, _merge.default)(options, defaultLatLongOptions);
		  if (!str.includes(',')) return false;
		  var pair = str.split(',');
		  if (pair[0].startsWith('(') && !pair[1].endsWith(')') || pair[1].endsWith(')') && !pair[0].startsWith('(')) return false;

		  if (options.checkDMS) {
		    return latDMS.test(pair[0]) && longDMS.test(pair[1]);
		  }

		  return lat.test(pair[0]) && long.test(pair[1]);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isLatLong$1, isLatLong$1.exports));

	var isLatLong = /*@__PURE__*/getDefaultExportFromCjs(isLatLong$1.exports);

	var isPostalCode$1 = {};

	"use strict";

	Object.defineProperty(isPostalCode$1, "__esModule", {
	  value: true
	});
	var _default$1 = isPostalCode$1.default = isPostalCode;
	var locales_1 = isPostalCode$1.locales = void 0;

	var _assertString$1 = _interopRequireDefault$1(assertString$1.exports);

	function _interopRequireDefault$1(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// common patterns
	var threeDigit = /^\d{3}$/;
	var fourDigit = /^\d{4}$/;
	var fiveDigit = /^\d{5}$/;
	var sixDigit = /^\d{6}$/;
	var patterns = {
	  AD: /^AD\d{3}$/,
	  AT: fourDigit,
	  AU: fourDigit,
	  AZ: /^AZ\d{4}$/,
	  BE: fourDigit,
	  BG: fourDigit,
	  BR: /^\d{5}-\d{3}$/,
	  BY: /2[1-4]{1}\d{4}$/,
	  CA: /^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s\-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
	  CH: fourDigit,
	  CN: /^(0[1-7]|1[012356]|2[0-7]|3[0-6]|4[0-7]|5[1-7]|6[1-7]|7[1-5]|8[1345]|9[09])\d{4}$/,
	  CZ: /^\d{3}\s?\d{2}$/,
	  DE: fiveDigit,
	  DK: fourDigit,
	  DO: fiveDigit,
	  DZ: fiveDigit,
	  EE: fiveDigit,
	  ES: /^(5[0-2]{1}|[0-4]{1}\d{1})\d{3}$/,
	  FI: fiveDigit,
	  FR: /^\d{2}\s?\d{3}$/,
	  GB: /^(gir\s?0aa|[a-z]{1,2}\d[\da-z]?\s?(\d[a-z]{2})?)$/i,
	  GR: /^\d{3}\s?\d{2}$/,
	  HR: /^([1-5]\d{4}$)/,
	  HT: /^HT\d{4}$/,
	  HU: fourDigit,
	  ID: fiveDigit,
	  IE: /^(?!.*(?:o))[A-Za-z]\d[\dw]\s\w{4}$/i,
	  IL: /^(\d{5}|\d{7})$/,
	  IN: /^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,
	  IR: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
	  IS: threeDigit,
	  IT: fiveDigit,
	  JP: /^\d{3}\-\d{4}$/,
	  KE: fiveDigit,
	  KR: /^(\d{5}|\d{6})$/,
	  LI: /^(948[5-9]|949[0-7])$/,
	  LT: /^LT\-\d{5}$/,
	  LU: fourDigit,
	  LV: /^LV\-\d{4}$/,
	  LK: fiveDigit,
	  MX: fiveDigit,
	  MT: /^[A-Za-z]{3}\s{0,1}\d{4}$/,
	  MY: fiveDigit,
	  NL: /^\d{4}\s?[a-z]{2}$/i,
	  NO: fourDigit,
	  NP: /^(10|21|22|32|33|34|44|45|56|57)\d{3}$|^(977)$/i,
	  NZ: fourDigit,
	  PL: /^\d{2}\-\d{3}$/,
	  PR: /^00[679]\d{2}([ -]\d{4})?$/,
	  PT: /^\d{4}\-\d{3}?$/,
	  RO: sixDigit,
	  RU: sixDigit,
	  SA: fiveDigit,
	  SE: /^[1-9]\d{2}\s?\d{2}$/,
	  SG: sixDigit,
	  SI: fourDigit,
	  SK: /^\d{3}\s?\d{2}$/,
	  TH: fiveDigit,
	  TN: fourDigit,
	  TW: /^\d{3}(\d{2})?$/,
	  UA: fiveDigit,
	  US: /^\d{5}(-\d{4})?$/,
	  ZA: fourDigit,
	  ZM: fiveDigit
	};
	var locales = Object.keys(patterns);
	locales_1 = isPostalCode$1.locales = locales;

	function isPostalCode(str, locale) {
	  (0, _assertString$1.default)(str);

	  if (locale in patterns) {
	    return patterns[locale].test(str);
	  } else if (locale === 'any') {
	    for (var key in patterns) {
	      // https://github.com/gotwarlost/istanbul/blob/master/ignoring-code-for-coverage.md#ignoring-code-for-coverage-purposes
	      // istanbul ignore else
	      if (patterns.hasOwnProperty(key)) {
	        var pattern = patterns[key];

	        if (pattern.test(str)) {
	          return true;
	        }
	      }
	    }

	    return false;
	  }

	  throw new Error("Invalid locale '".concat(locale, "'"));
	}

	var ltrim$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = ltrim;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function ltrim(str, chars) {
		  (0, _assertString.default)(str); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping

		  var pattern = chars ? new RegExp("^[".concat(chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "]+"), 'g') : /^\s+/g;
		  return str.replace(pattern, '');
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (ltrim$1, ltrim$1.exports));

	var ltrim = /*@__PURE__*/getDefaultExportFromCjs(ltrim$1.exports);

	var rtrim$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = rtrim;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function rtrim(str, chars) {
		  (0, _assertString.default)(str);

		  if (chars) {
		    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping
		    var pattern = new RegExp("[".concat(chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "]+$"), 'g');
		    return str.replace(pattern, '');
		  } // Use a faster and more safe than regex trim method https://blog.stevenlevithan.com/archives/faster-trim-javascript


		  var strIndex = str.length - 1;

		  while (/\s/.test(str.charAt(strIndex))) {
		    strIndex -= 1;
		  }

		  return str.slice(0, strIndex + 1);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (rtrim$1, rtrim$1.exports));

	var rtrim = /*@__PURE__*/getDefaultExportFromCjs(rtrim$1.exports);

	var trim$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = trim;

		var _rtrim = _interopRequireDefault(rtrim$1.exports);

		var _ltrim = _interopRequireDefault(ltrim$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function trim(str, chars) {
		  return (0, _rtrim.default)((0, _ltrim.default)(str, chars), chars);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (trim$1, trim$1.exports));

	var trim = /*@__PURE__*/getDefaultExportFromCjs(trim$1.exports);

	var _escape = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = escape;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function escape(str) {
		  (0, _assertString.default)(str);
		  return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (_escape, _escape.exports));

	var escape = /*@__PURE__*/getDefaultExportFromCjs(_escape.exports);

	var _unescape = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = unescape;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function unescape(str) {
		  (0, _assertString.default)(str);
		  return str.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#x5C;/g, '\\').replace(/&#96;/g, '`').replace(/&amp;/g, '&'); // &amp; replacement has to be the last one to prevent
		  // bugs with intermediate strings containing escape sequences
		  // See: https://github.com/validatorjs/validator.js/issues/1827
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (_unescape, _unescape.exports));

	var unescape = /*@__PURE__*/getDefaultExportFromCjs(_unescape.exports);

	var stripLow$1 = {exports: {}};

	var blacklist$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = blacklist;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function blacklist(str, chars) {
		  (0, _assertString.default)(str);
		  return str.replace(new RegExp("[".concat(chars, "]+"), 'g'), '');
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (blacklist$1, blacklist$1.exports));

	var blacklist = /*@__PURE__*/getDefaultExportFromCjs(blacklist$1.exports);

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = stripLow;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		var _blacklist = _interopRequireDefault(blacklist$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function stripLow(str, keep_new_lines) {
		  (0, _assertString.default)(str);
		  var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
		  return (0, _blacklist.default)(str, chars);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (stripLow$1, stripLow$1.exports));

	var stripLow = /*@__PURE__*/getDefaultExportFromCjs(stripLow$1.exports);

	var whitelist$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = whitelist;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function whitelist(str, chars) {
		  (0, _assertString.default)(str);
		  return str.replace(new RegExp("[^".concat(chars, "]+"), 'g'), '');
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (whitelist$1, whitelist$1.exports));

	var whitelist = /*@__PURE__*/getDefaultExportFromCjs(whitelist$1.exports);

	var isWhitelisted$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isWhitelisted;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		function isWhitelisted(str, chars) {
		  (0, _assertString.default)(str);

		  for (var i = str.length - 1; i >= 0; i--) {
		    if (chars.indexOf(str[i]) === -1) {
		      return false;
		    }
		  }

		  return true;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isWhitelisted$1, isWhitelisted$1.exports));

	var isWhitelisted = /*@__PURE__*/getDefaultExportFromCjs(isWhitelisted$1.exports);

	var normalizeEmail$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = normalizeEmail;

		var _merge = _interopRequireDefault(merge$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var default_normalize_email_options = {
		  // The following options apply to all email addresses
		  // Lowercases the local part of the email address.
		  // Please note this may violate RFC 5321 as per http://stackoverflow.com/a/9808332/192024).
		  // The domain is always lowercased, as per RFC 1035
		  all_lowercase: true,
		  // The following conversions are specific to GMail
		  // Lowercases the local part of the GMail address (known to be case-insensitive)
		  gmail_lowercase: true,
		  // Removes dots from the local part of the email address, as that's ignored by GMail
		  gmail_remove_dots: true,
		  // Removes the subaddress (e.g. "+foo") from the email address
		  gmail_remove_subaddress: true,
		  // Conversts the googlemail.com domain to gmail.com
		  gmail_convert_googlemaildotcom: true,
		  // The following conversions are specific to Outlook.com / Windows Live / Hotmail
		  // Lowercases the local part of the Outlook.com address (known to be case-insensitive)
		  outlookdotcom_lowercase: true,
		  // Removes the subaddress (e.g. "+foo") from the email address
		  outlookdotcom_remove_subaddress: true,
		  // The following conversions are specific to Yahoo
		  // Lowercases the local part of the Yahoo address (known to be case-insensitive)
		  yahoo_lowercase: true,
		  // Removes the subaddress (e.g. "-foo") from the email address
		  yahoo_remove_subaddress: true,
		  // The following conversions are specific to Yandex
		  // Lowercases the local part of the Yandex address (known to be case-insensitive)
		  yandex_lowercase: true,
		  // The following conversions are specific to iCloud
		  // Lowercases the local part of the iCloud address (known to be case-insensitive)
		  icloud_lowercase: true,
		  // Removes the subaddress (e.g. "+foo") from the email address
		  icloud_remove_subaddress: true
		}; // List of domains used by iCloud

		var icloud_domains = ['icloud.com', 'me.com']; // List of domains used by Outlook.com and its predecessors
		// This list is likely incomplete.
		// Partial reference:
		// https://blogs.office.com/2013/04/17/outlook-com-gets-two-step-verification-sign-in-by-alias-and-new-international-domains/

		var outlookdotcom_domains = ['hotmail.at', 'hotmail.be', 'hotmail.ca', 'hotmail.cl', 'hotmail.co.il', 'hotmail.co.nz', 'hotmail.co.th', 'hotmail.co.uk', 'hotmail.com', 'hotmail.com.ar', 'hotmail.com.au', 'hotmail.com.br', 'hotmail.com.gr', 'hotmail.com.mx', 'hotmail.com.pe', 'hotmail.com.tr', 'hotmail.com.vn', 'hotmail.cz', 'hotmail.de', 'hotmail.dk', 'hotmail.es', 'hotmail.fr', 'hotmail.hu', 'hotmail.id', 'hotmail.ie', 'hotmail.in', 'hotmail.it', 'hotmail.jp', 'hotmail.kr', 'hotmail.lv', 'hotmail.my', 'hotmail.ph', 'hotmail.pt', 'hotmail.sa', 'hotmail.sg', 'hotmail.sk', 'live.be', 'live.co.uk', 'live.com', 'live.com.ar', 'live.com.mx', 'live.de', 'live.es', 'live.eu', 'live.fr', 'live.it', 'live.nl', 'msn.com', 'outlook.at', 'outlook.be', 'outlook.cl', 'outlook.co.il', 'outlook.co.nz', 'outlook.co.th', 'outlook.com', 'outlook.com.ar', 'outlook.com.au', 'outlook.com.br', 'outlook.com.gr', 'outlook.com.pe', 'outlook.com.tr', 'outlook.com.vn', 'outlook.cz', 'outlook.de', 'outlook.dk', 'outlook.es', 'outlook.fr', 'outlook.hu', 'outlook.id', 'outlook.ie', 'outlook.in', 'outlook.it', 'outlook.jp', 'outlook.kr', 'outlook.lv', 'outlook.my', 'outlook.ph', 'outlook.pt', 'outlook.sa', 'outlook.sg', 'outlook.sk', 'passport.com']; // List of domains used by Yahoo Mail
		// This list is likely incomplete

		var yahoo_domains = ['rocketmail.com', 'yahoo.ca', 'yahoo.co.uk', 'yahoo.com', 'yahoo.de', 'yahoo.fr', 'yahoo.in', 'yahoo.it', 'ymail.com']; // List of domains used by yandex.ru

		var yandex_domains = ['yandex.ru', 'yandex.ua', 'yandex.kz', 'yandex.com', 'yandex.by', 'ya.ru']; // replace single dots, but not multiple consecutive dots

		function dotsReplacer(match) {
		  if (match.length > 1) {
		    return match;
		  }

		  return '';
		}

		function normalizeEmail(email, options) {
		  options = (0, _merge.default)(options, default_normalize_email_options);
		  var raw_parts = email.split('@');
		  var domain = raw_parts.pop();
		  var user = raw_parts.join('@');
		  var parts = [user, domain]; // The domain is always lowercased, as it's case-insensitive per RFC 1035

		  parts[1] = parts[1].toLowerCase();

		  if (parts[1] === 'gmail.com' || parts[1] === 'googlemail.com') {
		    // Address is GMail
		    if (options.gmail_remove_subaddress) {
		      parts[0] = parts[0].split('+')[0];
		    }

		    if (options.gmail_remove_dots) {
		      // this does not replace consecutive dots like example..email@gmail.com
		      parts[0] = parts[0].replace(/\.+/g, dotsReplacer);
		    }

		    if (!parts[0].length) {
		      return false;
		    }

		    if (options.all_lowercase || options.gmail_lowercase) {
		      parts[0] = parts[0].toLowerCase();
		    }

		    parts[1] = options.gmail_convert_googlemaildotcom ? 'gmail.com' : parts[1];
		  } else if (icloud_domains.indexOf(parts[1]) >= 0) {
		    // Address is iCloud
		    if (options.icloud_remove_subaddress) {
		      parts[0] = parts[0].split('+')[0];
		    }

		    if (!parts[0].length) {
		      return false;
		    }

		    if (options.all_lowercase || options.icloud_lowercase) {
		      parts[0] = parts[0].toLowerCase();
		    }
		  } else if (outlookdotcom_domains.indexOf(parts[1]) >= 0) {
		    // Address is Outlook.com
		    if (options.outlookdotcom_remove_subaddress) {
		      parts[0] = parts[0].split('+')[0];
		    }

		    if (!parts[0].length) {
		      return false;
		    }

		    if (options.all_lowercase || options.outlookdotcom_lowercase) {
		      parts[0] = parts[0].toLowerCase();
		    }
		  } else if (yahoo_domains.indexOf(parts[1]) >= 0) {
		    // Address is Yahoo
		    if (options.yahoo_remove_subaddress) {
		      var components = parts[0].split('-');
		      parts[0] = components.length > 1 ? components.slice(0, -1).join('-') : components[0];
		    }

		    if (!parts[0].length) {
		      return false;
		    }

		    if (options.all_lowercase || options.yahoo_lowercase) {
		      parts[0] = parts[0].toLowerCase();
		    }
		  } else if (yandex_domains.indexOf(parts[1]) >= 0) {
		    if (options.all_lowercase || options.yandex_lowercase) {
		      parts[0] = parts[0].toLowerCase();
		    }

		    parts[1] = 'yandex.ru'; // all yandex domains are equal, 1st preferred
		  } else if (options.all_lowercase) {
		    // Any other address
		    parts[0] = parts[0].toLowerCase();
		  }

		  return parts.join('@');
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (normalizeEmail$1, normalizeEmail$1.exports));

	var normalizeEmail = /*@__PURE__*/getDefaultExportFromCjs(normalizeEmail$1.exports);

	var isSlug$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isSlug;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var charsetRegex = /^[^\s-_](?!.*?[-_]{2,})[a-z0-9-\\][^\s]*[^-_\s]$/;

		function isSlug(str) {
		  (0, _assertString.default)(str);
		  return charsetRegex.test(str);
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isSlug$1, isSlug$1.exports));

	var isSlug = /*@__PURE__*/getDefaultExportFromCjs(isSlug$1.exports);

	var isLicensePlate$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isLicensePlate;

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var validators = {
		  'cs-CZ': function csCZ(str) {
		    return /^(([ABCDEFHKIJKLMNPRSTUVXYZ]|[0-9])-?){5,8}$/.test(str);
		  },
		  'de-DE': function deDE(str) {
		    return /^((AW|UL|AK|GA|AÖ|LF|AZ|AM|AS|ZE|AN|AB|A|KG|KH|BA|EW|BZ|HY|KM|BT|HP|B|BC|BI|BO|FN|TT|ÜB|BN|AH|BS|FR|HB|ZZ|BB|BK|BÖ|OC|OK|CW|CE|C|CO|LH|CB|KW|LC|LN|DA|DI|DE|DH|SY|NÖ|DO|DD|DU|DN|D|EI|EA|EE|FI|EM|EL|EN|PF|ED|EF|ER|AU|ZP|E|ES|NT|EU|FL|FO|FT|FF|F|FS|FD|FÜ|GE|G|GI|GF|GS|ZR|GG|GP|GR|NY|ZI|GÖ|GZ|GT|HA|HH|HM|HU|WL|HZ|WR|RN|HK|HD|HN|HS|GK|HE|HF|RZ|HI|HG|HO|HX|IK|IL|IN|J|JL|KL|KA|KS|KF|KE|KI|KT|KO|KN|KR|KC|KU|K|LD|LL|LA|L|OP|LM|LI|LB|LU|LÖ|HL|LG|MD|GN|MZ|MA|ML|MR|MY|AT|DM|MC|NZ|RM|RG|MM|ME|MB|MI|FG|DL|HC|MW|RL|MK|MG|MÜ|WS|MH|M|MS|NU|NB|ND|NM|NK|NW|NR|NI|NF|DZ|EB|OZ|TG|TO|N|OA|GM|OB|CA|EH|FW|OF|OL|OE|OG|BH|LR|OS|AA|GD|OH|KY|NP|WK|PB|PA|PE|PI|PS|P|PM|PR|RA|RV|RE|R|H|SB|WN|RS|RD|RT|BM|NE|GV|RP|SU|GL|RO|GÜ|RH|EG|RW|PN|SK|MQ|RU|SZ|RI|SL|SM|SC|HR|FZ|VS|SW|SN|CR|SE|SI|SO|LP|SG|NH|SP|IZ|ST|BF|TE|HV|OD|SR|S|AC|DW|ZW|TF|TS|TR|TÜ|UM|PZ|TP|UE|UN|UH|MN|KK|VB|V|AE|PL|RC|VG|GW|PW|VR|VK|KB|WA|WT|BE|WM|WE|AP|MO|WW|FB|WZ|WI|WB|JE|WF|WO|W|WÜ|BL|Z|GC)[- ]?[A-Z]{1,2}[- ]?\d{1,4}|(AIC|FDB|ABG|SLN|SAW|KLZ|BUL|ESB|NAB|SUL|WST|ABI|AZE|BTF|KÖT|DKB|FEU|ROT|ALZ|SMÜ|WER|AUR|NOR|DÜW|BRK|HAB|TÖL|WOR|BAD|BAR|BER|BIW|EBS|KEM|MÜB|PEG|BGL|BGD|REI|WIL|BKS|BIR|WAT|BOR|BOH|BOT|BRB|BLK|HHM|NEB|NMB|WSF|LEO|HDL|WMS|WZL|BÜS|CHA|KÖZ|ROD|WÜM|CLP|NEC|COC|ZEL|COE|CUX|DAH|LDS|DEG|DEL|RSL|DLG|DGF|LAN|HEI|MED|DON|KIB|ROK|JÜL|MON|SLE|EBE|EIC|HIG|WBS|BIT|PRÜ|LIB|EMD|WIT|ERH|HÖS|ERZ|ANA|ASZ|MAB|MEK|STL|SZB|FDS|HCH|HOR|WOL|FRG|GRA|WOS|FRI|FFB|GAP|GER|BRL|CLZ|GTH|NOH|HGW|GRZ|LÖB|NOL|WSW|DUD|HMÜ|OHA|KRU|HAL|HAM|HBS|QLB|HVL|NAU|HAS|EBN|GEO|HOH|HDH|ERK|HER|WAN|HEF|ROF|HBN|ALF|HSK|USI|NAI|REH|SAN|KÜN|ÖHR|HOL|WAR|ARN|BRG|GNT|HOG|WOH|KEH|MAI|PAR|RID|ROL|KLE|GEL|KUS|KYF|ART|SDH|LDK|DIL|MAL|VIB|LER|BNA|GHA|GRM|MTL|WUR|LEV|LIF|STE|WEL|LIP|VAI|LUP|HGN|LBZ|LWL|PCH|STB|DAN|MKK|SLÜ|MSP|TBB|MGH|MTK|BIN|MSH|EIL|HET|SGH|BID|MYK|MSE|MST|MÜR|WRN|MEI|GRH|RIE|MZG|MIL|OBB|BED|FLÖ|MOL|FRW|SEE|SRB|AIB|MOS|BCH|ILL|SOB|NMS|NEA|SEF|UFF|NEW|VOH|NDH|TDO|NWM|GDB|GVM|WIS|NOM|EIN|GAN|LAU|HEB|OHV|OSL|SFB|ERB|LOS|BSK|KEL|BSB|MEL|WTL|OAL|FÜS|MOD|OHZ|OPR|BÜR|PAF|PLÖ|CAS|GLA|REG|VIT|ECK|SIM|GOA|EMS|DIZ|GOH|RÜD|SWA|NES|KÖN|MET|LRO|BÜZ|DBR|ROS|TET|HRO|ROW|BRV|HIP|PAN|GRI|SHK|EIS|SRO|SOK|LBS|SCZ|MER|QFT|SLF|SLS|HOM|SLK|ASL|BBG|SBK|SFT|SHG|MGN|MEG|ZIG|SAD|NEN|OVI|SHA|BLB|SIG|SON|SPN|FOR|GUB|SPB|IGB|WND|STD|STA|SDL|OBG|HST|BOG|SHL|PIR|FTL|SEB|SÖM|SÜW|TIR|SAB|TUT|ANG|SDT|LÜN|LSZ|MHL|VEC|VER|VIE|OVL|ANK|OVP|SBG|UEM|UER|WLG|GMN|NVP|RDG|RÜG|DAU|FKB|WAF|WAK|SLZ|WEN|SOG|APD|WUG|GUN|ESW|WIZ|WES|DIN|BRA|BÜD|WHV|HWI|GHC|WTM|WOB|WUN|MAK|SEL|OCH|HOT|WDA)[- ]?(([A-Z][- ]?\d{1,4})|([A-Z]{2}[- ]?\d{1,3})))[- ]?(E|H)?$/.test(str);
		  },
		  'de-LI': function deLI(str) {
		    return /^FL[- ]?\d{1,5}[UZ]?$/.test(str);
		  },
		  'fi-FI': function fiFI(str) {
		    return /^(?=.{4,7})(([A-Z]{1,3}|[0-9]{1,3})[\s-]?([A-Z]{1,3}|[0-9]{1,5}))$/.test(str);
		  },
		  'pt-PT': function ptPT(str) {
		    return /^([A-Z]{2}|[0-9]{2})[ -·]?([A-Z]{2}|[0-9]{2})[ -·]?([A-Z]{2}|[0-9]{2})$/.test(str);
		  },
		  'sq-AL': function sqAL(str) {
		    return /^[A-Z]{2}[- ]?((\d{3}[- ]?(([A-Z]{2})|T))|(R[- ]?\d{3}))$/.test(str);
		  },
		  'pt-BR': function ptBR(str) {
		    return /^[A-Z]{3}[ -]?[0-9][A-Z][0-9]{2}|[A-Z]{3}[ -]?[0-9]{4}$/.test(str);
		  }
		};

		function isLicensePlate(str, locale) {
		  (0, _assertString.default)(str);

		  if (locale in validators) {
		    return validators[locale](str);
		  } else if (locale === 'any') {
		    for (var key in validators) {
		      /* eslint guard-for-in: 0 */
		      var validator = validators[key];

		      if (validator(str)) {
		        return true;
		      }
		    }

		    return false;
		  }

		  throw new Error("Invalid locale '".concat(locale, "'"));
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isLicensePlate$1, isLicensePlate$1.exports));

	var isLicensePlate = /*@__PURE__*/getDefaultExportFromCjs(isLicensePlate$1.exports);

	var isStrongPassword$1 = {exports: {}};

	(function (module, exports) {
		"use strict";

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = isStrongPassword;

		var _merge = _interopRequireDefault(merge$1.exports);

		var _assertString = _interopRequireDefault(assertString$1.exports);

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var upperCaseRegex = /^[A-Z]$/;
		var lowerCaseRegex = /^[a-z]$/;
		var numberRegex = /^[0-9]$/;
		var symbolRegex = /^[-#!$@%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]$/;
		var defaultOptions = {
		  minLength: 8,
		  minLowercase: 1,
		  minUppercase: 1,
		  minNumbers: 1,
		  minSymbols: 1,
		  returnScore: false,
		  pointsPerUnique: 1,
		  pointsPerRepeat: 0.5,
		  pointsForContainingLower: 10,
		  pointsForContainingUpper: 10,
		  pointsForContainingNumber: 10,
		  pointsForContainingSymbol: 10
		};
		/* Counts number of occurrences of each char in a string
		 * could be moved to util/ ?
		*/

		function countChars(str) {
		  var result = {};
		  Array.from(str).forEach(function (char) {
		    var curVal = result[char];

		    if (curVal) {
		      result[char] += 1;
		    } else {
		      result[char] = 1;
		    }
		  });
		  return result;
		}
		/* Return information about a password */


		function analyzePassword(password) {
		  var charMap = countChars(password);
		  var analysis = {
		    length: password.length,
		    uniqueChars: Object.keys(charMap).length,
		    uppercaseCount: 0,
		    lowercaseCount: 0,
		    numberCount: 0,
		    symbolCount: 0
		  };
		  Object.keys(charMap).forEach(function (char) {
		    /* istanbul ignore else */
		    if (upperCaseRegex.test(char)) {
		      analysis.uppercaseCount += charMap[char];
		    } else if (lowerCaseRegex.test(char)) {
		      analysis.lowercaseCount += charMap[char];
		    } else if (numberRegex.test(char)) {
		      analysis.numberCount += charMap[char];
		    } else if (symbolRegex.test(char)) {
		      analysis.symbolCount += charMap[char];
		    }
		  });
		  return analysis;
		}

		function scorePassword(analysis, scoringOptions) {
		  var points = 0;
		  points += analysis.uniqueChars * scoringOptions.pointsPerUnique;
		  points += (analysis.length - analysis.uniqueChars) * scoringOptions.pointsPerRepeat;

		  if (analysis.lowercaseCount > 0) {
		    points += scoringOptions.pointsForContainingLower;
		  }

		  if (analysis.uppercaseCount > 0) {
		    points += scoringOptions.pointsForContainingUpper;
		  }

		  if (analysis.numberCount > 0) {
		    points += scoringOptions.pointsForContainingNumber;
		  }

		  if (analysis.symbolCount > 0) {
		    points += scoringOptions.pointsForContainingSymbol;
		  }

		  return points;
		}

		function isStrongPassword(str) {
		  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
		  (0, _assertString.default)(str);
		  var analysis = analyzePassword(str);
		  options = (0, _merge.default)(options || {}, defaultOptions);

		  if (options.returnScore) {
		    return scorePassword(analysis, options);
		  }

		  return analysis.length >= options.minLength && analysis.lowercaseCount >= options.minLowercase && analysis.uppercaseCount >= options.minUppercase && analysis.numberCount >= options.minNumbers && analysis.symbolCount >= options.minSymbols;
		}

		module.exports = exports.default;
		module.exports.default = exports.default;
	} (isStrongPassword$1, isStrongPassword$1.exports));

	var isStrongPassword = /*@__PURE__*/getDefaultExportFromCjs(isStrongPassword$1.exports);

	var isVAT$1 = {};

	"use strict";

	Object.defineProperty(isVAT$1, "__esModule", {
	  value: true
	});
	var _default = isVAT$1.default = isVAT;
	var vatMatchers_1 = isVAT$1.vatMatchers = void 0;

	var _assertString = _interopRequireDefault(assertString$1.exports);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var vatMatchers = {
	  GB: /^GB((\d{3} \d{4} ([0-8][0-9]|9[0-6]))|(\d{9} \d{3})|(((GD[0-4])|(HA[5-9]))[0-9]{2}))$/,
	  IT: /^(IT)?[0-9]{11}$/,
	  NL: /^(NL)?[0-9]{9}B[0-9]{2}$/
	};
	vatMatchers_1 = isVAT$1.vatMatchers = vatMatchers;

	function isVAT(str, countryCode) {
	  (0, _assertString.default)(str);
	  (0, _assertString.default)(countryCode);

	  if (countryCode in vatMatchers) {
	    return vatMatchers[countryCode].test(str);
	  }

	  throw new Error("Invalid country code: '".concat(countryCode, "'"));
	}

	(function (module, exports) {
		"use strict";

		function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = void 0;

		var _toDate = _interopRequireDefault(toDate$1.exports);

		var _toFloat = _interopRequireDefault(toFloat$1.exports);

		var _toInt = _interopRequireDefault(toInt$1.exports);

		var _toBoolean = _interopRequireDefault(toBoolean$1.exports);

		var _equals = _interopRequireDefault(equals$1.exports);

		var _contains = _interopRequireDefault(contains$1.exports);

		var _matches = _interopRequireDefault(matches$1.exports);

		var _isEmail = _interopRequireDefault(isEmail$1.exports);

		var _isURL = _interopRequireDefault(isURL$1.exports);

		var _isMACAddress = _interopRequireDefault(isMACAddress$1.exports);

		var _isIP = _interopRequireDefault(isIP$1.exports);

		var _isIPRange = _interopRequireDefault(isIPRange$1.exports);

		var _isFQDN = _interopRequireDefault(isFQDN$1.exports);

		var _isDate = _interopRequireDefault(isDate$1.exports);

		var _isBoolean = _interopRequireDefault(isBoolean$1.exports);

		var _isLocale = _interopRequireDefault(isLocale$1.exports);

		var _isAlpha = _interopRequireWildcard(isAlpha$1);

		var _isAlphanumeric = _interopRequireWildcard(isAlphanumeric$1);

		var _isNumeric = _interopRequireDefault(isNumeric$1.exports);

		var _isPassportNumber = _interopRequireDefault(isPassportNumber$1.exports);

		var _isPort = _interopRequireDefault(isPort$1.exports);

		var _isLowercase = _interopRequireDefault(isLowercase$1.exports);

		var _isUppercase = _interopRequireDefault(isUppercase$1.exports);

		var _isIMEI = _interopRequireDefault(isIMEI$1.exports);

		var _isAscii = _interopRequireDefault(isAscii$1.exports);

		var _isFullWidth = _interopRequireDefault(isFullWidth$1);

		var _isHalfWidth = _interopRequireDefault(isHalfWidth$1);

		var _isVariableWidth = _interopRequireDefault(isVariableWidth$1.exports);

		var _isMultibyte = _interopRequireDefault(isMultibyte$1.exports);

		var _isSemVer = _interopRequireDefault(isSemVer$1.exports);

		var _isSurrogatePair = _interopRequireDefault(isSurrogatePair$1.exports);

		var _isInt = _interopRequireDefault(isInt$1.exports);

		var _isFloat = _interopRequireWildcard(isFloat$1);

		var _isDecimal = _interopRequireDefault(isDecimal$1.exports);

		var _isHexadecimal = _interopRequireDefault(isHexadecimal$1.exports);

		var _isOctal = _interopRequireDefault(isOctal$1.exports);

		var _isDivisibleBy = _interopRequireDefault(isDivisibleBy$1.exports);

		var _isHexColor = _interopRequireDefault(isHexColor$1.exports);

		var _isRgbColor = _interopRequireDefault(isRgbColor$1.exports);

		var _isHSL = _interopRequireDefault(isHSL$1.exports);

		var _isISRC = _interopRequireDefault(isISRC$1.exports);

		var _isIBAN = _interopRequireWildcard(isIBAN$1);

		var _isBIC = _interopRequireDefault(isBIC$1.exports);

		var _isMD = _interopRequireDefault(isMD5$1.exports);

		var _isHash = _interopRequireDefault(isHash$1.exports);

		var _isJWT = _interopRequireDefault(isJWT$1.exports);

		var _isJSON = _interopRequireDefault(isJSON$1.exports);

		var _isEmpty = _interopRequireDefault(isEmpty$1.exports);

		var _isLength = _interopRequireDefault(isLength$4.exports);

		var _isByteLength = _interopRequireDefault(isByteLength$1.exports);

		var _isUUID = _interopRequireDefault(isUUID$1.exports);

		var _isMongoId = _interopRequireDefault(isMongoId$1.exports);

		var _isAfter = _interopRequireDefault(isAfter$1.exports);

		var _isBefore = _interopRequireDefault(isBefore$1.exports);

		var _isIn = _interopRequireDefault(isIn$1.exports);

		var _isCreditCard = _interopRequireDefault(isCreditCard$1.exports);

		var _isIdentityCard = _interopRequireDefault(isIdentityCard$1.exports);

		var _isEAN = _interopRequireDefault(isEAN$1.exports);

		var _isISIN = _interopRequireDefault(isISIN$1.exports);

		var _isISBN = _interopRequireDefault(isISBN$1.exports);

		var _isISSN = _interopRequireDefault(isISSN$1.exports);

		var _isTaxID = _interopRequireDefault(isTaxID$1.exports);

		var _isMobilePhone = _interopRequireWildcard(isMobilePhone$1);

		var _isEthereumAddress = _interopRequireDefault(isEthereumAddress$1.exports);

		var _isCurrency = _interopRequireDefault(isCurrency$1.exports);

		var _isBtcAddress = _interopRequireDefault(isBtcAddress$1.exports);

		var _isISO = _interopRequireDefault(isISO8601$1.exports);

		var _isRFC = _interopRequireDefault(isRFC3339$1.exports);

		var _isISO31661Alpha = _interopRequireDefault(isISO31661Alpha2$1);

		var _isISO31661Alpha2 = _interopRequireDefault(isISO31661Alpha3$1.exports);

		var _isISO2 = _interopRequireDefault(isISO4217$1);

		var _isBase = _interopRequireDefault(isBase32$1.exports);

		var _isBase2 = _interopRequireDefault(isBase58$1.exports);

		var _isBase3 = _interopRequireDefault(isBase64$1.exports);

		var _isDataURI = _interopRequireDefault(isDataURI$1.exports);

		var _isMagnetURI = _interopRequireDefault(isMagnetURI$1.exports);

		var _isMimeType = _interopRequireDefault(isMimeType$1.exports);

		var _isLatLong = _interopRequireDefault(isLatLong$1.exports);

		var _isPostalCode = _interopRequireWildcard(isPostalCode$1);

		var _ltrim = _interopRequireDefault(ltrim$1.exports);

		var _rtrim = _interopRequireDefault(rtrim$1.exports);

		var _trim = _interopRequireDefault(trim$1.exports);

		var _escape$1 = _interopRequireDefault(_escape.exports);

		var _unescape$1 = _interopRequireDefault(_unescape.exports);

		var _stripLow = _interopRequireDefault(stripLow$1.exports);

		var _whitelist = _interopRequireDefault(whitelist$1.exports);

		var _blacklist = _interopRequireDefault(blacklist$1.exports);

		var _isWhitelisted = _interopRequireDefault(isWhitelisted$1.exports);

		var _normalizeEmail = _interopRequireDefault(normalizeEmail$1.exports);

		var _isSlug = _interopRequireDefault(isSlug$1.exports);

		var _isLicensePlate = _interopRequireDefault(isLicensePlate$1.exports);

		var _isStrongPassword = _interopRequireDefault(isStrongPassword$1.exports);

		var _isVAT = _interopRequireDefault(isVAT$1);

		function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

		function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

		var version = '13.7.0';
		var validator = {
		  version: version,
		  toDate: _toDate.default,
		  toFloat: _toFloat.default,
		  toInt: _toInt.default,
		  toBoolean: _toBoolean.default,
		  equals: _equals.default,
		  contains: _contains.default,
		  matches: _matches.default,
		  isEmail: _isEmail.default,
		  isURL: _isURL.default,
		  isMACAddress: _isMACAddress.default,
		  isIP: _isIP.default,
		  isIPRange: _isIPRange.default,
		  isFQDN: _isFQDN.default,
		  isBoolean: _isBoolean.default,
		  isIBAN: _isIBAN.default,
		  isBIC: _isBIC.default,
		  isAlpha: _isAlpha.default,
		  isAlphaLocales: _isAlpha.locales,
		  isAlphanumeric: _isAlphanumeric.default,
		  isAlphanumericLocales: _isAlphanumeric.locales,
		  isNumeric: _isNumeric.default,
		  isPassportNumber: _isPassportNumber.default,
		  isPort: _isPort.default,
		  isLowercase: _isLowercase.default,
		  isUppercase: _isUppercase.default,
		  isAscii: _isAscii.default,
		  isFullWidth: _isFullWidth.default,
		  isHalfWidth: _isHalfWidth.default,
		  isVariableWidth: _isVariableWidth.default,
		  isMultibyte: _isMultibyte.default,
		  isSemVer: _isSemVer.default,
		  isSurrogatePair: _isSurrogatePair.default,
		  isInt: _isInt.default,
		  isIMEI: _isIMEI.default,
		  isFloat: _isFloat.default,
		  isFloatLocales: _isFloat.locales,
		  isDecimal: _isDecimal.default,
		  isHexadecimal: _isHexadecimal.default,
		  isOctal: _isOctal.default,
		  isDivisibleBy: _isDivisibleBy.default,
		  isHexColor: _isHexColor.default,
		  isRgbColor: _isRgbColor.default,
		  isHSL: _isHSL.default,
		  isISRC: _isISRC.default,
		  isMD5: _isMD.default,
		  isHash: _isHash.default,
		  isJWT: _isJWT.default,
		  isJSON: _isJSON.default,
		  isEmpty: _isEmpty.default,
		  isLength: _isLength.default,
		  isLocale: _isLocale.default,
		  isByteLength: _isByteLength.default,
		  isUUID: _isUUID.default,
		  isMongoId: _isMongoId.default,
		  isAfter: _isAfter.default,
		  isBefore: _isBefore.default,
		  isIn: _isIn.default,
		  isCreditCard: _isCreditCard.default,
		  isIdentityCard: _isIdentityCard.default,
		  isEAN: _isEAN.default,
		  isISIN: _isISIN.default,
		  isISBN: _isISBN.default,
		  isISSN: _isISSN.default,
		  isMobilePhone: _isMobilePhone.default,
		  isMobilePhoneLocales: _isMobilePhone.locales,
		  isPostalCode: _isPostalCode.default,
		  isPostalCodeLocales: _isPostalCode.locales,
		  isEthereumAddress: _isEthereumAddress.default,
		  isCurrency: _isCurrency.default,
		  isBtcAddress: _isBtcAddress.default,
		  isISO8601: _isISO.default,
		  isRFC3339: _isRFC.default,
		  isISO31661Alpha2: _isISO31661Alpha.default,
		  isISO31661Alpha3: _isISO31661Alpha2.default,
		  isISO4217: _isISO2.default,
		  isBase32: _isBase.default,
		  isBase58: _isBase2.default,
		  isBase64: _isBase3.default,
		  isDataURI: _isDataURI.default,
		  isMagnetURI: _isMagnetURI.default,
		  isMimeType: _isMimeType.default,
		  isLatLong: _isLatLong.default,
		  ltrim: _ltrim.default,
		  rtrim: _rtrim.default,
		  trim: _trim.default,
		  escape: _escape$1.default,
		  unescape: _unescape$1.default,
		  stripLow: _stripLow.default,
		  whitelist: _whitelist.default,
		  blacklist: _blacklist.default,
		  isWhitelisted: _isWhitelisted.default,
		  normalizeEmail: _normalizeEmail.default,
		  toString: toString,
		  isSlug: _isSlug.default,
		  isStrongPassword: _isStrongPassword.default,
		  isTaxID: _isTaxID.default,
		  isDate: _isDate.default,
		  isLicensePlate: _isLicensePlate.default,
		  isVAT: _isVAT.default,
		  ibanLocales: _isIBAN.locales
		};
		var _default = validator;
		exports.default = _default;
		module.exports = exports.default;
		module.exports.default = exports.default;
	} (validator, validator.exports));

	var Validator = /*@__PURE__*/getDefaultExportFromCjs(validator.exports);

	/**
	 * Removes all key-value entries from the list cache.
	 *
	 * @private
	 * @name clear
	 * @memberOf ListCache
	 */

	function listCacheClear$1() {
	  this.__data__ = [];
	  this.size = 0;
	}

	var _listCacheClear = listCacheClear$1;

	/**
	 * Performs a
	 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 * var other = { 'a': 1 };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */

	function eq$2(value, other) {
	  return value === other || (value !== value && other !== other);
	}

	var eq_1 = eq$2;

	var eq$1 = eq_1;

	/**
	 * Gets the index at which the `key` is found in `array` of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to inspect.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf$4(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq$1(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	var _assocIndexOf = assocIndexOf$4;

	var assocIndexOf$3 = _assocIndexOf;

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the list cache.
	 *
	 * @private
	 * @name delete
	 * @memberOf ListCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function listCacheDelete$1(key) {
	  var data = this.__data__,
	      index = assocIndexOf$3(data, key);

	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = data.length - 1;
	  if (index == lastIndex) {
	    data.pop();
	  } else {
	    splice.call(data, index, 1);
	  }
	  --this.size;
	  return true;
	}

	var _listCacheDelete = listCacheDelete$1;

	var assocIndexOf$2 = _assocIndexOf;

	/**
	 * Gets the list cache value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf ListCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function listCacheGet$1(key) {
	  var data = this.__data__,
	      index = assocIndexOf$2(data, key);

	  return index < 0 ? undefined : data[index][1];
	}

	var _listCacheGet = listCacheGet$1;

	var assocIndexOf$1 = _assocIndexOf;

	/**
	 * Checks if a list cache value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf ListCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function listCacheHas$1(key) {
	  return assocIndexOf$1(this.__data__, key) > -1;
	}

	var _listCacheHas = listCacheHas$1;

	var assocIndexOf = _assocIndexOf;

	/**
	 * Sets the list cache `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf ListCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the list cache instance.
	 */
	function listCacheSet$1(key, value) {
	  var data = this.__data__,
	      index = assocIndexOf(data, key);

	  if (index < 0) {
	    ++this.size;
	    data.push([key, value]);
	  } else {
	    data[index][1] = value;
	  }
	  return this;
	}

	var _listCacheSet = listCacheSet$1;

	var listCacheClear = _listCacheClear,
	    listCacheDelete = _listCacheDelete,
	    listCacheGet = _listCacheGet,
	    listCacheHas = _listCacheHas,
	    listCacheSet = _listCacheSet;

	/**
	 * Creates an list cache object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function ListCache$4(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `ListCache`.
	ListCache$4.prototype.clear = listCacheClear;
	ListCache$4.prototype['delete'] = listCacheDelete;
	ListCache$4.prototype.get = listCacheGet;
	ListCache$4.prototype.has = listCacheHas;
	ListCache$4.prototype.set = listCacheSet;

	var _ListCache = ListCache$4;

	var ListCache$3 = _ListCache;

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear$1() {
	  this.__data__ = new ListCache$3;
	  this.size = 0;
	}

	var _stackClear = stackClear$1;

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */

	function stackDelete$1(key) {
	  var data = this.__data__,
	      result = data['delete'](key);

	  this.size = data.size;
	  return result;
	}

	var _stackDelete = stackDelete$1;

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */

	function stackGet$1(key) {
	  return this.__data__.get(key);
	}

	var _stackGet = stackGet$1;

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */

	function stackHas$1(key) {
	  return this.__data__.has(key);
	}

	var _stackHas = stackHas$1;

	/** Detect free variable `global` from Node.js. */

	var freeGlobal$1 = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

	var _freeGlobal = freeGlobal$1;

	var freeGlobal = _freeGlobal;

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root$9 = freeGlobal || freeSelf || Function('return this')();

	var _root = root$9;

	var root$8 = _root;

	/** Built-in value references. */
	var Symbol$4 = root$8.Symbol;

	var _Symbol = Symbol$4;

	var Symbol$3 = _Symbol;

	/** Used for built-in method references. */
	var objectProto$c = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString$1 = objectProto$c.toString;

	/** Built-in value references. */
	var symToStringTag$1 = Symbol$3 ? Symbol$3.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag$1(value) {
	  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1),
	      tag = value[symToStringTag$1];

	  try {
	    value[symToStringTag$1] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString$1.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag$1] = tag;
	    } else {
	      delete value[symToStringTag$1];
	    }
	  }
	  return result;
	}

	var _getRawTag = getRawTag$1;

	/** Used for built-in method references. */

	var objectProto$b = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto$b.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString$1(value) {
	  return nativeObjectToString.call(value);
	}

	var _objectToString = objectToString$1;

	var Symbol$2 = _Symbol,
	    getRawTag = _getRawTag,
	    objectToString = _objectToString;

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag$5(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  return (symToStringTag && symToStringTag in Object(value))
	    ? getRawTag(value)
	    : objectToString(value);
	}

	var _baseGetTag = baseGetTag$5;

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */

	function isObject$7(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	var isObject_1 = isObject$7;

	var baseGetTag$4 = _baseGetTag,
	    isObject$6 = isObject_1;

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag$2 = '[object Function]',
	    genTag$1 = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction$2(value) {
	  if (!isObject$6(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag$4(value);
	  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
	}

	var isFunction_1 = isFunction$2;

	var root$7 = _root;

	/** Used to detect overreaching core-js shims. */
	var coreJsData$1 = root$7['__core-js_shared__'];

	var _coreJsData = coreJsData$1;

	var coreJsData = _coreJsData;

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked$1(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	var _isMasked = isMasked$1;

	/** Used for built-in method references. */

	var funcProto$1 = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString$1 = funcProto$1.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource$2(func) {
	  if (func != null) {
	    try {
	      return funcToString$1.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	var _toSource = toSource$2;

	var isFunction$1 = isFunction_1,
	    isMasked = _isMasked,
	    isObject$5 = isObject_1,
	    toSource$1 = _toSource;

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto$a = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty$8).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative$1(value) {
	  if (!isObject$5(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction$1(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource$1(value));
	}

	var _baseIsNative = baseIsNative$1;

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */

	function getValue$1(object, key) {
	  return object == null ? undefined : object[key];
	}

	var _getValue = getValue$1;

	var baseIsNative = _baseIsNative,
	    getValue = _getValue;

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative$7(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	var _getNative = getNative$7;

	var getNative$6 = _getNative,
	    root$6 = _root;

	/* Built-in method references that are verified to be native. */
	var Map$3 = getNative$6(root$6, 'Map');

	var _Map = Map$3;

	var getNative$5 = _getNative;

	/* Built-in method references that are verified to be native. */
	var nativeCreate$4 = getNative$5(Object, 'create');

	var _nativeCreate = nativeCreate$4;

	var nativeCreate$3 = _nativeCreate;

	/**
	 * Removes all key-value entries from the hash.
	 *
	 * @private
	 * @name clear
	 * @memberOf Hash
	 */
	function hashClear$1() {
	  this.__data__ = nativeCreate$3 ? nativeCreate$3(null) : {};
	  this.size = 0;
	}

	var _hashClear = hashClear$1;

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @name delete
	 * @memberOf Hash
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */

	function hashDelete$1(key) {
	  var result = this.has(key) && delete this.__data__[key];
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _hashDelete = hashDelete$1;

	var nativeCreate$2 = _nativeCreate;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto$9 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Hash
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet$1(key) {
	  var data = this.__data__;
	  if (nativeCreate$2) {
	    var result = data[key];
	    return result === HASH_UNDEFINED$1 ? undefined : result;
	  }
	  return hasOwnProperty$7.call(data, key) ? data[key] : undefined;
	}

	var _hashGet = hashGet$1;

	var nativeCreate$1 = _nativeCreate;

	/** Used for built-in method references. */
	var objectProto$8 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$6 = objectProto$8.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Hash
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas$1(key) {
	  var data = this.__data__;
	  return nativeCreate$1 ? (data[key] !== undefined) : hasOwnProperty$6.call(data, key);
	}

	var _hashHas = hashHas$1;

	var nativeCreate = _nativeCreate;

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Hash
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the hash instance.
	 */
	function hashSet$1(key, value) {
	  var data = this.__data__;
	  this.size += this.has(key) ? 0 : 1;
	  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	  return this;
	}

	var _hashSet = hashSet$1;

	var hashClear = _hashClear,
	    hashDelete = _hashDelete,
	    hashGet = _hashGet,
	    hashHas = _hashHas,
	    hashSet = _hashSet;

	/**
	 * Creates a hash object.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Hash$1(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `Hash`.
	Hash$1.prototype.clear = hashClear;
	Hash$1.prototype['delete'] = hashDelete;
	Hash$1.prototype.get = hashGet;
	Hash$1.prototype.has = hashHas;
	Hash$1.prototype.set = hashSet;

	var _Hash = Hash$1;

	var Hash = _Hash,
	    ListCache$2 = _ListCache,
	    Map$2 = _Map;

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapCacheClear$1() {
	  this.size = 0;
	  this.__data__ = {
	    'hash': new Hash,
	    'map': new (Map$2 || ListCache$2),
	    'string': new Hash
	  };
	}

	var _mapCacheClear = mapCacheClear$1;

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */

	function isKeyable$1(value) {
	  var type = typeof value;
	  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
	    ? (value !== '__proto__')
	    : (value === null);
	}

	var _isKeyable = isKeyable$1;

	var isKeyable = _isKeyable;

	/**
	 * Gets the data for `map`.
	 *
	 * @private
	 * @param {Object} map The map to query.
	 * @param {string} key The reference key.
	 * @returns {*} Returns the map data.
	 */
	function getMapData$4(map, key) {
	  var data = map.__data__;
	  return isKeyable(key)
	    ? data[typeof key == 'string' ? 'string' : 'hash']
	    : data.map;
	}

	var _getMapData = getMapData$4;

	var getMapData$3 = _getMapData;

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapCacheDelete$1(key) {
	  var result = getMapData$3(this, key)['delete'](key);
	  this.size -= result ? 1 : 0;
	  return result;
	}

	var _mapCacheDelete = mapCacheDelete$1;

	var getMapData$2 = _getMapData;

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapCacheGet$1(key) {
	  return getMapData$2(this, key).get(key);
	}

	var _mapCacheGet = mapCacheGet$1;

	var getMapData$1 = _getMapData;

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapCacheHas$1(key) {
	  return getMapData$1(this, key).has(key);
	}

	var _mapCacheHas = mapCacheHas$1;

	var getMapData = _getMapData;

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache instance.
	 */
	function mapCacheSet$1(key, value) {
	  var data = getMapData(this, key),
	      size = data.size;

	  data.set(key, value);
	  this.size += data.size == size ? 0 : 1;
	  return this;
	}

	var _mapCacheSet = mapCacheSet$1;

	var mapCacheClear = _mapCacheClear,
	    mapCacheDelete = _mapCacheDelete,
	    mapCacheGet = _mapCacheGet,
	    mapCacheHas = _mapCacheHas,
	    mapCacheSet = _mapCacheSet;

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function MapCache$1(entries) {
	  var index = -1,
	      length = entries == null ? 0 : entries.length;

	  this.clear();
	  while (++index < length) {
	    var entry = entries[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add methods to `MapCache`.
	MapCache$1.prototype.clear = mapCacheClear;
	MapCache$1.prototype['delete'] = mapCacheDelete;
	MapCache$1.prototype.get = mapCacheGet;
	MapCache$1.prototype.has = mapCacheHas;
	MapCache$1.prototype.set = mapCacheSet;

	var _MapCache = MapCache$1;

	var ListCache$1 = _ListCache,
	    Map$1 = _Map,
	    MapCache = _MapCache;

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache instance.
	 */
	function stackSet$1(key, value) {
	  var data = this.__data__;
	  if (data instanceof ListCache$1) {
	    var pairs = data.__data__;
	    if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
	      pairs.push([key, value]);
	      this.size = ++data.size;
	      return this;
	    }
	    data = this.__data__ = new MapCache(pairs);
	  }
	  data.set(key, value);
	  this.size = data.size;
	  return this;
	}

	var _stackSet = stackSet$1;

	var ListCache = _ListCache,
	    stackClear = _stackClear,
	    stackDelete = _stackDelete,
	    stackGet = _stackGet,
	    stackHas = _stackHas,
	    stackSet = _stackSet;

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [entries] The key-value pairs to cache.
	 */
	function Stack$1(entries) {
	  var data = this.__data__ = new ListCache(entries);
	  this.size = data.size;
	}

	// Add methods to `Stack`.
	Stack$1.prototype.clear = stackClear;
	Stack$1.prototype['delete'] = stackDelete;
	Stack$1.prototype.get = stackGet;
	Stack$1.prototype.has = stackHas;
	Stack$1.prototype.set = stackSet;

	var _Stack = Stack$1;

	/**
	 * A specialized version of `_.forEach` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns `array`.
	 */

	function arrayEach$2(array, iteratee) {
	  var index = -1,
	      length = array == null ? 0 : array.length;

	  while (++index < length) {
	    if (iteratee(array[index], index, array) === false) {
	      break;
	    }
	  }
	  return array;
	}

	var _arrayEach = arrayEach$2;

	var getNative$4 = _getNative;

	var defineProperty$1 = (function() {
	  try {
	    var func = getNative$4(Object, 'defineProperty');
	    func({}, '', {});
	    return func;
	  } catch (e) {}
	}());

	var _defineProperty = defineProperty$1;

	var defineProperty = _defineProperty;

	/**
	 * The base implementation of `assignValue` and `assignMergeValue` without
	 * value checks.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function baseAssignValue$2(object, key, value) {
	  if (key == '__proto__' && defineProperty) {
	    defineProperty(object, key, {
	      'configurable': true,
	      'enumerable': true,
	      'value': value,
	      'writable': true
	    });
	  } else {
	    object[key] = value;
	  }
	}

	var _baseAssignValue = baseAssignValue$2;

	var baseAssignValue$1 = _baseAssignValue,
	    eq = eq_1;

	/** Used for built-in method references. */
	var objectProto$7 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$5 = objectProto$7.hasOwnProperty;

	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue$2(object, key, value) {
	  var objValue = object[key];
	  if (!(hasOwnProperty$5.call(object, key) && eq(objValue, value)) ||
	      (value === undefined && !(key in object))) {
	    baseAssignValue$1(object, key, value);
	  }
	}

	var _assignValue = assignValue$2;

	var assignValue$1 = _assignValue,
	    baseAssignValue = _baseAssignValue;

	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property identifiers to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject$4(source, props, object, customizer) {
	  var isNew = !object;
	  object || (object = {});

	  var index = -1,
	      length = props.length;

	  while (++index < length) {
	    var key = props[index];

	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : undefined;

	    if (newValue === undefined) {
	      newValue = source[key];
	    }
	    if (isNew) {
	      baseAssignValue(object, key, newValue);
	    } else {
	      assignValue$1(object, key, newValue);
	    }
	  }
	  return object;
	}

	var _copyObject = copyObject$4;

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */

	function baseTimes$1(n, iteratee) {
	  var index = -1,
	      result = Array(n);

	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}

	var _baseTimes = baseTimes$1;

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */

	function isObjectLike$6(value) {
	  return value != null && typeof value == 'object';
	}

	var isObjectLike_1 = isObjectLike$6;

	var baseGetTag$3 = _baseGetTag,
	    isObjectLike$5 = isObjectLike_1;

	/** `Object#toString` result references. */
	var argsTag$2 = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments$1(value) {
	  return isObjectLike$5(value) && baseGetTag$3(value) == argsTag$2;
	}

	var _baseIsArguments = baseIsArguments$1;

	var baseIsArguments = _baseIsArguments,
	    isObjectLike$4 = isObjectLike_1;

	/** Used for built-in method references. */
	var objectProto$6 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$4 = objectProto$6.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable$1 = objectProto$6.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments$1 = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike$4(value) && hasOwnProperty$4.call(value, 'callee') &&
	    !propertyIsEnumerable$1.call(value, 'callee');
	};

	var isArguments_1 = isArguments$1;

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */

	var isArray$4 = Array.isArray;

	var isArray_1 = isArray$4;

	var isBuffer$2 = {exports: {}};

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */

	function stubFalse() {
	  return false;
	}

	var stubFalse_1 = stubFalse;

	(function (module, exports) {
		var root = _root,
		    stubFalse = stubFalse_1;

		/** Detect free variable `exports`. */
		var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

		/** Detect free variable `module`. */
		var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

		/** Detect the popular CommonJS extension `module.exports`. */
		var moduleExports = freeModule && freeModule.exports === freeExports;

		/** Built-in value references. */
		var Buffer = moduleExports ? root.Buffer : undefined;

		/* Built-in method references for those with the same name as other `lodash` methods. */
		var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

		/**
		 * Checks if `value` is a buffer.
		 *
		 * @static
		 * @memberOf _
		 * @since 4.3.0
		 * @category Lang
		 * @param {*} value The value to check.
		 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
		 * @example
		 *
		 * _.isBuffer(new Buffer(2));
		 * // => true
		 *
		 * _.isBuffer(new Uint8Array(2));
		 * // => false
		 */
		var isBuffer = nativeIsBuffer || stubFalse;

		module.exports = isBuffer;
	} (isBuffer$2, isBuffer$2.exports));

	var isBuffer_1 = isBuffer$2.exports;

	/** Used as references for various `Number` constants. */

	var MAX_SAFE_INTEGER$1 = 9007199254740991;

	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;

	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex$1(value, length) {
	  var type = typeof value;
	  length = length == null ? MAX_SAFE_INTEGER$1 : length;

	  return !!length &&
	    (type == 'number' ||
	      (type != 'symbol' && reIsUint.test(value))) &&
	        (value > -1 && value % 1 == 0 && value < length);
	}

	var _isIndex = isIndex$1;

	/** Used as references for various `Number` constants. */

	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength$2(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	var isLength_1 = isLength$2;

	var baseGetTag$2 = _baseGetTag,
	    isLength$1 = isLength_1,
	    isObjectLike$3 = isObjectLike_1;

	/** `Object#toString` result references. */
	var argsTag$1 = '[object Arguments]',
	    arrayTag$1 = '[object Array]',
	    boolTag$2 = '[object Boolean]',
	    dateTag$2 = '[object Date]',
	    errorTag$1 = '[object Error]',
	    funcTag$1 = '[object Function]',
	    mapTag$4 = '[object Map]',
	    numberTag$2 = '[object Number]',
	    objectTag$2 = '[object Object]',
	    regexpTag$2 = '[object RegExp]',
	    setTag$4 = '[object Set]',
	    stringTag$2 = '[object String]',
	    weakMapTag$2 = '[object WeakMap]';

	var arrayBufferTag$2 = '[object ArrayBuffer]',
	    dataViewTag$3 = '[object DataView]',
	    float32Tag$2 = '[object Float32Array]',
	    float64Tag$2 = '[object Float64Array]',
	    int8Tag$2 = '[object Int8Array]',
	    int16Tag$2 = '[object Int16Array]',
	    int32Tag$2 = '[object Int32Array]',
	    uint8Tag$2 = '[object Uint8Array]',
	    uint8ClampedTag$2 = '[object Uint8ClampedArray]',
	    uint16Tag$2 = '[object Uint16Array]',
	    uint32Tag$2 = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] =
	typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] =
	typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] =
	typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] =
	typedArrayTags[uint32Tag$2] = true;
	typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] =
	typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] =
	typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] =
	typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] =
	typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] =
	typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] =
	typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] =
	typedArrayTags[weakMapTag$2] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray$1(value) {
	  return isObjectLike$3(value) &&
	    isLength$1(value.length) && !!typedArrayTags[baseGetTag$2(value)];
	}

	var _baseIsTypedArray = baseIsTypedArray$1;

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */

	function baseUnary$3(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	var _baseUnary = baseUnary$3;

	var _nodeUtil$1 = {exports: {}};

	(function (module, exports) {
		var freeGlobal = _freeGlobal;

		/** Detect free variable `exports`. */
		var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

		/** Detect free variable `module`. */
		var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

		/** Detect the popular CommonJS extension `module.exports`. */
		var moduleExports = freeModule && freeModule.exports === freeExports;

		/** Detect free variable `process` from Node.js. */
		var freeProcess = moduleExports && freeGlobal.process;

		/** Used to access faster Node.js helpers. */
		var nodeUtil = (function() {
		  try {
		    // Use `util.types` for Node.js 10+.
		    var types = freeModule && freeModule.require && freeModule.require('util').types;

		    if (types) {
		      return types;
		    }

		    // Legacy `process.binding('util')` for Node.js < 10.
		    return freeProcess && freeProcess.binding && freeProcess.binding('util');
		  } catch (e) {}
		}());

		module.exports = nodeUtil;
	} (_nodeUtil$1, _nodeUtil$1.exports));

	var _nodeUtil = _nodeUtil$1.exports;

	var baseIsTypedArray = _baseIsTypedArray,
	    baseUnary$2 = _baseUnary,
	    nodeUtil$2 = _nodeUtil$1.exports;

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil$2 && nodeUtil$2.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray$1 = nodeIsTypedArray ? baseUnary$2(nodeIsTypedArray) : baseIsTypedArray;

	var isTypedArray_1 = isTypedArray$1;

	var baseTimes = _baseTimes,
	    isArguments = isArguments_1,
	    isArray$3 = isArray_1,
	    isBuffer$1 = isBuffer$2.exports,
	    isIndex = _isIndex,
	    isTypedArray = isTypedArray_1;

	/** Used for built-in method references. */
	var objectProto$5 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$3 = objectProto$5.hasOwnProperty;

	/**
	 * Creates an array of the enumerable property names of the array-like `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @param {boolean} inherited Specify returning inherited property names.
	 * @returns {Array} Returns the array of property names.
	 */
	function arrayLikeKeys$2(value, inherited) {
	  var isArr = isArray$3(value),
	      isArg = !isArr && isArguments(value),
	      isBuff = !isArr && !isArg && isBuffer$1(value),
	      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
	      skipIndexes = isArr || isArg || isBuff || isType,
	      result = skipIndexes ? baseTimes(value.length, String) : [],
	      length = result.length;

	  for (var key in value) {
	    if ((inherited || hasOwnProperty$3.call(value, key)) &&
	        !(skipIndexes && (
	           // Safari 9 has enumerable `arguments.length` in strict mode.
	           key == 'length' ||
	           // Node.js 0.10 has enumerable non-index properties on buffers.
	           (isBuff && (key == 'offset' || key == 'parent')) ||
	           // PhantomJS 2 has enumerable non-index properties on typed arrays.
	           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
	           // Skip index properties.
	           isIndex(key, length)
	        ))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _arrayLikeKeys = arrayLikeKeys$2;

	/** Used for built-in method references. */

	var objectProto$4 = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype$3(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$4;

	  return value === proto;
	}

	var _isPrototype = isPrototype$3;

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */

	function overArg$2(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	var _overArg = overArg$2;

	var overArg$1 = _overArg;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys$1 = overArg$1(Object.keys, Object);

	var _nativeKeys = nativeKeys$1;

	var isPrototype$2 = _isPrototype,
	    nativeKeys = _nativeKeys;

	/** Used for built-in method references. */
	var objectProto$3 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys$1(object) {
	  if (!isPrototype$2(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty$2.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _baseKeys = baseKeys$1;

	var isFunction = isFunction_1,
	    isLength = isLength_1;

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike$3(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	var isArrayLike_1 = isArrayLike$3;

	var arrayLikeKeys$1 = _arrayLikeKeys,
	    baseKeys = _baseKeys,
	    isArrayLike$2 = isArrayLike_1;

	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys$4(object) {
	  return isArrayLike$2(object) ? arrayLikeKeys$1(object) : baseKeys(object);
	}

	var keys_1 = keys$4;

	var copyObject$3 = _copyObject,
	    keys$3 = keys_1;

	/**
	 * The base implementation of `_.assign` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssign$1(object, source) {
	  return object && copyObject$3(source, keys$3(source), object);
	}

	var _baseAssign = baseAssign$1;

	/**
	 * This function is like
	 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	 * except that it includes inherited enumerable properties.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */

	function nativeKeysIn$1(object) {
	  var result = [];
	  if (object != null) {
	    for (var key in Object(object)) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _nativeKeysIn = nativeKeysIn$1;

	var isObject$4 = isObject_1,
	    isPrototype$1 = _isPrototype,
	    nativeKeysIn = _nativeKeysIn;

	/** Used for built-in method references. */
	var objectProto$2 = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

	/**
	 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeysIn$1(object) {
	  if (!isObject$4(object)) {
	    return nativeKeysIn(object);
	  }
	  var isProto = isPrototype$1(object),
	      result = [];

	  for (var key in object) {
	    if (!(key == 'constructor' && (isProto || !hasOwnProperty$1.call(object, key)))) {
	      result.push(key);
	    }
	  }
	  return result;
	}

	var _baseKeysIn = baseKeysIn$1;

	var arrayLikeKeys = _arrayLikeKeys,
	    baseKeysIn = _baseKeysIn,
	    isArrayLike$1 = isArrayLike_1;

	/**
	 * Creates an array of the own and inherited enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keysIn(new Foo);
	 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	 */
	function keysIn$3(object) {
	  return isArrayLike$1(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}

	var keysIn_1 = keysIn$3;

	var copyObject$2 = _copyObject,
	    keysIn$2 = keysIn_1;

	/**
	 * The base implementation of `_.assignIn` without support for multiple sources
	 * or `customizer` functions.
	 *
	 * @private
	 * @param {Object} object The destination object.
	 * @param {Object} source The source object.
	 * @returns {Object} Returns `object`.
	 */
	function baseAssignIn$1(object, source) {
	  return object && copyObject$2(source, keysIn$2(source), object);
	}

	var _baseAssignIn = baseAssignIn$1;

	var _cloneBuffer$1 = {exports: {}};

	(function (module, exports) {
		var root = _root;

		/** Detect free variable `exports`. */
		var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

		/** Detect free variable `module`. */
		var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

		/** Detect the popular CommonJS extension `module.exports`. */
		var moduleExports = freeModule && freeModule.exports === freeExports;

		/** Built-in value references. */
		var Buffer = moduleExports ? root.Buffer : undefined,
		    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

		/**
		 * Creates a clone of  `buffer`.
		 *
		 * @private
		 * @param {Buffer} buffer The buffer to clone.
		 * @param {boolean} [isDeep] Specify a deep clone.
		 * @returns {Buffer} Returns the cloned buffer.
		 */
		function cloneBuffer(buffer, isDeep) {
		  if (isDeep) {
		    return buffer.slice();
		  }
		  var length = buffer.length,
		      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

		  buffer.copy(result);
		  return result;
		}

		module.exports = cloneBuffer;
	} (_cloneBuffer$1, _cloneBuffer$1.exports));

	var _cloneBuffer = _cloneBuffer$1.exports;

	/**
	 * Copies the values of `source` to `array`.
	 *
	 * @private
	 * @param {Array} source The array to copy values from.
	 * @param {Array} [array=[]] The array to copy values to.
	 * @returns {Array} Returns `array`.
	 */

	function copyArray$1(source, array) {
	  var index = -1,
	      length = source.length;

	  array || (array = Array(length));
	  while (++index < length) {
	    array[index] = source[index];
	  }
	  return array;
	}

	var _copyArray = copyArray$1;

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} [array] The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */

	function arrayFilter$1(array, predicate) {
	  var index = -1,
	      length = array == null ? 0 : array.length,
	      resIndex = 0,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[resIndex++] = value;
	    }
	  }
	  return result;
	}

	var _arrayFilter = arrayFilter$1;

	/**
	 * This method returns a new empty array.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {Array} Returns the new empty array.
	 * @example
	 *
	 * var arrays = _.times(2, _.stubArray);
	 *
	 * console.log(arrays);
	 * // => [[], []]
	 *
	 * console.log(arrays[0] === arrays[1]);
	 * // => false
	 */

	function stubArray$2() {
	  return [];
	}

	var stubArray_1 = stubArray$2;

	var arrayFilter = _arrayFilter,
	    stubArray$1 = stubArray_1;

	/** Used for built-in method references. */
	var objectProto$1 = Object.prototype;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbols$3 = !nativeGetSymbols$1 ? stubArray$1 : function(object) {
	  if (object == null) {
	    return [];
	  }
	  object = Object(object);
	  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
	    return propertyIsEnumerable.call(object, symbol);
	  });
	};

	var _getSymbols = getSymbols$3;

	var copyObject$1 = _copyObject,
	    getSymbols$2 = _getSymbols;

	/**
	 * Copies own symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbols$1(source, object) {
	  return copyObject$1(source, getSymbols$2(source), object);
	}

	var _copySymbols = copySymbols$1;

	/**
	 * Appends the elements of `values` to `array`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {Array} values The values to append.
	 * @returns {Array} Returns `array`.
	 */

	function arrayPush$2(array, values) {
	  var index = -1,
	      length = values.length,
	      offset = array.length;

	  while (++index < length) {
	    array[offset + index] = values[index];
	  }
	  return array;
	}

	var _arrayPush = arrayPush$2;

	var overArg = _overArg;

	/** Built-in value references. */
	var getPrototype$2 = overArg(Object.getPrototypeOf, Object);

	var _getPrototype = getPrototype$2;

	var arrayPush$1 = _arrayPush,
	    getPrototype$1 = _getPrototype,
	    getSymbols$1 = _getSymbols,
	    stubArray = stubArray_1;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeGetSymbols = Object.getOwnPropertySymbols;

	/**
	 * Creates an array of the own and inherited enumerable symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of symbols.
	 */
	var getSymbolsIn$2 = !nativeGetSymbols ? stubArray : function(object) {
	  var result = [];
	  while (object) {
	    arrayPush$1(result, getSymbols$1(object));
	    object = getPrototype$1(object);
	  }
	  return result;
	};

	var _getSymbolsIn = getSymbolsIn$2;

	var copyObject = _copyObject,
	    getSymbolsIn$1 = _getSymbolsIn;

	/**
	 * Copies own and inherited symbols of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy symbols from.
	 * @param {Object} [object={}] The object to copy symbols to.
	 * @returns {Object} Returns `object`.
	 */
	function copySymbolsIn$1(source, object) {
	  return copyObject(source, getSymbolsIn$1(source), object);
	}

	var _copySymbolsIn = copySymbolsIn$1;

	var arrayPush = _arrayPush,
	    isArray$2 = isArray_1;

	/**
	 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
	 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @param {Function} symbolsFunc The function to get the symbols of `object`.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function baseGetAllKeys$2(object, keysFunc, symbolsFunc) {
	  var result = keysFunc(object);
	  return isArray$2(object) ? result : arrayPush(result, symbolsFunc(object));
	}

	var _baseGetAllKeys = baseGetAllKeys$2;

	var baseGetAllKeys$1 = _baseGetAllKeys,
	    getSymbols = _getSymbols,
	    keys$2 = keys_1;

	/**
	 * Creates an array of own enumerable property names and symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeys$1(object) {
	  return baseGetAllKeys$1(object, keys$2, getSymbols);
	}

	var _getAllKeys = getAllKeys$1;

	var baseGetAllKeys = _baseGetAllKeys,
	    getSymbolsIn = _getSymbolsIn,
	    keysIn$1 = keysIn_1;

	/**
	 * Creates an array of own and inherited enumerable property names and
	 * symbols of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names and symbols.
	 */
	function getAllKeysIn$1(object) {
	  return baseGetAllKeys(object, keysIn$1, getSymbolsIn);
	}

	var _getAllKeysIn = getAllKeysIn$1;

	var getNative$3 = _getNative,
	    root$5 = _root;

	/* Built-in method references that are verified to be native. */
	var DataView$1 = getNative$3(root$5, 'DataView');

	var _DataView = DataView$1;

	var getNative$2 = _getNative,
	    root$4 = _root;

	/* Built-in method references that are verified to be native. */
	var Promise$2 = getNative$2(root$4, 'Promise');

	var _Promise = Promise$2;

	var getNative$1 = _getNative,
	    root$3 = _root;

	/* Built-in method references that are verified to be native. */
	var Set$2 = getNative$1(root$3, 'Set');

	var _Set = Set$2;

	var getNative = _getNative,
	    root$2 = _root;

	/* Built-in method references that are verified to be native. */
	var WeakMap$2 = getNative(root$2, 'WeakMap');

	var _WeakMap = WeakMap$2;

	var DataView = _DataView,
	    Map = _Map,
	    Promise$1 = _Promise,
	    Set$1 = _Set,
	    WeakMap$1 = _WeakMap,
	    baseGetTag$1 = _baseGetTag,
	    toSource = _toSource;

	/** `Object#toString` result references. */
	var mapTag$3 = '[object Map]',
	    objectTag$1 = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag$3 = '[object Set]',
	    weakMapTag$1 = '[object WeakMap]';

	var dataViewTag$2 = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise$1),
	    setCtorString = toSource(Set$1),
	    weakMapCtorString = toSource(WeakMap$1);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag$3 = baseGetTag$1;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag$3(new DataView(new ArrayBuffer(1))) != dataViewTag$2) ||
	    (Map && getTag$3(new Map) != mapTag$3) ||
	    (Promise$1 && getTag$3(Promise$1.resolve()) != promiseTag) ||
	    (Set$1 && getTag$3(new Set$1) != setTag$3) ||
	    (WeakMap$1 && getTag$3(new WeakMap$1) != weakMapTag$1)) {
	  getTag$3 = function(value) {
	    var result = baseGetTag$1(value),
	        Ctor = result == objectTag$1 ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag$2;
	        case mapCtorString: return mapTag$3;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag$3;
	        case weakMapCtorString: return weakMapTag$1;
	      }
	    }
	    return result;
	  };
	}

	var _getTag = getTag$3;

	/** Used for built-in method references. */

	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Initializes an array clone.
	 *
	 * @private
	 * @param {Array} array The array to clone.
	 * @returns {Array} Returns the initialized clone.
	 */
	function initCloneArray$1(array) {
	  var length = array.length,
	      result = new array.constructor(length);

	  // Add properties assigned by `RegExp#exec`.
	  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
	    result.index = array.index;
	    result.input = array.input;
	  }
	  return result;
	}

	var _initCloneArray = initCloneArray$1;

	var root$1 = _root;

	/** Built-in value references. */
	var Uint8Array$1 = root$1.Uint8Array;

	var _Uint8Array = Uint8Array$1;

	var Uint8Array = _Uint8Array;

	/**
	 * Creates a clone of `arrayBuffer`.
	 *
	 * @private
	 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
	 * @returns {ArrayBuffer} Returns the cloned array buffer.
	 */
	function cloneArrayBuffer$3(arrayBuffer) {
	  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
	  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
	  return result;
	}

	var _cloneArrayBuffer = cloneArrayBuffer$3;

	var cloneArrayBuffer$2 = _cloneArrayBuffer;

	/**
	 * Creates a clone of `dataView`.
	 *
	 * @private
	 * @param {Object} dataView The data view to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned data view.
	 */
	function cloneDataView$1(dataView, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer$2(dataView.buffer) : dataView.buffer;
	  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
	}

	var _cloneDataView = cloneDataView$1;

	/** Used to match `RegExp` flags from their coerced string values. */

	var reFlags = /\w*$/;

	/**
	 * Creates a clone of `regexp`.
	 *
	 * @private
	 * @param {Object} regexp The regexp to clone.
	 * @returns {Object} Returns the cloned regexp.
	 */
	function cloneRegExp$1(regexp) {
	  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
	  result.lastIndex = regexp.lastIndex;
	  return result;
	}

	var _cloneRegExp = cloneRegExp$1;

	var Symbol$1 = _Symbol;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol$1 ? Symbol$1.prototype : undefined,
	    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

	/**
	 * Creates a clone of the `symbol` object.
	 *
	 * @private
	 * @param {Object} symbol The symbol object to clone.
	 * @returns {Object} Returns the cloned symbol object.
	 */
	function cloneSymbol$1(symbol) {
	  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
	}

	var _cloneSymbol = cloneSymbol$1;

	var cloneArrayBuffer$1 = _cloneArrayBuffer;

	/**
	 * Creates a clone of `typedArray`.
	 *
	 * @private
	 * @param {Object} typedArray The typed array to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the cloned typed array.
	 */
	function cloneTypedArray$1(typedArray, isDeep) {
	  var buffer = isDeep ? cloneArrayBuffer$1(typedArray.buffer) : typedArray.buffer;
	  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
	}

	var _cloneTypedArray = cloneTypedArray$1;

	var cloneArrayBuffer = _cloneArrayBuffer,
	    cloneDataView = _cloneDataView,
	    cloneRegExp = _cloneRegExp,
	    cloneSymbol = _cloneSymbol,
	    cloneTypedArray = _cloneTypedArray;

	/** `Object#toString` result references. */
	var boolTag$1 = '[object Boolean]',
	    dateTag$1 = '[object Date]',
	    mapTag$2 = '[object Map]',
	    numberTag$1 = '[object Number]',
	    regexpTag$1 = '[object RegExp]',
	    setTag$2 = '[object Set]',
	    stringTag$1 = '[object String]',
	    symbolTag$2 = '[object Symbol]';

	var arrayBufferTag$1 = '[object ArrayBuffer]',
	    dataViewTag$1 = '[object DataView]',
	    float32Tag$1 = '[object Float32Array]',
	    float64Tag$1 = '[object Float64Array]',
	    int8Tag$1 = '[object Int8Array]',
	    int16Tag$1 = '[object Int16Array]',
	    int32Tag$1 = '[object Int32Array]',
	    uint8Tag$1 = '[object Uint8Array]',
	    uint8ClampedTag$1 = '[object Uint8ClampedArray]',
	    uint16Tag$1 = '[object Uint16Array]',
	    uint32Tag$1 = '[object Uint32Array]';

	/**
	 * Initializes an object clone based on its `toStringTag`.
	 *
	 * **Note:** This function only supports cloning values with tags of
	 * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @param {string} tag The `toStringTag` of the object to clone.
	 * @param {boolean} [isDeep] Specify a deep clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneByTag$1(object, tag, isDeep) {
	  var Ctor = object.constructor;
	  switch (tag) {
	    case arrayBufferTag$1:
	      return cloneArrayBuffer(object);

	    case boolTag$1:
	    case dateTag$1:
	      return new Ctor(+object);

	    case dataViewTag$1:
	      return cloneDataView(object, isDeep);

	    case float32Tag$1: case float64Tag$1:
	    case int8Tag$1: case int16Tag$1: case int32Tag$1:
	    case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
	      return cloneTypedArray(object, isDeep);

	    case mapTag$2:
	      return new Ctor;

	    case numberTag$1:
	    case stringTag$1:
	      return new Ctor(object);

	    case regexpTag$1:
	      return cloneRegExp(object);

	    case setTag$2:
	      return new Ctor;

	    case symbolTag$2:
	      return cloneSymbol(object);
	  }
	}

	var _initCloneByTag = initCloneByTag$1;

	var isObject$3 = isObject_1;

	/** Built-in value references. */
	var objectCreate = Object.create;

	/**
	 * The base implementation of `_.create` without support for assigning
	 * properties to the created object.
	 *
	 * @private
	 * @param {Object} proto The object to inherit from.
	 * @returns {Object} Returns the new object.
	 */
	var baseCreate$1 = (function() {
	  function object() {}
	  return function(proto) {
	    if (!isObject$3(proto)) {
	      return {};
	    }
	    if (objectCreate) {
	      return objectCreate(proto);
	    }
	    object.prototype = proto;
	    var result = new object;
	    object.prototype = undefined;
	    return result;
	  };
	}());

	var _baseCreate = baseCreate$1;

	var baseCreate = _baseCreate,
	    getPrototype = _getPrototype,
	    isPrototype = _isPrototype;

	/**
	 * Initializes an object clone.
	 *
	 * @private
	 * @param {Object} object The object to clone.
	 * @returns {Object} Returns the initialized clone.
	 */
	function initCloneObject$1(object) {
	  return (typeof object.constructor == 'function' && !isPrototype(object))
	    ? baseCreate(getPrototype(object))
	    : {};
	}

	var _initCloneObject = initCloneObject$1;

	var getTag$2 = _getTag,
	    isObjectLike$2 = isObjectLike_1;

	/** `Object#toString` result references. */
	var mapTag$1 = '[object Map]';

	/**
	 * The base implementation of `_.isMap` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 */
	function baseIsMap$1(value) {
	  return isObjectLike$2(value) && getTag$2(value) == mapTag$1;
	}

	var _baseIsMap = baseIsMap$1;

	var baseIsMap = _baseIsMap,
	    baseUnary$1 = _baseUnary,
	    nodeUtil$1 = _nodeUtil$1.exports;

	/* Node.js helper references. */
	var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;

	/**
	 * Checks if `value` is classified as a `Map` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a map, else `false`.
	 * @example
	 *
	 * _.isMap(new Map);
	 * // => true
	 *
	 * _.isMap(new WeakMap);
	 * // => false
	 */
	var isMap$1 = nodeIsMap ? baseUnary$1(nodeIsMap) : baseIsMap;

	var isMap_1 = isMap$1;

	var getTag$1 = _getTag,
	    isObjectLike$1 = isObjectLike_1;

	/** `Object#toString` result references. */
	var setTag$1 = '[object Set]';

	/**
	 * The base implementation of `_.isSet` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 */
	function baseIsSet$1(value) {
	  return isObjectLike$1(value) && getTag$1(value) == setTag$1;
	}

	var _baseIsSet = baseIsSet$1;

	var baseIsSet = _baseIsSet,
	    baseUnary = _baseUnary,
	    nodeUtil = _nodeUtil$1.exports;

	/* Node.js helper references. */
	var nodeIsSet = nodeUtil && nodeUtil.isSet;

	/**
	 * Checks if `value` is classified as a `Set` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a set, else `false`.
	 * @example
	 *
	 * _.isSet(new Set);
	 * // => true
	 *
	 * _.isSet(new WeakSet);
	 * // => false
	 */
	var isSet$1 = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

	var isSet_1 = isSet$1;

	var Stack = _Stack,
	    arrayEach$1 = _arrayEach,
	    assignValue = _assignValue,
	    baseAssign = _baseAssign,
	    baseAssignIn = _baseAssignIn,
	    cloneBuffer = _cloneBuffer$1.exports,
	    copyArray = _copyArray,
	    copySymbols = _copySymbols,
	    copySymbolsIn = _copySymbolsIn,
	    getAllKeys = _getAllKeys,
	    getAllKeysIn = _getAllKeysIn,
	    getTag = _getTag,
	    initCloneArray = _initCloneArray,
	    initCloneByTag = _initCloneByTag,
	    initCloneObject = _initCloneObject,
	    isArray$1 = isArray_1,
	    isBuffer = isBuffer$2.exports,
	    isMap = isMap_1,
	    isObject$2 = isObject_1,
	    isSet = isSet_1,
	    keys$1 = keys_1,
	    keysIn = keysIn_1;

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG$1 = 1,
	    CLONE_FLAT_FLAG = 2,
	    CLONE_SYMBOLS_FLAG$1 = 4;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag$1 = '[object Symbol]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values supported by `_.clone`. */
	var cloneableTags = {};
	cloneableTags[argsTag] = cloneableTags[arrayTag] =
	cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
	cloneableTags[boolTag] = cloneableTags[dateTag] =
	cloneableTags[float32Tag] = cloneableTags[float64Tag] =
	cloneableTags[int8Tag] = cloneableTags[int16Tag] =
	cloneableTags[int32Tag] = cloneableTags[mapTag] =
	cloneableTags[numberTag] = cloneableTags[objectTag] =
	cloneableTags[regexpTag] = cloneableTags[setTag] =
	cloneableTags[stringTag] = cloneableTags[symbolTag$1] =
	cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
	cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
	cloneableTags[errorTag] = cloneableTags[funcTag] =
	cloneableTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
	 * traversed objects.
	 *
	 * @private
	 * @param {*} value The value to clone.
	 * @param {boolean} bitmask The bitmask flags.
	 *  1 - Deep clone
	 *  2 - Flatten inherited properties
	 *  4 - Clone symbols
	 * @param {Function} [customizer] The function to customize cloning.
	 * @param {string} [key] The key of `value`.
	 * @param {Object} [object] The parent object of `value`.
	 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
	 * @returns {*} Returns the cloned value.
	 */
	function baseClone$1(value, bitmask, customizer, key, object, stack) {
	  var result,
	      isDeep = bitmask & CLONE_DEEP_FLAG$1,
	      isFlat = bitmask & CLONE_FLAT_FLAG,
	      isFull = bitmask & CLONE_SYMBOLS_FLAG$1;

	  if (customizer) {
	    result = object ? customizer(value, key, object, stack) : customizer(value);
	  }
	  if (result !== undefined) {
	    return result;
	  }
	  if (!isObject$2(value)) {
	    return value;
	  }
	  var isArr = isArray$1(value);
	  if (isArr) {
	    result = initCloneArray(value);
	    if (!isDeep) {
	      return copyArray(value, result);
	    }
	  } else {
	    var tag = getTag(value),
	        isFunc = tag == funcTag || tag == genTag;

	    if (isBuffer(value)) {
	      return cloneBuffer(value, isDeep);
	    }
	    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
	      result = (isFlat || isFunc) ? {} : initCloneObject(value);
	      if (!isDeep) {
	        return isFlat
	          ? copySymbolsIn(value, baseAssignIn(result, value))
	          : copySymbols(value, baseAssign(result, value));
	      }
	    } else {
	      if (!cloneableTags[tag]) {
	        return object ? value : {};
	      }
	      result = initCloneByTag(value, tag, isDeep);
	    }
	  }
	  // Check for circular references and return its corresponding clone.
	  stack || (stack = new Stack);
	  var stacked = stack.get(value);
	  if (stacked) {
	    return stacked;
	  }
	  stack.set(value, result);

	  if (isSet(value)) {
	    value.forEach(function(subValue) {
	      result.add(baseClone$1(subValue, bitmask, customizer, subValue, value, stack));
	    });
	  } else if (isMap(value)) {
	    value.forEach(function(subValue, key) {
	      result.set(key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
	    });
	  }

	  var keysFunc = isFull
	    ? (isFlat ? getAllKeysIn : getAllKeys)
	    : (isFlat ? keysIn : keys$1);

	  var props = isArr ? undefined : keysFunc(value);
	  arrayEach$1(props || value, function(subValue, key) {
	    if (props) {
	      key = subValue;
	      subValue = value[key];
	    }
	    // Recursively populate clone (susceptible to call stack limits).
	    assignValue(result, key, baseClone$1(subValue, bitmask, customizer, key, value, stack));
	  });
	  return result;
	}

	var _baseClone = baseClone$1;

	var baseClone = _baseClone;

	/** Used to compose bitmasks for cloning. */
	var CLONE_DEEP_FLAG = 1,
	    CLONE_SYMBOLS_FLAG = 4;

	/**
	 * This method is like `_.clone` except that it recursively clones `value`.
	 *
	 * @static
	 * @memberOf _
	 * @since 1.0.0
	 * @category Lang
	 * @param {*} value The value to recursively clone.
	 * @returns {*} Returns the deep cloned value.
	 * @see _.clone
	 * @example
	 *
	 * var objects = [{ 'a': 1 }, { 'b': 2 }];
	 *
	 * var deep = _.cloneDeep(objects);
	 * console.log(deep[0] === objects[0]);
	 * // => false
	 */
	function cloneDeep(value) {
	  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
	}

	var cloneDeep_1 = cloneDeep;

	/**
	 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */

	function createBaseFor$1(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	var _createBaseFor = createBaseFor$1;

	var createBaseFor = _createBaseFor;

	/**
	 * The base implementation of `baseForOwn` which iterates over `object`
	 * properties returned by `keysFunc` and invokes `iteratee` for each property.
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor$1 = createBaseFor();

	var _baseFor = baseFor$1;

	var baseFor = _baseFor,
	    keys = keys_1;

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn$1(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	var _baseForOwn = baseForOwn$1;

	var isArrayLike = isArrayLike_1;

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach$1(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	var _createBaseEach = createBaseEach$1;

	var baseForOwn = _baseForOwn,
	    createBaseEach = _createBaseEach;

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach$1 = createBaseEach(baseForOwn);

	var _baseEach = baseEach$1;

	/**
	 * This method returns the first argument it receives.
	 *
	 * @static
	 * @since 0.1.0
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'a': 1 };
	 *
	 * console.log(_.identity(object) === object);
	 * // => true
	 */

	function identity$1(value) {
	  return value;
	}

	var identity_1 = identity$1;

	var identity = identity_1;

	/**
	 * Casts `value` to `identity` if it's not a function.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Function} Returns cast function.
	 */
	function castFunction$1(value) {
	  return typeof value == 'function' ? value : identity;
	}

	var _castFunction = castFunction$1;

	var arrayEach = _arrayEach,
	    baseEach = _baseEach,
	    castFunction = _castFunction,
	    isArray = isArray_1;

	/**
	 * Iterates over elements of `collection` and invokes `iteratee` for each element.
	 * The iteratee is invoked with three arguments: (value, index|key, collection).
	 * Iteratee functions may exit iteration early by explicitly returning `false`.
	 *
	 * **Note:** As with other "Collections" methods, objects with a "length"
	 * property are iterated like arrays. To avoid this behavior use `_.forIn`
	 * or `_.forOwn` for object iteration.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @alias each
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 * @see _.forEachRight
	 * @example
	 *
	 * _.forEach([1, 2], function(value) {
	 *   console.log(value);
	 * });
	 * // => Logs `1` then `2`.
	 *
	 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
	 *   console.log(key);
	 * });
	 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
	 */
	function forEach(collection, iteratee) {
	  var func = isArray(collection) ? arrayEach : baseEach;
	  return func(collection, castFunction(iteratee));
	}

	var forEach_1 = forEach;

	/**
		@PelagicCreatures/MolaMola

		@author Michael Rhodes
		@license MIT
		Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes
	**/

	const ExtendedValidator = cloneDeep_1(Validator);

	const extensions = {
		extend (name, fn) {
			this[name] = fn;
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
			str += '';
			if (Object.prototype.toString.call(pattern).slice(8, -1) !== 'RegExp') {
				pattern = new RegExp(pattern, modifiers);
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
			const number = parseFloat(str);
			return isNaN(number) || number >= val
		},
		max (str, val) {
			const number = parseFloat(str);
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
	};

	forEach_1(extensions, (extend, key) => {
		ExtendedValidator[key] = extend;
	});

	/*
		Normalize value from an input.
		returns an array of values for groups and <select multiple>
	*/
	const getRealVal = (element) => {
		let value = '';

		// collection of checkboxes or other inputs results in array of values
		if (element.getAttribute('data-group')) {
			const group = element.closest('.input-group').querySelectorAll(element.getAttribute('data-group'));
			const values = [];
			for (let i = 0; i < group.length; i++) {
				if (getRealVal(group[i])) {
					values.push(getRealVal(group[i]));
				}
				if (element.hasAttribute('multiple')) {
					value = values;
				} else {
					value = values.length ? values[0] : '';
				}
			}
		} else {
			if (element.getAttribute('type') === 'checkbox' || element.getAttribute('type') === 'radio') {
				if (element.checked) {
					const v = element.getAttribute('value');
					if (v) {
						value = v;
					} else {
						value = !!element.checked;
					}
				}
			} else if (element.tagName === 'SELECT') {
				const selected = element.querySelectorAll('option:checked');
				const values = Array.from(selected).map(el => el.value);
				if (element.hasAttribute('multiple')) {
					value = Array.from(values);
				} else {
					value = values[0];
				}
			} else {
				value = element.value;
			}
		}

		return value
	};

	var root = _root;

	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */
	var now$1 = function() {
	  return root.Date.now();
	};

	var now_1 = now$1;

	/** Used to match a single whitespace character. */

	var reWhitespace = /\s/;

	/**
	 * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
	 * character of `string`.
	 *
	 * @private
	 * @param {string} string The string to inspect.
	 * @returns {number} Returns the index of the last non-whitespace character.
	 */
	function trimmedEndIndex$1(string) {
	  var index = string.length;

	  while (index-- && reWhitespace.test(string.charAt(index))) {}
	  return index;
	}

	var _trimmedEndIndex = trimmedEndIndex$1;

	var trimmedEndIndex = _trimmedEndIndex;

	/** Used to match leading whitespace. */
	var reTrimStart = /^\s+/;

	/**
	 * The base implementation of `_.trim`.
	 *
	 * @private
	 * @param {string} string The string to trim.
	 * @returns {string} Returns the trimmed string.
	 */
	function baseTrim$1(string) {
	  return string
	    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
	    : string;
	}

	var _baseTrim = baseTrim$1;

	var baseGetTag = _baseGetTag,
	    isObjectLike = isObjectLike_1;

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol$1(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && baseGetTag(value) == symbolTag);
	}

	var isSymbol_1 = isSymbol$1;

	var baseTrim = _baseTrim,
	    isObject$1 = isObject_1,
	    isSymbol = isSymbol_1;

	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;

	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;

	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;

	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;

	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */
	function toNumber$1(value) {
	  if (typeof value == 'number') {
	    return value;
	  }
	  if (isSymbol(value)) {
	    return NAN;
	  }
	  if (isObject$1(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject$1(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = baseTrim(value);
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}

	var toNumber_1 = toNumber$1;

	var isObject = isObject_1,
	    now = now_1,
	    toNumber = toNumber_1;

	/** Error message constants. */
	var FUNC_ERROR_TEXT = 'Expected a function';

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max,
	    nativeMin = Math.min;

	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */
	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  wait = toNumber(wait) || 0;
	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;

	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time;
	    // Start the timer for the trailing edge.
	    timerId = setTimeout(timerExpired, wait);
	    // Invoke the leading edge.
	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        timeWaiting = wait - timeSinceLastCall;

	    return maxing
	      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
	      : timeWaiting;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime;

	    // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.
	    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
	      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
	  }

	  function timerExpired() {
	    var time = now();
	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    }
	    // Restart the timer.
	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined;

	    // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.
	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }
	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }
	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);

	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }
	      if (maxing) {
	        // Handle invocations in a tight loop.
	        clearTimeout(timerId);
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }
	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }
	    return result;
	  }
	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}

	var debounce_1 = debounce;

	/**
		@PelagicCreatures/MolaMola

		@author Michael Rhodes
		@license MIT
		Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes
	**/

	const validationMessages = {
		isLength: 'Length between %s and %s',
		isEmail: 'Email address',
		notEmpty: 'Required',
		isPassword: 'At least one uppercase, one lowercase, and one number'
	};

	class ValidateHelper extends MolaMolaHelper {
		constructor (form) {
			super(form);

			this.valid = false;
			this.submitter = this.form.element.querySelector(this.form.element.getAttribute('data-submitter'));
			this.uniqueDebounce = null;
			this.lookupDebounce = null;

			this.inputs = Array.from(this.form.element.querySelectorAll('[data-validate]'));

			this.changeHandler = debounce_1((e) => {
				this.handleChange(e);
			}, 500);

			this.initInput(this.form.element);
			if (this.form.element.querySelector('[data-autofocus="true"]')) {
				this.form.element.querySelector('[data-autofocus="true"]').focus();
			}

			this.allInputs = Array.from(this.form.element.querySelectorAll('input, select, textarea, button'));
			for (let i = 0; i < this.allInputs.length; i++) {
				const input = this.allInputs[i];
				input.addEventListener('blur', this.changeHandler, true);
				input.addEventListener('focus', this.changeHandler, true);
				input.addEventListener('keyup', this.changeHandler, true);
				input.addEventListener('input', this.changeHandler, true);
				input.addEventListener('change', this.changeHandler, true);
			}

			this.handleChange();
		}

		destroy () {
			for (let i = 0; i < this.allInputs.length; i++) {
				const input = this.allInputs[i];
				input.removeEventListener('blur', this.changeHandler);
				input.removeEventListener('focus', this.changeHandler);
				input.removeEventListener('keyup', this.changeHandler);
				input.removeEventListener('input', this.changeHandler);
				input.removeEventListener('change', this.changeHandler);
			}
		}

		initInput (element) {
			for (let i = 0; i < this.inputs.length; i++) {
				const input = this.inputs[i];
				input.setAttribute('data-touched', false);
				input.setAttribute('data-last-value', getRealVal(input).toString());
				if (input.getAttribute('checked')) {
					input.checked = true;
				}
			}
		}

		handleChange (e) {
			if (e && e.srcElement && e.srcElement !== window) {
				const elem = e.srcElement;
				sargasso.utils.elementTools.addClass(elem.closest('form'), 'touched');
				const isDirty = elem.getAttribute('data-last-value') !== getRealVal(elem);
				elem.setAttribute('data-touched', true);
				elem.setAttribute('data-dirty', isDirty);
			}
			const errors = this.inputs.map(this.validateField.bind(this));
			Promise.all(errors).then((errors) => {
				let errorCount = 0;
				for (let i = 0; i < errors.length; i++) {
					if (errors[i] && errors[i].length) {
						errorCount += errors[i].length;
					}
				}

				if (errorCount) {
					this.valid = false;
					this.disableSubmit();
				} else {
					this.valid = true;
					this.enableSubmit();
				}
			});
		}

		getMessage (test, opts, overrideMessage) {
			let message = overrideMessage || validationMessages[test];
			if (!message) { // build a message
				message = test;
				if (opts) {
					if (Array.isArray[opts]) {
						for (let i = 0; i < opts.length; i++) {
							message += ' %s';
						}
					}
				}
			}
			if (!opts) {
				return message
			}

			if (!Array.isArray(opts)) {
				const tmp = [];
				for (const prop in opts) {
					tmp.push(opts[prop]);
				}
				opts = tmp;
			}

			let c = 0;
			return message.replace(/%s/g, function () {
				const opt = opts[c++];
				return opt ? opt.toString() : ''
			})
		}

		validateField (element) {
			return new Promise((resolve, reject) => {
				const val = getRealVal(element).toString();
				let validations = {};
				let validationMessage = {};
				let errors = [];

				try {
					validations = JSON.parse(element.getAttribute('data-validate') || '{}');
					validationMessage = JSON.parse(element.getAttribute('data-validate-message') || '{}');
				} catch (e) {
					errors = ['data-validation attribute parse error'];
				}

				if (!validations.notEmpty && !val && !errors.length) {
					return resolve()
				}

				for (const test in validations) {
					const opts = validations[test];
					if (typeof opts === 'boolean') {
						if (!ExtendedValidator[test](val)) {
							errors.push(this.getMessage(test, undefined, validationMessage[test]));
						}
					} else if (Array.isArray(opts)) {
						const myopts = opts.slice();
						myopts.unshift(val);
						if (!ExtendedValidator[test].apply(ExtendedValidator, myopts)) {
							errors.push(this.getMessage(test, opts, validationMessage[test]));
						}
					} else {
						if (!ExtendedValidator[test](val, opts)) {
							errors.push(this.getMessage(test, opts, validationMessage[test]));
						}
					}
				}

				const matchSelector = element.getAttribute('data-match');
				if (matchSelector && getRealVal(this.form.element.querySelector(matchSelector)).toString() !== getRealVal(element).toString()) {
					errors.push('Does not match');
				}

				if (!element.getAttribute('data-lookup-endpoint')) {
					this.showErrors(element, errors);
					return resolve(errors)
				}

				if (val.length > 2 && !errors.length) {
					// show last error if unchanged
					if (element.getAttribute('data-last-lookup-val') === val) {
						if (element.getAttribute('data-last-lookup-result')) {
							errors.push(element.getAttribute('data-last-lookup-result'));
						}
						this.showErrors(element, errors);
						return resolve(errors)
					} else {
						element.setAttribute('data-last-lookup-val', val);
						this.lookup(element.getAttribute('data-lookup-endpoint'), val, element.hasAttribute('data-unique'))
							.then((e) => {
								if (e) {
									element.setAttribute('data-last-lookup-result', e);
									errors.push(e);
								} else {
									element.removeAttribute('data-last-lookup-result');
								}
								this.showErrors(element, errors);
								return resolve(errors)
							});
					}
				}
			})
		}

		showErrors (element, errors) {
			const inputGroup = element.closest('.input-group');
			if (inputGroup) {
				if (errors.length) {
					sargasso.utils.elementTools.removeClass(inputGroup, 'input-ok');
					sargasso.utils.elementTools.addClass(inputGroup, 'error');
					inputGroup.getElementsByClassName('validation-help')[0].innerHTML = errors.join(', ');
				} else {
					sargasso.utils.elementTools.removeClass(inputGroup, 'error');
					sargasso.utils.elementTools.addClass(inputGroup, 'input-ok');
					inputGroup.getElementsByClassName('validation-help')[0].innerHTML = '';
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
				};
				try {
					fetch(endpoint, options)
						.then((response) => {
							if (response.status !== 200) {
								const e = new Error(response.statusText);
								e.errorCode = response.status;
								return Promise.reject(e)
							}
							return Promise.resolve(response)
						})
						.then((response) => {
							return response.json()
						})
						.then((data) => {
							let e = null;
							if (unique) {
								e = data.found ? 'Already exists' : null;
							} else {
								e = !data.found ? 'Not Found' : null;
							}
							resolve(e);
						})
						.catch((err, response) => {
							resolve('error checking unique ' + err.message);
						});
				} catch (err) {
					resolve('error checking unique' + err.message);
				}
			})
		}

		preFlight () {}

		disableSubmit () {
			this.submitter.setAttribute('disabled', true);
		}

		enableSubmit () {
			this.submitter.removeAttribute('disabled');
		}
	}

	registerHelperClass('ValidateHelper', ValidateHelper);

	/**
		@PelagicCreatures/MolaMola

		@author Michael Rhodes
		@license MIT
		Made in Barbados 🇧🇧 Copyright © 2020-2021 Michael Rhodes
	**/

	class MolaMola extends sargasso.Sargasso {
		constructor (elem, options) {
			super(elem, options);

			this.formId = this.element.getAttribute('id');
			this.endpoint = this.element.getAttribute('action');
			this.method = this.element.getAttribute('method') || 'POST';
			this.formHandlers = [];

			if (this.element.getAttribute('data-helpers')) {
				const helperClasses = this.element.getAttribute('data-helpers').split(/\s*,\s*/);
				for (let i = 0; i < helperClasses.length; i++) {
					try {
						this.registerHelper(registeredHelperClasses[helperClasses[i]]);
					} catch (e) {
						console.log('error instantiating ' + helperClasses[i], e, registeredHelperClasses);
					}
				}
			}
			if (this.element.getAttribute('data-recaptcha')) {
				this.registerHelper(ReCAPTCHAv3Helper);
			}

			if (this.element.getAttribute('data-submitter')) {
				this.registerHelper(SubmitterHelper);
			}

			if (this.element.getAttribute('data-status')) {
				this.registerHelper(StatusHelper);
			}

			if (this.element.querySelectorAll('[data-validate]').length) {
				this.registerHelper(ValidateHelper);
			}
		}

		start () {
			super.start();

			this.submitHandler = (e) => {
				e.preventDefault();

				this.serializeForm();

				Promise.all(this.tellHelpers('preFlight')).then(() => {
					this.submit();
				}).catch((err) => {
					this.tellHelpers('error', [err]);
				});
			};

			this.element.addEventListener('submit', this.submitHandler);

			this.tellHelpers('pose');
		}

		registerHelper (HelperClass) {
			this.formHandlers.push(new HelperClass(this));
		}

		getHelpersForEvent (event, params) {
			const handlers = [];
			for (let i = 0; i < this.formHandlers.length; i++) {
				if (this.formHandlers[i][event]) {
					const p = this.formHandlers[i][event].apply(this.formHandlers[i], params);
					handlers.push(p);
				}
			}
			return handlers
		}

		serializeForm () {
			this.payload = {};
			const elements = this.element.querySelectorAll('[data-payload]');
			for (let i = 0; i < elements.length; i++) {
				const element = elements[i];
				const k = element.getAttribute('name');
				if (k) { // must be named
					const v = getRealVal(element);
					this.payload[k] = v;
				}
			}
		}

		submit () {
			let url = this.endpoint;

			const options = {
				method: this.method,
				dataType: 'json',
				headers: {
					'Content-Type': 'application/json'
				}
			};

			if (this.payload) {
				if (this.method.match(/^(POST|PUT|PATCH)$/i)) {
					options.body = JSON.stringify(this.payload);
				} else {
					url += '?' + Object.keys(this.payload).map((key) => {
						return encodeURIComponent(key) + '=' + encodeURIComponent(this.payload[key])
					}).join('&');
				}
			}

			try {
				fetch(url, options)
					.then((response) => {
						if (response.status !== 200 && response.status !== 422) {
							const e = new Error(response.statusText);
							e.errorCode = response.status;
							return Promise.reject(e)
						}
						return Promise.resolve(response)
					})
					.then((response) => {
						return response.json()
					})
					.then((data) => {
						this.tellHelpers('success', [data]);
					})
					.catch((error, response) => {
						this.tellHelpers('error', [error]);
					});
			} catch (err) {
				this.tellHelpers('error', [err]);
			}
		}

		sleep () {
			this.tellHelpers('destroy');
			this.element.removeEventListener('submit', this.submitHandler);
			super.sleep();
		}

		tellHelpers (event, params) {
			return this.getHelpersForEvent(event, params)
		}
	}

	sargasso.utils.registerSargassoClass('MolaMola', MolaMola);

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

	const molaMolaUtils = {
		registerHelperClass: registerHelperClass,
		ReCAPTCHAv3Helper: ReCAPTCHAv3Helper,
		SubmitterHelper: SubmitterHelper,
		StatusHelper: StatusHelper,
		ValidateHelper: ValidateHelper
	};

	exports.MolaMola = MolaMola;
	exports.MolaMolaHelper = MolaMolaHelper;
	exports.molaMolaUtils = molaMolaUtils;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({}, SargassoModule);
