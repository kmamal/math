
const area = (polygon) => {
	const { length } = polygon
	let sum = 0
	let a_x = polygon[length - 2]
	let a_y = polygon[length - 1]
	for (let i = 0; i < length; i += 2) {
		const b_x = polygon[i + 0]
		const b_y = polygon[i + 1]

		sum += (b_x - a_x) * (b_y + a_y)

		a_x = b_x
		a_y = b_y
	}
	return sum / 2
}

module.exports = { area }
