const { makeGeometric } = require('./geometric')

const makeAdaptive = (shrink_rate, grow_rate = 1 / shrink_rate) => {
	const grow = makeGeometric(grow_rate)
	const shrink = makeGeometric(shrink_rate)

	return (steps, success) => {
		success ? grow(steps) : shrink(steps)
	}
}

module.exports = { makeAdaptive }
