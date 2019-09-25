"use strict";

import { toDashFormat, toNoDashFormat, toUriWithoutProtocol, toUriWithProtocol, isValid, validate } from '../lib/orcid';

const nonStringInputs = [
  10,
  {},
  [],
  NaN,
  false,
  true,
  null,
  undefined,
  new Error(),
  function () { },
  () => { },
  Symbol(),
  /./
]

const invalidOrcidStrings = [
  '0000-0000-0000-0003',
  '0001-2345-6789-0122',
  '0000-1111-2222-3331',
  '9999-9999-9999-9990',
  '',
  '0',
  'not a valid ORCID',
  'https://orcid.org/profile',
  'ftp://0000-1111-2222-3336',
  'orcid.com/0000-1111-2222-3336',
  'orcid.org://https/0000-1111-2222-3336',
  'ftp://orcid.org/0000-1111-2222-3336',
  'https:\\orcid.org/0000-1111-2222-3336'
]

const validOrcidStrings = [
  '0000-1111-2222-3336',
  '0000111122223336',
  'orcid.org/0000-1111-2222-3336',
  'orcid.org/0000111122223336',
  'https://orcid.org/0000-1111-2222-3336',
  'https://orcid.org/0000111122223336',
  'http://orcid.org/0000-1111-2222-3336',
  'http://orcid.org/0000111122223336'
]

const validOrcidStringsWithXAsChecksum = [
  '0001-2345-6789-012x',
  '0001-2345-6789-012X',
  '000123456789012x',
  '000123456789012X',
  'orcid.org/0001-2345-6789-012x',
  'orcid.org/0001-2345-6789-012X',
  'orcid.org/000123456789012x',
  'orcid.org/000123456789012X',
  'https://orcid.org/0001-2345-6789-012x',
  'https://orcid.org/0001-2345-6789-012X',
  'https://orcid.org/000123456789012x',
  'https://orcid.org/000123456789012X',
  'http://orcid.org/0001-2345-6789-012x',
  'http://orcid.org/0001-2345-6789-012X',
  'http://orcid.org/000123456789012x',
  'http://orcid.org/000123456789012X'
]


// toDashFormat

test("toDashFormat: Non-string inputs throw TypeError", () => {
  nonStringInputs.forEach(value => {
    expect(() => { toDashFormat(value) }).toThrow(TypeError)
  })
})

test("toDashFormat: Valid ORCIDs are converted to standalone dashed format", () => {
  const expected = '0000-1111-2222-3336'
  validOrcidStrings.forEach(value => {
    expect(toDashFormat(value)).toBe(expected)
  })
})

test("toDashFormat: X is made uppercase", () => {
  const expected = '0001-2345-6789-012X'
  validOrcidStringsWithXAsChecksum.forEach(value => {
    expect(toDashFormat(value)).toBe(expected)
  })
})

test("toDashFormat: Invalid ORCIDs throw", () => {
  invalidOrcidStrings.forEach(value => {
    expect(() => { toDashFormat(value) }).toThrow()
  })
})


// toNoDashFormat

test("toNoDashFormat: Non-string inputs throw TypeError", () => {
  nonStringInputs.forEach(value => {
    expect(() => { toNoDashFormat(value) }).toThrow(TypeError)
  })
})

test("toNoDashFormat: Valid ORCIDs are converted to standalone non-dashed format", () => {
  const expected = '0000111122223336'
  validOrcidStrings.forEach(value => {
    expect(toNoDashFormat(value)).toBe(expected)
  })
})

test("toNoDashFormat: X is made uppercase", () => {
  const expected = '000123456789012X'
  validOrcidStringsWithXAsChecksum.forEach(value => {
    expect(toNoDashFormat(value)).toBe(expected)
  })
})

test("toNoDashFormat: Invalid ORCIDs throw", () => {
  invalidOrcidStrings.forEach(value => {
    expect(() => { toNoDashFormat(value) }).toThrow()
  })
})


// toUriWithoutProtocol

test("toUriWithoutProtocol: Non-string inputs throw TypeError", () => {
  nonStringInputs.forEach(value => {
    expect(() => { toUriWithoutProtocol(value) }).toThrow(TypeError)
  })
})

test("toUriWithoutProtocol: Valid ORCIDs are converted to uri-without-protocol format", () => {
  const expected = 'orcid.org/0000-1111-2222-3336'
  validOrcidStrings.forEach(value => {
    expect(toUriWithoutProtocol(value)).toBe(expected)
  })
})

test("toUriWithoutProtocol: X is made uppercase", () => {
  const expected = 'orcid.org/0001-2345-6789-012X'
  validOrcidStringsWithXAsChecksum.forEach(value => {
    expect(toUriWithoutProtocol(value)).toBe(expected)
  })
})

test("toUriWithoutProtocol: Invalid ORCIDs throw", () => {
  invalidOrcidStrings.forEach(value => {
    expect(() => { toUriWithoutProtocol(value) }).toThrow()
  })
})


// toUriWithProtocol

