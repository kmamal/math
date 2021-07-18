const V2 = require('../vec2')
const { point: getPoint } = require('./point')

const { withHooks } = require('@kmamal/util/map/with-hooks')
const makePointKey = (p) => `${p[0]}_${p[1]}`
const makePoint = (_, p) => ({ p, edges: new Set() })

const { heapifyWith, popWith, addWith } = require('@kmamal/util/array/heap')
const fn_cmp_endpoints = (endpoint1, endpoint2) => {
	{
		const { point: { p: p1 } } = endpoint1
		const { point: { p: p2 } } = endpoint2

		const dpy = p2[1] - p1[1]
		if (dpy !== 0) { return dpy }

		const dpx = p1[0] - p2[0]
		if (dpx !== 0) { return dpx }

		return endpoint1.other ? -1 : 1
	}
}

const segmentIntersection = (a1, b1, a2, b2) => {
	const a1b1 = V2.sub(b1, a1)
	const a2b2 = V2.sub(b2, a2)
	const a2a1 = V2.sub(a1, a2)

	const det = V2.cross(a1b1, a2b2)
	if (det === 0) {
		// TODO: handle overlap
		return null
	}

	const t1 = V2.cross(a2b2, a2a1) / det
	if (t1 < 0 || 1 < t1) {
		return null
	}

	const t2 = V2.cross(a1b1, a2a1) / det
	if (t2 < 0 || 1 < t2) {
		return null
	}

	return { q: V2.add(a1, V2.scale(a1b1, t1)), t1, t2 }
}

const splitEdge = (edges, edge, point) => {
	const { beta } = edge
	const splinter = { alpha: point, beta, downward: edge.downward }
	edges.add(splinter)
	edge.beta = point

	point.edges.add(edge)
	beta.edges.delete(edge)
	point.edges.add(splinter)
	beta.edges.add(splinter)

	return splinter
}

const { sortByPure } = require('@kmamal/util/array/sort')
const getAngle = ({ angle }) => angle

