const { random } = require('@kmamal/util/random/random')

const getNeighborHyperbox = (solution, steps) => {
	const { length } = solution
	const candidate = new Array(length)
	for (let i = 0; i < length; i++) {
		candidate[i] = solution[i] + steps[i] * (random() * 2 - 1)
	}
	return candidate
}

module.exports = { getNeighborHyperbox }
