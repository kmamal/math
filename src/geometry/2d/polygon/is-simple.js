const SDF = require('../sdf')
const { point } = require('./point')
const { heapifyWith, popWith } = require('@kmamal/util/array/heap')

const isSimple = (polygon) => {
	const { length } = polygon
	const endpoints = new Array(length)

	{
		let a = point(polygon, length - 2)
		let b
		let index = 0
		while (index < length) {
			b = point(polygon, index)

			const edge_key = index
			endpoints[index++] = { p: a, a, b, edge_key }
			endpoints[index++] = { p: b, a, b, edge_key }

			a = b
		}
	}

	const fn = (u, v) => {
		const dy = v.p[1] - u.p[1]
		if (dy !== 0) { return dy }
		return u.p[0] - v.p[0]
	}
	heapifyWith(endpoints, fn)

	const active_edges = new Map()
	while (endpoints.length > 0) {
		const endpoint = popWith(endpoints, fn)
		const { edge_key } = endpoint

		if (active_edges.has(edge_key)) {
			active_edges.delete(edge_key)
			continue
		}

		const { a: a1, b: b1 } = endpoint
		for (const [ other_key, other ] of active_edges.entries()) {
			const { a: a2, b: b2 } = other
			const offset = other_key - edge_key
			if (offset === 2) {
				if (SDF.point2segmentSquared(a1, a2, b2) === 0) { return false }
			} else if (offset === -2 || offset === length - 2) {
				if (SDF.point2segmentSquared(b1, a2, b2) === 0) { return false }
			} else if (SDF.segment2segment(a1, b1, a2, b2) <= 0) { return false }
		}

		active_edges.set(edge_key, endpoint)
	}

	return true
}

module.exports = { isSimple }
