SHELL := /bin/bash
PATH := $(shell npm bin):$(PATH)

SEMVER = ./node_modules/.bin/semver
PACKAGE = ./package.json
VERSION = $(shell node -pe 'require("$(PACKAGE)").version')

dev:
	docker-compose run --service-ports development

prod:
	NODE_ENV=production webpack --config ./webpack/webpack.prod.babel.js -p

lint:
	eslint ./

test: lint
	jest -u

patch: NEXT_VERSION = $(shell $(SEMVER) -i patch $(VERSION))
minor: NEXT_VERSION = $(shell $(SEMVER) -i minor $(VERSION))
major: NEXT_VERSION = $(shell $(SEMVER) -i major $(VERSION))

release-patch release-minor release-major:
	sed -i "" 's/"version": "$(VERSION)"/"version": "$(NEXT_VERSION)"/g' $(PACKAGE)
	git commit $(PACKAGE) -m 'chore: bump version to $(NEXT_VERSION)'
	git tag -a "v$(NEXT_VERSION)" -m 'chore: bump version to $(NEXT_VERSION)'
	git push --tabs origin HEAD:master

.PHONY: bootstrap lint test
.PHONY: major minor patch release-patch release-minor release-major
