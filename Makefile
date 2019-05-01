BUILD_DEPS = Makefile package-lock.json package.json

.PHONY: all test clean
.DEFAULT: all

all: lib/orcid.min.js test $(BUILD_DEPS)

lib/orcid.js: src/orcid.js $(BUILD_DEPS)
	npm run compile

lib/orcid.min.js: lib/orcid.js $(BUILD_DEPS)
	npm run minify

test: src/orcid.js $(BUILD_DEPS)
	npm run test

clean:
	rm -f lib/*.js
