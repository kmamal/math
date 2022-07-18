
const interpolateParabola = (x1, y1, x2, y2, x3, y3) => {
	const x12 = x1 - x2
	const x23 = x2 - x3
	const x31 = x3 - x1
	const y12 = y1 - y2
	const y23 = y2 - y3
	const y31 = y3 - y1
	const xx1 = x1 * x1
	const xx2 = x2 * x2
	const xx3 = x3 * x3

	const div = x12 * x23 * x31
	const a = -(x1 * y23 + x2 * y31 + x3 * y12) / div
	const b = (xx1 * y23 + xx2 * y31 + xx3 * y12) / div
	const c = (xx2 * (x3 * y1 - x1 * y3) + x2 * (xx1 * y3 - xx3 * y1) + x1 * x3 * x31 * y2) / div

	return { a, b, c }
}

const parabolaVertex = (a, b, c) => [
	-b / (2 * a),
	c - (b * b) / (4 * a),
]
