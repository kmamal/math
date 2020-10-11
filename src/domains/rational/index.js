const I = require('../integer')
const { defineFor } = require('../../gcd')
const gcd = defineFor(I)
const Float = require('@xyz/util/ieee-float')

const TWO_POW_53 = 2 ** 53
const BIG_TWO_POW_52 = 1n << 52n

const P_INFINITY = { num: 1n, den: 0n }
const N_INFINITY = { num: -1n, den: 0n }
const NAN = { num: 0n, den: 0n }

const isFinite = (x) => x.den !== 0n
const isNaN = (x) => x.num === 0n && x.den === 0n

const sign = (x) => I.sign(x.num)

const abs = (x) => ({
	num: I.abs(x.num),
	den: x.den,
})

const neg = (x) => ({
	num: -1n * x.num,
	den: x.den,
})

const add = (a, b) => {
	if (a === P_INFINITY && b === P_INFINITY) { return P_INFINITY }
	if (a === N_INFINITY && b === N_INFINITY) { return N_INFINITY }
	const num = a.num * b.den + b.num * a.den
	const den = a.den * b.den
	return fromFraction(num, den)
}

const sub = (a, b) => {
	if (a === P_INFINITY && b === N_INFINITY) { return P_INFINITY }
	if (a === N_INFINITY && b === P_INFINITY) { return N_INFINITY }
	const num = a.num * b.den - b.num * a.den
	const den = a.den * b.den
	return fromFraction(num, den)
}

const mul = (a, b) => {
	const num = a.num * b.num
	const den = a.den * b.den
	return fromFraction(num, den)
}

const div = (a, b) => {
	const num = a.num * b.den
	const den = a.den * b.num
	return fromFraction(num, den)
}

const inverse = (x) => ({
	num: x.den,
	den: x.num,
})

const mod = (a, b) => {
	const num = I.mod(a.num * b.den, b.num * a.den)
	const den = a.den * b.den
	return fromFraction(num, den)
}

const square = (x) => mul(x, x)

const pow = (x, e) => { // TODO: DOESNT WORK FOR NON-INTERGER EXPONENTS
	const num = I.pow(x.num, e)
	const den = I.pow(x.den, e)
	return fromFraction(num, den)
}

const floor = (x) => {
	const whole = I.div(x.num, x.den)
	return fromInteger(whole)
}

const frac = (x) => {
	const rest = I.mod(x.num, x.den)
	const fractional = fromFraction(rest, x.den)
	return isFinite(fractional) ? fractional : NAN
}

const eq = (a, b) => true
  && !isNaN(a)
  && !isNaN(b)
  && a.num === b.num
	&& a.den === b.den

const neq = (a, b) => !eq(a, b)

const lt = (a, b) => {
	if (a === N_INFINITY && b === P_INFINITY) { return true }
	const a_value = a.num * b.den
	const b_value = b.num * a.den
	return a_value < b_value
}

const gt = (a, b) => lt(b, a)
const lte = (a, b) => lt(a, b) || eq(a, b)
const gte = (a, b) => lte(b, a)

const _simplify = (num, den) => {
	const sign_num = num < 0 ? -1n : 1n
	const sign_den = den < 0 ? -1n : 1n
	const s = sign_num * sign_den
	const abs_num = sign_num * num
	const abs_den = sign_den * den
	const factor = gcd(abs_num, abs_den)
	return {
		num: s * abs_num / factor,
		den: abs_den / factor,
	}
}

const fromFraction = (num, den) => {
	const ratio = I.div(num, den)
	if (I.isNaN(ratio)) { return NAN }

	if (!I.isFinite(ratio)) {
		return ratio < 0n ? N_INFINITY : P_INFINITY
	}

	return _simplify(num, den)
}

const fromInteger = (x) => fromFraction(x, 1n)

const fromNumber = (x) => {
	if (Number.isNaN(x)) { return NAN }
	if (x === Infinity) { return P_INFINITY }
	if (x === -Infinity) { return N_INFINITY }

	const { sign: s, exponent: e, mantissa: m } = Float.parse(x)
	const biased_exponent = BigInt(e - 1075)
	const mantissa = BigInt(m)

	const implicit_bit = e === 0 ? 0n : BIG_TWO_POW_52
	let num = (s ? -1n : 1n) * (implicit_bit + mantissa)
	let den = 1n
	if (e >= 1076) {
		num <<= biased_exponent
	} else {
		den <<= -biased_exponent
	}

	return _simplify(num, den)
}

const toNumber = (x) => {
	if (x === NAN) { return NaN }
	if (x === P_INFINITY) { return Infinity }
	if (x === N_INFINITY) { return -Infinity }

	const { num, den } = x
	const s = num < 0n ? -1 : 1n
	const abs_num = s * num
	const over_one = abs_num > den
	const digits = over_one
		? (abs_num << 53n) / den
		: (den << 53n) / abs_num
	const whole = digits >> 53n
	const rest = digits - (whole << 53n)
	const number = Number(s) * (Number(whole) + Number(rest) / TWO_POW_53)
	return over_one ? number : 1 / number
}

const fromString = (s) => {
	const match = s.match(/^(?<num>-?\d+)\/(?<den>\d+)$/u)
	if (!match) { return NAN }

	const { num, den } = match.groups
	const _num = BigInt(num)
	const _den = BigInt(den)
	return fromFraction(_num, _den)
}

const toString = (x) => {
	if (x === NAN) { return 'NaN' }
	if (x === P_INFINITY) { return 'Infinity' }
	if (x === N_INFINITY) { return '-Infinity' }
	return `${x.num}/${x.den}`
}

module.exports = {
	...{ PInfinity: P_INFINITY, NInfinity: N_INFINITY, NaN: NAN },
	...{ isFinite, isNaN },
	...{ sign, abs, neg, add, sub, mul, div, mod, pow, square },
	...{ floor, frac, inverse },
	...{ eq, neq, lt, gt, lte, gte },
	...{ fromFraction, fromInteger },
	...{ fromNumber, toNumber },
	...{ fromString, toString },
}
