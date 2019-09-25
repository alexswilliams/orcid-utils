'use strict';

const ORCID = {
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

  toUriWithProtocol: function(input, secure) {
    if (typeof secure !== 'boolean' && typeof secure !== 'undefined') {
      throw new TypeError('secure flag must be a boolean, or omitted.');
    }
    let proto;
    if (typeof secure === 'undefined' || secure) {
      proto = 'https';
    } else {
      proto = 'http';
    }
    return proto + '://' + ORCID.toUriWithoutProtocol(input);
  },

  toUriWithoutProtocol: function(input) {
    return 'orcid.org/' + ORCID.toDashFormat(input);
  },

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