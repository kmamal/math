/* eslint-disable array-element-newline */

const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize(() => {
	const toMatrix = ([ x, y ]) => [
		1, 0, x,
		0, 1, y,
		0, 0, 1,
	]

	const fromMatrix = ([
		, , x,
		, , y,
	]) => [ x, y ]

	return {
		toMatrix,
		fromMatrix,
	}
})

module.exports = { defineFor }
