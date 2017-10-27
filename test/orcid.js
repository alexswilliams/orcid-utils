"use strict";

const ORCID = require('../src/orcid');

exports.toDashFormat = {
  non_string_inputs_throw_TypeError: function(test) {
    test.throws(function() { ORCID.toDashFormat(10); });
    test.throws(function() { ORCID.toDashFormat({}); });
    test.throws(function() { ORCID.toDashFormat([]); });
    test.throws(function() { ORCID.toDashFormat(NaN); });
    test.throws(function() { ORCID.toDashFormat(null); });
    test.throws(function() { ORCID.toDashFormat(undefined); });
    test.throws(function() { ORCID.toDashFormat(new Error()); });
    test.throws(function() { ORCID.toDashFormat(function() {}); });
    test.throws(function() { ORCID.toDashFormat(Symbol()); });
    test.throws(function() { ORCID.toDashFormat(/./); });
    test.done();
  }
};

exports.toNoDashFormat = {
  non_string_inputs_throw_TypeError: function(test) {
    test.throws(function() { ORCID.toNoDashFormat(10); });
    test.throws(function() { ORCID.toNoDashFormat({}); });
    test.throws(function() { ORCID.toNoDashFormat([]); });
    test.throws(function() { ORCID.toNoDashFormat(NaN); });
    test.throws(function() { ORCID.toNoDashFormat(null); });
    test.throws(function() { ORCID.toNoDashFormat(undefined); });
    test.throws(function() { ORCID.toNoDashFormat(new Error()); });
    test.throws(function() { ORCID.toNoDashFormat(function() {}); });
    test.throws(function() { ORCID.toNoDashFormat(Symbol()); });
    test.throws(function() { ORCID.toNoDashFormat(/./); });
    test.done();
  }
};

exports.toUriWithoutProtocol = {
  non_string_inputs_throw_TypeError: function(test) {
    test.throws(function() { ORCID.toUriWithoutProtocol(10); });
    test.throws(function() { ORCID.toUriWithoutProtocol({}); });
    test.throws(function() { ORCID.toUriWithoutProtocol([]); });
    test.throws(function() { ORCID.toUriWithoutProtocol(NaN); });
    test.throws(function() { ORCID.toUriWithoutProtocol(null); });
    test.throws(function() { ORCID.toUriWithoutProtocol(undefined); });
    test.throws(function() { ORCID.toUriWithoutProtocol(new Error()); });
    test.throws(function() { ORCID.toUriWithoutProtocol(function() {}); });
    test.throws(function() { ORCID.toUriWithoutProtocol(Symbol()); });
    test.throws(function() { ORCID.toUriWithoutProtocol(/./); });
    test.done();
  }
};

exports.toUriWithProtocol = {
  non_string_inputs_throw_TypeError: function(test) {
    test.throws(function() { ORCID.toUriWithProtocol(10); });
    test.throws(function() { ORCID.toUriWithProtocol({}); });
    test.throws(function() { ORCID.toUriWithProtocol([]); });
    test.throws(function() { ORCID.toUriWithProtocol(NaN); });
    test.throws(function() { ORCID.toUriWithProtocol(null); });
    test.throws(function() { ORCID.toUriWithProtocol(undefined); });
    test.throws(function() { ORCID.toUriWithProtocol(new Error()); });
    test.throws(function() { ORCID.toUriWithProtocol(function() {}); });
    test.throws(function() { ORCID.toUriWithProtocol(Symbol()); });
    test.throws(function() { ORCID.toUriWithProtocol(/./); });
    test.done();
  }
};

