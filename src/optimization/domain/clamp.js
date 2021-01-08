
const clamp = (variables, domain) => {
	for (let i = 0; i < domain.length; i++) {
		const { from, to } = domain[i]
		const x = variables[i]

		if (x < from) {
			variables[i] = from
		} else if (x > to) {
			variables[i] = to
		}
	}
}

module.exports = { clamp }
