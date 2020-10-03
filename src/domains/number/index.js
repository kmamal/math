const {
	operators: {
		arithmetic: arithmeticOrerators,
		comparison: comparisonOrerators,
	},
} = require('@xyz/utils')

const isNaN = (a) => Number.isNaN(a)
const isFinite = (a) => Number.isFinite(a)

const square = (a) => a * a

const props = Object.getOwnPropertyNames(Math)
const M = {}
for (const prop of props) {
	M[prop] = Math[prop]
}

const fromString = (s) => parseFloat(s)
const toString = (a) => a.toString()

const fromNumber = (x) => x
const toNumber = (x) => x

module.exports = {
	...{ PInfinity: Infinity, NInfinity: -Infinity, NaN },
	...{ isNaN, isFinite },
	...arithmeticOrerators,
	...M,
	square,
	...comparisonOrerators,
	...{ fromNumber, toNumber },
	...{ fromString, toString },
}
