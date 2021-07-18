const Minkowski = require('../minkowski')
const Point = require('./from-point')

const ORIGIN = [ 0, 0 ]

const convex2convex = (a, b) => {
	const diff = Minkowski.diffConvexConvex(a, b)
	return Point.point2convex(ORIGIN, diff)
}

const convex2polygon = (a, b) => {
	const diff = Minkowski.diffConvexPolygon(a, b)
	return Point.point2polygon(ORIGIN, diff)
}

module.exports = {
	convex2convex,
	convex2polygon,
}
