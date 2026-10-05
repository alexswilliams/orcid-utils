import { existsSync, readFileSync } from 'node:fs'
import { normalize, resolve } from 'node:path'
import { expect, test } from 'vitest'

const libDir = normalize(resolve(import.meta.dirname, '..', 'lib'))

test('lib has package.json', () => {
  let pjPath = resolve(libDir, 'package.json')
  expect(existsSync(pjPath)).toBeTruthy()
  const contents = JSON.parse(readFileSync(pjPath, 'utf8'))

  expect(contents['name']).toEqual('orcid-utils')
  expect(contents['main']).toEqual('orcid.min.js')
  expect(contents['types']).toEqual('orcid.d.ts')
})

test('lib has library files', () => {
  expect(existsSync(resolve(libDir, 'orcid.js'))).toBeTruthy()
  expect(existsSync(resolve(libDir, 'orcid.min.js'))).toBeTruthy()
  expect(existsSync(resolve(libDir, 'orcid.d.ts'))).toBeTruthy()
})

test('lib has map files', () => {
  expect(existsSync(resolve(libDir, 'orcid.js.map'))).toBeTruthy()
  expect(existsSync(resolve(libDir, 'orcid.min.js.map'))).toBeTruthy()
  expect(existsSync(resolve(libDir, 'orcid.d.ts.map'))).toBeTruthy()
})

test('the tsbuildinfo file has been removed', () => {
  expect(existsSync(resolve(libDir, 'tsconfig.tsbuildinfo'))).toBeFalsy()
})
