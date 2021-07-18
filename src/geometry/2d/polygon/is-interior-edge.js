const V2 = require('../vec2')
const { __point, point } = require('./point')
const SDF = require('../sdf') // TODO: collision

const isInteriorEdge = (polygon, _ai, _bi) => {
	let ai
	let bi
	if (_ai > _bi) {
		ai = _bi
		bi = _ai
	} else {
		ai = _ai
		bi = _bi
	}

	const { length } = polygon
	const a = point(polygon, ai)
	const b = point(polygon, bi)

	{
		const c = point(polygon, (length + ai - 2) % length)
		const d = point(polygon, ai + 2)
		const ab = V2.sub(b, a)
		const ac = V2.sub(c, a)
		const ad = V2.sub(d, a)
		if (V2.cross(ac, ad) < 0) {
			if (V2.cross(ac, ab) <= 0 && V2.cross(ad, ab) >= 0) { return false }
		} else if (V2.cross(ac, ab) <= 0 || V2.cross(ad, ab) >= 0) { return false }
	}

	{
		let ci = ai + 2
		let di = ci + 2
		const c = point(polygon, ci)
		const d = new Array(2)

		while (di < bi) {
			__point(d, polygon, di)
			if (SDF.segment2segment(a, b, c, d) <= 0) { return false }
			V2.copy(c, d)
			di += 2
		}

		ci = (bi + 2) % length
		__point(c, polygon, ci)
		di = (ci + 2) % length

		if (di > bi) {
			while (di < length) {
				__point(d, polygon, di)
				if (SDF.segment2segment(a, b, c, d) <= 0) { return false }
				V2.copy(c, d)
				di += 2
			}
		}

		while (di < ai) {
			__point(d, polygon, di)
			if (SDF.segment2segment(a, b, c, d) <= 0) { return false }
			V2.copy(c, d)
			di += 2
		}
	}

	return true
}

module.exports = { isInteriorEdge }
