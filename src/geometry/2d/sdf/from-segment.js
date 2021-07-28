const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)
	const Point = require('./from-point').defineFor(Domain)
	const Convex = require('./from-convex').defineFor(Domain)

	const segment2segment = (a1, b1, a2, b2) => {
		const a1b1 = V2.sub(b1, a1)
		const a2b2 = V2.sub(b2, a2)
		const a2a1 = V2.sub(a1, a2)

		let sign = -1
		findIintersection: {
			const det = V2.cross(a1b1, a2b2)
			if (det === 0) {
				sign = 1
				break findIintersection
			}

			const t1 = V2.cross(a2b2, a2a1) / det
			if (t1 < 0 || 1 < t1) {
				sign = 1
				break findIintersection
			}
			const t2 = V2.cross(a1b1, a2a1) / det
			if (t2 < 0 || 1 < t2) {
				sign = 1
				break findIintersection
			}
		}

		return sign * Math.sqrt(Math.min(
			Point.point2segmentSquared(a2, a1, b1),
			Point.point2segmentSquared(b2, a1, b1),
			Point.point2segmentSquared(a1, a2, b2),
			Point.point2segmentSquared(b1, a2, b2),
		))
	}

	const segment2box = (a, b, w, h) => {
		const hw = w / 2
		const hh = h / 2
		/* eslint-disable comma-spacing */
		const box = [ -hw,-hh, -hw,hh, hw,hh, hw,-hh ]
		/* eslint-enable comma-spacing */

		return segment2convex(a, b, box)
	}

	const segment2convex = (a, b, polygon) => {
		const segment = [ a[0], a[1], b[0], b[1] ]
		return Convex.convex2convex(segment, polygon)
	}

	const segment2polygon = (a, b, polygon) => {
		const segment = [ a[0], a[1], b[0], b[1] ]
		return Convex.convex2polygon(segment, polygon)
	}

	return {
		segment2segment,
		segment2box,
		segment2convex,
		segment2polygon,
	}
})

module.exports = { defineFor }
