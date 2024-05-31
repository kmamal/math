const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Algebra) => {
	const eq = Algebra._eq ?? Algebra.eq
	const gt = Algebra._gt ?? Algebra.gt
	const mod = Algebra._mod ?? Algebra.mod
	const ZERO = Algebra.fromNumber(0)

	return (_a, _b) => {
		let a = _a
		let b = _b

		if (eq(a, ZERO) && eq(b, ZERO)) {
			return ZERO
		}

		if (gt(a, b)) {
			const t = a
			a = b
			b = t
		}

		while (!eq(a, ZERO)) {
			const r = mod(b, a)
			b = a
			a = r
		}

		return b
	}
})

module.exports = { defineFor }
