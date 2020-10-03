const M = require('../number')
const I = require('../integer')
const { makeGcd } = require('../../gcd')
const gcd = makeGcd(I)
const { 'ieee-float': Float } = require('@xyz/util')

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
	num: I.mul(-1n, x.num),
	den: x.den,
})

const add = (a, b) => {
	const num = I.add(I.mul(a.num, b.den), I.mul(b.num, a.den))
	const den = I.mul(a.den, b.den)
	return fromFraction(num, den)
}

const sub = (a, b) => add(a, neg(b))

const mul = (a, b) => {
	const num = I.mul(a.num, b.num)
	const den = I.mul(a.den, b.den)
	return fromFraction(num, den)
}

const inverse = (x) => ({
	num: x.den,
	den: x.num,
})

const div = (a, b) => mul(a, inverse(b))

const mod = (a, b) => {
	const num = I.mod(I.mul(a.num, b.den), I.mul(b.num, a.den))
	const den = I.mul(a.den, b.den)
	return fromFraction(num, den)
}

const square = (x) => mul(x, x)

const pow = (x, e) => ({
	num: x.num ** e,
	den: x.den ** e,
})

const floor = (x) => {
	const y = I.div(x.num, x.den)
	return fromInteger(y)
}

const frac = (x) => {
	const y = I.mod(x.num, x.den)
	const z = fromFraction(y, x.den)
	return isFinite(z) ? z : NAN
}

const eq = (a, b) => true
  && !isNaN(a)
  && !isNaN(b)
  && I.eq(a.num, b.num)
	&& I.eq(a.den, b.den)

const neq = (a, b) => !eq(a, b)

const lt = (a, b) => {
	const a_value = I.mul(a.num, b.den)
	const b_value = I.mul(b.num, a.den)
	return I.lt(a_value, b_value)
}

const gt = (a, b) => lt(b, a)
const lte = (a, b) => lt(a, b) || eq(a, b)
const gte = (a, b) => lte(b, a)

const fromFraction = (_num, _den) => {
	const num = I.fromNumber(_num)
	const den = I.fromNumber(_den)

	const ratio = I.div(num, den)
	if (I.isNaN(ratio)) { return NAN }

	if (!I.isFinite(ratio)) {
		return { num: I.sign(ratio), den: 0n }
	}

	const s = I.sign(num) * I.sign(den)
	const abs_num = I.abs(num)
	const abs_den = I.abs(den)
	const factor = gcd(abs_num, abs_den)
	return {
		num: I.mul(s, I.div(abs_num, factor)),
		den: I.div(abs_den, factor),
	}
}

const fromInteger = (x) => fromFraction(x, 1n)

const fromNumber = (x) => {
	if (x === M.PInfinity) { return P_INFINITY }
	if (x === M.NInfinity) { return N_INFINITY }
	if (M.isNaN(x)) { return NAN }

	const { sign: s, exponent: e, mantissa: m } = Float.parse(x)
	const exponent = BigInt(e)
	const mantissa = BigInt(m)
	const hidden = e === 0 ? 0n : 1n
	const [ num_scale, den_scale ] = e >= 1023
		? [ 2n ** (exponent - 1022n), 1n ]
		: [ 1n, 2n ** (1022n - exponent) ]
	const num = (s ? -1n : 1n) * (hidden * 2n ** 52n + mantissa)
	const den = 2n ** 53n
	return fromFraction(num * num_scale, den * den_scale)
}

const toNumber = (x) => {
	const ratio = I.div(x.num, x.den)
	const tail = I.mod(x.num, x.den)
	return Number(ratio) + Number(tail) / Number(x.den)
}

const fromString = (s) => {
	const match = s.match(/(?<minus-)?(?<num>\d+)\/(?<den>\d+)/u)
	if (!match) { return NAN }

	const { minus, num, den } = match
	const _sign = minus === '-' ? -1 : 1
	const _num = _sign * parseInt(num, 10)
	const _den = parseInt(den, 10)
	return fromFraction(_num, _den)
}

const toString = (x) => {
	if (eq(x, P_INFINITY)) { return 'Infinity' }
	if (eq(x, N_INFINITY)) { return '-Infinity' }
	if (eq(x, NAN)) { return 'NaN' }
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
