# TrustDavis frontend

## Installation

```
$ npm install
```

## Development

```
$ grunt
```

This starts a WebPack development server (with Hot Module Replacement) on http://localhost:8089/

## Watch loop

```
$ grunt dev
```

Starts a watch loop and run `jsxhint`, `jest` and `webpack` when a file is modified.

## Publish to GitHub Pages

```
$ grunt publish
```

## Useful tools

* [updatehammer](https://github.com/metaraine/updatehammer) - Forcefully update all npm dependencies to the latest versions and save to package.json
