PATH := node_modules/.bin:$(PATH)

js_files = src/*.js
sass_files = src/*.scss

lint: $(js_files)
	eslint $?

dist/css/%.css: $(sass_files)
	sass -t compressed -o $@ $?
