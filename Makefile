SHELL := /bin/zsh
PATH := node_modules/.bin:$(PATH)

.PHONY: lint sandbox dev prod release

SEMVER = ./node_modules/.bin/semver
PACKAGE = ./package.json
VERSION = $(shell node -pe 'require("$(PACKAGE)").version')
DIST = ./dist

sandbox: sandbox/*.html
	@[ -d $(DIST) ] || mkdir $(DIST)
	cp $< $(DIST)

patch: NEXT_VERSION = $(shell $(SEMVER) -i patch $(VERSION))
minor: NEXT_VERSION = $(shell $(SEMVER) -i minor $(VERSION))
major: NEXT_VERSION = $(shell $(SEMVER) -i major $(VERSION))

patch minor major:
	sed -i "" 's/"version": "$(VERSION)"/"version": "$(NEXT_VERSION)"/g' $(PACKAGE)

clean:
	rm -rf $(DIST)

dev: clean
	webpack-dev-server -d --hot

prod: clean
	@[ -d $(DIST) ] || mkdir $(DIST)
	babel ./src --out-dir $(DIST)

release: prod
	cp README.md $(DIST)
	cp package.json $(DIST)
	npm publish $(DIST)