const makeSimple = (polygon) => {
	const { length } = polygon

	// Polygon structs
	const points = withHooks({
		key: makePointKey,
		factory: makePoint,
	})
	const edges = new Set()

	// Scanline algorithm
	const endpoints = new Array(length)

	// Polyline walk
	const simples = []
	let top_edge

	// Initialize
	{
		let a = getPoint(polygon, length - 2)
		let alpha = points.get(a)

		let index = 0
		while (index < length) {
			const b = getPoint(polygon, index)
			const beta = points.get(b)
			const edge = { alpha, beta }
			edges.add(edge)
			alpha.edges.add(edge)
			beta.edges.add(edge)

			const a_endpoint = { point: alpha, edge, other: null }
			const b_endpoint = { point: beta, edge, other: null }
			const downward = fn_cmp_endpoints(a_endpoint, b_endpoint) < 0
			if (downward) {
				a_endpoint.other = b_endpoint
			} else {
				b_endpoint.other = a_endpoint
			}
			endpoints[index++] = a_endpoint
			endpoints[index++] = b_endpoint

			edge.downward = downward

			a = b
			alpha = beta
		}

		heapifyWith(endpoints, fn_cmp_endpoints)
	}

	// Scanline algorithm
	{
		const active = new Set()
		while (endpoints.length > 0) {
			const endpoint1 = popWith(endpoints, fn_cmp_endpoints)
			if (!endpoint1.other) {
				active.delete(endpoint1)
				continue
			}

			let { edge: edge1, other: other1 } = endpoint1
			const { downward: downward1 } = edge1
			let { alpha: alpha1, beta: beta1 } = edge1

			for (const endpoint2 of active.values()) {
				let { edge: edge2 } = endpoint2
				const { alpha: alpha2, beta: beta2 } = edge2

				if (false
					|| alpha1 === alpha2
					|| alpha1 === beta2
					|| beta1 === alpha2
					|| beta1 === beta2
				) { continue }

				const intersection = segmentIntersection(
					alpha1.p,
					beta1.p,
					alpha2.p,
					beta2.p,
				)
				if (!intersection) { continue }

				const { q, t1, t2 } = intersection
				const point = points.get(q)

				const should_split1 = t1 !== 0 && t1 !== 1
				const should_split2 = t2 !== 0 && t2 !== 1

				if (should_split1) {
					let splinter = splitEdge(edges, edge1, point)
					if (downward1) {
						other1.edge = splinter
						beta1 = point
					} else {
						const tmp = edge1
						endpoint1.edge = edge1 = splinter
						splinter = tmp
						alpha1 = point
					}

					const new_close = { point, edge: edge1, other: null }
					addWith(endpoints, new_close, fn_cmp_endpoints)

					const new_open = { point, edge: splinter, other: other1 }
					addWith(endpoints, new_open, fn_cmp_endpoints)

					endpoint1.other = other1 = new_close
				}

				if (should_split2) {
					const { other: other2 } = endpoint2
					const { downward: downward2 } = edge2

					let splinter = splitEdge(edges, edge2, point)
					if (downward2) {
						other2.edge = splinter
					} else {
						const tmp = edge2
						endpoint2.edge = edge2 = splinter
						splinter = tmp
					}

					const new_close = { point, edge: edge2, other: null }
					addWith(endpoints, new_close, fn_cmp_endpoints)

					const new_open = { point, edge: splinter, other: other2 }
					addWith(endpoints, new_open, fn_cmp_endpoints)

					endpoint2.other = new_close
				}
			}

			active.add(endpoint1)

			if (!top_edge) { top_edge = edge1 }
		}
	}

	// Sort intersections
	for (const point of points.values()) {
		const arr = Array.from(point.edges)
		point.edges = arr

		if (arr.length > 2) {
			for (const edge of arr) {
				const { alpha, beta } = edge
				const e = point === alpha
					? V2.sub(beta.p, alpha.p)
					: V2.sub(alpha.p, beta.p)
				edge.angle = -V2.angle(e)
			}
			sortByPure.$$$(arr, getAngle)
		}

		for (let i = 0; i < arr.length; i++) {
			const edge = arr[i]
			if (edge.alpha === point) {
				edge.a_index = i
			} else {
				edge.b_index = i
			}
		}
	}

	for (const edge of edges.values()) {
		edge.e = V2.sub(edge.beta.p, edge.alpha.p)
	}

	// Walk polyline
	{
		let next_edge = top_edge

		while (edges.size > 0) {
			if (!next_edge) { next_edge = edges.values().next().value }

			const polyline = [ next_edge ]
			let start_index

			{
				let edge = next_edge

				const checkpoints = [ { point: edge.alpha, index: 0 } ]

				let beta = edge.beta

				for (;;) {
					if (beta.edges.length > 2) {
						const index = polyline.length
						checkpoints.push({ point: beta, index })
					}

					{
						const beta_edges = beta.edges
						let index = edge.b_index
						let counter = 1
						while (counter > 0 || !edges.has(edge)) {
							index = (index + 1) % beta_edges.length
							edge = beta_edges[index]
							counter += edge.alpha === beta ? -1 : 1
						}
					}

					polyline.push(edge)

					beta = edge.beta
					let found_index = -1
					for (let i = 0; i < checkpoints.length; i++) {
						if (checkpoints[i].point !== beta) { continue }
						found_index = i
						break
					}

					if (found_index !== -1) {
						start_index = checkpoints[found_index].index
						break
					}
				}
			}

			{
				const polyline_length = polyline.length
				let index = start_index

				const simple_length = (polyline_length - index) * 2
				const simple = new Array(simple_length)
				let write_index = 0

				const first_edge = polyline[index]
				let edge = first_edge

				const start = edge.alpha
				const s = start.p
				simple[write_index++] = s[0]
				simple[write_index++] = s[1]

				const last_index = polyline_length - 1
				const last_edge = polyline[last_index]

				let prev_edge = last_edge
				for (;;) {
					const e = edge.e
					const pe = prev_edge.e
					if (true
						&& V2.cross(e, pe) === 0
						&& V2.dot(e, pe) > 0
					) {
						write_index -= 2
					}

					const beta = edge.beta
					const b = beta.p
					simple[write_index++] = b[0]
					simple[write_index++] = b[1]

					edges.delete(edge)

					if (index === last_index) { break }
					prev_edge = edge
					edge = polyline[index++]
				}

				simple.length = write_index

				const e = first_edge.e
				const pe = last_edge.e
				if (true
					&& V2.cross(e, pe) === 0
					&& V2.dot(e, pe) > 0
				) {
					simple.splice(0, 2)
				}
				edges.delete(last_edge)

				simples.push(simple)
			}

			if (simples.length === 5) { process.exit() }
			next_edge = null
		}
	}

	return simples
}

module.exports = { makeSimple }
