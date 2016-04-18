SHELL := /bin/zsh
PATH := node_modules/.bin:$(PATH)

.PHONY: lint sandbox dev

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

webpack:
	webpack
