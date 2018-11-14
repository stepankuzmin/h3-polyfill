const test = require('tape');
const geojsonhint = require('@mapbox/geojsonhint');
const h3Polyfill = require('./h3-polyfill');

test('shift', (t) => {
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
