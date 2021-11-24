const I = require('../integer')
const { defineFor } = require('../../gcd')
const gcd = defineFor(I)
const Float = require('@kmamal/util/ieee-float/double')

const TWO_POW_53 = 2 ** 53

const P_INFINITY = { num: 1n, den: 0n }
const N_INFINITY = { num: -1n, den: 0n }
const NAN = { num: 0n, den: 0n }

const isMember = (x) => false
|| (true
	&& typeof x === 'object'
	&& I.isMember(x.num)
	&& I.isMember(x.den))
|| x === P_INFINITY
|| x === N_INFINITY
|| x === NAN

const isFinite = (x) => isMember(x) && x.den !== 0n
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

const inverse = (x) => fromFraction(x.den, x.num)

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

const round = (x, bits) => {
	const { num } = x
	const s = num < 0 ? -1n : 1n
	let absNum = s * num
	let { den } = x

	const c = 2n ** BigInt(bits)
	if (absNum > den) {
		while (den > c) {
			absNum >>= 1n
			den >>= 1n
		}
	} else {
		while (absNum > c) {
			absNum >>= 1n
			den >>= 1n
		}
	}
	return fromFraction(s * absNum, den)
}

const eq = (a, b) => true
  && !isNaN(a)
  && !isNaN(b)
  && a.num === b.num
	&& a.den === b.den

const neq = (a, b) => !eq(a, b)

const lt = (a, b) => {
	if (a === N_INFINITY && b === P_INFINITY) { return true }
	const aValue = a.num * b.den
	const bValue = b.num * a.den
	return aValue < bValue
}

const gt = (a, b) => lt(b, a)
const lte = (a, b) => lt(a, b) || eq(a, b)
const gte = (a, b) => lte(b, a)

const min = (x, y) => lte(x, y) ? x : y
const max = (x, y) => gte(x, y) ? x : y

const _simplify = (num, den) => {
	const signNum = num < 0 ? -1n : 1n
	const signDen = den < 0 ? -1n : 1n
	const s = signNum * signDen
	const absNum = signNum * num
	const absDen = signDen * den
	const factor = gcd(absNum, absDen)
	return {
		num: s * absNum / factor,
		den: absDen / factor,
	}
}

const fromFraction = (num, den) => {
	const ratio = I.div(num, den)
	if (I.isNaN(ratio)) { return NAN }

	if (!I.isFinite(ratio)) {
		return I.lt(ratio, 0n) ? N_INFINITY : P_INFINITY
	}

	return _simplify(num, den)
}

const fromInteger = (x) => fromFraction(x, 1n)

const fromNumber = (x) => {
	if (Number.isNaN(x)) { return NAN }
	if (x === Infinity) { return P_INFINITY }
	if (x === -Infinity) { return N_INFINITY }
	if (x === 0) { return { num: 0n, den: 1n } }
	if (x === Math.floor(x)) { return fromInteger(BigInt(x)) }

	const { sign: s, exponent: e, mantissa: m } = Float.parse(x)

	let num = BigInt((s ? -1 : 1) * (m + Float.HIDDEN_BIT))
	let den = 1n
	const shift = BigInt(e - Float.EXPONENT_BIAS - Float.MANTISSA_BITS)
	if (shift >= 0) {
		num <<= shift
	} else {
		den <<= -shift
	}

	return _simplify(num, den)
}

const toNumber = (x) => {
	if (x === NAN) { return NaN }
	if (x === P_INFINITY) { return Infinity }
	if (x === N_INFINITY) { return -Infinity }

	const { num, den } = x

	if (num === 0n) { return 0 }

	const s = num < 0n ? -1n : 1n
	const absNum = s * num
	const overOne = absNum > den
	const digits = overOne
		? I.div(absNum << 53n, den)
		: I.div(den << 53n, absNum)
	const whole = digits >> 53n
	const rest = digits - (whole << 53n)
	const number = Number(s) * (Number(whole) + Number(rest) / TWO_POW_53)
	return overOne ? number : 1 / number
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

const from = (x, y) => {
	if (y) { return fromFraction(I.from(x), I.from(y)) }
	if (isMember(x)) { return x }
	if (typeof x === 'bigint') { return fromInteger(x) }
	if (typeof x === 'number') { return fromNumber(x) }
	if (typeof x === 'string') { return fromString(x) }
	return NAN
}

module.exports = {
	...{ PInfinity: P_INFINITY, NInfinity: N_INFINITY, NaN: NAN },
	...{ isMember, isFinite, isNaN },
	...{ sign, abs, neg, add, sub, mul, div, mod, pow, square },
	...{ floor, frac, inverse, round },
	...{ eq, neq, lt, gt, lte, gte, min, max },
	...{ fromFraction, fromInteger },
	...{ fromNumber, toNumber },
	...{ fromString, toString },
	...{ from },
}
