const { binarySearchBy } = require('@kmamal/util/array/searching/binary')

const evaluate = (points, x) => {
	const index = binarySearchBy(points, [ x ], (p) => p[0])
	if (index === points.length) { return points.at(-1)[1] }
	return points[index][1]
}

const define = (points) => (x) => evaluate(points, x)

module.exports = {
	evaluate,
	define,
}
