'use strict'

/**
 * Checks that a string is a valid ORCID of any format
 * @param {string} input String to test format of
 * @returns {boolean}
 */
export function inAcceptedFormat(input: string): boolean {
  if (typeof input !== 'string') throw TypeError('Input must be string')
  return /^((https?:\/\/)?orcid\.org\/)?([0-9]{4}-?){3}[0-9]{3}[0-9X]$/i.test(input)
}

/**
 * Converts a valid ORCID (of any format) into the dashed format
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
export function toDashFormat(input: string): string {
  const noDash = toNoDashFormat(input)
  return [0, 4, 8, 12].map(it => noDash.slice(it, it + 4)).join('-')
}

/**
 * Converts a valid ORCID (of any format) into the non-dashed format (without validating the input first - useful internally)
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
export function toNoDashFormatWithoutValidation(input: string): string {
  return input.replace(/-/g, '').slice(-16).toUpperCase()
}

/**
 * Converts a valid ORCID (of any format) into the non-dashed format
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
export function toNoDashFormat(input: string): string {
  validate(input)
  return toNoDashFormatWithoutValidation(input)
}

/**
 * Converts an ORCID to its corresponding URI, e.g. https://orcid.org/xxxxxxx......
 * @param {string} input Any valid ORCID
 * @param {boolean=} secure true (default): https, false: http
 * @returns {string}
 */
export function toUriWithProtocol(input: string, secure?: boolean): string {
  return (secure === undefined || !!secure ? 'https' : 'http') + '://' + toUriWithoutProtocol(input)
}

/**
 * Converts an ORCID to is corresponding URI, without a protocol, e.g. orcid.org/xxxxxx.....
 * @param {string} input Any valid ORCID
 * @returns {string}
 */
export function toUriWithoutProtocol(input: string): string {
  return 'orcid.org/' + toDashFormat(input)
}

/**
 * Returns true or false indicating whether a string conforms to any format of ORCID.
 * @param {string} input Any string to test
 * @returns {boolean}
 */
export function isValid(input: string): boolean {
  if (!inAcceptedFormat(input)) return false
  const inputNoDash = toNoDashFormatWithoutValidation(input)

  let total = 0
  for (let i = 0; i < 15; i++) {
    total = (total + +inputNoDash[i]) * 2
  }
  const result = (12 - (total % 11)) % 11
  return inputNoDash[15] === (result === 10 ? 'X' : result + '')
}

/**
 * A side-effect version of `isValid` - will throw Error if `isValid` would return false.
 * @param {string} input
 * @returns {void}
 */
export function validate(input: string): void {
  if (!isValid(input)) throw Error('Invalid ORCID')
}

export const ORCID = {
  isValid,
  validate,
  inAcceptedFormat,
  toDashFormat,
  toNoDashFormat,
  toUriWithProtocol,
  toUriWithoutProtocol,
}
// if (typeof exports !== 'undefined') Object.assign(exports, ORCID)
// if (typeof window !== 'undefined') Object.assign(window, { ORCID })
