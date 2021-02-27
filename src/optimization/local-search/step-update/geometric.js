const { map } = require('@xyz/util/array/map')

const makeGeometric = (rate) => {
	const fn = (x) => x * rate

	return (steps) => {
		map.$$$(steps, fn)
	}
}

module.exports = { makeGeometric }
