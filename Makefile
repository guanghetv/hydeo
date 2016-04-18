SHELL := /bin/zsh
PATH := node_modules/.bin:$(PATH)

.PHONY: lint sandbox dev prod release

LINT = eslint

js_files = $(shell find ./src -name "*.js" -o -name "*.jsx")

lint: $(js_files)
	$(LINT) $?

sandbox: sandbox/*.html
	@[ -d dist ] || mkdir dist
	cp $< dist

clean:
	rm -rf dist

dev: clean
	webpack-dev-server -d --hot

prod: clean release
	webpack --config webpack.config.production.babel.js

release:
	@[ -d dist ] || mkdir dist
	cp README.md dist
	cp package.json dist
