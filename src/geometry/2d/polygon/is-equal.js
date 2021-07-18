
const isEqual = (a, b) => {
	const { length } = a
	if (b.length !== length) { return false }

	next_offset:
	for (let offset = 0; offset < length; offset += 2) {
		for (let i = 0; i < length; i++) {
			const aa = a[i]
			const bb = b[(i + offset) % length]
			if (aa !== bb) { continue next_offset }
		}
		return true
	}

	return false
}

module.exports = { isEqual }
