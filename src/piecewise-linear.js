const { binarySearchBy } = require('@kmamal/util/array/searching/binary')

const evaluate = (points, x) => {
	const index = binarySearchBy(points, [ x ], (p) => p[0])
	if (index === 0) { return points[0][1] }
	if (index === points.length) { return points.at(-1)[1] }

	const ai = index - 1
	const bi = index
	const a = points[ai]
	const b = points[bi]
	const r = (x - a[0]) / (b[0] - a[0])
	return a[1] * (1 - r) + b[1] * r
}

const define = (points) => (x) => evaluate(points, x)

module.exports = {
	evaluate,
	define,
}
