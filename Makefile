BUILD_DEPS = Makefile package-lock.json package.json tsconfig.json

.PHONY: all test clean lint
.DEFAULT: all

all: lib/orcid.min.js lib/orcid.d.ts test

lib/orcid.js lib/orcid.d.ts lib/orcid.d.ts.map: src/orcid.ts $(BUILD_DEPS)
	npm run build

lib/orcid.min.js lib/orcid.min.js.map: src/orcid.ts $(BUILD_DEPS)
	npm run minify

test: lib/orcid.min.js $(BUILD_DEPS)
	npm run test

clean:
	rm -f lib/*.js
	rm -f lib/*.map
	rm -f lib/*.d.ts

lint:
	npm run lint

