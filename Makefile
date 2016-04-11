PATH := node_modules/.bin:$(PATH)

.PHONY: lint styles

LINT = eslint

js_files = src/*.js
sass_files = src/*.scss

lint: $(js_files)
	$(LINT) $?

styles: $(sass_files)
	sass -t compressed -o $@ $?

clean:
	rm -rf build
