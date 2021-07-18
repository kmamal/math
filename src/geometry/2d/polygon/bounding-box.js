
const boundingBox = (polygon) => {
	let min_x = Infinity
	let max_x = -Infinity
	let min_y = Infinity
	let max_y = -Infinity
	for (let i = 0; i < polygon.length; i += 2) {
		const x = polygon[i + 0]
		const y = polygon[i + 1]
		min_x = Math.min(min_x, x)
		max_x = Math.max(max_x, x)
		min_y = Math.min(min_y, y)
		max_y = Math.max(max_y, y)
	}
	return {
		left: min_x,
		right: max_x,
		top: max_y,
		bottom: min_y,
	}
}

module.exports = { boundingBox }
