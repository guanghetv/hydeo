PATH := node_modules/.bin:$(PATH)

.PHONY: lint styles

js_files = src/*.js
sass_files = src/*.scss

lint: $(js_files)
	eslint $?

styles: $(sass_files)
	sass -t compressed -o $@ $?

clean:
	rm -rf build