test("toUriWithProtocol: Non-string inputs throw TypeError", () => {
  nonStringInputs.forEach(value => {
    expect(() => { toUriWithProtocol(value) }).toThrow(TypeError)
  })
})

test("toUriWithProtocol: Valid ORCIDs are converted to uri-without-protocol format", () => {
  const expected = 'https://orcid.org/0000-1111-2222-3336'
  validOrcidStrings.forEach(value => {
    expect(toUriWithProtocol(value)).toBe(expected)
  })
})

test("toUriWithProtocol: X is made uppercase", () => {
  const expected = 'https://orcid.org/0001-2345-6789-012X'
  validOrcidStringsWithXAsChecksum.forEach(value => {
    expect(toUriWithProtocol(value)).toBe(expected)
  })
})

test("toUriWithProtocol: Invalid ORCIDs throw", () => {
  invalidOrcidStrings.forEach(value => {
    expect(() => { toUriWithProtocol(value) }).toThrow()
  })
})


test("toUriWithProtocol: A flag provided as non-boolean and non-undefined will throw TypeError", () => {
  expect(() => { toUriWithProtocol('0000-0000-0000-0001', 'a string') }).toThrow(TypeError)
  nonStringInputs.filter(value => { typeof value !== 'boolean' }).forEach(value => {
    expect(() => { toUriWithProtocol('0000-0000-0000-0001', value) }).toThrow(TypeError)
  })
})

test("toUriWithProtocol: Omitting the flag defaults to https and not http", () => {
  expect(toUriWithProtocol('0000-0000-0000-0001')).toBe('https://orcid.org/0000-0000-0000-0001')
})

test("toUriWithProtocol: Setting the flag true forces https", () => {
  expect(toUriWithProtocol('0000-0000-0000-0001', true)).toBe('https://orcid.org/0000-0000-0000-0001')
})

test("toUriWithProtocol: Setting the flag false forces http", () => {
  expect(toUriWithProtocol('0000-0000-0000-0001', false)).toBe('http://orcid.org/0000-0000-0000-0001')
})

test("toUriWithProtocol: Flag can be used to override input protocol", () => {
  expect(toUriWithProtocol('http://orcid.org/0001-2345-6789-012X', true)).toBe('https://orcid.org/0001-2345-6789-012X')
  expect(toUriWithProtocol('https://orcid.org/0001-2345-6789-012X', false)).toBe('http://orcid.org/0001-2345-6789-012X')
})

test("toUriWithProtocol: Omitting the flag will upgrade the input protocol to https", () => {
  expect(toUriWithProtocol('http://orcid.org/0001-2345-6789-012X')).toBe('https://orcid.org/0001-2345-6789-012X')
})


// isValid

test("isValid: Non-string input throws TypeError", () => {
  nonStringInputs.forEach(value => {
    expect(() => { isValid(value) }).toThrow(TypeError)
  })
})

test("isValid: Known-good ORCIDs are valid", () => {
  ['0000-0000-0000-0001', '0001-2345-6789-012X', '0000-1111-2222-3336', '9999-9999-9999-9994'].forEach(value => {
    expect(isValid(value)).toBe(true)
  })
})

test("isValid: Known-bad ORCIDs are not valid", () => {
  ['0000-0000-0000-0003', '0001-2345-6789-0122', '0000-1111-2222-3331', '9999-9999-9999-9990'].forEach(value => {
    expect(isValid(value)).toBe(false)
  })

})

test("isValid: Any accepted format can be validated", () => {
  validOrcidStrings.forEach(value => {
    expect(isValid(value)).toBe(true)
  })
})

test("isValid: Strings that are not an ORCID are not valid", () => {
  invalidOrcidStrings.forEach(value => {
    expect(isValid(value)).toBe(false)
  })
})

test("isValid: Order of prefices: protocol must come first", () => {
  expect(isValid('orcid.org/https://0000-1111-2222-3336')).toBe(false)
  expect(isValid('https://orcid.org/0000-1111-2222-3336')).toBe(true)
})

test("isValid: ORCID validity is not affected by letter case", () => {
  validOrcidStrings.forEach(value => {
    expect(isValid(value.toUpperCase())).toBe(isValid(value.toLowerCase()))
  })
  invalidOrcidStrings.forEach(value => {
    expect(isValid(value.toUpperCase())).toBe(isValid(value.toLowerCase()))
  })
})


// validate

test("validate: Non-string input throws TypeError", () => {
  nonStringInputs.forEach(value => {
    expect(() => { validate(value) }).toThrow(TypeError)
  })
})

test("validate: Known-good ORCIDs pass through without throwing", () => {
  ['0000-0000-0000-0001', '0001-2345-6789-012X', '0000-1111-2222-3336', '9999-9999-9999-9994'].forEach(value => {
    expect(() => { validate(value) }).not.toThrow()
  })
})

test("validate: Known-bad ORCIDs throw Error", () => {
  ['0000-0000-0000-0003', '0001-2345-6789-0122', '0000-1111-2222-3331', '9999-9999-9999-9990'].forEach(value => {
    expect(() => { validate(value) }).toThrow(Error)
  })

})
