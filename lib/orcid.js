'use strict';
exports.__esModule = true;
exports.ORCID = exports.validate = exports.isValid = exports.toUriWithoutProtocol = exports.toUriWithProtocol = exports.toNoDashFormat = exports.toNoDashFormatWithoutValidation = exports.toDashFormat = exports.inAcceptedFormat = void 0;
/**
 * Checks that a string is a valid ORCID of any format
 * @param {string} input String to test format of
 * @returns {boolean}
 */
function inAcceptedFormat(input) {
    if (typeof input !== 'string')
        throw TypeError('Input must be string');
    return /^((https?:\/\/)?orcid\.org\/)?([0-9]{4}-?){3}[0-9]{3}[0-9X]$/i.test(input);
}
exports.inAcceptedFormat = inAcceptedFormat;
/**
 * Converts a valid ORCID (of any format) into the dashed format
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
function toDashFormat(input) {
    var noDash = toNoDashFormat(input);
    return [0, 4, 8, 12].map(function (it) { return noDash.slice(it, it + 4); }).join('-');
}
exports.toDashFormat = toDashFormat;
/**
 * Converts a valid ORCID (of any format) into the non-dashed format (without validating the input first - useful internally)
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
function toNoDashFormatWithoutValidation(input) {
    return input.replace(/-/g, '').slice(-16).toUpperCase();
}
exports.toNoDashFormatWithoutValidation = toNoDashFormatWithoutValidation;
/**
 * Converts a valid ORCID (of any format) into the non-dashed format
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
function toNoDashFormat(input) {
    validate(input);
    return toNoDashFormatWithoutValidation(input);
}
exports.toNoDashFormat = toNoDashFormat;
/**
 * Converts an ORCID to its corresponding URI, e.g. https://orcid.org/xxxxxxx......
 * @param {string} input Any valid ORCID
 * @param {boolean=} secure true (default): https, false: http
 * @returns {string}
 */
function toUriWithProtocol(input, secure) {
    return (secure === undefined || !!secure ? 'https' : 'http') + '://' + toUriWithoutProtocol(input);
}
exports.toUriWithProtocol = toUriWithProtocol;
/**
 * Converts an ORCID to is corresponding URI, without a protocol, e.g. orcid.org/xxxxxx.....
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
function toUriWithoutProtocol(input) {
    return 'orcid.org/' + toDashFormat(input);
}
exports.toUriWithoutProtocol = toUriWithoutProtocol;
/**
 * Returns true or false indicating whether a string conforms to any format of ORCID.
 * @param {string} input Any string to test
 * @returns {boolean}
 */
function isValid(input) {
    if (!inAcceptedFormat(input))
        return false;
    var inputNoDash = toNoDashFormatWithoutValidation(input);
    var total = 0;
    for (var i = 0; i < 15; i++) {
        total = (total + +inputNoDash[i]) * 2;
    }
    var result = (12 - (total % 11)) % 11;
    return inputNoDash[15] === (result === 10 ? 'X' : result + '');
}
exports.isValid = isValid;
/**
 * A side-effect version of `isValid` - will throw Error if `isValid` would return false.
 * @param {string} input
 * @returns {void}
 */
function validate(input) {
    if (!isValid(input))
        throw Error('Invalid ORCID');
}
exports.validate = validate;
exports.ORCID = {
    isValid: isValid,
    validate: validate,
    inAcceptedFormat: inAcceptedFormat,
    toDashFormat: toDashFormat,
    toNoDashFormat: toNoDashFormat,
    toUriWithProtocol: toUriWithProtocol,
    toUriWithoutProtocol: toUriWithoutProtocol
};
