/**
 * Checks that a string is a valid ORCID of any format
 * @param {string} input String to test format of
 * @returns {boolean}
 */
declare function inAcceptedFormat(input: string): boolean;
/**
 * Converts a valid ORCID (of any format) into the dashed format
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
declare function toDashFormat(input: string): string;
/**
 * Converts a valid ORCID (of any format) into the non-dashed format (without validating the input first - useful internally)
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
declare function toNoDashFormatWithoutValidation(input: string): string;
/**
 * Converts a valid ORCID (of any format) into the non-dashed format
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
declare function toNoDashFormat(input: string): string;
/**
 * Converts an ORCID to its corresponding URI, e.g. https://orcid.org/xxxxxxx......
 * @param {string} input Any valid ORCID
 * @param {boolean=} secure true (default): https, false: http
 * @returns {string}
 */
declare function toUriWithProtocol(input: string, secure?: boolean): string;
/**
 * Converts an ORCID to is corresponding URI, without a protocol, e.g. orcid.org/xxxxxx.....
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
declare function toUriWithoutProtocol(input: string): string;
/**
 * Returns true or false indicating whether a string conforms to any format of ORCID.
 * @param {string} input Any string to test
 * @returns {boolean}
 */
declare function isValid(input: string): boolean;
/**
 * A side-effect version of `isValid` - will throw Error if `isValid` would return false.
 * @param {string} input
 * @returns {void}
 */
declare function validate(input: string): void;
declare const ORCID: {
    isValid: typeof isValid;
    validate: typeof validate;
    inAcceptedFormat: typeof inAcceptedFormat;
    toDashFormat: typeof toDashFormat;
    toNoDashFormat: typeof toNoDashFormat;
    toUriWithProtocol: typeof toUriWithProtocol;
    toUriWithoutProtocol: typeof toUriWithoutProtocol;
};
//# sourceMappingURL=orcid.d.ts.map
