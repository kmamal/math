const V2 = require('../vec2')
const { clone, map, sortBy } = require('@kmamal/util/array')

const convexHull = (_points) => {
	const { length } = _points
	if (length < 3) { return null }

	const points = clone(_points)
	sortBy.$$$(points, ([ x ]) => x)

	let a = points[0]
	let read_index = 1
	let b
	let ab
	do {
		b = points[read_index++]
		ab = V2.sub(b, a)
	} while (V2.eq(ab, [ 0, 0 ]))

	const hull = [
		{ point: a, incoming: null },
		{ point: b, incoming: ab },
	]

	while (read_index < length) {
		const c = points[read_index++]
		let bc = V2.sub(c, b)

		for (;;) {
			const is_convex = V2.cross(ab, bc) < 0
			if (is_convex) { break }

			hull.pop()
			const { point, incoming } = hull[hull.length - 1]
			b = point
			bc = V2.sub(c, b)

			if (!incoming) { break }
			ab = incoming
		}

		hull.push({ point: c, incoming: bc })

		b = c
		ab = bc
	}

	const last = hull.length - 1
	hull[last].incoming = null
	a = hull[last].point
	read_index -= 2
	do {
		b = points[read_index--]
		ab = V2.sub(b, a)
	} while (V2.eq(ab, [ 0, 0 ]))
	hull.push({ point: b, incoming: ab })

	while (read_index >= 0) {
		const c = points[read_index--]
		let bc = V2.sub(c, b)

		for (;;) {
			const is_convex = V2.cross(ab, bc) < 0
			if (is_convex) { break }

			hull.pop()
			const { point, incoming } = hull[hull.length - 1]
			b = point
			bc = V2.sub(c, b)

			if (!incoming) { break }
			ab = incoming
		}

		hull.push({ point: c, incoming: bc })

		b = c
		ab = bc
	}

	hull.pop()
	if (hull.length < 3) { return null }

	map.$$$(hull, ({ point }) => point)
	return hull
}

module.exports = { convexHull }
