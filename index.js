const fs = require('fs');
const polyfill = require('./h3-polyfill');

const [input, resolution] = process.argv.slice(2);

if (!input || !resolution) {
  process.stdout.write('Usage: h3-polyfill <polygon.geojson> <resolution>\n');
  process.exit(-1);
}

const polygon = JSON.parse(fs.readFileSync(input));
const fc = polyfill(polygon, resolution);

process.stdout.write(JSON.stringify(fc, null, 2));
