const { toNumber, fromNumber } = require('..')

const inverseSqrt = (rational) => {
	const m = toNumber(rational)
	const s = 1 / Math.sqrt(m)
	return fromNumber(s)
}

module.exports = { inverseSqrt }
