const { sampleSphere } = require('../../../sampling/sphere')

const getNeighborHypersphere = (solution, steps) => {
	const { length } = solution
	const candidate = new Array(length)
	const random = sampleSphere(length)
	for (let i = 0; i < length; i++) {
		candidate[i] = solution[i] + steps[i] * random[i]
	}
	return candidate
}

module.exports = { getNeighborHypersphere }
