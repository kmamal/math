const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { sub, gt, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const HALF = fromNumber(1 / 2)
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)
	const { point } = require('./point').defineFor(Domain)

	const edgeNormal = (polygon, offset) => {
		const { length } = polygon
		const x1 = polygon[offset + 0]
		const y1 = polygon[offset + 1]
		const x2 = polygon[(offset + 2) % length]
		const y2 = polygon[(offset + 3) % length]
		const edgeX = sub(x2, x1)
		const edgeY = sub(y2, y1)
		const normal = [ -edgeY, edgeX ]
		return V2.normalize.$$$(normal)
	}

	const pointNormal = (polygon, offset) => {
		const { length } = polygon
		const a = point(polygon, (offset + length - 2) % length)
		const b = point(polygon, offset)
		const c = point(polygon, (offset + 2) % length)

		const normal = V2.add(a, c)
		V2.scale.$$$(normal, HALF)

		const edge2 = V2.sub.$$$(c, b)
		const edge1 = V2.sub.to(a, b, a)

		const cross = V2.cross(edge1, edge2)
		if (gt(cross, ZERO)) {
			V2.sub.to(normal, b, normal)
		} else {
			V2.sub.$$$(normal, b)
		}
		return V2.normalize.$$$(normal)
	}

	return {
		edgeNormal,
		pointNormal,
	}
})

module.exports = { defineFor }
