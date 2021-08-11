const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { add, sub, div, fromNumber } = Domain
	const TWO = fromNumber(2)
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)

	const edgeNormal = (polygon, offset) => {
		const x1 = polygon[offset + 0]
		const y1 = polygon[offset + 1]
		const x2 = polygon[offset + 2]
		const y2 = polygon[offset + 3]
		const edgeX = sub(x2, x1)
		const edgeY = sub(y2, y1)
		const normal = [ -edgeY, edgeX ]
		return V2.normalize.$$$(normal)
	}

	const pointNormal = (polygon, offset) => {
		const [ x1, y1 ] = edgeNormal(offset)
		const [ x2, y2 ] = edgeNormal((offset || polygon.length) - 2)
		return [
			div(add(x1, x2), TWO),
			div(add(y1, y2), TWO),
		]
	}

	return {
		edgeNormal,
		pointNormal,
	}
})

module.exports = { defineFor }
