const { convolution } = require('./polygon/convolution')
const { makeSimple } = require('./polygon/make-simple')
const { area } = require('./polygon/area')
const { map } = require('@kmamal/util/array/map')
const { sortByPure } = require('@kmamal/util/array/sort')
const { neg } = require('@kmamal/util/operators')

const sumConvexConvex = (a, b) => convolution(a, b)

const diffConvexConvex = (a, b) => {
	map.$$$(b, neg)
	const res = sumConvexConvex(a, b)
	map.$$$(b, neg)
	return res
}

const sumPolygonPolygon = (a, b) => {
	const complex = convolution(a, b)
	const polygons = makeSimple(complex)
	sortByPure(polygons, (p) => -area(p))
	return polygons[0]
}

const diffPolygonPolygon = (a, b) => {
	map.$$$(b, neg)
	const res = sumPolygonPolygon(a, b)
	map.$$$(b, neg)
	return res
}

const sumConvexPolygon = sumPolygonPolygon
const diffConvexPolygon = diffPolygonPolygon

module.exports = {
	sumConvexConvex,
	diffConvexConvex,
	sumConvexPolygon,
	diffConvexPolygon,
	sumPolygonPolygon,
	diffPolygonPolygon,
}
