/* eslint-disable no-unused-vars */
// @ts-nocheck

/**
 * @fileoverview Public API of ORCID.js
 * @externs
 */

/**
 * Checks that a string is a valid ORCID of any format
 * @param {string} input String to test format of
 * @returns {boolean}
 */
const inAcceptedFormat = function (input) {}

/**
 * Converts a valid ORCID (of any format) into the dashed format
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
const toDashFormat = function (input) {}

/**
 * Converts a valid ORCID (of any format) into the non-dashed format
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
const toNoDashFormat = function (input) {}

/**
 * Converts an ORCID to its corresponding URI, e.g. https://orcid.org/xxxxxxx......
 * @param {string} input Any valid ORCID
 * @param {boolean=} secure true (default): https, false: http
 * @returns {string}
 */
const toUriWithProtocol = function (input, secure) {}

/**
 * Converts an ORCID to is corresponding URI, without a protocol, e.g. orcid.org/xxxxxx.....
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
const toUriWithoutProtocol = function (input) {}

/**
 * Returns true or false indicating whether a string conforms to any format of ORCID.
 * @param {string} input Any string to test
 * @returns {boolean}
 */
const isValid = function (input) {}

/**
 * A side-effect version of `isValid` - will throw Error if `isValid` would return false.
 * @param {string} input
 * @returns {void}
 */
const validate = function (input) {}
