const V2 = require('./vec2')
const { sortBy } = require('@kmamal/util/array/sort')

const getX = ([ x ]) => x
const getY = ([ , y ]) => y

const BREAKOFF = 4

const __recurse = (buffers, sorted_x, sorted_y, start, end, best) => {
	const length = end - start

	if (length <= BREAKOFF) {
		let min_d_s = best * best
		let min_a
		let min_b
		for (let i = start + 1; i < end; i++) {
			const a = sorted_x[i]
			for (let j = 0; j < i; j++) {
				const b = sorted_x[j]
				V2.sub.to(buffers.ab, b, a)
				const d_s = V2.normSquared(buffers.ab)
				if (d_s < min_d_s) {
					min_d_s = d_s
					min_a = a
					min_b = b
				}
			}
		}
		return { a: min_a, b: min_b, dist: Math.sqrt(min_d_s) }
	}

	const mid = start + Math.floor(length / 2)

	const left = __recurse(buffers, sorted_x, sorted_y, start, mid, best)
	const right = __recurse(buffers, sorted_x, sorted_y, mid, end, left.dist)


	const result = left.dist <= right.dist ? left : right
	const mid_x = (sorted_x[mid][0] + sorted_x[mid - 1][0]) / 2

	const left_x = mid_x - result.dist
	const right_x = mid_x + result.dist

	let left_end = 0
	let right_end = 0
	for (let i = 0; i < sorted_y.length; i++) {
		const point = sorted_y[i]
		const x = point[0]
		if (x < left_x || right_x < x) { continue }
		if (x < mid_x) {
			buffers.left[left_end++] = point
		} else {
			buffers.right[right_end++] = point
		}
	}

	let min_j = 0
	for (let i = 0; i < left_end; i++) {
		const a = buffers.left[i]
		for (let j = min_j; j < right_end; j++) {
			const b = buffers.right[j]
			V2.sub.to(buffers.ab, b, a)
			const dist = V2.norm(buffers.ab)
			if (dist < result.dist) {
				result.a = a
				result.b = b
				result.dist = dist
			} else {
				if (b[1] > a[1]) { break }
				min_j = j
			}
		}
	}

	return result
}

const closestPair = (points) => {
	const { length } = points
	if (length < 2) { return null }

	const half_length = Math.floor(length / 2)
	const buffers = {
		ab: new Array(2),
		left: new Array(half_length),
		right: new Array(half_length),
	}

	const sorted_x = sortBy(points, getX)
	const sorted_y = sortBy(points, getY)

	return __recurse(buffers, sorted_x, sorted_y, 0, length, Infinity)
}

module.exports = { closestPair }
