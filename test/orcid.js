"use strict";

const ORCID = require('../lib/orcid');

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
  },

  valid_ORCIDs_are_converted_to_standalone_dashed_format: function(test) {
    test.strictEqual(ORCID.toDashFormat('0000-0000-0000-0001'),
                     '0000-0000-0000-0001');
    test.strictEqual(ORCID.toDashFormat('0001-2345-6789-012X'),
                     '0001-2345-6789-012X');
    test.strictEqual(ORCID.toDashFormat('0000111122223336'),
                     '0000-1111-2222-3336');
    test.strictEqual(ORCID.toDashFormat('orcid.org/0000-1111-2222-3336'),
                     '0000-1111-2222-3336');
    test.strictEqual(ORCID.toDashFormat('orcid.org/0000111122223336'),
                     '0000-1111-2222-3336');
    test.strictEqual(ORCID.toDashFormat('https://orcid.org/0000-1111-2222-3336'),
                     '0000-1111-2222-3336');
    test.strictEqual(ORCID.toDashFormat('https://orcid.org/0000111122223336'),
                     '0000-1111-2222-3336');
    test.strictEqual(ORCID.toDashFormat('http://orcid.org/0000-1111-2222-3336'),
                     '0000-1111-2222-3336');
    test.strictEqual(ORCID.toDashFormat('http://orcid.org/0000111122223336'),
                     '0000-1111-2222-3336');
    test.done();
  },

  x_is_made_uppercase: function(test) {
    test.strictEqual(ORCID.toDashFormat('0001-2345-6789-012x'), '0001-2345-6789-012X');
    test.strictEqual(ORCID.toDashFormat('0001-2345-6789-012X'), '0001-2345-6789-012X');
    test.strictEqual(ORCID.toDashFormat('orcid.org/0001-2345-6789-012x'), '0001-2345-6789-012X');
    test.done();
  },

  invalid_ORCIDs_throw: function(test) {
    test.throws(function() {ORCID.toDashFormat('0000-0000-0000-0003');});
    test.throws(function() {ORCID.toDashFormat('0001-2345-6789-0122');});
    test.throws(function() {ORCID.toDashFormat('0000-1111-2222-3331');});
    test.throws(function() {ORCID.toDashFormat('9999-9999-9999-9990');});
    test.throws(function() {ORCID.toDashFormat('');});
    test.throws(function() {ORCID.toDashFormat('0');});
    test.throws(function() {ORCID.toDashFormat('not a valid ORCID');});
    test.throws(function() {ORCID.toDashFormat('https://orcid.org/profile');});
    test.throws(function() {ORCID.toDashFormat('ftp://0000-1111-2222-3336');});
    test.throws(function() {ORCID.toDashFormat('orcid.com/0000-1111-2222-3336');});
    test.throws(function() {ORCID.toDashFormat('orcid.org://https/0000-1111-2222-3336');});
    test.throws(function() {ORCID.toDashFormat('ftp://orcid.org/0000-1111-2222-3336');});
    test.throws(function() {ORCID.toDashFormat('https:\\orcid.org/0000-1111-2222-3336');});
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
  },

  valid_ORCIDs_are_converted_to_standalone_non_dashed_format: function(test) {
    test.strictEqual(ORCID.toNoDashFormat('0000-0000-0000-0001'),
                     '0000000000000001');
    test.strictEqual(ORCID.toNoDashFormat('0001-2345-6789-012X'),
                     '000123456789012X');
    test.strictEqual(ORCID.toNoDashFormat('0000111122223336'),
                     '0000111122223336');
    test.strictEqual(ORCID.toNoDashFormat('orcid.org/0000-1111-2222-3336'),
                     '0000111122223336');
    test.strictEqual(ORCID.toNoDashFormat('orcid.org/0000111122223336'),
                     '0000111122223336');
    test.strictEqual(ORCID.toNoDashFormat('https://orcid.org/0000-1111-2222-3336'),
                     '0000111122223336');
    test.strictEqual(ORCID.toNoDashFormat('https://orcid.org/0000111122223336'),
                     '0000111122223336');
    test.strictEqual(ORCID.toNoDashFormat('http://orcid.org/0000-1111-2222-3336'),
                     '0000111122223336');
    test.strictEqual(ORCID.toNoDashFormat('http://orcid.org/0000111122223336'),
                     '0000111122223336');
    test.done();
  },

  x_is_made_uppercase: function(test) {
    test.strictEqual(ORCID.toNoDashFormat('0001-2345-6789-012x'), '000123456789012X');
    test.strictEqual(ORCID.toNoDashFormat('0001-2345-6789-012X'), '000123456789012X');
    test.strictEqual(ORCID.toNoDashFormat('orcid.org/0001-2345-6789-012x'), '000123456789012X');
    test.done();
  },

  invalid_ORCIDs_throw: function(test) {
    test.throws(function() {ORCID.toNoDashFormat('0000-0000-0000-0003');});
    test.throws(function() {ORCID.toNoDashFormat('0001-2345-6789-0122');});
    test.throws(function() {ORCID.toNoDashFormat('0000-1111-2222-3331');});
    test.throws(function() {ORCID.toNoDashFormat('9999-9999-9999-9990');});
    test.throws(function() {ORCID.toNoDashFormat('');});
    test.throws(function() {ORCID.toNoDashFormat('0');});
    test.throws(function() {ORCID.toNoDashFormat('not a valid ORCID');});
    test.throws(function() {ORCID.toNoDashFormat('https://orcid.org/profile');});
    test.throws(function() {ORCID.toNoDashFormat('ftp://0000-1111-2222-3336');});
    test.throws(function() {ORCID.toNoDashFormat('orcid.com/0000-1111-2222-3336');});
    test.throws(function() {ORCID.toNoDashFormat('orcid.org://https/0000-1111-2222-3336');});
    test.throws(function() {ORCID.toNoDashFormat('ftp://orcid.org/0000-1111-2222-3336');});
    test.throws(function() {ORCID.toNoDashFormat('https:\\orcid.org/0000-1111-2222-3336');});
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
  },

  valid_ORCIDs_are_converted_to_uri_without_protocol: function(test) {
    test.strictEqual(ORCID.toUriWithoutProtocol('0000-0000-0000-0001'),
                     'orcid.org/0000-0000-0000-0001');
    test.strictEqual(ORCID.toUriWithoutProtocol('0001-2345-6789-012X'),
                     'orcid.org/0001-2345-6789-012X');
    test.strictEqual(ORCID.toUriWithoutProtocol('0000111122223336'),
                     'orcid.org/0000-1111-2222-3336');
    test.strictEqual(ORCID.toUriWithoutProtocol('orcid.org/0000-1111-2222-3336'),
                     'orcid.org/0000-1111-2222-3336');
    test.strictEqual(ORCID.toUriWithoutProtocol('orcid.org/0000111122223336'),
                     'orcid.org/0000-1111-2222-3336');
    test.strictEqual(ORCID.toUriWithoutProtocol('https://orcid.org/0000-1111-2222-3336'),
                     'orcid.org/0000-1111-2222-3336');
    test.strictEqual(ORCID.toUriWithoutProtocol('https://orcid.org/0000111122223336'),
                     'orcid.org/0000-1111-2222-3336');
    test.strictEqual(ORCID.toUriWithoutProtocol('http://orcid.org/0000-1111-2222-3336'),
                     'orcid.org/0000-1111-2222-3336');
    test.strictEqual(ORCID.toUriWithoutProtocol('http://orcid.org/0000111122223336'),
                     'orcid.org/0000-1111-2222-3336');
    test.done();
  },

  x_is_made_uppercase: function(test) {
    test.strictEqual(ORCID.toUriWithoutProtocol('0001-2345-6789-012x'),
                     'orcid.org/0001-2345-6789-012X');
    test.strictEqual(ORCID.toUriWithoutProtocol('0001-2345-6789-012X')
        , 'orcid.org/0001-2345-6789-012X');
    test.strictEqual(ORCID.toUriWithoutProtocol('orcid.org/0001-2345-6789-012x'),
                     'orcid.org/0001-2345-6789-012X');
    test.done();
  },

  invalid_ORCIDs_throw: function(test) {
    test.throws(function() {ORCID.toUriWithoutProtocol('0000-0000-0000-0003');});
    test.throws(function() {ORCID.toUriWithoutProtocol('0001-2345-6789-0122');});
    test.throws(function() {ORCID.toUriWithoutProtocol('0000-1111-2222-3331');});
    test.throws(function() {ORCID.toUriWithoutProtocol('9999-9999-9999-9990');});
    test.throws(function() {ORCID.toUriWithoutProtocol('');});
    test.throws(function() {ORCID.toUriWithoutProtocol('0');});
    test.throws(function() {ORCID.toUriWithoutProtocol('not a valid ORCID');});
    test.throws(function() {ORCID.toUriWithoutProtocol('https://orcid.org/profile');});
    test.throws(function() {ORCID.toUriWithoutProtocol('ftp://0000-1111-2222-3336');});
    test.throws(function() {ORCID.toUriWithoutProtocol('orcid.com/0000-1111-2222-3336');});
    test.throws(function() {ORCID.toUriWithoutProtocol('orcid.org://https/0000-1111-2222-3336');});
    test.throws(function() {ORCID.toUriWithoutProtocol('ftp://orcid.org/0000-1111-2222-3336');});
    test.throws(function() {ORCID.toUriWithoutProtocol('https:\\orcid.org/0000-1111-2222-3336');});
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
  },

  non_boolean_and_non_undefined_flags_throw_TypeError: function(test) {
    test.throws(function() { ORCID.toUriWithProtocol('0000-0000-0000-0001', 10); });
    test.throws(function() { ORCID.toUriWithProtocol('0000-0000-0000-0001', {}); });
    test.throws(function() { ORCID.toUriWithProtocol('0000-0000-0000-0001', []); });
    test.throws(function() { ORCID.toUriWithProtocol('0000-0000-0000-0001', NaN); });
    test.throws(function() { ORCID.toUriWithProtocol('0000-0000-0000-0001', null); });
    test.throws(function() { ORCID.toUriWithProtocol('0000-0000-0000-0001', new Error()); });
    test.throws(function() { ORCID.toUriWithProtocol('0000-0000-0000-0001', function() {}); });
    test.throws(function() { ORCID.toUriWithProtocol('0000-0000-0000-0001', Symbol()); });
    test.throws(function() { ORCID.toUriWithProtocol('0000-0000-0000-0001', /./); });
    test.done();
  },

  omitting_the_secure_flag_defaults_to_secure_uri: function(test) {
    test.strictEqual(ORCID.toUriWithProtocol('0000-0000-0000-0001'),
                     'https://orcid.org/0000-0000-0000-0001');
    test.done();
  },

  setting_the_secure_flag_true_forces_https: function(test) {
    test.strictEqual(ORCID.toUriWithProtocol('0000-0000-0000-0001', true),
                     'https://orcid.org/0000-0000-0000-0001');
    test.done();
  },

  setting_the_secure_flag_flase_forces_http: function(test) {
    test.strictEqual(ORCID.toUriWithProtocol('0000-0000-0000-0001', false),
                     'http://orcid.org/0000-0000-0000-0001');
    test.done();
  },

  valid_ORCIDs_are_converted_to_uri_with_protocol: function(test) {
    test.strictEqual(ORCID.toUriWithProtocol('0000-0000-0000-0001'),
                     'https://orcid.org/0000-0000-0000-0001');
    test.strictEqual(ORCID.toUriWithProtocol('0001-2345-6789-012X'),
                     'https://orcid.org/0001-2345-6789-012X');
    test.strictEqual(ORCID.toUriWithProtocol('0000111122223336'),
                     'https://orcid.org/0000-1111-2222-3336');
    test.strictEqual(ORCID.toUriWithProtocol('orcid.org/0000-1111-2222-3336'),
                     'https://orcid.org/0000-1111-2222-3336');
    test.strictEqual(ORCID.toUriWithProtocol('orcid.org/0000111122223336'),
                     'https://orcid.org/0000-1111-2222-3336');
    test.strictEqual(ORCID.toUriWithProtocol('https://orcid.org/0000-1111-2222-3336'),
                     'https://orcid.org/0000-1111-2222-3336');
    test.strictEqual(ORCID.toUriWithProtocol('https://orcid.org/0000111122223336'),
                     'https://orcid.org/0000-1111-2222-3336');
    test.strictEqual(ORCID.toUriWithProtocol('http://orcid.org/0000-1111-2222-3336'),
                     'https://orcid.org/0000-1111-2222-3336');
    test.strictEqual(ORCID.toUriWithProtocol('http://orcid.org/0000111122223336'),
                     'https://orcid.org/0000-1111-2222-3336');
    test.done();
  },

  x_is_made_uppercase: function(test) {
    test.strictEqual(ORCID.toUriWithProtocol('0001-2345-6789-012x'),
                     'https://orcid.org/0001-2345-6789-012X');
    test.strictEqual(ORCID.toUriWithProtocol('0001-2345-6789-012X'),
                     'https://orcid.org/0001-2345-6789-012X');
    test.strictEqual(ORCID.toUriWithProtocol('orcid.org/0001-2345-6789-012x'),
                     'https://orcid.org/0001-2345-6789-012X');
    test.strictEqual(ORCID.toUriWithProtocol('0001-2345-6789-012x', false),
                     'http://orcid.org/0001-2345-6789-012X');
    test.strictEqual(ORCID.toUriWithProtocol('0001-2345-6789-012X', false),
                     'http://orcid.org/0001-2345-6789-012X');
    test.strictEqual(ORCID.toUriWithProtocol('orcid.org/0001-2345-6789-012x', false),
                     'http://orcid.org/0001-2345-6789-012X');
    test.strictEqual(ORCID.toUriWithProtocol('http://orcid.org/0001-2345-6789-012x', false),
                     'http://orcid.org/0001-2345-6789-012X');
    test.done();
  },

  protocol_of_input_can_be_changed_using_flag: function(test) {
    test.strictEqual(ORCID.toUriWithProtocol('http://orcid.org/0001-2345-6789-012X', true),
                     'https://orcid.org/0001-2345-6789-012X');
    test.strictEqual(ORCID.toUriWithProtocol('https://orcid.org/0001-2345-6789-012X', false),
                     'http://orcid.org/0001-2345-6789-012X');
    test.done();
  },
  protocol_gets_upgraded_when_flag_is_omitted: function(test) {
    test.strictEqual(ORCID.toUriWithProtocol('https://orcid.org/0001-2345-6789-012X'),
                     'https://orcid.org/0001-2345-6789-012X');
    test.strictEqual(ORCID.toUriWithProtocol('https://orcid.org/0001-2345-6789-012X'),
                     'https://orcid.org/0001-2345-6789-012X');
    test.done();
  },

  invalid_ORCIDs_throw: function(test) {
    test.throws(function() {ORCID.toUriWithProtocol('0000-0000-0000-0003');});
    test.throws(function() {ORCID.toUriWithProtocol('0001-2345-6789-0122');});
    test.throws(function() {ORCID.toUriWithProtocol('0000-1111-2222-3331', true);});
    test.throws(function() {ORCID.toUriWithProtocol('9999-9999-9999-9990', false);});
    test.throws(function() {ORCID.toUriWithProtocol('');});
    test.throws(function() {ORCID.toUriWithProtocol('0', true);});
    test.throws(function() {ORCID.toUriWithProtocol('not a valid ORCID', false);});
    test.throws(function() {ORCID.toUriWithProtocol('https://orcid.org/profile');});
    test.throws(function() {ORCID.toUriWithProtocol('ftp://0000-1111-2222-3336', true);});
    test.throws(function() {ORCID.toUriWithProtocol('orcid.com/0000-1111-2222-3336', false);});
    test.throws(function() {ORCID.toUriWithProtocol('orcid.org://https/0000-1111-2222-3336');});
    test.throws(function() {ORCID.toUriWithProtocol('ftp://orcid.org/0000-1111-2222-3336', true);});
    test.throws(
        function() {ORCID.toUriWithProtocol('https:\\orcid.org/0000-1111-2222-3336', false);});
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
