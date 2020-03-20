# h3-polyfill

[![Build Status](https://travis-ci.org/stepankuzmin/h3-polyfill.svg?branch=master)](https://travis-ci.org/stepankuzmin/h3-polyfill)

`h3-polyfill` is a library and a command line interface to Uber [h3 polyfill](https://github.com/uber/h3-js#module_h3.polyfill).

It takes an input polygon as a GeoJSON file and outputs hex as a GeoJSON polygon feature collection.

![screenshot](https://raw.githubusercontent.com/stepankuzmin/h3-polyfill/master/example.png)

## Installation

```shell
npm i h3-polyfill
```

## Usage

```js
const h3Polyfill = require("h3-polyfill");

const polygon = {
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [-122.40898669999721, 37.81331899998324],
        [-122.35447369999936, 37.71980619999785],
        [-122.4798767000009, 37.815157199999845],
        [-122.40898669999721, 37.81331899998324]
      ]
    ]
  }
};

const hex = h3Polyfill(polygon, 7);
```

## CLI Usage

```shell
Usage: h3-polyfill <polygon.geojson> <resolution>
```

Example:

```shell
npx h3-polyfill polygon.geojson 7 > hex.geojson
```
