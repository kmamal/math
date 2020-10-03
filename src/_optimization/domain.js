const fp = require('lodash/fp')
const random = require('../random')

const clamp = fp.curry((domain, variables) => fp.zipWith(
	({ from, to }, x) => fp.clamp(from, to, x),
	domain,
	variables,
))

const clamp_BANG = (variables, domain) => {
	for (let i = 0; i < variables.length; i++) {
		const { from, to } = domain[i]
		const x = variables[i]
		if (x < from) {
			variables[i] = from
		} else if (x > to) {
			variables[i] = to
		}
	}
}

const finitizeDomain = fp.map(({ from, to }) => ({
	from: Math.max(-Number.MAX_VALUE, from),
	to: Math.min(Number.MAX_VALUE, to),
}))

const infinitizeVariables = fp.curry((domain, variables) => fp.zipWith(({ from, to }, x) => {
	if (x === -Number.MAX_VALUE && from === -Infinity) { return -Infinity }
	if (x === Number.MAX_VALUE && to === Infinity) { return Infinity }
	return x
}, domain, variables))

// NOTE: The full range (from -MAX_VALUE to MAX_VALUE) would overflow.
const halfRanges = fp.map(({ from, to }) => to / 2 - from / 2)
const getMidpoint = fp.map(({ from, to }) => (to / 2 - from / 2) + from)
const getRandom = fp.map(({ from, to }) => random(from, to))

module.exports = {
	clamp,
	clamp_BANG,
	infinitizeVariables,
	finitizeDomain,
	halfRanges,
	getMidpoint,
	getRandom,
}
