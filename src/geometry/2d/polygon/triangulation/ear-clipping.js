const { isInteriorEdge } = require('../is-interior-edge')
const { bisect } = require('@kmamal/util/array')

const triangulate = (polygon) => {
	const { length } = polygon
	const n = length / 2

	const remaining = new Array(n)
	for (let i = 0; i < n; i++) {
		remaining[i] = i * 2
	}

	const triangles = new Array(polygon.length / 2 - 2)
	let write_index = 0

	let ai = 0
	let bi = 2
	let ci = 4

	let remaining_index = 3
	while (remaining.length > 3) {
		if (isInteriorEdge(polygon, ai, ci)) {
			triangles[write_index++] = [ ai, bi, ci ]
			const splice_index = bisect(remaining, bi)
			remaining.splice(splice_index, 1)
			if (remaining_index > splice_index) {
				remaining_index -= 1
			}
		} else {
			ai = bi
		}
		bi = ci
		ci = remaining[remaining_index]
		remaining_index = (remaining_index + 1) % remaining.length
	}

	triangles[write_index++] = [ ai, bi, ci ]
	return triangles
}

module.exports = { triangulate }
