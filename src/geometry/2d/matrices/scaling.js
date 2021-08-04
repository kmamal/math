/* eslint-disable array-element-newline */

const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const { add, mul, div, sqrt } = Domain

	const toMatrix = ([ w, h ]) => [
		w, 0, 0,
		0, h, 0,
		0, 0, 1,
	]

	const fromMatrix = ([
		m11, , ,
		m12, m22,
	]) => {
		const w = sqrt(add(
			mul(m11, m11),
			mul(m12, m12),
		))
		const h = mul(w, div(m22, m11))
		return [ w, h ]
	}

	return {
		toMatrix,
		fromMatrix,
	}
})

module.exports = { defineFor }
