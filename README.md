# Moon Cypress

This repository contains source code for Moon Cypress integration.

## Usage

```
$ npm install @aerokube/cypress-moon --save-dev
```

To override binary download URL:

```
$ CYPRESS_MOON_BINARY=https://company.example.com/download/cypress-moon npm install @aerokube/cypress-moon --save-dev
```

or use a .npmrc config with your own mirror:
`
CYPRESS_MOON_MIRROR=https://company.example.com/download/cypress-moon
`

To use binary already present on the file system:

```
$ CYPRESS_MOON_BINARY=/usr/share/cypress-moon/cypress-moon npm install @aerokube/cypress-moon --save-dev
```
