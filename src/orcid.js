'use strict';

const ORCID = {
  /**
   * Checks that a string is a valid ORCID of any format
   * @param {string} input String to test format of
   * @returns {boolean}
   */
  inAcceptedFormat: function(input) {
    if (typeof input !== 'string') {
      throw new TypeError('Input type must be a string');
    }
    return /^[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{3}[0-9X]$/i.test(
        input
            .replace(/^http[s]?:\/\/(.*)$/i, '$1')
            .replace(/^orcid\.org\/(.*)$/i, '$1')
    );
  },

  /**
   * Converts a valid ORCID (of any format) into the dashed format
   * @param {string} input Any valid ORCID
   * @returns {string}
   */
  toDashFormat: function(input) {
    if (!ORCID.inAcceptedFormat(input)) {
      throw new Error('ORCID not in acceptable format.');
    }
    if (!ORCID.isValid(input)) {
      throw new Error('ORCID not valid.');
    }
    return input
        .replace(/^.*([0-9]{4})-?([0-9]{4})-?([0-9]{4})-?([0-9]{3}[0-9xX])$/i, '$1-$2-$3-$4')
        .toUpperCase();
  },

  /**
   * Converts a valid ORCID (of any format) into the non-dashed format
   * @param {string} input Any valid ORCID
   * @returns {string}
   */
  toNoDashFormat: function(input) {
    if (!ORCID.inAcceptedFormat(input)) {
      throw new Error('ORCID not in acceptable format.');
    }
    if (!ORCID.isValid(input)) {
      throw new Error('ORCID not valid.');
    }
    return input
        .replace(/^.*([0-9]{4})-?([0-9]{4})-?([0-9]{4})-?([0-9]{3}[0-9xX])$/i, '$1$2$3$4')
        .toUpperCase();
  },

  /**
   * Converts an ORCID to its corresponding URI, e.g. https://orcid.org/xxxxxxx......
   * @param {string} input Any valid ORCID
   * @param {boolean=} secure true (default): https, false: http
   * @returns {string}
   */
  toUriWithProtocol: function(input, secure) {
    if (typeof secure !== 'boolean' && typeof secure !== 'undefined') {
      throw new TypeError('secure flag must be a boolean, or omitted.');
    }
    const proto = {true:'https', false:'http'}[typeof secure === 'undefined' || secure];
    return proto + '://' + ORCID.toUriWithoutProtocol(input);
  },

  /**
   * Converts an ORCID to is corresponding URI, without a protocol, e.g. orcid.org/xxxxxx.....
   * @param {string} input Any valid ORCID
   * @returns {string}
   */
  toUriWithoutProtocol: function(input) {
    return 'orcid.org/' + ORCID.toDashFormat(input);
  },

  /**
   * Returns true or false indicating whether a string conforms to any format of ORCID.
   * @param {string} input Any string to test
   * @returns {boolean}
   */
  isValid: function(input) {
    if (typeof input !== 'string') {
      throw new TypeError('Input type must be a string');
    }
    if (!ORCID.inAcceptedFormat(input)) {
      return false;
    }
    const inputNoDash = input
        .replace(/^.*([0-9]{4})-?([0-9]{4})-?([0-9]{4})-?([0-9]{3}[0-9xX])$/i, '$1$2$3$4')
        .toUpperCase();

    let total = 0;
    for (let i = 0; i < inputNoDash.length - 1; i++) {
      total = (total + +inputNoDash[i]) * 2;
    }
    const result = (12 - total % 11) % 11;
    const checkDigit = result === 10 ? 'X' : result + '';
    return inputNoDash[15] === checkDigit;
  },

  /**
   * A side-effect version of `isValid` - will throw Error if `isValid` would return false.
   * @param {string} input 
   * @returns {undefined}
   */
  validate: function(input) {
    if (!ORCID.isValid(input)) {
      throw new Error('Invalid ORCID')
    }
  }
};

if (typeof exports !== 'undefined') {
  exports.isValid = ORCID.isValid;
  exports.validate = ORCID.validate;
  exports.inAcceptedFormat = ORCID.inAcceptedFormat;
  exports.toDashFormat = ORCID.toDashFormat;
  exports.toNoDashFormat = ORCID.toNoDashFormat;
  exports.toUriWithProtocol = ORCID.toUriWithProtocol;
  exports.toUriWithoutProtocol = ORCID.toUriWithoutProtocol;
}