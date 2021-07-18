const V2 = require('../vec2')
const { __min, __map, __sort, clone } = require('@kmamal/util/array')

const __convexHull = (arr, start, end) => {
	const a = __min(arr, start, end, ([ x ]) => x)

	const [ ax, ay ] = a
	__map(arr, start, end, (point) => ({ point,
		value: ([ bx, by ]) => {
			const slope = (by - ay) / (bx - ax)
			return Number.isNaN(slope) ? -Infinity : -slope
		} }))
	__sort(arr, start, end, (v, u) => v.value < u.value)

	let read_index = start + 1
	let write_index = start
	let b
	let ab = new Array(2)
	do {
		b = arr[read_index++].point
		V2.sub.to(ab, b, a)
	} while (V2.eq(ab, [ 0, 0 ]))

	let obj

	obj = arr[write_index++]
	obj.point = a
	obj.incoming = null

	obj = arr[write_index++]
	obj.point = b
	obj.incoming = V2.clone(ab)

	const length = end - start
	const bc = new Array(2)
	while (read_index !== end + 1) {
		const c = arr[read_index++ % length].point
		V2.sub.to(bc, c, b)

		for (;;) {
			const is_convex = V2.cross(ab, bc) < 0
			if (is_convex) { break }

			write_index -= 1
			const { point, incoming } = arr[write_index - 1]
			b = point
			V2.sub.to(bc, c, b)

			if (!incoming) { break }
			ab = incoming
		}

		obj = arr[write_index++]
		obj.point = c
		obj.incoming = V2.clone(bc)

		b = c
		V2.copy(ab, bc)
	}

	const hull_length = (write_index - start) - 1
	if (hull_length < 3) { return null }

	__map(arr, start, arr, start, write_index, ({ point }) => point)
	return hull_length
}

const convexHull$$$ = (points) => {
	const { length } = points
	if (length < 3) { return null }
	const n = __convexHull(points, 0, points.length)
	if (n === null) { return null }
	points.length = n
	return points
}

const convexHull = (points) => {
	const res = clone(points)
	return convexHull$$$(res)
}

convexHull.$$$ = convexHull$$$

module.exports = {
	__convexHull,
	convexHull,
}
