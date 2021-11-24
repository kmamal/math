const arithmeticOrerators = require('@kmamal/util/operators/arithmetic')
const comparisonOrerators = require('@kmamal/util/operators/comparison')
const { identity } = require('@kmamal/util/function/identity')

const isMember = (a) => typeof a === 'number'

const isNaN = Number.isNaN
const isFinite = Number.isFinite

const inverse = (a) => 1 / a
const square = (a) => a * a
const inverseSqrt = (a) => 1 / Math.sqrt(a)

const props = Object.getOwnPropertyNames(Math)
const M = {}
for (const prop of props) {
	M[prop] = Math[prop]
}

const fromString = (s) => parseFloat(s)
const toString = (a) => a.toString()

const fromNumber = identity
const toNumber = identity

module.exports = {
	...{ PInfinity: Infinity, NInfinity: -Infinity, NaN },
	...{ isMember, isNaN, isFinite },
	...arithmeticOrerators,
	...{ inverse, square, inverseSqrt },
	...M,
	...comparisonOrerators,
	...{ fromNumber, toNumber },
	...{ fromString, toString },
}
