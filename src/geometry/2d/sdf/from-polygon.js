const Minkowski = require('../minkowski')
const Point = require('./from-point')

const ORIGIN = [ 0, 0 ]

const polygon2polygon = (a, b) => {
	const diff = Minkowski.diffPolygonPolygon(a, b)
	return Point.point2polygon(ORIGIN, diff)
}

module.exports = { polygon2polygon }
