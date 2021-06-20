#!/bin/bash
set -e
set -x

die(){
  echo "$1"
  exit 1
}

NPM_PUBLISH_TAG="next"
VERSION=$(node -e 'console.log(require("./package.json").version)')

if [[ $1 == "release" ]]; then
  if [[ "${VERSION}" == *-* ]]; then
    die "not publishing pre-release version in release mode"
  fi
  NPM_PUBLISH_TAG="latest"
elif [[ $1 == "snapshot" ]]; then
  if [[ "${VERSION}" != *-* ]]; then
    die "not publishing release version in snapshot mode"
  fi

  UPSTREAM_SHA=$(git ls-remote https://github.com/aerokube/cypress-moon --tags $(git rev-parse --abbrev-ref HEAD) | cut -f1)
  CURRENT_SHA=$(git rev-parse HEAD)
  if [[ "${UPSTREAM_SHA}" != "${CURRENT_SHA}" ]]; then
    die "not the HEAD commit"
  fi
  NPM_PUBLISH_TAG="next"
else
  die "unknown argument: '$1'"
fi

npm config set "@aerokube:registry" "https://registry.npmjs.org"
npm config set "//registry.npmjs.org/:_authToken" "${NPM_TOKEN}"
npm publish --access public --tag="${NPM_PUBLISH_TAG}"
