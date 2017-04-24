# Dockerfile.alpine-mini
FROM alpine:edge

ENV APP=/usr/src/app
# Create app directory and bundle app source
RUN mkdir -p $APP
WORKDIR $APP
COPY . $APP

# Install node.js and app dependencies
RUN apk update && apk upgrade
RUN apk add --no-cache make nodejs yarn
RUN yarn && yarn upgrade && yarn cache clean
RUN rm -rf /tmp/*
