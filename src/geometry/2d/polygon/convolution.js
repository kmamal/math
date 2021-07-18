const V2 = require('../vec2')
const { __point, point } = require('./point')

const convolution = (a, b) => {
	const { length: a_length } = a
	const { length: b_length } = b

	let last_was_positive

	let a_start = a_length - 1
	const a1 = point(a, a_length - 2)
	const a2 = new Array(2)
	last_was_positive = true
	for (let i = 0; i <= a_length; i += 2) {
		a_start = i % a_length
		__point(a2, a, a_start)

		const is_positive = a2[1] > a1[1]
			|| (a2[1] === a1[1] && a2[0] < a1[0])
		if (is_positive && !last_was_positive) { break }

		V2.copy(a1, a2)
		last_was_positive = is_positive
	}

	let b_start = b_length - 1
	const b1 = point(b, b_length - 2)
	const b2 = new Array(2)
	last_was_positive = true
	for (let i = 0; i <= b_length; i += 2) {
		b_start = i % b_length
		__point(b2, b, b_start)

		const is_positive = b2[1] > b1[1]
			|| (b2[1] === b1[1] && b2[0] < b1[0])
		if (is_positive && !last_was_positive) { break }

		V2.copy(b1, b2)
		last_was_positive = is_positive
	}

	const res = new Array(a_length + b_length)
	let write_index = 0

	const last_point = V2.add(a1, b1)
	res[write_index++] = last_point[0]
	res[write_index++] = last_point[1]
	const last_edge = [ NaN, NaN ]

	let ai = a_start
	let bi = b_start
	const a_edge = V2.sub(a2, a1)
	const b_edge = V2.sub(b2, b1)
	let a_full_turn = false
	let b_full_turn = false
	let last_used = 1

	while (!a_full_turn || !b_full_turn) {
		let cross = V2.cross(a_edge, b_edge)
		if (cross === 0) { cross -= last_used }

		if (cross <= 0) {
			last_used = -1
			if (V2.cross(a_edge, last_edge) === 0) {
				write_index -= 2
			}

			V2.add.$$$(last_point, a_edge)
			res[write_index++] = last_point[0]
			res[write_index++] = last_point[1]
			V2.copy(last_edge, a_edge)

			ai = (ai + 2) % a_length
			a_full_turn = ai === a_start
			V2.copy(a1, a2)
			__point(a2, a, ai)
			V2.sub.to(a_edge, a2, a1)
		} else {
			last_used = 1
			if (V2.cross(b_edge, last_edge) === 0) {
				write_index -= 2
			}

			V2.add.$$$(last_point, b_edge)
			res[write_index++] = last_point[0]
			res[write_index++] = last_point[1]
			V2.copy(last_edge, b_edge)

			bi = (bi + 2) % b_length
			b_full_turn = bi === b_start
			V2.copy(b1, b2)
			__point(b2, b, bi)
			V2.sub.to(b_edge, b2, b1)
		}
	}

	res.length = write_index - 2
	return res
}

module.exports = { convolution }
