/* eslint-disable array-element-newline */

const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { neg, div, cos, sin, acos } = Domain
	const Scaling = require('./scaling').defineFor(Domain)

	const toMatrix = (angle) => {
		const s = sin(angle)
		const c = cos(angle)
		return [
			c, neg(s), 0,
			s, c, 0,
			0, 0, 1,
		]
	}

	const fromMatrix = (matrix) => {
		const [ w ] = Scaling.fromMatrix(matrix)
		const [ m11 ] = matrix
		return acos(div(m11, w))
	}

	return {
		toMatrix,
		fromMatrix,
	}
})

module.exports = { defineFor }
