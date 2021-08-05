const { memoize } = require('@kmamal/util/function/memoize')
const { __min } = require('@kmamal/util/array/min')
const { __map } = require('@kmamal/util/array/map')
const { __sort } = require('@kmamal/util/array/sort')
const { clone } = require('@kmamal/util/array/clone')

const defineFor = memoize((Domain) => {
	const { sub, div, lt, isNaN, fromNumber, NInfinity } = Domain
	const ZERO = fromNumber(0)
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)
	const V2_ZERO = V2.fromNumbers(0, 0)

	const __grahamScanConvexHull = (arr, start, end) => {
		const a = __min(arr, start, end, ([ x ]) => x).value

		const [ ax, ay ] = a
		__map(arr, start, end, (point) => ({
			point,
			value: ([ bx, by ]) => {
				const slope = div(sub(by, ay), sub(bx, ax))
				return isNaN(slope) ? NInfinity : -slope
			},
		}))
		__sort(arr, start, end, (v, u) => lt(v.value, u.value))

		let readIndex = start + 1
		let writeIndex = start
		let b
		let ab = new Array(2)
		do {
			b = arr[readIndex++].point
			V2.sub.to(ab, b, a)
		} while (V2.eq(ab, V2_ZERO))

		let obj

		obj = arr[writeIndex++]
		obj.point = a
		obj.incoming = null

		obj = arr[writeIndex++]
		obj.point = b
		obj.incoming = V2.clone(ab)

		const length = end - start
		const bc = new Array(2)
		while (readIndex !== end + 1) {
			const c = arr[readIndex++ % length].point
			V2.sub.to(bc, c, b)

			for (;;) {
				const isConvex = V2.cross(ab, bc) < ZERO
				if (isConvex) { break }

				writeIndex -= 1
				const { point, incoming } = arr[writeIndex - 1]
				b = point
				V2.sub.to(bc, c, b)

				if (!incoming) { break }
				ab = incoming
			}

			obj = arr[writeIndex++]
			obj.point = c
			obj.incoming = V2.clone(bc)

			b = c
			V2.copy(ab, bc)
		}

		const hullLength = (writeIndex - start) - 1
		if (hullLength < 3) { return null }

		__map(arr, start, arr, start, writeIndex, ({ point }) => point)
		return hullLength
	}

	const grahamScanConvexHull$$$ = (points) => {
		const { length } = points
		if (length < 3) { return null }
		const n = __grahamScanConvexHull(points, 0, points.length)
		if (n === null) { return null }
		points.length = n
		return points
	}

	const grahamScanConvexHull = (points) => {
		const res = clone(points)
		return grahamScanConvexHull$$$(res)
	}

	grahamScanConvexHull.$$$ = grahamScanConvexHull$$$

	return {
		__grahamScanConvexHull,
		grahamScanConvexHull,
	}
})

module.exports = { defineFor }
