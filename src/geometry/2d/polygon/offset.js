const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { add } = Domain
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)
	const { edgeNormal, pointNormal } = require('./normal')
	const { __point, point } = require('./point')

	const offsetPoints$$$ = (polygon, amount) => {
		for (let i = 0; i < polygon.length; i += 2) {
			const x = polygon[i + 0]
			const y = polygon[i + 1]

			const diff = pointNormal(polygon, i)
			V2.scale.$$$(diff, amount)

			polygon[i + 0] = add(x, diff[0])
			polygon[i + 1] = add(y, diff[1])
		}
	}

	const offsetPoints = (polygon, amount) => {
		const res = polygon.slice()
		offsetPoints$$$(res, amount)
		return res
	}

	offsetPoints.$$$ = offsetPoints$$$

	const offsetEdges = (polygon, amount) => {
		const res = new Array(polygon.length * 2)
		let writeIndex = 0

		const { length } = polygon
		let a = point(polygon, length - 2)
		let b = new Array(2)
		for (let i = 0; i < length; i += 2) {
			__point(b, polygon, i)

			const diff = edgeNormal(polygon, i)
			V2.scale.$$$(diff, amount)

			const [ dx, dy ] = diff
			res[writeIndex++] = add(a[0], dx)
			res[writeIndex++] = add(a[1], dy)
			res[writeIndex++] = add(b[0], dx)
			res[writeIndex++] = add(b[1], dy)

			const tmp = a
			a = b
			b = tmp
		}

		return res
	}

	return {
		offsetPoints,
		offsetEdges,
	}
})

module.exports = { defineFor }