exports.isValid = {
  non_string_inputs_throw_TypeError: function(test) {
    test.throws(function() { ORCID.isValid(10); });
    test.throws(function() { ORCID.isValid({}); });
    test.throws(function() { ORCID.isValid([]); });
    test.throws(function() { ORCID.isValid(NaN); });
    test.throws(function() { ORCID.isValid(null); });
    test.throws(function() { ORCID.isValid(undefined); });
    test.throws(function() { ORCID.isValid(new Error()); });
    test.throws(function() { ORCID.isValid(function() {}); });
    test.throws(function() { ORCID.isValid(Symbol()); });
    test.throws(function() { ORCID.isValid(/./); });
    test.done();
  },

  known_good_ORCIDs_are_valid: function(test) {
    test.strictEqual(ORCID.isValid('0000-0000-0000-0001'), true);
    test.strictEqual(ORCID.isValid('0001-2345-6789-012X'), true);
    test.strictEqual(ORCID.isValid('0000-1111-2222-3336'), true);
    test.strictEqual(ORCID.isValid('9999-9999-9999-9994'), true);
    test.done();
  },

  known_bad_ORCIDs_are_not_valid: function(test) {
    test.strictEqual(ORCID.isValid('0000-0000-0000-0003'), false);
    test.strictEqual(ORCID.isValid('0001-2345-6789-0122'), false);
    test.strictEqual(ORCID.isValid('0000-1111-2222-3331'), false);
    test.strictEqual(ORCID.isValid('9999-9999-9999-9990'), false);
    test.done();
  },

  strings_without_ORCIDs_in_are_not_valid: function(test) {
    test.strictEqual(ORCID.isValid(''), false);
    test.strictEqual(ORCID.isValid('0'), false);
    test.strictEqual(ORCID.isValid('not a valid ORCID'), false);
    test.strictEqual(ORCID.isValid('https://orcid.org/profile'), false);
    test.done();
  },

  valid_ORCIDs_can_be_in_any_acceptable_format: function(test) {
    test.strictEqual(ORCID.isValid('0000-1111-2222-3336'), true);
    test.strictEqual(ORCID.isValid('0000111122223336'), true);
    test.strictEqual(ORCID.isValid('orcid.org/0000-1111-2222-3336'), true);
    test.strictEqual(ORCID.isValid('orcid.org/0000111122223336'), true);
    test.strictEqual(ORCID.isValid('https://orcid.org/0000-1111-2222-3336'), true);
    test.strictEqual(ORCID.isValid('https://orcid.org/0000111122223336'), true);
    test.strictEqual(ORCID.isValid('http://orcid.org/0000-1111-2222-3336'), true);
    test.strictEqual(ORCID.isValid('http://orcid.org/0000111122223336'), true);
    test.done();
  },

  unrecognised_prefixes_throw_Error: function(test) {
    test.throws(ORCID.isValid('ftp://0000-1111-2222-3336'));
    test.throws(ORCID.isValid('orcid.com/0000-1111-2222-3336'));
    test.throws(ORCID.isValid('orcid.org://https/0000-1111-2222-3336'));
    test.throws(ORCID.isValid('ftp://orcid.org/0000-1111-2222-3336'));
    test.throws(ORCID.isValid('https:\\orcid.org/0000-1111-2222-3336'));
    test.done();
  },

  prefix_ordering_must_have_protocol_first: function(test) {
    test.throws(ORCID.isValid('orcid.org/https://0000-1111-2222-3336'));
    test.ok(ORCID.isValid('https://orcid.org/0000-1111-2222-3336'));
    test.done();
  },

  ORCIDs_can_be_case_insensitive: function(test) {
    test.strictEqual(ORCID.isValid('0000-0000-0000-001X'),
                     ORCID.isValid('0000-0000-0000-001x'));
    test.strictEqual(ORCID.isValid('orcid.org/0000-1111-2222-3336'),
                     ORCID.isValid('ORCID.ORG/0000-1111-2222-3336'));
    test.strictEqual(ORCID.isValid('https://orcid.org/0000-1111-2222-3336'),
                     ORCID.isValid('https://ORCID.ORG/0000-1111-2222-3336'));
    test.strictEqual(ORCID.isValid('https://orcid.org/0000-1111-2222-3336'),
                     ORCID.isValid('HTTPS://ORCID.ORG/0000-1111-2222-3336'));
    test.done();
  }
};
