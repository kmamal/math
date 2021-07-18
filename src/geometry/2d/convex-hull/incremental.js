const V2 = require('../vec2')
const { __copy, __copyInplace, clone } = require('@kmamal/util/array')

const __increment = (hull, hull_start, hull_end, point) => {
	let start = null
	let end = null
	let last_cross = -1

	let a = hull[hull_end - 1]
	const ab = new Array(2)
	const ap = new Array(2)

	let read_index = hull_start
	while (read_index !== hull_end) {
		const b = hull[read_index++]
		V2.sub.to(ab, b, a)
		V2.sub.to(ap, point, a)
		const cross = V2.cross(ab, ap)

		if (cross > 0) {
			if (last_cross <= 0) { start = read_index - 2 }
		} else if (cross < 0) {
			if (last_cross >= 0) { end = read_index - 1 }
		}

		a = b
		last_cross = cross
	}

	const length = hull_end - hull_start
	if (start === null) { return length }

	if (end === null) { end = hull_end - 1 }
	end -= hull_start
	end = (end + hull_end - 1) % hull_end
	end += hull_start

	let num_remaining
	if (start <= end) {
		__copyInplace(hull, start + 2, end, hull_end)
		hull[start + 1] = point
		num_remaining = length - (end - start)
	} else {
		__copy(hull, hull_start, hull, end, start + 1)
		num_remaining = (start - end) + 1
		hull[hull_start + num_remaining] = point
	}

	return num_remaining + 1
}

const increment$$$ = (hull, point) => {
	const n = __increment(hull, 0, hull.length, point)
	hull.length = n
	return hull
}

const increment = (hull, point) => {
	const res = clone(hull)
	return increment$$$(res, point)
}

increment.$$$ = increment$$$

const __convexHull = (dst, dst_start, src, src_start, src_end) => {
	let read_index = src_start
	let write_index = dst_start
	const a = src[read_index++]
	const b = src[read_index++]
	const ab = V2.sub(b, a)
	let c
	const bc = new Array(2)
	let cross
	while (read_index !== src_end) {
		c = src[read_index++]
		V2.sub.to(bc, c, b)
		cross = V2.cross(ab, bc)
		if (cross !== 0) { break }
	}

	if (cross === 0) { return null }

	if (cross > 0) {
		dst[write_index++] = b
		dst[write_index++] = a
	} else {
		dst[write_index++] = a
		dst[write_index++] = b
	}
	dst[write_index++] = c

	while (read_index !== src_end) {
		const point = src[read_index++]
		write_index = __increment(dst, dst_start, write_index, point)
	}

	return write_index
}

const convexHull$$$ = (points) => {
	const { length } = points
	if (length < 3) { return null }
	const n = __convexHull(points, 0, points, 0, points.length)
	if (n === null) { return null }
	points.length = n
	return points
}

const convexHull = (points) => {
	const { length } = points
	if (length < 3) { return null }
	const res = []
	const n = __convexHull(res, 0, points, 0, points.length)
	if (n === null) { return null }
	return res
}

convexHull.$$$ = convexHull$$$

module.exports = {
	__increment,
	increment,
	convexHull,
}
