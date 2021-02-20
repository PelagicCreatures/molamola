var MolaMolaModule = (function (exports, sargasso) {
  'use strict';

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
  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  var isObject_1 = isObject;

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
  	if (n.__esModule) return n;
  	var a = Object.defineProperty({}, '__esModule', {value: true});
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

  function createCommonjsModule(fn) {
    var module = { exports: {} };
  	return fn(module, module.exports), module.exports;
  }

  function commonjsRequire (target) {
  	throw new Error('Could not dynamically require "' + target + '". Please configure the dynamicRequireTargets option of @rollup/plugin-commonjs appropriately for this require call to behave properly.');
  }

  /** Detect free variable `global` from Node.js. */

  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

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
  var now = function() {
    return _root.Date.now();
  };

  var now_1 = now;

  /** Built-in value references. */
  var Symbol$1 = _root.Symbol;

  var _Symbol = Symbol$1;

  /** Used for built-in method references. */
  var objectProto = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty = objectProto.hasOwnProperty;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString = objectProto.toString;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the raw `toStringTag`.
   */
  function getRawTag(value) {
    var isOwn = hasOwnProperty.call(value, symToStringTag),
        tag = value[symToStringTag];

    try {
      value[symToStringTag] = undefined;
      var unmasked = true;
    } catch (e) {}

    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }

  var _getRawTag = getRawTag;

  /** Used for built-in method references. */
  var objectProto$1 = Object.prototype;

  /**
   * Used to resolve the
   * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
   * of values.
   */
  var nativeObjectToString$1 = objectProto$1.toString;

  /**
   * Converts `value` to a string using `Object.prototype.toString`.
   *
   * @private
   * @param {*} value The value to convert.
   * @returns {string} Returns the converted string.
   */
  function objectToString(value) {
    return nativeObjectToString$1.call(value);
  }

  var _objectToString = objectToString;

  /** `Object#toString` result references. */
  var nullTag = '[object Null]',
      undefinedTag = '[object Undefined]';

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /**
   * The base implementation of `getTag` without fallbacks for buggy environments.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  function baseGetTag(value) {
    if (value == null) {
      return value === undefined ? undefinedTag : nullTag;
    }
    return (symToStringTag$1 && symToStringTag$1 in Object(value))
      ? _getRawTag(value)
      : _objectToString(value);
  }

  var _baseGetTag = baseGetTag;

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
  function isObjectLike(value) {
    return value != null && typeof value == 'object';
  }

  var isObjectLike_1 = isObjectLike;

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
  function isSymbol(value) {
    return typeof value == 'symbol' ||
      (isObjectLike_1(value) && _baseGetTag(value) == symbolTag);
  }

  var isSymbol_1 = isSymbol;

  /** Used as references for various `Number` constants. */
  var NAN = 0 / 0;

  /** Used to match leading and trailing whitespace. */
  var reTrim = /^\s+|\s+$/g;

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
  function toNumber(value) {
    if (typeof value == 'number') {
      return value;
    }
    if (isSymbol_1(value)) {
      return NAN;
    }
    if (isObject_1(value)) {
      var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
      value = isObject_1(other) ? (other + '') : other;
    }
    if (typeof value != 'string') {
      return value === 0 ? value : +value;
    }
    value = value.replace(reTrim, '');
    var isBinary = reIsBinary.test(value);
    return (isBinary || reIsOctal.test(value))
      ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
      : (reIsBadHex.test(value) ? NAN : +value);
  }

  var toNumber_1 = toNumber;

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
    wait = toNumber_1(wait) || 0;
    if (isObject_1(options)) {
      leading = !!options.leading;
      maxing = 'maxWait' in options;
      maxWait = maxing ? nativeMax(toNumber_1(options.maxWait) || 0, wait) : maxWait;
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
      var time = now_1();
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
      return timerId === undefined ? result : trailingEdge(now_1());
    }

    function debounced() {
      var time = now_1(),
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
   * Removes all key-value entries from the list cache.
   *
   * @private
   * @name clear
   * @memberOf ListCache
   */
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }

  var _listCacheClear = listCacheClear;

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
  function eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  var eq_1 = eq;

  /**
   * Gets the index at which the `key` is found in `array` of key-value pairs.
   *
   * @private
   * @param {Array} array The array to inspect.
   * @param {*} key The key to search for.
   * @returns {number} Returns the index of the matched value, else `-1`.
   */
  function assocIndexOf(array, key) {
    var length = array.length;
    while (length--) {
      if (eq_1(array[length][0], key)) {
        return length;
      }
    }
    return -1;
  }

  var _assocIndexOf = assocIndexOf;

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
  function listCacheDelete(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

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

  var _listCacheDelete = listCacheDelete;

  /**
   * Gets the list cache value for `key`.
   *
   * @private
   * @name get
   * @memberOf ListCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function listCacheGet(key) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    return index < 0 ? undefined : data[index][1];
  }

  var _listCacheGet = listCacheGet;

  /**
   * Checks if a list cache value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf ListCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function listCacheHas(key) {
    return _assocIndexOf(this.__data__, key) > -1;
  }

  var _listCacheHas = listCacheHas;

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
  function listCacheSet(key, value) {
    var data = this.__data__,
        index = _assocIndexOf(data, key);

    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }

  var _listCacheSet = listCacheSet;

  /**
   * Creates an list cache object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function ListCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `ListCache`.
  ListCache.prototype.clear = _listCacheClear;
  ListCache.prototype['delete'] = _listCacheDelete;
  ListCache.prototype.get = _listCacheGet;
  ListCache.prototype.has = _listCacheHas;
  ListCache.prototype.set = _listCacheSet;

  var _ListCache = ListCache;

  /**
   * Removes all key-value entries from the stack.
   *
   * @private
   * @name clear
   * @memberOf Stack
   */
  function stackClear() {
    this.__data__ = new _ListCache;
    this.size = 0;
  }

  var _stackClear = stackClear;

  /**
   * Removes `key` and its value from the stack.
   *
   * @private
   * @name delete
   * @memberOf Stack
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function stackDelete(key) {
    var data = this.__data__,
        result = data['delete'](key);

    this.size = data.size;
    return result;
  }

  var _stackDelete = stackDelete;

  /**
   * Gets the stack value for `key`.
   *
   * @private
   * @name get
   * @memberOf Stack
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function stackGet(key) {
    return this.__data__.get(key);
  }

  var _stackGet = stackGet;

  /**
   * Checks if a stack value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Stack
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function stackHas(key) {
    return this.__data__.has(key);
  }

  var _stackHas = stackHas;

  /** `Object#toString` result references. */
  var asyncTag = '[object AsyncFunction]',
      funcTag = '[object Function]',
      genTag = '[object GeneratorFunction]',
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
  function isFunction(value) {
    if (!isObject_1(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = _baseGetTag(value);
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  var isFunction_1 = isFunction;

  /** Used to detect overreaching core-js shims. */
  var coreJsData = _root['__core-js_shared__'];

  var _coreJsData = coreJsData;

  /** Used to detect methods masquerading as native. */
  var maskSrcKey = (function() {
    var uid = /[^.]+$/.exec(_coreJsData && _coreJsData.keys && _coreJsData.keys.IE_PROTO || '');
    return uid ? ('Symbol(src)_1.' + uid) : '';
  }());

  /**
   * Checks if `func` has its source masked.
   *
   * @private
   * @param {Function} func The function to check.
   * @returns {boolean} Returns `true` if `func` is masked, else `false`.
   */
  function isMasked(func) {
    return !!maskSrcKey && (maskSrcKey in func);
  }

  var _isMasked = isMasked;

  /** Used for built-in method references. */
  var funcProto = Function.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString = funcProto.toString;

  /**
   * Converts `func` to its source code.
   *
   * @private
   * @param {Function} func The function to convert.
   * @returns {string} Returns the source code.
   */
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {}
      try {
        return (func + '');
      } catch (e) {}
    }
    return '';
  }

  var _toSource = toSource;

  /**
   * Used to match `RegExp`
   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
   */
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

  /** Used to detect host constructors (Safari). */
  var reIsHostCtor = /^\[object .+?Constructor\]$/;

  /** Used for built-in method references. */
  var funcProto$1 = Function.prototype,
      objectProto$2 = Object.prototype;

  /** Used to resolve the decompiled source of functions. */
  var funcToString$1 = funcProto$1.toString;

  /** Used to check objects for own properties. */
  var hasOwnProperty$1 = objectProto$2.hasOwnProperty;

  /** Used to detect if a method is native. */
  var reIsNative = RegExp('^' +
    funcToString$1.call(hasOwnProperty$1).replace(reRegExpChar, '\\$&')
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
  function baseIsNative(value) {
    if (!isObject_1(value) || _isMasked(value)) {
      return false;
    }
    var pattern = isFunction_1(value) ? reIsNative : reIsHostCtor;
    return pattern.test(_toSource(value));
  }

  var _baseIsNative = baseIsNative;

  /**
   * Gets the value at `key` of `object`.
   *
   * @private
   * @param {Object} [object] The object to query.
   * @param {string} key The key of the property to get.
   * @returns {*} Returns the property value.
   */
  function getValue(object, key) {
    return object == null ? undefined : object[key];
  }

  var _getValue = getValue;

  /**
   * Gets the native function at `key` of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @param {string} key The key of the method to get.
   * @returns {*} Returns the function if it's native, else `undefined`.
   */
  function getNative(object, key) {
    var value = _getValue(object, key);
    return _baseIsNative(value) ? value : undefined;
  }

  var _getNative = getNative;

  /* Built-in method references that are verified to be native. */
  var Map = _getNative(_root, 'Map');

  var _Map = Map;

  /* Built-in method references that are verified to be native. */
  var nativeCreate = _getNative(Object, 'create');

  var _nativeCreate = nativeCreate;

  /**
   * Removes all key-value entries from the hash.
   *
   * @private
   * @name clear
   * @memberOf Hash
   */
  function hashClear() {
    this.__data__ = _nativeCreate ? _nativeCreate(null) : {};
    this.size = 0;
  }

  var _hashClear = hashClear;

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
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }

  var _hashDelete = hashDelete;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED = '__lodash_hash_undefined__';

  /** Used for built-in method references. */
  var objectProto$3 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$2 = objectProto$3.hasOwnProperty;

  /**
   * Gets the hash value for `key`.
   *
   * @private
   * @name get
   * @memberOf Hash
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function hashGet(key) {
    var data = this.__data__;
    if (_nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? undefined : result;
    }
    return hasOwnProperty$2.call(data, key) ? data[key] : undefined;
  }

  var _hashGet = hashGet;

  /** Used for built-in method references. */
  var objectProto$4 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$3 = objectProto$4.hasOwnProperty;

  /**
   * Checks if a hash value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf Hash
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function hashHas(key) {
    var data = this.__data__;
    return _nativeCreate ? (data[key] !== undefined) : hasOwnProperty$3.call(data, key);
  }

  var _hashHas = hashHas;

  /** Used to stand-in for `undefined` hash values. */
  var HASH_UNDEFINED$1 = '__lodash_hash_undefined__';

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
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = (_nativeCreate && value === undefined) ? HASH_UNDEFINED$1 : value;
    return this;
  }

  var _hashSet = hashSet;

  /**
   * Creates a hash object.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Hash(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `Hash`.
  Hash.prototype.clear = _hashClear;
  Hash.prototype['delete'] = _hashDelete;
  Hash.prototype.get = _hashGet;
  Hash.prototype.has = _hashHas;
  Hash.prototype.set = _hashSet;

  var _Hash = Hash;

  /**
   * Removes all key-value entries from the map.
   *
   * @private
   * @name clear
   * @memberOf MapCache
   */
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      'hash': new _Hash,
      'map': new (_Map || _ListCache),
      'string': new _Hash
    };
  }

  var _mapCacheClear = mapCacheClear;

  /**
   * Checks if `value` is suitable for use as unique object key.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
   */
  function isKeyable(value) {
    var type = typeof value;
    return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
      ? (value !== '__proto__')
      : (value === null);
  }

  var _isKeyable = isKeyable;

  /**
   * Gets the data for `map`.
   *
   * @private
   * @param {Object} map The map to query.
   * @param {string} key The reference key.
   * @returns {*} Returns the map data.
   */
  function getMapData(map, key) {
    var data = map.__data__;
    return _isKeyable(key)
      ? data[typeof key == 'string' ? 'string' : 'hash']
      : data.map;
  }

  var _getMapData = getMapData;

  /**
   * Removes `key` and its value from the map.
   *
   * @private
   * @name delete
   * @memberOf MapCache
   * @param {string} key The key of the value to remove.
   * @returns {boolean} Returns `true` if the entry was removed, else `false`.
   */
  function mapCacheDelete(key) {
    var result = _getMapData(this, key)['delete'](key);
    this.size -= result ? 1 : 0;
    return result;
  }

  var _mapCacheDelete = mapCacheDelete;

  /**
   * Gets the map value for `key`.
   *
   * @private
   * @name get
   * @memberOf MapCache
   * @param {string} key The key of the value to get.
   * @returns {*} Returns the entry value.
   */
  function mapCacheGet(key) {
    return _getMapData(this, key).get(key);
  }

  var _mapCacheGet = mapCacheGet;

  /**
   * Checks if a map value for `key` exists.
   *
   * @private
   * @name has
   * @memberOf MapCache
   * @param {string} key The key of the entry to check.
   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
   */
  function mapCacheHas(key) {
    return _getMapData(this, key).has(key);
  }

  var _mapCacheHas = mapCacheHas;

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
  function mapCacheSet(key, value) {
    var data = _getMapData(this, key),
        size = data.size;

    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }

  var _mapCacheSet = mapCacheSet;

  /**
   * Creates a map cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function MapCache(entries) {
    var index = -1,
        length = entries == null ? 0 : entries.length;

    this.clear();
    while (++index < length) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }

  // Add methods to `MapCache`.
  MapCache.prototype.clear = _mapCacheClear;
  MapCache.prototype['delete'] = _mapCacheDelete;
  MapCache.prototype.get = _mapCacheGet;
  MapCache.prototype.has = _mapCacheHas;
  MapCache.prototype.set = _mapCacheSet;

  var _MapCache = MapCache;

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
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof _ListCache) {
      var pairs = data.__data__;
      if (!_Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new _MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }

  var _stackSet = stackSet;

  /**
   * Creates a stack cache object to store key-value pairs.
   *
   * @private
   * @constructor
   * @param {Array} [entries] The key-value pairs to cache.
   */
  function Stack(entries) {
    var data = this.__data__ = new _ListCache(entries);
    this.size = data.size;
  }

  // Add methods to `Stack`.
  Stack.prototype.clear = _stackClear;
  Stack.prototype['delete'] = _stackDelete;
  Stack.prototype.get = _stackGet;
  Stack.prototype.has = _stackHas;
  Stack.prototype.set = _stackSet;

  var _Stack = Stack;

  /**
   * A specialized version of `_.forEach` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns `array`.
   */
  function arrayEach(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length;

    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }

  var _arrayEach = arrayEach;

  var defineProperty = (function() {
    try {
      var func = _getNative(Object, 'defineProperty');
      func({}, '', {});
      return func;
    } catch (e) {}
  }());

  var _defineProperty = defineProperty;

  /**
   * The base implementation of `assignValue` and `assignMergeValue` without
   * value checks.
   *
   * @private
   * @param {Object} object The object to modify.
   * @param {string} key The key of the property to assign.
   * @param {*} value The value to assign.
   */
  function baseAssignValue(object, key, value) {
    if (key == '__proto__' && _defineProperty) {
      _defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      });
    } else {
      object[key] = value;
    }
  }

  var _baseAssignValue = baseAssignValue;

  /** Used for built-in method references. */
  var objectProto$5 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$4 = objectProto$5.hasOwnProperty;

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
  function assignValue(object, key, value) {
    var objValue = object[key];
    if (!(hasOwnProperty$4.call(object, key) && eq_1(objValue, value)) ||
        (value === undefined && !(key in object))) {
      _baseAssignValue(object, key, value);
    }
  }

  var _assignValue = assignValue;

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
  function copyObject(source, props, object, customizer) {
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
        _baseAssignValue(object, key, newValue);
      } else {
        _assignValue(object, key, newValue);
      }
    }
    return object;
  }

  var _copyObject = copyObject;

  /**
   * The base implementation of `_.times` without support for iteratee shorthands
   * or max array length checks.
   *
   * @private
   * @param {number} n The number of times to invoke `iteratee`.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array} Returns the array of results.
   */
  function baseTimes(n, iteratee) {
    var index = -1,
        result = Array(n);

    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }

  var _baseTimes = baseTimes;

  /** `Object#toString` result references. */
  var argsTag = '[object Arguments]';

  /**
   * The base implementation of `_.isArguments`.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is an `arguments` object,
   */
  function baseIsArguments(value) {
    return isObjectLike_1(value) && _baseGetTag(value) == argsTag;
  }

  var _baseIsArguments = baseIsArguments;

  /** Used for built-in method references. */
  var objectProto$6 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$5 = objectProto$6.hasOwnProperty;

  /** Built-in value references. */
  var propertyIsEnumerable = objectProto$6.propertyIsEnumerable;

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
  var isArguments = _baseIsArguments(function() { return arguments; }()) ? _baseIsArguments : function(value) {
    return isObjectLike_1(value) && hasOwnProperty$5.call(value, 'callee') &&
      !propertyIsEnumerable.call(value, 'callee');
  };

  var isArguments_1 = isArguments;

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
  var isArray = Array.isArray;

  var isArray_1 = isArray;

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

  var isBuffer_1 = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined;

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
  var isBuffer = nativeIsBuffer || stubFalse_1;

  module.exports = isBuffer;
  });

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER = 9007199254740991;

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
  function isIndex(value, length) {
    var type = typeof value;
    length = length == null ? MAX_SAFE_INTEGER : length;

    return !!length &&
      (type == 'number' ||
        (type != 'symbol' && reIsUint.test(value))) &&
          (value > -1 && value % 1 == 0 && value < length);
  }

  var _isIndex = isIndex;

  /** Used as references for various `Number` constants. */
  var MAX_SAFE_INTEGER$1 = 9007199254740991;

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
  function isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER$1;
  }

  var isLength_1 = isLength;

  /** `Object#toString` result references. */
  var argsTag$1 = '[object Arguments]',
      arrayTag = '[object Array]',
      boolTag = '[object Boolean]',
      dateTag = '[object Date]',
      errorTag = '[object Error]',
      funcTag$1 = '[object Function]',
      mapTag = '[object Map]',
      numberTag = '[object Number]',
      objectTag = '[object Object]',
      regexpTag = '[object RegExp]',
      setTag = '[object Set]',
      stringTag = '[object String]',
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

  /** Used to identify `toStringTag` values of typed arrays. */
  var typedArrayTags = {};
  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
  typedArrayTags[uint32Tag] = true;
  typedArrayTags[argsTag$1] = typedArrayTags[arrayTag] =
  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
  typedArrayTags[errorTag] = typedArrayTags[funcTag$1] =
  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
  typedArrayTags[setTag] = typedArrayTags[stringTag] =
  typedArrayTags[weakMapTag] = false;

  /**
   * The base implementation of `_.isTypedArray` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
   */
  function baseIsTypedArray(value) {
    return isObjectLike_1(value) &&
      isLength_1(value.length) && !!typedArrayTags[_baseGetTag(value)];
  }

  var _baseIsTypedArray = baseIsTypedArray;

  /**
   * The base implementation of `_.unary` without support for storing metadata.
   *
   * @private
   * @param {Function} func The function to cap arguments for.
   * @returns {Function} Returns the new capped function.
   */
  function baseUnary(func) {
    return function(value) {
      return func(value);
    };
  }

  var _baseUnary = baseUnary;

  var _nodeUtil = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Detect free variable `process` from Node.js. */
  var freeProcess = moduleExports && _freeGlobal.process;

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
  });

  /* Node.js helper references. */
  var nodeIsTypedArray = _nodeUtil && _nodeUtil.isTypedArray;

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
  var isTypedArray = nodeIsTypedArray ? _baseUnary(nodeIsTypedArray) : _baseIsTypedArray;

  var isTypedArray_1 = isTypedArray;

  /** Used for built-in method references. */
  var objectProto$7 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$6 = objectProto$7.hasOwnProperty;

  /**
   * Creates an array of the enumerable property names of the array-like `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @param {boolean} inherited Specify returning inherited property names.
   * @returns {Array} Returns the array of property names.
   */
  function arrayLikeKeys(value, inherited) {
    var isArr = isArray_1(value),
        isArg = !isArr && isArguments_1(value),
        isBuff = !isArr && !isArg && isBuffer_1(value),
        isType = !isArr && !isArg && !isBuff && isTypedArray_1(value),
        skipIndexes = isArr || isArg || isBuff || isType,
        result = skipIndexes ? _baseTimes(value.length, String) : [],
        length = result.length;

    for (var key in value) {
      if ((inherited || hasOwnProperty$6.call(value, key)) &&
          !(skipIndexes && (
             // Safari 9 has enumerable `arguments.length` in strict mode.
             key == 'length' ||
             // Node.js 0.10 has enumerable non-index properties on buffers.
             (isBuff && (key == 'offset' || key == 'parent')) ||
             // PhantomJS 2 has enumerable non-index properties on typed arrays.
             (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
             // Skip index properties.
             _isIndex(key, length)
          ))) {
        result.push(key);
      }
    }
    return result;
  }

  var _arrayLikeKeys = arrayLikeKeys;

  /** Used for built-in method references. */
  var objectProto$8 = Object.prototype;

  /**
   * Checks if `value` is likely a prototype object.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
   */
  function isPrototype(value) {
    var Ctor = value && value.constructor,
        proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto$8;

    return value === proto;
  }

  var _isPrototype = isPrototype;

  /**
   * Creates a unary function that invokes `func` with its argument transformed.
   *
   * @private
   * @param {Function} func The function to wrap.
   * @param {Function} transform The argument transform.
   * @returns {Function} Returns the new function.
   */
  function overArg(func, transform) {
    return function(arg) {
      return func(transform(arg));
    };
  }

  var _overArg = overArg;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeKeys = _overArg(Object.keys, Object);

  var _nativeKeys = nativeKeys;

  /** Used for built-in method references. */
  var objectProto$9 = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$7 = objectProto$9.hasOwnProperty;

  /**
   * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeys(object) {
    if (!_isPrototype(object)) {
      return _nativeKeys(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (hasOwnProperty$7.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeys = baseKeys;

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
  function isArrayLike(value) {
    return value != null && isLength_1(value.length) && !isFunction_1(value);
  }

  var isArrayLike_1 = isArrayLike;

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
  function keys(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object) : _baseKeys(object);
  }

  var keys_1 = keys;

  /**
   * The base implementation of `_.assign` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssign(object, source) {
    return object && _copyObject(source, keys_1(source), object);
  }

  var _baseAssign = baseAssign;

  /**
   * This function is like
   * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
   * except that it includes inherited enumerable properties.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function nativeKeysIn(object) {
    var result = [];
    if (object != null) {
      for (var key in Object(object)) {
        result.push(key);
      }
    }
    return result;
  }

  var _nativeKeysIn = nativeKeysIn;

  /** Used for built-in method references. */
  var objectProto$a = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$8 = objectProto$a.hasOwnProperty;

  /**
   * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names.
   */
  function baseKeysIn(object) {
    if (!isObject_1(object)) {
      return _nativeKeysIn(object);
    }
    var isProto = _isPrototype(object),
        result = [];

    for (var key in object) {
      if (!(key == 'constructor' && (isProto || !hasOwnProperty$8.call(object, key)))) {
        result.push(key);
      }
    }
    return result;
  }

  var _baseKeysIn = baseKeysIn;

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
  function keysIn(object) {
    return isArrayLike_1(object) ? _arrayLikeKeys(object, true) : _baseKeysIn(object);
  }

  var keysIn_1 = keysIn;

  /**
   * The base implementation of `_.assignIn` without support for multiple sources
   * or `customizer` functions.
   *
   * @private
   * @param {Object} object The destination object.
   * @param {Object} source The source object.
   * @returns {Object} Returns `object`.
   */
  function baseAssignIn(object, source) {
    return object && _copyObject(source, keysIn_1(source), object);
  }

  var _baseAssignIn = baseAssignIn;

  var _cloneBuffer = createCommonjsModule(function (module, exports) {
  /** Detect free variable `exports`. */
  var freeExports = 'object' == 'object' && exports && !exports.nodeType && exports;

  /** Detect free variable `module`. */
  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

  /** Detect the popular CommonJS extension `module.exports`. */
  var moduleExports = freeModule && freeModule.exports === freeExports;

  /** Built-in value references. */
  var Buffer = moduleExports ? _root.Buffer : undefined,
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
  });

  /**
   * Copies the values of `source` to `array`.
   *
   * @private
   * @param {Array} source The array to copy values from.
   * @param {Array} [array=[]] The array to copy values to.
   * @returns {Array} Returns `array`.
   */
  function copyArray(source, array) {
    var index = -1,
        length = source.length;

    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  var _copyArray = copyArray;

  /**
   * A specialized version of `_.filter` for arrays without support for
   * iteratee shorthands.
   *
   * @private
   * @param {Array} [array] The array to iterate over.
   * @param {Function} predicate The function invoked per iteration.
   * @returns {Array} Returns the new filtered array.
   */
  function arrayFilter(array, predicate) {
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

  var _arrayFilter = arrayFilter;

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
  function stubArray() {
    return [];
  }

  var stubArray_1 = stubArray;

  /** Used for built-in method references. */
  var objectProto$b = Object.prototype;

  /** Built-in value references. */
  var propertyIsEnumerable$1 = objectProto$b.propertyIsEnumerable;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbols = !nativeGetSymbols ? stubArray_1 : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return _arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable$1.call(object, symbol);
    });
  };

  var _getSymbols = getSymbols;

  /**
   * Copies own symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbols(source, object) {
    return _copyObject(source, _getSymbols(source), object);
  }

  var _copySymbols = copySymbols;

  /**
   * Appends the elements of `values` to `array`.
   *
   * @private
   * @param {Array} array The array to modify.
   * @param {Array} values The values to append.
   * @returns {Array} Returns `array`.
   */
  function arrayPush(array, values) {
    var index = -1,
        length = values.length,
        offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }

  var _arrayPush = arrayPush;

  /** Built-in value references. */
  var getPrototype = _overArg(Object.getPrototypeOf, Object);

  var _getPrototype = getPrototype;

  /* Built-in method references for those with the same name as other `lodash` methods. */
  var nativeGetSymbols$1 = Object.getOwnPropertySymbols;

  /**
   * Creates an array of the own and inherited enumerable symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of symbols.
   */
  var getSymbolsIn = !nativeGetSymbols$1 ? stubArray_1 : function(object) {
    var result = [];
    while (object) {
      _arrayPush(result, _getSymbols(object));
      object = _getPrototype(object);
    }
    return result;
  };

  var _getSymbolsIn = getSymbolsIn;

  /**
   * Copies own and inherited symbols of `source` to `object`.
   *
   * @private
   * @param {Object} source The object to copy symbols from.
   * @param {Object} [object={}] The object to copy symbols to.
   * @returns {Object} Returns `object`.
   */
  function copySymbolsIn(source, object) {
    return _copyObject(source, _getSymbolsIn(source), object);
  }

  var _copySymbolsIn = copySymbolsIn;

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
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray_1(object) ? result : _arrayPush(result, symbolsFunc(object));
  }

  var _baseGetAllKeys = baseGetAllKeys;

  /**
   * Creates an array of own enumerable property names and symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeys(object) {
    return _baseGetAllKeys(object, keys_1, _getSymbols);
  }

  var _getAllKeys = getAllKeys;

  /**
   * Creates an array of own and inherited enumerable property names and
   * symbols of `object`.
   *
   * @private
   * @param {Object} object The object to query.
   * @returns {Array} Returns the array of property names and symbols.
   */
  function getAllKeysIn(object) {
    return _baseGetAllKeys(object, keysIn_1, _getSymbolsIn);
  }

  var _getAllKeysIn = getAllKeysIn;

  /* Built-in method references that are verified to be native. */
  var DataView = _getNative(_root, 'DataView');

  var _DataView = DataView;

  /* Built-in method references that are verified to be native. */
  var Promise$1 = _getNative(_root, 'Promise');

  var _Promise = Promise$1;

  /* Built-in method references that are verified to be native. */
  var Set = _getNative(_root, 'Set');

  var _Set = Set;

  /* Built-in method references that are verified to be native. */
  var WeakMap$1 = _getNative(_root, 'WeakMap');

  var _WeakMap = WeakMap$1;

  /** `Object#toString` result references. */
  var mapTag$1 = '[object Map]',
      objectTag$1 = '[object Object]',
      promiseTag = '[object Promise]',
      setTag$1 = '[object Set]',
      weakMapTag$1 = '[object WeakMap]';

  var dataViewTag$1 = '[object DataView]';

  /** Used to detect maps, sets, and weakmaps. */
  var dataViewCtorString = _toSource(_DataView),
      mapCtorString = _toSource(_Map),
      promiseCtorString = _toSource(_Promise),
      setCtorString = _toSource(_Set),
      weakMapCtorString = _toSource(_WeakMap);

  /**
   * Gets the `toStringTag` of `value`.
   *
   * @private
   * @param {*} value The value to query.
   * @returns {string} Returns the `toStringTag`.
   */
  var getTag = _baseGetTag;

  // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
  if ((_DataView && getTag(new _DataView(new ArrayBuffer(1))) != dataViewTag$1) ||
      (_Map && getTag(new _Map) != mapTag$1) ||
      (_Promise && getTag(_Promise.resolve()) != promiseTag) ||
      (_Set && getTag(new _Set) != setTag$1) ||
      (_WeakMap && getTag(new _WeakMap) != weakMapTag$1)) {
    getTag = function(value) {
      var result = _baseGetTag(value),
          Ctor = result == objectTag$1 ? value.constructor : undefined,
          ctorString = Ctor ? _toSource(Ctor) : '';

      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString: return dataViewTag$1;
          case mapCtorString: return mapTag$1;
          case promiseCtorString: return promiseTag;
          case setCtorString: return setTag$1;
          case weakMapCtorString: return weakMapTag$1;
        }
      }
      return result;
    };
  }

  var _getTag = getTag;

  /** Used for built-in method references. */
  var objectProto$c = Object.prototype;

  /** Used to check objects for own properties. */
  var hasOwnProperty$9 = objectProto$c.hasOwnProperty;

  /**
   * Initializes an array clone.
   *
   * @private
   * @param {Array} array The array to clone.
   * @returns {Array} Returns the initialized clone.
   */
  function initCloneArray(array) {
    var length = array.length,
        result = new array.constructor(length);

    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] == 'string' && hasOwnProperty$9.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  var _initCloneArray = initCloneArray;

  /** Built-in value references. */
  var Uint8Array = _root.Uint8Array;

  var _Uint8Array = Uint8Array;

  /**
   * Creates a clone of `arrayBuffer`.
   *
   * @private
   * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
   * @returns {ArrayBuffer} Returns the cloned array buffer.
   */
  function cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new _Uint8Array(result).set(new _Uint8Array(arrayBuffer));
    return result;
  }

  var _cloneArrayBuffer = cloneArrayBuffer;

  /**
   * Creates a clone of `dataView`.
   *
   * @private
   * @param {Object} dataView The data view to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned data view.
   */
  function cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }

  var _cloneDataView = cloneDataView;

  /** Used to match `RegExp` flags from their coerced string values. */
  var reFlags = /\w*$/;

  /**
   * Creates a clone of `regexp`.
   *
   * @private
   * @param {Object} regexp The regexp to clone.
   * @returns {Object} Returns the cloned regexp.
   */
  function cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }

  var _cloneRegExp = cloneRegExp;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

  /**
   * Creates a clone of the `symbol` object.
   *
   * @private
   * @param {Object} symbol The symbol object to clone.
   * @returns {Object} Returns the cloned symbol object.
   */
  function cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }

  var _cloneSymbol = cloneSymbol;

  /**
   * Creates a clone of `typedArray`.
   *
   * @private
   * @param {Object} typedArray The typed array to clone.
   * @param {boolean} [isDeep] Specify a deep clone.
   * @returns {Object} Returns the cloned typed array.
   */
  function cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? _cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }

  var _cloneTypedArray = cloneTypedArray;

  /** `Object#toString` result references. */
  var boolTag$1 = '[object Boolean]',
      dateTag$1 = '[object Date]',
      mapTag$2 = '[object Map]',
      numberTag$1 = '[object Number]',
      regexpTag$1 = '[object RegExp]',
      setTag$2 = '[object Set]',
      stringTag$1 = '[object String]',
      symbolTag$1 = '[object Symbol]';

  var arrayBufferTag$1 = '[object ArrayBuffer]',
      dataViewTag$2 = '[object DataView]',
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
  function initCloneByTag(object, tag, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag$1:
        return _cloneArrayBuffer(object);

      case boolTag$1:
      case dateTag$1:
        return new Ctor(+object);

      case dataViewTag$2:
        return _cloneDataView(object, isDeep);

      case float32Tag$1: case float64Tag$1:
      case int8Tag$1: case int16Tag$1: case int32Tag$1:
      case uint8Tag$1: case uint8ClampedTag$1: case uint16Tag$1: case uint32Tag$1:
        return _cloneTypedArray(object, isDeep);

      case mapTag$2:
        return new Ctor;

      case numberTag$1:
      case stringTag$1:
        return new Ctor(object);

      case regexpTag$1:
        return _cloneRegExp(object);

      case setTag$2:
        return new Ctor;

      case symbolTag$1:
        return _cloneSymbol(object);
    }
  }

  var _initCloneByTag = initCloneByTag;

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
  var baseCreate = (function() {
    function object() {}
    return function(proto) {
      if (!isObject_1(proto)) {
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

  var _baseCreate = baseCreate;

  /**
   * Initializes an object clone.
   *
   * @private
   * @param {Object} object The object to clone.
   * @returns {Object} Returns the initialized clone.
   */
  function initCloneObject(object) {
    return (typeof object.constructor == 'function' && !_isPrototype(object))
      ? _baseCreate(_getPrototype(object))
      : {};
  }

  var _initCloneObject = initCloneObject;

  /** `Object#toString` result references. */
  var mapTag$3 = '[object Map]';

  /**
   * The base implementation of `_.isMap` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a map, else `false`.
   */
  function baseIsMap(value) {
    return isObjectLike_1(value) && _getTag(value) == mapTag$3;
  }

  var _baseIsMap = baseIsMap;

  /* Node.js helper references. */
  var nodeIsMap = _nodeUtil && _nodeUtil.isMap;

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
  var isMap = nodeIsMap ? _baseUnary(nodeIsMap) : _baseIsMap;

  var isMap_1 = isMap;

  /** `Object#toString` result references. */
  var setTag$3 = '[object Set]';

  /**
   * The base implementation of `_.isSet` without Node.js optimizations.
   *
   * @private
   * @param {*} value The value to check.
   * @returns {boolean} Returns `true` if `value` is a set, else `false`.
   */
  function baseIsSet(value) {
    return isObjectLike_1(value) && _getTag(value) == setTag$3;
  }

  var _baseIsSet = baseIsSet;

  /* Node.js helper references. */
  var nodeIsSet = _nodeUtil && _nodeUtil.isSet;

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
  var isSet = nodeIsSet ? _baseUnary(nodeIsSet) : _baseIsSet;

  var isSet_1 = isSet;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG = 1,
      CLONE_FLAT_FLAG = 2,
      CLONE_SYMBOLS_FLAG = 4;

  /** `Object#toString` result references. */
  var argsTag$2 = '[object Arguments]',
      arrayTag$1 = '[object Array]',
      boolTag$2 = '[object Boolean]',
      dateTag$2 = '[object Date]',
      errorTag$1 = '[object Error]',
      funcTag$2 = '[object Function]',
      genTag$1 = '[object GeneratorFunction]',
      mapTag$4 = '[object Map]',
      numberTag$2 = '[object Number]',
      objectTag$2 = '[object Object]',
      regexpTag$2 = '[object RegExp]',
      setTag$4 = '[object Set]',
      stringTag$2 = '[object String]',
      symbolTag$2 = '[object Symbol]',
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

  /** Used to identify `toStringTag` values supported by `_.clone`. */
  var cloneableTags = {};
  cloneableTags[argsTag$2] = cloneableTags[arrayTag$1] =
  cloneableTags[arrayBufferTag$2] = cloneableTags[dataViewTag$3] =
  cloneableTags[boolTag$2] = cloneableTags[dateTag$2] =
  cloneableTags[float32Tag$2] = cloneableTags[float64Tag$2] =
  cloneableTags[int8Tag$2] = cloneableTags[int16Tag$2] =
  cloneableTags[int32Tag$2] = cloneableTags[mapTag$4] =
  cloneableTags[numberTag$2] = cloneableTags[objectTag$2] =
  cloneableTags[regexpTag$2] = cloneableTags[setTag$4] =
  cloneableTags[stringTag$2] = cloneableTags[symbolTag$2] =
  cloneableTags[uint8Tag$2] = cloneableTags[uint8ClampedTag$2] =
  cloneableTags[uint16Tag$2] = cloneableTags[uint32Tag$2] = true;
  cloneableTags[errorTag$1] = cloneableTags[funcTag$2] =
  cloneableTags[weakMapTag$2] = false;

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
  function baseClone(value, bitmask, customizer, key, object, stack) {
    var result,
        isDeep = bitmask & CLONE_DEEP_FLAG,
        isFlat = bitmask & CLONE_FLAT_FLAG,
        isFull = bitmask & CLONE_SYMBOLS_FLAG;

    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!isObject_1(value)) {
      return value;
    }
    var isArr = isArray_1(value);
    if (isArr) {
      result = _initCloneArray(value);
      if (!isDeep) {
        return _copyArray(value, result);
      }
    } else {
      var tag = _getTag(value),
          isFunc = tag == funcTag$2 || tag == genTag$1;

      if (isBuffer_1(value)) {
        return _cloneBuffer(value, isDeep);
      }
      if (tag == objectTag$2 || tag == argsTag$2 || (isFunc && !object)) {
        result = (isFlat || isFunc) ? {} : _initCloneObject(value);
        if (!isDeep) {
          return isFlat
            ? _copySymbolsIn(value, _baseAssignIn(result, value))
            : _copySymbols(value, _baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = _initCloneByTag(value, tag, isDeep);
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new _Stack);
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);

    if (isSet_1(value)) {
      value.forEach(function(subValue) {
        result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
      });
    } else if (isMap_1(value)) {
      value.forEach(function(subValue, key) {
        result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
      });
    }

    var keysFunc = isFull
      ? (isFlat ? _getAllKeysIn : _getAllKeys)
      : (isFlat ? keysIn_1 : keys_1);

    var props = isArr ? undefined : keysFunc(value);
    _arrayEach(props || value, function(subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      // Recursively populate clone (susceptible to call stack limits).
      _assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
    });
    return result;
  }

  var _baseClone = baseClone;

  /** Used to compose bitmasks for cloning. */
  var CLONE_DEEP_FLAG$1 = 1,
      CLONE_SYMBOLS_FLAG$1 = 4;

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
    return _baseClone(value, CLONE_DEEP_FLAG$1 | CLONE_SYMBOLS_FLAG$1);
  }

  var cloneDeep_1 = cloneDeep;

  /**
   * Creates a base function for methods like `_.forIn` and `_.forOwn`.
   *
   * @private
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseFor(fromRight) {
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

  var _createBaseFor = createBaseFor;

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
  var baseFor = _createBaseFor();

  var _baseFor = baseFor;

  /**
   * The base implementation of `_.forOwn` without support for iteratee shorthands.
   *
   * @private
   * @param {Object} object The object to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Object} Returns `object`.
   */
  function baseForOwn(object, iteratee) {
    return object && _baseFor(object, iteratee, keys_1);
  }

  var _baseForOwn = baseForOwn;

  /**
   * Creates a `baseEach` or `baseEachRight` function.
   *
   * @private
   * @param {Function} eachFunc The function to iterate over a collection.
   * @param {boolean} [fromRight] Specify iterating from right to left.
   * @returns {Function} Returns the new base function.
   */
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike_1(collection)) {
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

  var _createBaseEach = createBaseEach;

  /**
   * The base implementation of `_.forEach` without support for iteratee shorthands.
   *
   * @private
   * @param {Array|Object} collection The collection to iterate over.
   * @param {Function} iteratee The function invoked per iteration.
   * @returns {Array|Object} Returns `collection`.
   */
  var baseEach = _createBaseEach(_baseForOwn);

  var _baseEach = baseEach;

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
  function identity(value) {
    return value;
  }

  var identity_1 = identity;

  /**
   * Casts `value` to `identity` if it's not a function.
   *
   * @private
   * @param {*} value The value to inspect.
   * @returns {Function} Returns cast function.
   */
  function castFunction(value) {
    return typeof value == 'function' ? value : identity_1;
  }

  var _castFunction = castFunction;

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
    var func = isArray_1(collection) ? _arrayEach : _baseEach;
    return func(collection, _castFunction(iteratee));
  }

  var forEach_1 = forEach;

  var assertString_1 = createCommonjsModule(function (module, exports) {
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
  });

  var assertString = /*@__PURE__*/getDefaultExportFromCjs(assertString_1);

  var toDate_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toDate;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function toDate(date) {
    (0, _assertString.default)(date);
    date = Date.parse(date);
    return !isNaN(date) ? new Date(date) : null;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var toDate = /*@__PURE__*/getDefaultExportFromCjs(toDate_1);

  var alpha_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.commaDecimal = exports.dotDecimal = exports.farsiLocales = exports.arabicLocales = exports.englishLocales = exports.decimal = exports.alphanumeric = exports.alpha = void 0;
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
    fa: /^['آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی']+$/i
  };
  exports.alpha = alpha;
  var alphanumeric = {
    'en-US': /^[0-9A-Z]+$/i,
    'az-AZ': /^[0-9A-VXYZÇƏĞİıÖŞÜ]+$/i,
    'bg-BG': /^[0-9А-Я]+$/i,
    'cs-CZ': /^[0-9A-ZÁČĎÉĚÍŇÓŘŠŤÚŮÝŽ]+$/i,
    'da-DK': /^[0-9A-ZÆØÅ]+$/i,
    'de-DE': /^[0-9A-ZÄÖÜß]+$/i,
    'el-GR': /^[0-9Α-ω]+$/i,
    'es-ES': /^[0-9A-ZÁÉÍÑÓÚÜ]+$/i,
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
    fa: /^['0-9آاءأؤئبپتثجچحخدذرزژسشصضطظعغفقکگلمنوهةی۱۲۳۴۵۶۷۸۹۰']+$/i
  };
  exports.alphanumeric = alphanumeric;
  var decimal = {
    'en-US': '.',
    ar: '٫'
  };
  exports.decimal = decimal;
  var englishLocales = ['AU', 'GB', 'HK', 'IN', 'NZ', 'ZA', 'ZM'];
  exports.englishLocales = englishLocales;

  for (var locale, i = 0; i < englishLocales.length; i++) {
    locale = "en-".concat(englishLocales[i]);
    alpha[locale] = alpha['en-US'];
    alphanumeric[locale] = alphanumeric['en-US'];
    decimal[locale] = decimal['en-US'];
  } // Source: http://www.localeplanet.com/java/


  var arabicLocales = ['AE', 'BH', 'DZ', 'EG', 'IQ', 'JO', 'KW', 'LB', 'LY', 'MA', 'QM', 'QA', 'SA', 'SD', 'SY', 'TN', 'YE'];
  exports.arabicLocales = arabicLocales;

  for (var _locale, _i = 0; _i < arabicLocales.length; _i++) {
    _locale = "ar-".concat(arabicLocales[_i]);
    alpha[_locale] = alpha.ar;
    alphanumeric[_locale] = alphanumeric.ar;
    decimal[_locale] = decimal.ar;
  }

  var farsiLocales = ['IR', 'AF'];
  exports.farsiLocales = farsiLocales;

  for (var _locale2, _i2 = 0; _i2 < farsiLocales.length; _i2++) {
    _locale2 = "fa-".concat(farsiLocales[_i2]);
    alphanumeric[_locale2] = alphanumeric.fa;
    decimal[_locale2] = decimal.ar;
  } // Source: https://en.wikipedia.org/wiki/Decimal_mark


  var dotDecimal = ['ar-EG', 'ar-LB', 'ar-LY'];
  exports.dotDecimal = dotDecimal;
  var commaDecimal = ['bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-ZM', 'es-ES', 'fr-CA', 'fr-FR', 'id-ID', 'it-IT', 'ku-IQ', 'hu-HU', 'nb-NO', 'nn-NO', 'nl-NL', 'pl-PL', 'pt-PT', 'ru-RU', 'sl-SI', 'sr-RS@latin', 'sr-RS', 'sv-SE', 'tr-TR', 'uk-UA', 'vi-VN'];
  exports.commaDecimal = commaDecimal;

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
  });

  var alpha = /*@__PURE__*/getDefaultExportFromCjs(alpha_1);

  var isFloat_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isFloat;
  exports.locales = void 0;

  var _assertString = _interopRequireDefault(assertString_1);



  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function isFloat(str, options) {
    (0, _assertString.default)(str);
    options = options || {};
    var float = new RegExp("^(?:[-+])?(?:[0-9]+)?(?:\\".concat(options.locale ? alpha_1.decimal[options.locale] : '.', "[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$"));

    if (str === '' || str === '.' || str === '-' || str === '+') {
      return false;
    }

    var value = parseFloat(str.replace(',', '.'));
    return float.test(str) && (!options.hasOwnProperty('min') || value >= options.min) && (!options.hasOwnProperty('max') || value <= options.max) && (!options.hasOwnProperty('lt') || value < options.lt) && (!options.hasOwnProperty('gt') || value > options.gt);
  }

  var locales = Object.keys(alpha_1.decimal);
  exports.locales = locales;
  });

  var isFloat = /*@__PURE__*/getDefaultExportFromCjs(isFloat_1);

  var toFloat_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toFloat;

  var _isFloat = _interopRequireDefault(isFloat_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function toFloat(str) {
    if (!(0, _isFloat.default)(str)) return NaN;
    return parseFloat(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var toFloat = /*@__PURE__*/getDefaultExportFromCjs(toFloat_1);

  var toInt_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toInt;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function toInt(str, radix) {
    (0, _assertString.default)(str);
    return parseInt(str, radix || 10);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var toInt = /*@__PURE__*/getDefaultExportFromCjs(toInt_1);

  var toBoolean_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = toBoolean;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var toBoolean = /*@__PURE__*/getDefaultExportFromCjs(toBoolean_1);

  var equals_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = equals;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function equals(str, comparison) {
    (0, _assertString.default)(str);
    return str === comparison;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var equals = /*@__PURE__*/getDefaultExportFromCjs(equals_1);

  var toString_1 = createCommonjsModule(function (module, exports) {
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
  });

  var toString$1 = /*@__PURE__*/getDefaultExportFromCjs(toString_1);

  var merge_1 = createCommonjsModule(function (module, exports) {
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
  });

  var merge = /*@__PURE__*/getDefaultExportFromCjs(merge_1);

  var contains_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = contains;

  var _assertString = _interopRequireDefault(assertString_1);

  var _toString = _interopRequireDefault(toString_1);

  var _merge = _interopRequireDefault(merge_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var defaulContainsOptions = {
    ignoreCase: false
  };

  function contains(str, elem, options) {
    (0, _assertString.default)(str);
    options = (0, _merge.default)(options, defaulContainsOptions);
    return options.ignoreCase ? str.toLowerCase().indexOf((0, _toString.default)(elem).toLowerCase()) >= 0 : str.indexOf((0, _toString.default)(elem)) >= 0;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var contains = /*@__PURE__*/getDefaultExportFromCjs(contains_1);

  var matches_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = matches;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var matches = /*@__PURE__*/getDefaultExportFromCjs(matches_1);

  var isByteLength_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isByteLength;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isByteLength = /*@__PURE__*/getDefaultExportFromCjs(isByteLength_1);

  var isFQDN_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isFQDN;

  var _assertString = _interopRequireDefault(assertString_1);

  var _merge = _interopRequireDefault(merge_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var default_fqdn_options = {
    require_tld: true,
    allow_underscores: false,
    allow_trailing_dot: false,
    allow_numeric_tld: false
  };

  function isFQDN(str, options) {
    (0, _assertString.default)(str);
    options = (0, _merge.default)(options, default_fqdn_options);
    /* Remove the optional trailing dot before checking validity */

    if (options.allow_trailing_dot && str[str.length - 1] === '.') {
      str = str.substring(0, str.length - 1);
    }

    var parts = str.split('.');
    var tld = parts[parts.length - 1];

    if (options.require_tld) {
      // disallow fqdns without tld
      if (parts.length < 2) {
        return false;
      }

      if (!/^([a-z\u00a1-\uffff]{2,}|xn[a-z0-9-]{2,})$/i.test(tld)) {
        return false;
      } // disallow spaces && special characers


      if (/[\s\u2002-\u200B\u202F\u205F\u3000\uFEFF\uDB40\uDC20\u00A9\uFFFD]/.test(tld)) {
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
  });

  var isFQDN = /*@__PURE__*/getDefaultExportFromCjs(isFQDN_1);

  var isIP_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isIP;

  var _assertString = _interopRequireDefault(assertString_1);

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
  var ipv4Maybe = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
  var ipv6Block = /^[0-9A-F]{1,4}$/i;

  function isIP(str) {
    var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    (0, _assertString.default)(str);
    version = String(version);

    if (!version) {
      return isIP(str, 4) || isIP(str, 6);
    } else if (version === '4') {
      if (!ipv4Maybe.test(str)) {
        return false;
      }

      var parts = str.split('.').sort(function (a, b) {
        return a - b;
      });
      return parts[3] <= 255;
    } else if (version === '6') {
      var addressAndZone = [str]; // ipv6 addresses could have scoped architecture
      // according to https://tools.ietf.org/html/rfc4007#section-11

      if (str.includes('%')) {
        addressAndZone = str.split('%');

        if (addressAndZone.length !== 2) {
          // it must be just two parts
          return false;
        }

        if (!addressAndZone[0].includes(':')) {
          // the first part must be the address
          return false;
        }

        if (addressAndZone[1] === '') {
          // the second part must not be empty
          return false;
        }
      }

      var blocks = addressAndZone[0].split(':');
      var foundOmissionBlock = false; // marker to indicate ::
      // At least some OS accept the last 32 bits of an IPv6 address
      // (i.e. 2 of the blocks) in IPv4 notation, and RFC 3493 says
      // that '::ffff:a.b.c.d' is valid for IPv4-mapped IPv6 addresses,
      // and '::a.b.c.d' is deprecated, but also valid.

      var foundIPv4TransitionBlock = isIP(blocks[blocks.length - 1], 4);
      var expectedNumberOfBlocks = foundIPv4TransitionBlock ? 7 : 8;

      if (blocks.length > expectedNumberOfBlocks) {
        return false;
      } // initial or final ::


      if (str === '::') {
        return true;
      } else if (str.substr(0, 2) === '::') {
        blocks.shift();
        blocks.shift();
        foundOmissionBlock = true;
      } else if (str.substr(str.length - 2) === '::') {
        blocks.pop();
        blocks.pop();
        foundOmissionBlock = true;
      }

      for (var i = 0; i < blocks.length; ++i) {
        // test for a :: which can not be at the string start/end
        // since those cases have been handled above
        if (blocks[i] === '' && i > 0 && i < blocks.length - 1) {
          if (foundOmissionBlock) {
            return false; // multiple :: in address
          }

          foundOmissionBlock = true;
        } else if (foundIPv4TransitionBlock && i === blocks.length - 1) {// it has been checked before that the last
          // block is a valid IPv4 address
        } else if (!ipv6Block.test(blocks[i])) {
          return false;
        }
      }

      if (foundOmissionBlock) {
        return blocks.length >= 1;
      }

      return blocks.length === expectedNumberOfBlocks;
    }

    return false;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isIP = /*@__PURE__*/getDefaultExportFromCjs(isIP_1);

  var isEmail_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isEmail;

  var _assertString = _interopRequireDefault(assertString_1);

  var _merge = _interopRequireDefault(merge_1);

  var _isByteLength = _interopRequireDefault(isByteLength_1);

  var _isFQDN = _interopRequireDefault(isFQDN_1);

  var _isIP = _interopRequireDefault(isIP_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  var default_email_options = {
    allow_display_name: false,
    require_display_name: false,
    allow_utf8_local_part: true,
    require_tld: true,
    blacklisted_chars: '',
    ignore_max_length: false
  };
  /* eslint-disable max-len */

  /* eslint-disable no-control-regex */

  var splitNameAddress = /^([^\x00-\x1F\x7F-\x9F\cX]+)<(.+)>$/i;
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
    var trim_quotes = display_name.match(/^"(.+)"$/i);
    var display_name_without_quotes = trim_quotes ? trim_quotes[1] : display_name; // display name with only spaces is not valid

    if (!display_name_without_quotes.trim()) {
      return false;
    } // check whether display name contains illegal character


    var contains_illegal = /[\.";<>]/.test(display_name_without_quotes);

    if (contains_illegal) {
      // if contains illegal characters,
      // must to be enclosed in double-quotes, otherwise it's not a valid display name
      if (!trim_quotes) {
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
        var display_name;

        var _display_email = _slicedToArray(display_email, 3);

        display_name = _display_email[1];
        str = _display_email[2];

        // sometimes need to trim the last space to get the display name
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
    var user = parts.join('@');
    var lower_domain = domain.toLowerCase();

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

      if (!(0, _isByteLength.default)(username.replace('.', ''), {
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

    for (var _i2 = 0; _i2 < user_parts.length; _i2++) {
      if (!pattern.test(user_parts[_i2])) {
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
  });

  var isEmail = /*@__PURE__*/getDefaultExportFromCjs(isEmail_1);

  var isURL_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isURL;

  var _assertString = _interopRequireDefault(assertString_1);

  var _isFQDN = _interopRequireDefault(isFQDN_1);

  var _isIP = _interopRequireDefault(isIP_1);

  var _merge = _interopRequireDefault(merge_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

      auth = split.shift();

      if (auth.indexOf(':') === -1 || auth.indexOf(':') >= 0 && auth.split(':').length > 2) {
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

    if (port_str !== null) {
      port = parseInt(port_str, 10);

      if (!/^[0-9]+$/.test(port_str) || port <= 0 || port > 65535) {
        return false;
      }
    } else if (options.require_port) {
      return false;
    }

    if (!(0, _isIP.default)(host) && !(0, _isFQDN.default)(host, options) && (!ipv6 || !(0, _isIP.default)(ipv6, 6))) {
      return false;
    }

    host = host || ipv6;

    if (options.host_whitelist && !checkHost(host, options.host_whitelist)) {
      return false;
    }

    if (options.host_blacklist && checkHost(host, options.host_blacklist)) {
      return false;
    }

    return true;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isURL = /*@__PURE__*/getDefaultExportFromCjs(isURL_1);

  var isMACAddress_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isMACAddress;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var macAddress = /^([0-9a-fA-F][0-9a-fA-F]:){5}([0-9a-fA-F][0-9a-fA-F])$/;
  var macAddressNoColons = /^([0-9a-fA-F]){12}$/;
  var macAddressWithHyphen = /^([0-9a-fA-F][0-9a-fA-F]-){5}([0-9a-fA-F][0-9a-fA-F])$/;
  var macAddressWithSpaces = /^([0-9a-fA-F][0-9a-fA-F]\s){5}([0-9a-fA-F][0-9a-fA-F])$/;
  var macAddressWithDots = /^([0-9a-fA-F]{4}).([0-9a-fA-F]{4}).([0-9a-fA-F]{4})$/;

  function isMACAddress(str, options) {
    (0, _assertString.default)(str);

    if (options && options.no_colons) {
      return macAddressNoColons.test(str);
    }

    return macAddress.test(str) || macAddressWithHyphen.test(str) || macAddressWithSpaces.test(str) || macAddressWithDots.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isMACAddress = /*@__PURE__*/getDefaultExportFromCjs(isMACAddress_1);

  var isIPRange_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isIPRange;

  var _assertString = _interopRequireDefault(assertString_1);

  var _isIP = _interopRequireDefault(isIP_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var subnetMaybe = /^\d{1,2}$/;

  function isIPRange(str) {
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

    return (0, _isIP.default)(parts[0], 4) && parts[1] <= 32 && parts[1] >= 0;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isIPRange = /*@__PURE__*/getDefaultExportFromCjs(isIPRange_1);

  var isDate_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isDate;

  var _merge = _interopRequireDefault(merge_1);

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
    return /(^(y{4}|y{2})[\/-](m{1,2})[\/-](d{1,2})$)|(^(m{1,2})[\/-](d{1,2})[\/-]((y{4}|y{2})$))|(^(d{1,2})[\/-](m{1,2})[\/-]((y{4}|y{2})$))/gi.test(format);
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
  });

  var isDate = /*@__PURE__*/getDefaultExportFromCjs(isDate_1);

  var isBoolean_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isBoolean;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function isBoolean(str) {
    (0, _assertString.default)(str);
    return ['true', 'false', '1', '0'].indexOf(str) >= 0;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isBoolean = /*@__PURE__*/getDefaultExportFromCjs(isBoolean_1);

  var isLocale_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isLocale;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var localeReg = /^[A-z]{2,4}([_-]([A-z]{4}|[\d]{3}))?([_-]([A-z]{2}|[\d]{3}))?$/;

  function isLocale(str) {
    (0, _assertString.default)(str);

    if (str === 'en_US_POSIX' || str === 'ca_ES_VALENCIA') {
      return true;
    }

    return localeReg.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isLocale = /*@__PURE__*/getDefaultExportFromCjs(isLocale_1);

  var isAlpha_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isAlpha;
  exports.locales = void 0;

  var _assertString = _interopRequireDefault(assertString_1);



  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function isAlpha(_str) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _assertString.default)(_str);
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

    if (locale in alpha_1.alpha) {
      return alpha_1.alpha[locale].test(str);
    }

    throw new Error("Invalid locale '".concat(locale, "'"));
  }

  var locales = Object.keys(alpha_1.alpha);
  exports.locales = locales;
  });

  var isAlpha = /*@__PURE__*/getDefaultExportFromCjs(isAlpha_1);

  var isAlphanumeric_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isAlphanumeric;
  exports.locales = void 0;

  var _assertString = _interopRequireDefault(assertString_1);



  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function isAlphanumeric(str) {
    var locale = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'en-US';
    (0, _assertString.default)(str);

    if (locale in alpha_1.alphanumeric) {
      return alpha_1.alphanumeric[locale].test(str);
    }

    throw new Error("Invalid locale '".concat(locale, "'"));
  }

  var locales = Object.keys(alpha_1.alphanumeric);
  exports.locales = locales;
  });

  var isAlphanumeric = /*@__PURE__*/getDefaultExportFromCjs(isAlphanumeric_1);

  var isNumeric_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isNumeric;

  var _assertString = _interopRequireDefault(assertString_1);



  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var numericNoSymbols = /^[0-9]+$/;

  function isNumeric(str, options) {
    (0, _assertString.default)(str);

    if (options && options.no_symbols) {
      return numericNoSymbols.test(str);
    }

    return new RegExp("^[+-]?([0-9]*[".concat((options || {}).locale ? alpha_1.decimal[options.locale] : '.', "])?[0-9]+$")).test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isNumeric = /*@__PURE__*/getDefaultExportFromCjs(isNumeric_1);

  var isPassportNumber_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isPassportNumber;

  var _assertString = _interopRequireDefault(assertString_1);

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
    BY: /^[A-Z]{2}\d{7}$/,
    // BELARUS
    CA: /^[A-Z]{2}\d{6}$/,
    // CANADA
    CH: /^[A-Z]\d{7}$/,
    // SWITZERLAND
    CN: /^[GE]\d{8}$/,
    // CHINA [G=Ordinary, E=Electronic] followed by 8-digits
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
    MT: /^\d{7}$/,
    // MALTA
    NL: /^[A-Z]{2}[A-Z0-9]{6}\d$/,
    // NETHERLANDS
    PO: /^[A-Z]{2}\d{7}$/,
    // POLAND
    PT: /^[A-Z]\d{6}$/,
    // PORTUGAL
    RO: /^\d{8,9}$/,
    // ROMANIA
    RU: /^\d{2}\d{2}\d{6}$/,
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
  });

  var isPassportNumber = /*@__PURE__*/getDefaultExportFromCjs(isPassportNumber_1);

  var isInt_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isInt;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isInt = /*@__PURE__*/getDefaultExportFromCjs(isInt_1);

  var isPort_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isPort;

  var _isInt = _interopRequireDefault(isInt_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function isPort(str) {
    return (0, _isInt.default)(str, {
      min: 0,
      max: 65535
    });
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isPort = /*@__PURE__*/getDefaultExportFromCjs(isPort_1);

  var isLowercase_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isLowercase;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function isLowercase(str) {
    (0, _assertString.default)(str);
    return str === str.toLowerCase();
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isLowercase = /*@__PURE__*/getDefaultExportFromCjs(isLowercase_1);

  var isUppercase_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isUppercase;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function isUppercase(str) {
    (0, _assertString.default)(str);
    return str === str.toUpperCase();
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isUppercase = /*@__PURE__*/getDefaultExportFromCjs(isUppercase_1);

  var isIMEI_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isIMEI;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isIMEI = /*@__PURE__*/getDefaultExportFromCjs(isIMEI_1);

  var isAscii_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isAscii;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isAscii = /*@__PURE__*/getDefaultExportFromCjs(isAscii_1);

  var isFullWidth_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isFullWidth;
  exports.fullWidth = void 0;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var fullWidth = /[^\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
  exports.fullWidth = fullWidth;

  function isFullWidth(str) {
    (0, _assertString.default)(str);
    return fullWidth.test(str);
  }
  });

  var isFullWidth = /*@__PURE__*/getDefaultExportFromCjs(isFullWidth_1);

  var isHalfWidth_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isHalfWidth;
  exports.halfWidth = void 0;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var halfWidth = /[\u0020-\u007E\uFF61-\uFF9F\uFFA0-\uFFDC\uFFE8-\uFFEE0-9a-zA-Z]/;
  exports.halfWidth = halfWidth;

  function isHalfWidth(str) {
    (0, _assertString.default)(str);
    return halfWidth.test(str);
  }
  });

  var isHalfWidth = /*@__PURE__*/getDefaultExportFromCjs(isHalfWidth_1);

  var isVariableWidth_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isVariableWidth;

  var _assertString = _interopRequireDefault(assertString_1);





  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function isVariableWidth(str) {
    (0, _assertString.default)(str);
    return isFullWidth_1.fullWidth.test(str) && isHalfWidth_1.halfWidth.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isVariableWidth = /*@__PURE__*/getDefaultExportFromCjs(isVariableWidth_1);

  var isMultibyte_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isMultibyte;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isMultibyte = /*@__PURE__*/getDefaultExportFromCjs(isMultibyte_1);

  var multilineRegex = createCommonjsModule(function (module, exports) {
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
  });

  var multilineRegex$1 = /*@__PURE__*/getDefaultExportFromCjs(multilineRegex);

  var isSemVer_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isSemVer;

  var _assertString = _interopRequireDefault(assertString_1);

  var _multilineRegex = _interopRequireDefault(multilineRegex);

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
  });

  var isSemVer = /*@__PURE__*/getDefaultExportFromCjs(isSemVer_1);

  var isSurrogatePair_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isSurrogatePair;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var surrogatePair = /[\uD800-\uDBFF][\uDC00-\uDFFF]/;

  function isSurrogatePair(str) {
    (0, _assertString.default)(str);
    return surrogatePair.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isSurrogatePair = /*@__PURE__*/getDefaultExportFromCjs(isSurrogatePair_1);

  var includes_1 = createCommonjsModule(function (module, exports) {
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
  });

  var includes = /*@__PURE__*/getDefaultExportFromCjs(includes_1);

  var isDecimal_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isDecimal;

  var _merge = _interopRequireDefault(merge_1);

  var _assertString = _interopRequireDefault(assertString_1);

  var _includes = _interopRequireDefault(includes_1);



  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function decimalRegExp(options) {
    var regExp = new RegExp("^[-+]?([0-9]+)?(\\".concat(alpha_1.decimal[options.locale], "[0-9]{").concat(options.decimal_digits, "})").concat(options.force_decimal ? '' : '?', "$"));
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

    if (options.locale in alpha_1.decimal) {
      return !(0, _includes.default)(blacklist, str.replace(/ /g, '')) && decimalRegExp(options).test(str);
    }

    throw new Error("Invalid locale '".concat(options.locale, "'"));
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isDecimal = /*@__PURE__*/getDefaultExportFromCjs(isDecimal_1);

  var isHexadecimal_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isHexadecimal;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var hexadecimal = /^(0x|0h)?[0-9A-F]+$/i;

  function isHexadecimal(str) {
    (0, _assertString.default)(str);
    return hexadecimal.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isHexadecimal = /*@__PURE__*/getDefaultExportFromCjs(isHexadecimal_1);

  var isOctal_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isOctal;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var octal = /^(0o)?[0-7]+$/i;

  function isOctal(str) {
    (0, _assertString.default)(str);
    return octal.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isOctal = /*@__PURE__*/getDefaultExportFromCjs(isOctal_1);

  var isDivisibleBy_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isDivisibleBy;

  var _assertString = _interopRequireDefault(assertString_1);

  var _toFloat = _interopRequireDefault(toFloat_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function isDivisibleBy(str, num) {
    (0, _assertString.default)(str);
    return (0, _toFloat.default)(str) % parseInt(num, 10) === 0;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isDivisibleBy = /*@__PURE__*/getDefaultExportFromCjs(isDivisibleBy_1);

  var isHexColor_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isHexColor;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var hexcolor = /^#?([0-9A-F]{3}|[0-9A-F]{4}|[0-9A-F]{6}|[0-9A-F]{8})$/i;

  function isHexColor(str) {
    (0, _assertString.default)(str);
    return hexcolor.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isHexColor = /*@__PURE__*/getDefaultExportFromCjs(isHexColor_1);

  var isRgbColor_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isRgbColor;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isRgbColor = /*@__PURE__*/getDefaultExportFromCjs(isRgbColor_1);

  var isHSL_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isHSL;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var hslcomma = /^(hsl)a?\(\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn|\s*)(\s*,\s*(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s*(,\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s*)?\)$/i;
  var hslspace = /^(hsl)a?\(\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?))(deg|grad|rad|turn|\s)(\s*(\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%){2}\s*(\/\s*((\+|\-)?([0-9]+(\.[0-9]+)?(e(\+|\-)?[0-9]+)?|\.[0-9]+(e(\+|\-)?[0-9]+)?)%?)\s*)?\)$/i;

  function isHSL(str) {
    (0, _assertString.default)(str);
    return hslcomma.test(str) || hslspace.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isHSL = /*@__PURE__*/getDefaultExportFromCjs(isHSL_1);

  var isISRC_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isISRC;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // see http://isrc.ifpi.org/en/isrc-standard/code-syntax
  var isrc = /^[A-Z]{2}[0-9A-Z]{3}\d{2}\d{5}$/;

  function isISRC(str) {
    (0, _assertString.default)(str);
    return isrc.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isISRC = /*@__PURE__*/getDefaultExportFromCjs(isISRC_1);

  var isIBAN_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isIBAN;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _assertString.default)(str);
    return hasValidIbanFormat(str) && hasValidIbanChecksum(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isIBAN = /*@__PURE__*/getDefaultExportFromCjs(isIBAN_1);

  var isBIC_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isBIC;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var isBICReg = /^[A-z]{4}[A-z]{2}\w{2}(\w{3})?$/;

  function isBIC(str) {
    (0, _assertString.default)(str);
    return isBICReg.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isBIC = /*@__PURE__*/getDefaultExportFromCjs(isBIC_1);

  var isMD5_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isMD5;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var md5 = /^[a-f0-9]{32}$/;

  function isMD5(str) {
    (0, _assertString.default)(str);
    return md5.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isMD5 = /*@__PURE__*/getDefaultExportFromCjs(isMD5_1);

  var isHash_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isHash;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isHash = /*@__PURE__*/getDefaultExportFromCjs(isHash_1);

  var isBase64_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isBase64;

  var _assertString = _interopRequireDefault(assertString_1);

  var _merge = _interopRequireDefault(merge_1);

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
  });

  var isBase64 = /*@__PURE__*/getDefaultExportFromCjs(isBase64_1);

  var isJWT_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isJWT;

  var _assertString = _interopRequireDefault(assertString_1);

  var _isBase = _interopRequireDefault(isBase64_1);

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
  });

  var isJWT = /*@__PURE__*/getDefaultExportFromCjs(isJWT_1);

  var isJSON_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isJSON;

  var _assertString = _interopRequireDefault(assertString_1);

  var _merge = _interopRequireDefault(merge_1);

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
  });

  var isJSON = /*@__PURE__*/getDefaultExportFromCjs(isJSON_1);

  var isEmpty_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isEmpty;

  var _assertString = _interopRequireDefault(assertString_1);

  var _merge = _interopRequireDefault(merge_1);

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
  });

  var isEmpty = /*@__PURE__*/getDefaultExportFromCjs(isEmpty_1);

  var isLength_1$1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isLength;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isLength$1 = /*@__PURE__*/getDefaultExportFromCjs(isLength_1$1);

  var isUUID_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isUUID;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var uuid = {
    3: /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
    4: /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    5: /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
    all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
  };

  function isUUID(str) {
    var version = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
    (0, _assertString.default)(str);
    var pattern = uuid[version];
    return pattern && pattern.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isUUID = /*@__PURE__*/getDefaultExportFromCjs(isUUID_1);

  var isMongoId_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isMongoId;

  var _assertString = _interopRequireDefault(assertString_1);

  var _isHexadecimal = _interopRequireDefault(isHexadecimal_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function isMongoId(str) {
    (0, _assertString.default)(str);
    return (0, _isHexadecimal.default)(str) && str.length === 24;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isMongoId = /*@__PURE__*/getDefaultExportFromCjs(isMongoId_1);

  var isAfter_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isAfter;

  var _assertString = _interopRequireDefault(assertString_1);

  var _toDate = _interopRequireDefault(toDate_1);

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
  });

  var isAfter = /*@__PURE__*/getDefaultExportFromCjs(isAfter_1);

  var isBefore_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isBefore;

  var _assertString = _interopRequireDefault(assertString_1);

  var _toDate = _interopRequireDefault(toDate_1);

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
  });

  var isBefore = /*@__PURE__*/getDefaultExportFromCjs(isBefore_1);

  var isIn_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isIn;

  var _assertString = _interopRequireDefault(assertString_1);

  var _toString = _interopRequireDefault(toString_1);

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
  });

  var isIn = /*@__PURE__*/getDefaultExportFromCjs(isIn_1);

  var isCreditCard_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isCreditCard;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /* eslint-disable max-len */
  var creditCard = /^(?:4[0-9]{12}(?:[0-9]{3,6})?|5[1-5][0-9]{14}|(222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12,15}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|6[27][0-9]{14})$/;
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
  });

  var isCreditCard = /*@__PURE__*/getDefaultExportFromCjs(isCreditCard_1);

  var isIdentityCard_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isIdentityCard;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var validators = {
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
  });

  var isIdentityCard = /*@__PURE__*/getDefaultExportFromCjs(isIdentityCard_1);

  var isEAN_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isEAN;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  /**
   * The most commonly used EAN standard is
   * the thirteen-digit EAN-13, while the
   * less commonly used 8-digit EAN-8 barcode was
   * introduced for use on small packages.
   * EAN consists of:
   * GS1 prefix, manufacturer code, product code and check digit
   * Reference: https://en.wikipedia.org/wiki/International_Article_Number
   */

  /**
   * Define EAN Lenghts; 8 for EAN-8; 13 for EAN-13
   * and Regular Expression for valid EANs (EAN-8, EAN-13),
   * with exact numberic matching of 8 or 13 digits [0-9]
   */
  var LENGTH_EAN_8 = 8;
  var validEanRegex = /^(\d{8}|\d{13})$/;
  /**
   * Get position weight given:
   * EAN length and digit index/position
   *
   * @param {number} length
   * @param {number} index
   * @return {number}
   */

  function getPositionWeightThroughLengthAndIndex(length, index) {
    if (length === LENGTH_EAN_8) {
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
   * Matches EAN-8/EAN-13 regex
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
  });

  var isEAN = /*@__PURE__*/getDefaultExportFromCjs(isEAN_1);

  var isISIN_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isISIN;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var isin = /^[A-Z]{2}[0-9A-Z]{9}[0-9]$/;

  function isISIN(str) {
    (0, _assertString.default)(str);

    if (!isin.test(str)) {
      return false;
    }

    var checksumStr = str.replace(/[A-Z]/g, function (character) {
      return parseInt(character, 36);
    });
    var sum = 0;
    var digit;
    var tmpNum;
    var shouldDouble = true;

    for (var i = checksumStr.length - 2; i >= 0; i--) {
      digit = checksumStr.substring(i, i + 1);
      tmpNum = parseInt(digit, 10);

      if (shouldDouble) {
        tmpNum *= 2;

        if (tmpNum >= 10) {
          sum += tmpNum + 1;
        } else {
          sum += tmpNum;
        }
      } else {
        sum += tmpNum;
      }

      shouldDouble = !shouldDouble;
    }

    return parseInt(str.substr(str.length - 1), 10) === (10000 - sum) % 10;
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isISIN = /*@__PURE__*/getDefaultExportFromCjs(isISIN_1);

  var isISBN_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isISBN;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isISBN = /*@__PURE__*/getDefaultExportFromCjs(isISBN_1);

  var isISSN_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isISSN;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isISSN = /*@__PURE__*/getDefaultExportFromCjs(isISSN_1);

  "use strict";


  var iso7064Check_1 = iso7064Check;
  var luhnCheck_1 = luhnCheck;
  var reverseMultiplyAndSum_1 = reverseMultiplyAndSum;
  var verhoeffCheck_1 = verhoeffCheck;

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

  var algorithms = /*#__PURE__*/Object.defineProperty({
  	iso7064Check: iso7064Check_1,
  	luhnCheck: luhnCheck_1,
  	reverseMultiplyAndSum: reverseMultiplyAndSum_1,
  	verhoeffCheck: verhoeffCheck_1
  }, '__esModule', {value: true});

  var isTaxID_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isTaxID;

  var _assertString = _interopRequireDefault(assertString_1);

  var algorithms$1 = _interopRequireWildcard(algorithms);

  var _isDate = _interopRequireDefault(isDate_1);

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

    return checksum % 11 === digits[8];
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
  });

  var isTaxID = /*@__PURE__*/getDefaultExportFromCjs(isTaxID_1);

  var isMobilePhone_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isMobilePhone;
  exports.locales = void 0;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    'de-DE': /^(\+49)?0?[1|3]([0|5][0-45-9]\d|6([23]|0\d?)|7([0-57-9]|6\d))\d{7}$/,
    'de-AT': /^(\+43|0)\d{1,4}\d{3,12}$/,
    'de-CH': /^(\+41|0)(7[5-9])\d{1,7}$/,
    'de-LU': /^(\+352)?((6\d1)\d{6})$/,
    'el-GR': /^(\+?30|0)?(69\d{8})$/,
    'en-AU': /^(\+?61|0)4\d{8}$/,
    'en-GB': /^(\+?44|0)7\d{9}$/,
    'en-GG': /^(\+?44|0)1481\d{6}$/,
    'en-GH': /^(\+233|0)(20|50|24|54|27|57|26|56|23|28)\d{7}$/,
    'en-HK': /^(\+?852[-\s]?)?[456789]\d{3}[-\s]?\d{4}$/,
    'en-MO': /^(\+?853[-\s]?)?[6]\d{3}[-\s]?\d{4}$/,
    'en-IE': /^(\+?353|0)8[356789]\d{7}$/,
    'en-IN': /^(\+?91|0)?[6789]\d{9}$/,
    'en-KE': /^(\+?254|0)(7|1)\d{8}$/,
    'en-MT': /^(\+?356|0)?(99|79|77|21|27|22|25)[0-9]{6}$/,
    'en-MU': /^(\+?230|0)?\d{8}$/,
    'en-NG': /^(\+?234|0)?[789]\d{9}$/,
    'en-NZ': /^(\+?64|0)[28]\d{7,9}$/,
    'en-PK': /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/,
    'en-PH': /^(09|\+639)\d{9}$/,
    'en-RW': /^(\+?250|0)?[7]\d{8}$/,
    'en-SG': /^(\+65)?[689]\d{7}$/,
    'en-SL': /^(?:0|94|\+94)?(7(0|1|2|5|6|7|8)( |-)?\d)\d{6}$/,
    'en-TZ': /^(\+?255|0)?[67]\d{8}$/,
    'en-UG': /^(\+?256|0)?[7]\d{8}$/,
    'en-US': /^((\+1|1)?( |-)?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})( |-)?([2-9][0-9]{2}( |-)?[0-9]{4})$/,
    'en-ZA': /^(\+?27|0)\d{9}$/,
    'en-ZM': /^(\+?26)?09[567]\d{7}$/,
    'en-ZW': /^(\+263)[0-9]{9}$/,
    'es-AR': /^\+?549(11|[2368]\d)\d{8}$/,
    'es-BO': /^(\+?591)?(6|7)\d{7}$/,
    'es-CO': /^(\+?57)?([1-8]{1}|3[0-9]{2})?[2-9]{1}\d{6}$/,
    'es-CL': /^(\+?56|0)[2-9]\d{1}\d{7}$/,
    'es-CR': /^(\+506)?[2-8]\d{7}$/,
    'es-DO': /^(\+?1)?8[024]9\d{7}$/,
    'es-HN': /^(\+?504)?[9|8]\d{7}$/,
    'es-EC': /^(\+?593|0)([2-7]|9[2-9])\d{7}$/,
    'es-ES': /^(\+?34)?[6|7]\d{8}$/,
    'es-PE': /^(\+?51)?9\d{8}$/,
    'es-MX': /^(\+?52)?(1|01)?\d{10,11}$/,
    'es-PA': /^(\+?507)\d{7,8}$/,
    'es-PY': /^(\+?595|0)9[9876]\d{7}$/,
    'es-UY': /^(\+598|0)9[1-9][\d]{6}$/,
    'et-EE': /^(\+?372)?\s?(5|8[1-4])\s?([0-9]\s?){6,7}$/,
    'fa-IR': /^(\+?98[\-\s]?|0)9[0-39]\d[\-\s]?\d{3}[\-\s]?\d{4}$/,
    'fi-FI': /^(\+?358|0)\s?(4(0|1|2|4|5|6)?|50)\s?(\d\s?){4,8}\d$/,
    'fj-FJ': /^(\+?679)?\s?\d{3}\s?\d{4}$/,
    'fo-FO': /^(\+?298)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
    'fr-FR': /^(\+?33|0)[67]\d{8}$/,
    'fr-GF': /^(\+?594|0|00594)[67]\d{8}$/,
    'fr-GP': /^(\+?590|0|00590)[67]\d{8}$/,
    'fr-MQ': /^(\+?596|0|00596)[67]\d{8}$/,
    'fr-RE': /^(\+?262|0|00262)[67]\d{8}$/,
    'he-IL': /^(\+972|0)([23489]|5[012345689]|77)[1-9]\d{6}$/,
    'hu-HU': /^(\+?36)(20|30|70)\d{7}$/,
    'id-ID': /^(\+?62|0)8(1[123456789]|2[1238]|3[1238]|5[12356789]|7[78]|9[56789]|8[123456789])([\s?|\d]{5,11})$/,
    'it-IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
    'it-SM': /^((\+378)|(0549)|(\+390549)|(\+3780549))?6\d{5,9}$/,
    'ja-JP': /^(\+81[ \-]?(\(0\))?|0)[6789]0[ \-]?\d{4}[ \-]?\d{4}$/,
    'ka-GE': /^(\+?995)?(5|79)\d{7}$/,
    'kk-KZ': /^(\+?7|8)?7\d{9}$/,
    'kl-GL': /^(\+?299)?\s?\d{2}\s?\d{2}\s?\d{2}$/,
    'ko-KR': /^((\+?82)[ \-]?)?0?1([0|1|6|7|8|9]{1})[ \-]?\d{3,4}[ \-]?\d{4}$/,
    'lt-LT': /^(\+370|8)\d{8}$/,
    'ms-MY': /^(\+?6?01){1}(([0145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
    'nb-NO': /^(\+?47)?[49]\d{7}$/,
    'ne-NP': /^(\+?977)?9[78]\d{8}$/,
    'nl-BE': /^(\+?32|0)4?\d{8}$/,
    'nl-NL': /^(((\+|00)?31\(0\))|((\+|00)?31)|0)6{1}\d{8}$/,
    'nn-NO': /^(\+?47)?[49]\d{7}$/,
    'pl-PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
    'pt-BR': /^((\+?55\ ?[1-9]{2}\ ?)|(\+?55\ ?\([1-9]{2}\)\ ?)|(0[1-9]{2}\ ?)|(\([1-9]{2}\)\ ?)|([1-9]{2}\ ?))((\d{4}\-?\d{4})|(9[2-9]{1}\d{3}\-?\d{4}))$/,
    'pt-PT': /^(\+?351)?9[1236]\d{7}$/,
    'ro-RO': /^(\+?4?0)\s?7\d{2}(\/|\s|\.|\-)?\d{3}(\s|\.|\-)?\d{3}$/,
    'ru-RU': /^(\+?7|8)?9\d{9}$/,
    'sl-SI': /^(\+386\s?|0)(\d{1}\s?\d{3}\s?\d{2}\s?\d{2}|\d{2}\s?\d{3}\s?\d{3})$/,
    'sk-SK': /^(\+?421)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
    'sq-AL': /^(\+355|0)6[789]\d{6}$/,
    'sr-RS': /^(\+3816|06)[- \d]{5,9}$/,
    'sv-SE': /^(\+?46|0)[\s\-]?7[\s\-]?[02369]([\s\-]?\d){7}$/,
    'th-TH': /^(\+66|66|0)\d{9}$/,
    'tr-TR': /^(\+?90|0)?5\d{9}$/,
    'uk-UA': /^(\+?38|8)?0\d{9}$/,
    'uz-UZ': /^(\+?998)?(6[125-79]|7[1-69]|88|9\d)\d{7}$/,
    'vi-VN': /^(\+?84|0)((3([2-9]))|(5([2689]))|(7([0|6-9]))|(8([1-6|89]))|(9([0-9])))([0-9]{7})$/,
    'zh-CN': /^((\+|00)86)?1([3568][0-9]|4[579]|6[67]|7[01235678]|9[012356789])[0-9]{8}$/,
    'zh-TW': /^(\+?886\-?|0)?9\d{8}$/
  };
  /* eslint-enable max-len */
  // aliases

  phones['en-CA'] = phones['en-US'];
  phones['fr-CA'] = phones['en-CA'];
  phones['fr-BE'] = phones['nl-BE'];
  phones['zh-HK'] = phones['en-HK'];
  phones['zh-MO'] = phones['en-MO'];
  phones['ga-IE'] = phones['en-IE'];

  function isMobilePhone(str, locale, options) {
    (0, _assertString.default)(str);

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

  var locales = Object.keys(phones);
  exports.locales = locales;
  });

  var isMobilePhone = /*@__PURE__*/getDefaultExportFromCjs(isMobilePhone_1);

  var isEthereumAddress_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isEthereumAddress;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var eth = /^(0x)[0-9a-f]{40}$/i;

  function isEthereumAddress(str) {
    (0, _assertString.default)(str);
    return eth.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isEthereumAddress = /*@__PURE__*/getDefaultExportFromCjs(isEthereumAddress_1);

  var isCurrency_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isCurrency;

  var _merge = _interopRequireDefault(merge_1);

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isCurrency = /*@__PURE__*/getDefaultExportFromCjs(isCurrency_1);

  var isBtcAddress_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isBtcAddress;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // supports Bech32 addresses
  var btc = /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/;

  function isBtcAddress(str) {
    (0, _assertString.default)(str);
    return btc.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isBtcAddress = /*@__PURE__*/getDefaultExportFromCjs(isBtcAddress_1);

  var isISO8601_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isISO8601;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isISO8601 = /*@__PURE__*/getDefaultExportFromCjs(isISO8601_1);

  var isRFC3339_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isRFC3339;

  var _assertString = _interopRequireDefault(assertString_1);

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
  var rfc3339 = new RegExp("".concat(fullDate.source, "[ tT]").concat(fullTime.source));

  function isRFC3339(str) {
    (0, _assertString.default)(str);
    return rfc3339.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isRFC3339 = /*@__PURE__*/getDefaultExportFromCjs(isRFC3339_1);

  var isISO31661Alpha2_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isISO31661Alpha2;

  var _assertString = _interopRequireDefault(assertString_1);

  var _includes = _interopRequireDefault(includes_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
  var validISO31661Alpha2CountriesCodes = ['AD', 'AE', 'AF', 'AG', 'AI', 'AL', 'AM', 'AO', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AW', 'AX', 'AZ', 'BA', 'BB', 'BD', 'BE', 'BF', 'BG', 'BH', 'BI', 'BJ', 'BL', 'BM', 'BN', 'BO', 'BQ', 'BR', 'BS', 'BT', 'BV', 'BW', 'BY', 'BZ', 'CA', 'CC', 'CD', 'CF', 'CG', 'CH', 'CI', 'CK', 'CL', 'CM', 'CN', 'CO', 'CR', 'CU', 'CV', 'CW', 'CX', 'CY', 'CZ', 'DE', 'DJ', 'DK', 'DM', 'DO', 'DZ', 'EC', 'EE', 'EG', 'EH', 'ER', 'ES', 'ET', 'FI', 'FJ', 'FK', 'FM', 'FO', 'FR', 'GA', 'GB', 'GD', 'GE', 'GF', 'GG', 'GH', 'GI', 'GL', 'GM', 'GN', 'GP', 'GQ', 'GR', 'GS', 'GT', 'GU', 'GW', 'GY', 'HK', 'HM', 'HN', 'HR', 'HT', 'HU', 'ID', 'IE', 'IL', 'IM', 'IN', 'IO', 'IQ', 'IR', 'IS', 'IT', 'JE', 'JM', 'JO', 'JP', 'KE', 'KG', 'KH', 'KI', 'KM', 'KN', 'KP', 'KR', 'KW', 'KY', 'KZ', 'LA', 'LB', 'LC', 'LI', 'LK', 'LR', 'LS', 'LT', 'LU', 'LV', 'LY', 'MA', 'MC', 'MD', 'ME', 'MF', 'MG', 'MH', 'MK', 'ML', 'MM', 'MN', 'MO', 'MP', 'MQ', 'MR', 'MS', 'MT', 'MU', 'MV', 'MW', 'MX', 'MY', 'MZ', 'NA', 'NC', 'NE', 'NF', 'NG', 'NI', 'NL', 'NO', 'NP', 'NR', 'NU', 'NZ', 'OM', 'PA', 'PE', 'PF', 'PG', 'PH', 'PK', 'PL', 'PM', 'PN', 'PR', 'PS', 'PT', 'PW', 'PY', 'QA', 'RE', 'RO', 'RS', 'RU', 'RW', 'SA', 'SB', 'SC', 'SD', 'SE', 'SG', 'SH', 'SI', 'SJ', 'SK', 'SL', 'SM', 'SN', 'SO', 'SR', 'SS', 'ST', 'SV', 'SX', 'SY', 'SZ', 'TC', 'TD', 'TF', 'TG', 'TH', 'TJ', 'TK', 'TL', 'TM', 'TN', 'TO', 'TR', 'TT', 'TV', 'TW', 'TZ', 'UA', 'UG', 'UM', 'US', 'UY', 'UZ', 'VA', 'VC', 'VE', 'VG', 'VI', 'VN', 'VU', 'WF', 'WS', 'YE', 'YT', 'ZA', 'ZM', 'ZW'];

  function isISO31661Alpha2(str) {
    (0, _assertString.default)(str);
    return (0, _includes.default)(validISO31661Alpha2CountriesCodes, str.toUpperCase());
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isISO31661Alpha2 = /*@__PURE__*/getDefaultExportFromCjs(isISO31661Alpha2_1);

  var isISO31661Alpha3_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isISO31661Alpha3;

  var _assertString = _interopRequireDefault(assertString_1);

  var _includes = _interopRequireDefault(includes_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  // from https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3
  var validISO31661Alpha3CountriesCodes = ['AFG', 'ALA', 'ALB', 'DZA', 'ASM', 'AND', 'AGO', 'AIA', 'ATA', 'ATG', 'ARG', 'ARM', 'ABW', 'AUS', 'AUT', 'AZE', 'BHS', 'BHR', 'BGD', 'BRB', 'BLR', 'BEL', 'BLZ', 'BEN', 'BMU', 'BTN', 'BOL', 'BES', 'BIH', 'BWA', 'BVT', 'BRA', 'IOT', 'BRN', 'BGR', 'BFA', 'BDI', 'KHM', 'CMR', 'CAN', 'CPV', 'CYM', 'CAF', 'TCD', 'CHL', 'CHN', 'CXR', 'CCK', 'COL', 'COM', 'COG', 'COD', 'COK', 'CRI', 'CIV', 'HRV', 'CUB', 'CUW', 'CYP', 'CZE', 'DNK', 'DJI', 'DMA', 'DOM', 'ECU', 'EGY', 'SLV', 'GNQ', 'ERI', 'EST', 'ETH', 'FLK', 'FRO', 'FJI', 'FIN', 'FRA', 'GUF', 'PYF', 'ATF', 'GAB', 'GMB', 'GEO', 'DEU', 'GHA', 'GIB', 'GRC', 'GRL', 'GRD', 'GLP', 'GUM', 'GTM', 'GGY', 'GIN', 'GNB', 'GUY', 'HTI', 'HMD', 'VAT', 'HND', 'HKG', 'HUN', 'ISL', 'IND', 'IDN', 'IRN', 'IRQ', 'IRL', 'IMN', 'ISR', 'ITA', 'JAM', 'JPN', 'JEY', 'JOR', 'KAZ', 'KEN', 'KIR', 'PRK', 'KOR', 'KWT', 'KGZ', 'LAO', 'LVA', 'LBN', 'LSO', 'LBR', 'LBY', 'LIE', 'LTU', 'LUX', 'MAC', 'MKD', 'MDG', 'MWI', 'MYS', 'MDV', 'MLI', 'MLT', 'MHL', 'MTQ', 'MRT', 'MUS', 'MYT', 'MEX', 'FSM', 'MDA', 'MCO', 'MNG', 'MNE', 'MSR', 'MAR', 'MOZ', 'MMR', 'NAM', 'NRU', 'NPL', 'NLD', 'NCL', 'NZL', 'NIC', 'NER', 'NGA', 'NIU', 'NFK', 'MNP', 'NOR', 'OMN', 'PAK', 'PLW', 'PSE', 'PAN', 'PNG', 'PRY', 'PER', 'PHL', 'PCN', 'POL', 'PRT', 'PRI', 'QAT', 'REU', 'ROU', 'RUS', 'RWA', 'BLM', 'SHN', 'KNA', 'LCA', 'MAF', 'SPM', 'VCT', 'WSM', 'SMR', 'STP', 'SAU', 'SEN', 'SRB', 'SYC', 'SLE', 'SGP', 'SXM', 'SVK', 'SVN', 'SLB', 'SOM', 'ZAF', 'SGS', 'SSD', 'ESP', 'LKA', 'SDN', 'SUR', 'SJM', 'SWZ', 'SWE', 'CHE', 'SYR', 'TWN', 'TJK', 'TZA', 'THA', 'TLS', 'TGO', 'TKL', 'TON', 'TTO', 'TUN', 'TUR', 'TKM', 'TCA', 'TUV', 'UGA', 'UKR', 'ARE', 'GBR', 'USA', 'UMI', 'URY', 'UZB', 'VUT', 'VEN', 'VNM', 'VGB', 'VIR', 'WLF', 'ESH', 'YEM', 'ZMB', 'ZWE'];

  function isISO31661Alpha3(str) {
    (0, _assertString.default)(str);
    return (0, _includes.default)(validISO31661Alpha3CountriesCodes, str.toUpperCase());
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isISO31661Alpha3 = /*@__PURE__*/getDefaultExportFromCjs(isISO31661Alpha3_1);

  var isBase32_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isBase32;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isBase32 = /*@__PURE__*/getDefaultExportFromCjs(isBase32_1);

  var isBase58_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isBase58;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isBase58 = /*@__PURE__*/getDefaultExportFromCjs(isBase58_1);

  var isDataURI_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isDataURI;

  var _assertString = _interopRequireDefault(assertString_1);

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
      if (i === attributes.length - 1 && attributes[i].toLowerCase() === 'base64') {// ok
      } else if (!validAttribute.test(attributes[i])) {
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
  });

  var isDataURI = /*@__PURE__*/getDefaultExportFromCjs(isDataURI_1);

  var isMagnetURI_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isMagnetURI;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var magnetURI = /^magnet:\?xt=urn:[a-z0-9]+:[a-z0-9]{32,40}&dn=.+&tr=.+$/i;

  function isMagnetURI(url) {
    (0, _assertString.default)(url);
    return magnetURI.test(url.trim());
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isMagnetURI = /*@__PURE__*/getDefaultExportFromCjs(isMagnetURI_1);

  var isMimeType_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isMimeType;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isMimeType = /*@__PURE__*/getDefaultExportFromCjs(isMimeType_1);

  var isLatLong_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isLatLong;

  var _assertString = _interopRequireDefault(assertString_1);

  var _merge = _interopRequireDefault(merge_1);

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
  });

  var isLatLong = /*@__PURE__*/getDefaultExportFromCjs(isLatLong_1);

  var isPostalCode_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isPostalCode;
  exports.locales = void 0;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    IE: /^(?!.*(?:o))[A-z]\d[\dw]\s\w{4}$/i,
    IL: /^(\d{5}|\d{7})$/,
    IN: /^((?!10|29|35|54|55|65|66|86|87|88|89)[1-9][0-9]{5})$/,
    IR: /\b(?!(\d)\1{3})[13-9]{4}[1346-9][013-9]{5}\b/,
    IS: threeDigit,
    IT: fiveDigit,
    JP: /^\d{3}\-\d{4}$/,
    KE: fiveDigit,
    LI: /^(948[5-9]|949[0-7])$/,
    LT: /^LT\-\d{5}$/,
    LU: fourDigit,
    LV: /^LV\-\d{4}$/,
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
  exports.locales = locales;

  function isPostalCode(str, locale) {
    (0, _assertString.default)(str);

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
  });

  var isPostalCode = /*@__PURE__*/getDefaultExportFromCjs(isPostalCode_1);

  var ltrim_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = ltrim;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function ltrim(str, chars) {
    (0, _assertString.default)(str); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping

    var pattern = chars ? new RegExp("^[".concat(chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "]+"), 'g') : /^\s+/g;
    return str.replace(pattern, '');
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var ltrim = /*@__PURE__*/getDefaultExportFromCjs(ltrim_1);

  var rtrim_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = rtrim;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function rtrim(str, chars) {
    (0, _assertString.default)(str); // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions#Escaping

    var pattern = chars ? new RegExp("[".concat(chars.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), "]+$"), 'g') : /\s+$/g;
    return str.replace(pattern, '');
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var rtrim = /*@__PURE__*/getDefaultExportFromCjs(rtrim_1);

  var trim_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = trim;

  var _rtrim = _interopRequireDefault(rtrim_1);

  var _ltrim = _interopRequireDefault(ltrim_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function trim(str, chars) {
    return (0, _rtrim.default)((0, _ltrim.default)(str, chars), chars);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var trim = /*@__PURE__*/getDefaultExportFromCjs(trim_1);

  var _escape = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = escape;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function escape(str) {
    (0, _assertString.default)(str);
    return str.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\//g, '&#x2F;').replace(/\\/g, '&#x5C;').replace(/`/g, '&#96;');
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var _escape$1 = /*@__PURE__*/getDefaultExportFromCjs(_escape);

  var _unescape = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = unescape;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function unescape(str) {
    (0, _assertString.default)(str);
    return str.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&#x2F;/g, '/').replace(/&#x5C;/g, '\\').replace(/&#96;/g, '`');
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var _unescape$1 = /*@__PURE__*/getDefaultExportFromCjs(_unescape);

  var blacklist_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = blacklist;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function blacklist(str, chars) {
    (0, _assertString.default)(str);
    return str.replace(new RegExp("[".concat(chars, "]+"), 'g'), '');
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var blacklist = /*@__PURE__*/getDefaultExportFromCjs(blacklist_1);

  var stripLow_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = stripLow;

  var _assertString = _interopRequireDefault(assertString_1);

  var _blacklist = _interopRequireDefault(blacklist_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function stripLow(str, keep_new_lines) {
    (0, _assertString.default)(str);
    var chars = keep_new_lines ? '\\x00-\\x09\\x0B\\x0C\\x0E-\\x1F\\x7F' : '\\x00-\\x1F\\x7F';
    return (0, _blacklist.default)(str, chars);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var stripLow = /*@__PURE__*/getDefaultExportFromCjs(stripLow_1);

  var whitelist_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = whitelist;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  function whitelist(str, chars) {
    (0, _assertString.default)(str);
    return str.replace(new RegExp("[^".concat(chars, "]+"), 'g'), '');
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var whitelist = /*@__PURE__*/getDefaultExportFromCjs(whitelist_1);

  var isWhitelisted_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isWhitelisted;

  var _assertString = _interopRequireDefault(assertString_1);

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
  });

  var isWhitelisted = /*@__PURE__*/getDefaultExportFromCjs(isWhitelisted_1);

  var normalizeEmail_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = normalizeEmail;

  var _merge = _interopRequireDefault(merge_1);

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
  });

  var normalizeEmail = /*@__PURE__*/getDefaultExportFromCjs(normalizeEmail_1);

  var isSlug_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isSlug;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var charsetRegex = /^[^\s-_](?!.*?[-_]{2,})([a-z0-9-\\]{1,})[^\s]*[^-_\s]$/;

  function isSlug(str) {
    (0, _assertString.default)(str);
    return charsetRegex.test(str);
  }

  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var isSlug = /*@__PURE__*/getDefaultExportFromCjs(isSlug_1);

  var isStrongPassword_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isStrongPassword;

  var _merge = _interopRequireDefault(merge_1);

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var upperCaseRegex = /^[A-Z]$/;
  var lowerCaseRegex = /^[a-z]$/;
  var numberRegex = /^[0-9]$/;
  var symbolRegex = /^[-#!$%^&*()_+|~=`{}\[\]:";'<>?,.\/ ]$/;
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
  });

  var isStrongPassword = /*@__PURE__*/getDefaultExportFromCjs(isStrongPassword_1);

  var isVAT_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = isVAT;
  exports.vatMatchers = void 0;

  var _assertString = _interopRequireDefault(assertString_1);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var vatMatchers = {
    GB: /^GB((\d{3} \d{4} ([0-8][0-9]|9[0-6]))|(\d{9} \d{3})|(((GD[0-4])|(HA[5-9]))[0-9]{2}))$/
  };
  exports.vatMatchers = vatMatchers;

  function isVAT(str, countryCode) {
    (0, _assertString.default)(str);
    (0, _assertString.default)(countryCode);

    if (countryCode in vatMatchers) {
      return vatMatchers[countryCode].test(str);
    }

    throw new Error("Invalid country code: '".concat(countryCode, "'"));
  }
  });

  var isVAT = /*@__PURE__*/getDefaultExportFromCjs(isVAT_1);

  var validator_1 = createCommonjsModule(function (module, exports) {
  "use strict";

  function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;

  var _toDate = _interopRequireDefault(toDate_1);

  var _toFloat = _interopRequireDefault(toFloat_1);

  var _toInt = _interopRequireDefault(toInt_1);

  var _toBoolean = _interopRequireDefault(toBoolean_1);

  var _equals = _interopRequireDefault(equals_1);

  var _contains = _interopRequireDefault(contains_1);

  var _matches = _interopRequireDefault(matches_1);

  var _isEmail = _interopRequireDefault(isEmail_1);

  var _isURL = _interopRequireDefault(isURL_1);

  var _isMACAddress = _interopRequireDefault(isMACAddress_1);

  var _isIP = _interopRequireDefault(isIP_1);

  var _isIPRange = _interopRequireDefault(isIPRange_1);

  var _isFQDN = _interopRequireDefault(isFQDN_1);

  var _isDate = _interopRequireDefault(isDate_1);

  var _isBoolean = _interopRequireDefault(isBoolean_1);

  var _isLocale = _interopRequireDefault(isLocale_1);

  var _isAlpha = _interopRequireWildcard(isAlpha_1);

  var _isAlphanumeric = _interopRequireWildcard(isAlphanumeric_1);

  var _isNumeric = _interopRequireDefault(isNumeric_1);

  var _isPassportNumber = _interopRequireDefault(isPassportNumber_1);

  var _isPort = _interopRequireDefault(isPort_1);

  var _isLowercase = _interopRequireDefault(isLowercase_1);

  var _isUppercase = _interopRequireDefault(isUppercase_1);

  var _isIMEI = _interopRequireDefault(isIMEI_1);

  var _isAscii = _interopRequireDefault(isAscii_1);

  var _isFullWidth = _interopRequireDefault(isFullWidth_1);

  var _isHalfWidth = _interopRequireDefault(isHalfWidth_1);

  var _isVariableWidth = _interopRequireDefault(isVariableWidth_1);

  var _isMultibyte = _interopRequireDefault(isMultibyte_1);

  var _isSemVer = _interopRequireDefault(isSemVer_1);

  var _isSurrogatePair = _interopRequireDefault(isSurrogatePair_1);

  var _isInt = _interopRequireDefault(isInt_1);

  var _isFloat = _interopRequireWildcard(isFloat_1);

  var _isDecimal = _interopRequireDefault(isDecimal_1);

  var _isHexadecimal = _interopRequireDefault(isHexadecimal_1);

  var _isOctal = _interopRequireDefault(isOctal_1);

  var _isDivisibleBy = _interopRequireDefault(isDivisibleBy_1);

  var _isHexColor = _interopRequireDefault(isHexColor_1);

  var _isRgbColor = _interopRequireDefault(isRgbColor_1);

  var _isHSL = _interopRequireDefault(isHSL_1);

  var _isISRC = _interopRequireDefault(isISRC_1);

  var _isIBAN = _interopRequireDefault(isIBAN_1);

  var _isBIC = _interopRequireDefault(isBIC_1);

  var _isMD = _interopRequireDefault(isMD5_1);

  var _isHash = _interopRequireDefault(isHash_1);

  var _isJWT = _interopRequireDefault(isJWT_1);

  var _isJSON = _interopRequireDefault(isJSON_1);

  var _isEmpty = _interopRequireDefault(isEmpty_1);

  var _isLength = _interopRequireDefault(isLength_1$1);

  var _isByteLength = _interopRequireDefault(isByteLength_1);

  var _isUUID = _interopRequireDefault(isUUID_1);

  var _isMongoId = _interopRequireDefault(isMongoId_1);

  var _isAfter = _interopRequireDefault(isAfter_1);

  var _isBefore = _interopRequireDefault(isBefore_1);

  var _isIn = _interopRequireDefault(isIn_1);

  var _isCreditCard = _interopRequireDefault(isCreditCard_1);

  var _isIdentityCard = _interopRequireDefault(isIdentityCard_1);

  var _isEAN = _interopRequireDefault(isEAN_1);

  var _isISIN = _interopRequireDefault(isISIN_1);

  var _isISBN = _interopRequireDefault(isISBN_1);

  var _isISSN = _interopRequireDefault(isISSN_1);

  var _isTaxID = _interopRequireDefault(isTaxID_1);

  var _isMobilePhone = _interopRequireWildcard(isMobilePhone_1);

  var _isEthereumAddress = _interopRequireDefault(isEthereumAddress_1);

  var _isCurrency = _interopRequireDefault(isCurrency_1);

  var _isBtcAddress = _interopRequireDefault(isBtcAddress_1);

  var _isISO = _interopRequireDefault(isISO8601_1);

  var _isRFC = _interopRequireDefault(isRFC3339_1);

  var _isISO31661Alpha = _interopRequireDefault(isISO31661Alpha2_1);

  var _isISO31661Alpha2 = _interopRequireDefault(isISO31661Alpha3_1);

  var _isBase = _interopRequireDefault(isBase32_1);

  var _isBase2 = _interopRequireDefault(isBase58_1);

  var _isBase3 = _interopRequireDefault(isBase64_1);

  var _isDataURI = _interopRequireDefault(isDataURI_1);

  var _isMagnetURI = _interopRequireDefault(isMagnetURI_1);

  var _isMimeType = _interopRequireDefault(isMimeType_1);

  var _isLatLong = _interopRequireDefault(isLatLong_1);

  var _isPostalCode = _interopRequireWildcard(isPostalCode_1);

  var _ltrim = _interopRequireDefault(ltrim_1);

  var _rtrim = _interopRequireDefault(rtrim_1);

  var _trim = _interopRequireDefault(trim_1);

  var _escape$1 = _interopRequireDefault(_escape);

  var _unescape$1 = _interopRequireDefault(_unescape);

  var _stripLow = _interopRequireDefault(stripLow_1);

  var _whitelist = _interopRequireDefault(whitelist_1);

  var _blacklist = _interopRequireDefault(blacklist_1);

  var _isWhitelisted = _interopRequireDefault(isWhitelisted_1);

  var _normalizeEmail = _interopRequireDefault(normalizeEmail_1);

  var _isSlug = _interopRequireDefault(isSlug_1);

  var _isStrongPassword = _interopRequireDefault(isStrongPassword_1);

  var _isVAT = _interopRequireDefault(isVAT_1);

  function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

  function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

  var version = '13.5.2';
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
    isVAT: _isVAT.default
  };
  var _default = validator;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
  });

  var Validator = /*@__PURE__*/getDefaultExportFromCjs(validator_1);

  /**
  	@PelagicCreatures/MolaMola

  	@author Michael Rhodes
  	@license MIT
  	Made in Barbados 🇧🇧 Copyright © 2020 Michael Rhodes

  	Form ID: an application unique identifier for the form EG: 'login', 'register'

  	<form id="login" method="GET" action="/endpoint" data-sargasso-class="MolaMola" data-submitter=".submit-button" data-status=".status">

  	Form handlers are used for handling form events.

  	The following events can be handled by the handlers:

  	registerFormHandler('myform',{
  		preFlight: () => {},
  		success: (response) => {},
  		error: (statusCode, response) => {}
  	})

  	the API for the endpoint:
  		200 (ok) & 422 (unprocessable entity) are expected to return json
  		Use 422 for server side validation errors, the reponse payload is
  		up to implementor and should be handled with a helper success method.

  		Other http errors such as 401 (unauthorized) are handed to the helper
  		error method
  */

  const ExtendedValidator = cloneDeep_1(Validator);

  const validationMessages = {
  	isLength: 'Length between %s and %s',
  	isEmail: 'Email address',
  	notEmpty: 'Required',
  	isPassword: 'At least one uppercase, one lowercase, and one number'
  };

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

  const registeredHelperClasses = {};
  const registerHelperClass = (className, object) => {
  	registeredHelperClasses[className] = object;
  };

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

  class MolaMolaHelper {
  	constructor (form) {
  		this.form = form;
  	}

  	// override these methods as needed
  	pose () {} // pose form

  	/*
  		preFlight: about to submit this.form.payload to endpoint
  		return a promise for any async behavior (like recAPTCHA below)
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

  class ReCAPTCHAv3Helper extends MolaMolaHelper {
  	constructor (form) {
  		super(form);
  		this.recaptcha = this.form.element.getAttribute('data-recaptcha');
  	}

  	pose () {
  		sargasso.utils.elementTools.addClass(document.body, 'show-recaptcha', this);
  	}

  	async preFlight () {
  		try {
  			const token = await grecaptcha.execute(this.recaptcha, {
  				action: 'social'
  			});
  			this.form.payload['g-recaptcha-response'] = token;
  		} catch (err) {
  			throw (err || new Error('reCaptchaV3 network error')) // OK google... network errors come back empty.
  		}
  	}

  	destroy () {
  		sargasso.utils.elementTools.removeClass(document.body, 'show-recaptcha');
  	}
  }

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

  	async handleChange (e) {
  		if (e && e.srcElement && e.srcElement !== window) {
  			const elem = e.srcElement;
  			sargasso.utils.elementTools.addClass(elem.closest('form'), 'touched');
  			const isDirty = elem.getAttribute('data-last-value') !== getRealVal(elem);
  			elem.setAttribute('data-touched', true);
  			elem.setAttribute('data-dirty', isDirty);
  		}
  		const errors = this.inputs.map(await this.validateField.bind(this));
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

  	async validateField (element) {
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
  			return null
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
  				if (!ExtendedValidator[test].apply(ExtendedValidator, [val, opts])) {
  					errors.push(this.getMessage(test, opts, validationMessage[test]));
  				}
  			}
  		}

  		const matchSelector = element.getAttribute('data-match');
  		if (matchSelector && getRealVal(this.form.element.querySelector(matchSelector)).toString() !== getRealVal(element).toString()) {
  			errors.push('Does not match');
  		}

  		if (element.getAttribute('data-lookup-endpoint')) {
  			if (val.length > 2 && !errors.length) {
  				if (element.getAttribute('data-last-lookup-val') !== val) {
  					element.setAttribute('data-last-lookup-val', val);
  					const e = await this.lookup(element.getAttribute('data-lookup-endpoint'), val, element.hasAttribute('data-unique'));
  					if (e) {
  						element.setAttribute('data-last-lookup-result', e);
  						errors.push(e);
  					} else {
  						element.removeAttribute('data-last-lookup-result');
  					}
  				} else {
  					if (element.getAttribute('data-last-lookup-result')) {
  						errors.push(element.getAttribute('data-last-lookup-result'));
  					}
  				}
  			}
  		}

  		const inputGroup = element.closest('.input-group');
  		if (!inputGroup) {
  			console.log('Warning: document structure error - validated inputs must be in container with class "input-group"');
  		} else {
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

  		return errors
  	}

  	async lookup (endpoint, val, unique) {
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

  		if (this.recaptcha) {}

  		this.submitHandler = async (e) => {
  			e.preventDefault();

  			this.serializeForm();

  			try {
  				await this.tellHelpers('preFlight');
  				this.submit();
  			} catch (err) {
  				this.tellHelpers('error', [err]);
  			}
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

  	async tellHelpers (event, params) {
  		const handlers = this.getHelpersForEvent(event, params);
  		return Promise.all(handlers)
  	}
  }

  sargasso.utils.registerSargassoClass('MolaMola', MolaMola);

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

}({}, SargassoModule));
