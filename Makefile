BUILD_DEPS = Makefile package.json package-lock.json tsconfig.json src/package.json

.PHONY: all test clean release
.DEFAULT: all

all: lib/orcid.min.js lib/orcid.d.ts test

lib/README.md: README.md
	cp README.md lib/

lib/orcid.js lib/orcid.d.ts lib/orcid.d.ts.map: src/orcid.ts $(BUILD_DEPS)
	npm run src:build

lib/orcid.min.js lib/orcid.min.js.map: src/orcid.ts $(BUILD_DEPS)
	npm run src:minify

test: lib/orcid.min.js src/**.test.* $(BUILD_DEPS)
	npm run src:test

clean:
	rm -f lib/*.js
	rm -f lib/*.map
	rm -f lib/*.d.ts
	rm -f lib/README.md

release:
	npm --workspace=lib publish --provenance --access public
