const V2 = require('./vec2')
const { windingNumber } = require('./polygon/winding-number')
const { __point, point } = require('./polygon/point')

const pointInPoint = V2.eq

const pointInCircle = (p, r) => V2.normSquared(p) <= (r * r)

const pointInHalfplane = (p, a, b) => {
	const ab = V2.sub(b, a)
	const ap = V2.sub(p, a)
	return V2.cross(ab, ap) <= 0
}

const pointInLine = (p, a, b) => {
	const ab = V2.sub(b, a)
	const ap = V2.sub(p, a)
	return V2.cross(ab, ap) === 0
}

const pointInSegment = (p, a, b) => {
	const ab = V2.sub(b, a)
	const ap = V2.sub(p, a)
	const on_line = V2.cross(ab, ap) === 0
	if (!on_line) { return false }

	const h = V2.dot(ap, ab) / V2.normSquared(ab)
	return 0 <= h && h <= 1
}

const pointInBox = (p, w, h) => {
	const x = Math.abs(p[0])
	const y = Math.abs(p[1])
	return x <= (w / 2) && y <= (h / 2)
}

const pointInConvex = (p, polygon) => {
	const { length } = polygon
	const a = point(polygon, length - 2)
	const b = new Array(2)
	for (let i = 0; i < polygon.length; i += 2) {
		__point(b, polygon, i)

		if (!pointInHalfplane(p, a, b)) { return false }

		V2.copy(a, b)
	}
	return true
}

const pointInPolygon = (p, polygon) => windingNumber(p, polygon) > 0

module.exports = {
	pointInPoint,
	pointInCircle,
	pointInHalfplane,
	pointInLine,
	pointInSegment,
	pointInBox,
	pointInConvex,
	pointInPolygon,
}
