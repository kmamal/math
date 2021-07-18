const P_INFINITY = Symbol("Infinity")
const N_INFINITY = Symbol("-Infinity")
const NAN = Symbol("NaN")

const _getSignedInfinity = (x) => x < 0n ? N_INFINITY : P_INFINITY

const sign = (x) => {
	if (x === NAN) { return NAN }
	if (x === P_INFINITY) { return 1n }
	if (x === N_INFINITY) { return -1n }
	if (x > 0n) { return 1n }
	if (x < 0n) { return -1n }
	return 0n
}

const abs = (x) => mul(sign(x), x)

const neg = (x) => {
	if (x === NAN) { return NAN }
	if (x === P_INFINITY) { return N_INFINITY }
	if (x === N_INFINITY) { return P_INFINITY }
	return -x
}

const add = (a, b) => {
	if (
		(a === NAN || b === NAN)
		|| (a === P_INFINITY && b === N_INFINITY)
		|| (a === N_INFINITY && b === P_INFINITY)
	) {
		return NAN
	}
	if (a === P_INFINITY || b === P_INFINITY) { return P_INFINITY }
	if (a === N_INFINITY || b === N_INFINITY) { return N_INFINITY }
	return a + b
}

const sub = (a, b) => {
	if (
		(a === NAN || b === NAN)
		|| (a === P_INFINITY && b === P_INFINITY)
		|| (a === N_INFINITY && b === N_INFINITY)
	) {
		return NAN
	}
	if (a === P_INFINITY || b === N_INFINITY) { return P_INFINITY }
	if (a === N_INFINITY || b === P_INFINITY) { return N_INFINITY }
	return a - b
}

const mul = (a, b) => {
	if (a === NAN || b === NAN) { return NAN }
	if (a === P_INFINITY || a === N_INFINITY || b === P_INFINITY || b === N_INFINITY) {
		return _getSignedInfinity(sign(a) * sign(b))
	}
	return a * b
}

const div = (a, b) => {
	if (
		(a === NAN || b === NAN)
		|| ((a === P_INFINITY || a === N_INFINITY) && (b === P_INFINITY || b === N_INFINITY))
		|| (a === 0n && b === 0n)
	) {
		return NAN
	}
	if (a === P_INFINITY || a === N_INFINITY) {
		return _getSignedInfinity(sign(a) * sign(b))
	}
	if (b === P_INFINITY || b === N_INFINITY) { return 0n }
	if (b === 0n) { return _getSignedInfinity(sign(a)) }
	return a / b
}

const mod = (a, b) => {
	if (a === NAN || b === NAN || a === P_INFINITY || a === N_INFINITY || b === P_INFINITY || b === N_INFINITY || b === 0n) {
		return NAN
	}
	return a % b
}

const pow = (a, b) => {
	if (b === NAN) { return NAN }
	if (b === 0) { return 1n }

	if (a === NAN) { return NAN }

	if (!isFinite(b)) {
		const absBase = abs(a)
		if (absBase === 1n) { return NAN }

		const magnBase = sign(sub(absBase, 1n))
		const signExp = sign(b)
		return magnBase * signExp === -1n ? 0n : P_INFINITY
	}

	if (a === P_INFINITY) { return b > 0n ? P_INFINITY : 0n }
	if (a === N_INFINITY) {
		if (b < 0n) { return 0n }
		const oddExp = b % 2 === 1
		return _getSignedInfinity(oddExp ? -1n : 1n)
	}

	if (a === 0n) { return b > 0n ? 0n : P_INFINITY }

	return a ** b
}

const square = (x) => mul(x, x)

const eq = (a, b) => {
	if (a === NAN && b === NAN) { return false }
	return a === b
}
const neq = (a, b) => !eq(a, b)

const lt = (a, b) => {
	if (a === NAN || b === NAN) { return false }
	if (a === P_INFINITY) { return false }
	if (a === N_INFINITY) { return b !== N_INFINITY }
	if (b === P_INFINITY) { return a !== P_INFINITY }
	if (b === N_INFINITY) { return false }
	return a < b
}
const gt = (a, b) => lt(b, a)

const lte = (a, b) => {
	if (a === NAN || b === NAN) { return false }
	if (a === P_INFINITY) { return false }
	if (a === N_INFINITY) { return true }
	if (b === P_INFINITY) { return true }
	if (b === N_INFINITY) { return false }
	return a <= b
}
const gte = (a, b) => lte(b, a)

const isNaN = (x) => neq(x, x)
const isFinite = (x) => x !== NAN
	&& x !== P_INFINITY
	&& x !== N_INFINITY

const fromString = (s) => BigInt(s)

const toString = (x) => {
	if (x === P_INFINITY) { return 'Infinity' }
	if (x === N_INFINITY) { return '-Infinity' }
	if (x === NAN) { return 'NaN' }
	return x.toString()
}

const fromNumber = (v) => {
	if (v === Infinity) { return P_INFINITY }
	if (v === -Infinity) { return N_INFINITY }
	if (Number.isNaN(v)) { return NAN }
	return BigInt(v)
}

const toNumber = (x) => {
	if (x === P_INFINITY) { return Infinity }
	if (x === N_INFINITY) { return -Infinity }
	if (x === NAN) { return NaN }
	return Number(x)
}

module.exports = {
	...{ PInfinity: P_INFINITY, NInfinity: N_INFINITY, NaN: NAN },
	...{ isNaN, isFinite },
	...{ sign, abs, neg, add, sub, mul, div, mod, pow, square },
	...{ eq, neq, lt, gt, lte, gte },
	...{ fromNumber, toNumber },
	...{ fromString, toString },
}
