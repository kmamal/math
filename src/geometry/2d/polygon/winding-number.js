const V2 = require('../vec2')
const { __point, point } = require('./point')

const windingNumber = (p, polygon) => {
	let winding_number = 0
	const p_y = p[1]

	const { length } = polygon
	const a = point(polygon, length - 2)
	const b = new Array(2)
	const ab = new Array(2)
	const ap = new Array(2)
	for (let i = 0; i < length; i += 2) {
		__point(b, polygon, i)

		check_edge: {
			V2.sub.to(ab, b, a)
			V2.sub.to(ap, p, a)

			if (ab[1] === 0) {
				if (ap[1] === 0 && ab[0] < ap[0] && ap[0] <= 0) {
					winding_number += 1
				}
				break check_edge
			}

			if (V2.eq(a, p)) {
				winding_number += 1
				break check_edge
			}

			const starts_above = ap[1] <= 0
			const ends_below = b[1] - p_y < 0
			const is_inside = V2.cross(ab, ap) <= 0

			if (starts_above && ends_below && is_inside) {
				winding_number += 1
			} else if (!starts_above && !ends_below && !is_inside) {
				winding_number -= 1
			}
		}

		V2.copy(a, b)
	}

	return winding_number
}

module.exports = { windingNumber }
