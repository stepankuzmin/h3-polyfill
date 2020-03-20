const h3 = require('h3-js');
const helpers = require('@turf/helpers');
const normalize = require('@mapbox/geojson-normalize');

const fillPolygon = (coordinates, resolution) => {
  const hexagons = h3.polyfill(coordinates, resolution, true);

  const polygons = hexagons.map((h3Index) => {
    const boundaryCoordinates = h3.h3ToGeoBoundary(h3Index, true);
    return helpers.polygon([boundaryCoordinates]);
  });

  return polygons;
};

const polyfill = (polygon, resolution) => {
  const fc = normalize(polygon);
  const featureGeometry = fc.features[0].geometry;

  if (!['Polygon', 'MultiPolygon'].includes(featureGeometry.type)) {
    throw new Error(`Unsupported geometry type ${featureGeometry.type}`);
  }

  const polygonCoordinates =
    featureGeometry.type === 'MultiPolygon'
      ? featureGeometry.coordinates
      : [featureGeometry.coordinates];

  const hexes = polygonCoordinates.reduce(
    (acc, coordinates) => acc.concat(fillPolygon(coordinates, resolution)),
    []
  );

  return helpers.featureCollection(hexes);
};

module.exports = polyfill;
