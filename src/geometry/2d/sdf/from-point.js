const { memoize } = require('@kmamal/util/function/memoize')
const { __point } = require('../polygon/point')

const defineFor = memoize((Domain) => {
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)

	const point2pointSquared = (a, b) => V2.normSquared(V2.sub(a, b))

	const point2point = (a, b) => Math.sqrt(point2pointSquared(a, b))

	const point2circle = (p, r) => V2.norm(p) - r

	const point2halfplane = (p, a, b) => {
		const ab = V2.sub(b, a)
		const ap = V2.sub(p, a)
		return V2.cross(ab, ap) / V2.norm(ab)
	}

	const point2lineSquared = (p, a, b) => {
		const ab = V2.sub(b, a)
		const ap = V2.sub(p, a)
		const c = V2.cross(ab, ap)
		return c * c / V2.normSquared(ab)
	}

	const point2line = (p, a, b) => Math.abs(point2halfplane(p, a, b))

	const point2segmentSquared = (p, a, b) => {
		const ab = V2.sub(b, a)
		const ap = V2.sub(p, a)
		const h = V2.dot(ap, ab) / V2.normSquared(ab)
		const hClamped = Math.max(0, Math.min(1, h))
		V2.scale.$$$(ab, hClamped)
		return V2.normSquared(V2.sub.$$$(ap, ab))
	}

	const point2segment = (p, a, b) => Math.sqrt(point2segmentSquared(p, a, b))

	const point2box = ([ x, y ], w, h) => {
		const dx = Math.abs(x) - w / 2
		const dy = Math.abs(y) - h / 2
		if (dx > 0) {
			return dy > 0 ? V2.norm([ dx, dy ]) : dx
		}
		return dy > 0 ? dy : Math.max(dx, dy)
	}

	const point2convex = (p, polygon) => {
		const { length } = polygon

		let sign = -1
		let ds = Infinity

		const a = [
			polygon[length - 2],
			polygon[length - 1],
		]
		const b = new Array(2)
		const ab = new Array(2)
		const ap = new Array(2)
		for (let i = 0; i < length; i += 2) {
			__point(b, polygon, i)

			ds = Math.min(ds, point2segmentSquared(p, a, b))

			V2.sub.to(ab, b, a)
			V2.sub.to(ap, p, a)
			const isInside = V2.cross(ab, ap) <= 0
			if (!isInside) { sign = 1 }

			V2.copy(a, b)
		}
		return sign * Math.sqrt(ds)
	}

	const point2polygon = (p, polygon) => {
		const { length } = polygon

		let sign = 1
		let ds = Infinity

		const py = p[1]
		const a = [
			polygon[length - 2],
			polygon[length - 1],
		]
		const b = new Array(2)
		const ab = new Array(2)
		const ap = new Array(2)
		for (let i = 0; i < length; i += 2) {
			__point(b, polygon, i)

			ds = Math.min(ds, point2segmentSquared(p, a, b))

			const startsAbove = a[1] >= py
			const endsBelow = py > b[1]
			V2.sub.to(ab, b, a)
			V2.sub.to(ap, p, a)
			const isInside = V2.cross(ab, ap) > 0
			if (false
			|| (startsAbove && endsBelow && isInside)
			|| (!startsAbove && !endsBelow && !isInside)
			) {
				sign *= -1
			}

			V2.copy(a, b)
		}
		return sign * Math.sqrt(ds)
	}

	return {
		point2pointSquared,
		point2point,
		point2circle,
		point2halfplane,
		point2lineSquared,
		point2line,
		point2segmentSquared,
		point2segment,
		point2box,
		point2convex,
		point2polygon,
	}
})

module.exports = { defineFor }
