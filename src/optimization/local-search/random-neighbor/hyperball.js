const { sampleSphere } = require('../../../sampling/sphere')
const { random: randomRadius } = require('@xyz/util/random/random')

const getNeighborHyperball = (solution, steps) => {
	const { length } = solution
	const candidate = new Array(length)
	const random = sampleSphere(length)
	const radius = randomRadius()
	for (let i = 0; i < length; i++) {
		candidate[i] = solution[i] + radius * steps[i] * random[i]
	}
	return candidate
}

module.exports = { getNeighborHyperball }
