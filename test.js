const test = require('tape');
const geojsonhint = require('@mapbox/geojsonhint');
const h3Polyfill = require('./h3-polyfill');

test('polygon', (t) => {
  t.plan(1);

  const polygon = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
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

  const errors = geojsonhint.hint(hex);
  if (errors.length === 0) {
    t.pass('Valid GeoJSON');
  } else {
    errors.forEach(err => t.comment(err.message));
    t.fail('Invalid GeoJSON');
  }
});

test('multipolygon', (t) => {
  t.plan(1);

  const multipolygon = {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [102.0, 2.0],
            [103.0, 2.0],
            [103.0, 3.0],
            [102.0, 3.0],
            [102.0, 2.0]
          ]
        ],
        [
          [
            [100.0, 0.0],
            [101.0, 0.0],
            [101.0, 1.0],
            [100.0, 1.0],
            [100.0, 0.0]
          ],
          [
            [100.2, 0.2],
            [100.8, 0.2],
            [100.8, 0.8],
            [100.2, 0.8],
            [100.2, 0.2]
          ]
        ]
      ]
    }
  };

  const hex = h3Polyfill(multipolygon, 7);

  const errors = geojsonhint.hint(hex);
  if (errors.length === 0) {
    t.pass('Valid GeoJSON');
  } else {
    errors.forEach(err => t.comment(err.message));
    t.fail('Invalid GeoJSON');
  }
});
