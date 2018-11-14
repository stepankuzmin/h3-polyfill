/* eslint-disable no-param-reassign */

const h3 = require('h3-js');
const helpers = require('@turf/helpers');
const normalize = require('@mapbox/geojson-normalize');

const polyfill = (polygon, resolution) => {
  const fc = normalize(polygon);
  const featureGeometry = fc.features[0].geometry;

  if (featureGeometry.type !== 'Polygon') {
    throw new Error('Oh boy, that\'s not a polygon!');
  }

  const polygonCoordinates = featureGeometry.coordinates;

  const res = parseInt(resolution, 10);
  const hexagons = h3.polyfill(polygonCoordinates, res, true);

  const polygons = hexagons.map((h3Index) => {
    const coordinates = h3.h3ToGeoBoundary(h3Index, true);
    return helpers.polygon([coordinates]);
  });

  return helpers.featureCollection(polygons);
};

module.exports = polyfill;
