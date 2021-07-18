const V2 = require('../vec2')
const { __min } = require('@kmamal/util/array')

const __convexHull = (dst, dst_start, src, src_start, src_end) => {
	const a = __min(src, src_start, src_end, ([ x ]) => x)
	let b = a
	const ab = [ 0, 1 ]

	let write_index = dst_start
	dst[write_index++] = a

	let c
	const bc = new Array(2)
	const bp = new Array(2)

	for (;;) {
		let min_angle = Infinity
		let bc_ns = -Infinity

		let read_index = src_start
		while (read_index !== src_end) {
			const p = src[read_index++]
			if (V2.eq(p, b)) { continue }

			V2.sub.to(bp, p, b)
			const angle = V2.angle2(bp, ab)
			if (angle > min_angle) { continue }

			const bp_ns = V2.normSquared(bp)
			if (angle === min_angle && bp_ns <= bc_ns) { continue }

			min_angle = angle
			c = p
			V2.copy(bc, bp)
			bc_ns = bp_ns
		}

		if (V2.eq(c, a)) { break }
		dst[write_index++] = c

		b = c
		V2.copy(ab, bc)
	}

	const hull_length = write_index - dst_start
	if (hull_length < 3) { return null }
	return hull_length
}

const convexHull = (points) => {
	const { length } = points
	if (length < 3) { return null }
	const res = []
	const n = __convexHull(res, 0, points, 0, points.length)
	if (n === null) { return null }
	return res
}

module.exports = {
	__convexHull,
	convexHull,
}
