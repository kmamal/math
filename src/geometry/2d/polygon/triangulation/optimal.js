const V2 = require('../../vec2')
const { Array2d } = require('@kmamal/util/array/2d')
const { __point } = require('../point')
const { isInteriorEdge } = require('../is-interior-edge')

const triangulate = (polygon) => {
	const { length } = polygon
	const n = length / 2
	const weights = new Array2d(n, n - 1)

	const a = new Array(2)
	const b = new Array(2)
	const ab = new Array(2)
	let prev = 0
	let half_prev = 0
	for (let i = 2; i < length; i += 2) {
		const half_i = i / 2
		__point(a, polygon, i)

		__point(b, polygon, prev)
		V2.sub.to(ab, b, a)
		weights.set(half_i, half_prev, { w: V2.normSquared(ab), k: null })

		for (let j = i - 4; j >= 0; j -= 2) {
			const half_j = j / 2
			__point(b, polygon, j)

			if (!isInteriorEdge(polygon, i, j)) {
				weights.set(half_i, half_j, Infinity)
				continue
			}

			V2.sub.to(ab, b, a)
			const ab_w = V2.normSquared(ab)

			let min_acb_w = Infinity
			let min_half_k = Infinity
			for (let k = j + 2; k < i; k += 2) {
				const half_k = k / 2
				const ac_w = weights.get(half_i, half_k).w
				const cb_w = weights.get(half_k, half_j).w
				const acb_w = ac_w + cb_w
				if (acb_w < min_acb_w) {
					min_acb_w = acb_w
					min_half_k = half_k
				}
			}

			const w = ab_w + min_acb_w
			weights.set(half_i, half_j, { w, k: min_half_k })
		}

		prev = i
		half_prev = half_i
	}

	const triangles = new Array(n - 2)
	let write_index = 0
	const stack = [ { i: n - 1, j: 0 } ]
	while (stack.length > 0) {
		const { i, j } = stack.pop()
		const { k } = weights.get(i, j)
		if (k === null) { continue }
		triangles[write_index++] = [ i * 2, j * 2, k * 2 ]
		stack.push({ i, j: k })
		stack.push({ i: k, j })
	}

	return triangles
}

module.exports = { triangulate }
