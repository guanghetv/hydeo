PATH := node_modules/.bin:$(PATH)

js_files = src/*.js

lint: $(js_files)
	eslint $?
