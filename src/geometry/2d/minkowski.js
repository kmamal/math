const { memoize } = require('@kmamal/util/function/memoize')
const { map } = require('@kmamal/util/array/map')
const { sortByPure } = require('@kmamal/util/array/sort')

const defineFor = memoize((Domain) => {
	const { neg } = Domain
	const { convolution } = require('./polygon/convolution').defineFor(Domain)
	const { makeSimple } = require('./polygon/make-simple').defineFor(Domain)
	const { area } = require('./polygon/area').defineFor(Domain)

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
		sortByPure(polygons, (p) => neg(area(p)))
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

	return {
		sumConvexConvex,
		diffConvexConvex,
		sumConvexPolygon,
		diffConvexPolygon,
		sumPolygonPolygon,
		diffPolygonPolygon,
	}
})

module.exports = { defineFor }
