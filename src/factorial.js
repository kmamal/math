const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Algebra) => {
	const mul = Algebra._mul ?? Algebra.mul
	const sub = Algebra._sub ?? Algebra.sub
	const toNumber = Algebra._toNumber ?? Algebra.toNumber
	const ZERO = Algebra.fromNumber(0)
	const ONE = Algebra.fromNumber(1)

	const cache = [ ZERO, ONE ]

	const factorial = (n) => {
		const i = toNumber(n)
		if (i < cache.length) { return cache[i] }

		const res = mul(n, factorial(sub(n, ONE)))

		cache[i] = res
		return res
	}

	return factorial
})

module.exports = { defineFor }
