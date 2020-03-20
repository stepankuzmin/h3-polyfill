#!/usr/bin/env node

const fs = require('fs');
const polyfill = require('./h3-polyfill');
const packageJSON = require('./package.json');

const [input, resolution] = process.argv.slice(2);

if (!input || !resolution) {
  process.stdout.write(`h3-polyfill@${packageJSON.version}\n`);
  process.stdout.write('Usage: h3-polyfill <polygon.geojson> <resolution>\n');
  process.exit(-1);
}

const polygon = JSON.parse(fs.readFileSync(input));
const fc = polyfill(polygon, parseInt(resolution, 10));

process.stdout.write(JSON.stringify(fc, null, 2));
