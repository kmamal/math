const R = require('../../')

const base = 10

const approximate = (a) => {
	const one_over = a.num < a.den

	const whole = R.floor(!one_over ? a : R.inverse(a))
	const string = whole.num.toString(base)
	const exponent = string.length - 1
	const half_exponent = Math.floor(exponent / 2)
	const round_exponent = half_exponent * 2
	const mantissa = parseInt(string.slice(0, -round_exponent), base)
	const k = (mantissa < 10 ? 2n : 6n) * 10n ** BigInt(half_exponent)

	return !one_over
		? { num: k, den: 1n }
		: { num: 1n, den: k }
}

module.exports = { approximate }
