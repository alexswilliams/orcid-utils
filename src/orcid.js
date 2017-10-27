"use strict";

var ORCID = {
  inAcceptedFormat: function(input) {
    if (typeof input != 'string') {
      throw new TypeError('Input type must be a string');
    }
    var noPrefixInput = input.replace(/^http[s]?:\/\/(.*)$/i, '$1');
    var noUriInput = noPrefixInput.replace(/^orcid\.org\/(.*)$/i, '$1');
    return /^[0-9]{4}-?[0-9]{4}-?[0-9]{4}-?[0-9]{3}[0-9X]$/i.test(noUriInput);
  },

  toDashFormat: function(input) {
    if (!ORCID.inAcceptedFormat(input)) {
      throw new Error("ORCID not in acceptable format.");
    }
    if (!ORCID.isValid(input)) {
      throw new Error("ORCID not valid.");
    }
    return input
        .replace(/^.*([0-9]{4})-?([0-9]{4})-?([0-9]{4})-?([0-9]{3}[0-9xX])$/i, '$1-$2-$3-$4')
        .toUpperCase();
  },

  toNoDashFormat: function(input) {
    if (!ORCID.inAcceptedFormat(input)) {
      throw new Error("ORCID not in acceptable format.");
    }
    if (!ORCID.isValid(input)) {
      throw new Error("ORCID not valid.");
    }
    return input
        .replace(/^.*([0-9]{4})-?([0-9]{4})-?([0-9]{4})-?([0-9]{3}[0-9xX])$/i, '$1$2$3$4')
        .toUpperCase();
  },

  toUriWithProtocol: function(input, protocol) {
    var proto = (protocol || 'https');
    return proto + '://' + toUriWithoutProtocol(input);
  },

  toUriWithoutProtocol: function(input) {
    return 'orcid.org/' + toDashedFormat(input);
  },

  isValid: function(input) {
    if (typeof input != 'string') {
      throw new TypeError('Input type must be a string');
    }
    if (!ORCID.inAcceptedFormat(input)) {
      return false;
    }
    var inputNoDash = input
        .replace(/^.*([0-9]{4})-?([0-9]{4})-?([0-9]{4})-?([0-9]{3}[0-9xX])$/i, '$1$2$3$4')
        .toUpperCase();

    var total = 0;
    for (var i = 0; i < inputNoDash.length - 1; i++) {
      total = (total + (+inputNoDash[i])) * 2;
    }
    var result = (12 - (total % 11)) % 11;
    var checkDigit = (result == 10) ? 'X' : (result + '');
    return (inputNoDash[15] == checkDigit);
  }
};

exports.isValid = ORCID.isValid;
exports.toDashFormat = ORCID.toDashFormat;
exports.toNoDashFormat = ORCID.toNoDashFormat;
exports.toUriWithProtocol = ORCID.toUriWithProtocol;
exports.toUriWithoutProtocol = ORCID.toUriWithoutProtocol;

