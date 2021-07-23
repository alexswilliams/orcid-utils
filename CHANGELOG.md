## 1.0.6

- Possible breaking change: non-boolean flags will now be coerced rathern than rejected outright
- Switched to minifying with esbuild
- Now targeting, as minimum supported versions:

  - Chrome 90
  - Edge 91
  - Firefox 89
  - iOS 14.0
  - Safari 14
  - Node 12

- Rewrote code for size optimisation
- Smaller bundle size (1.81 KB -> 914 B)
- Security updates to dev dependencies

## 1.0.5 - 2020-12-10

- Bundle minification changed (1.82 KB -> 1.81 KB)
- Add support for sourcemaps
- Security updates to dev dependencies
- Remove babel; swap to google closure compiler
- Drop support for IE10

## 1.0.4 - 2019-09-25

- New function: `validate('...')` - throws whenever `isValid('...')` would have returned `false`
- Security updates to dev dependencies
- Switch form nodeunit to jest

## 1.0.3 - 2019-05-01

- Switch to using a Makefile for bulding
- Target >2% in browserslist
- Security updates to dev dependencies

## 1.0.2 - 2018-09-17

- Security updates to dev dependencies

## 1.0.1 - 2017-10-28

- Add explicit IE 10 support
- Update source to ES6 and add transpile step for compatibility

## 1.0.0 - 2017-10-28

Initial Release
