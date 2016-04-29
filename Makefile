SHELL := /bin/zsh
PATH := node_modules/.bin:$(PATH)

.PHONY: dev build copy-files

SEMVER = ./node_modules/.bin/semver
PACKAGE = ./package.json
VERSION = $(shell node -pe 'require("$(PACKAGE)").version')
DIST = ./dist

patch: NEXT_VERSION = $(shell $(SEMVER) -i patch $(VERSION))
minor: NEXT_VERSION = $(shell $(SEMVER) -i minor $(VERSION))
major: NEXT_VERSION = $(shell $(SEMVER) -i major $(VERSION))

patch minor major: build
	sed -i "" 's/"version": "$(VERSION)"/"version": "$(NEXT_VERSION)"/g' $(PACKAGE)
	git commit $(PACKAGE) -m 'chore: bump version to $(NEXT_VERSION)'
	git tag -a "v$(NEXT_VERSION)" -m 'chore: bump version to $(NEXT_VERSION)'
	git push --tags origin HEAD:master
	@[ -d $(DIST) ] || mkdir $(DIST)
	cp README.md $(DIST)
	cp $(PACKAGE) $(DIST)
	npm publish $(DIST)

clean:
	rm -rf $(DIST)

dev: clean
	webpack-dev-server --progress --inline --colors

build: clean
	babel ./src --out-dir $(DIST)
