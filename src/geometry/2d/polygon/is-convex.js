const V2 = require('../vec2')
const { __point, point } = require('./point')

const isConvex = (polygon) => {
	const { length } = polygon

	const a = point(polygon, length - 4)
	const b = point(polygon, length - 2)
	const ab = V2.sub(b, a)
	const c = new Array(2)
	const bc = new Array(2)
	for (let i = 0; i < length; i += 2) {
		__point(c, polygon, i)

		V2.sub.to(bc, c, b)
		const cross = V2.cross(ab, bc)
		if (cross > 0) { return false }

		V2.copy(b, c)
		V2.copy(ab, bc)
	}

	return true
}

module.exports = { isConvex }
