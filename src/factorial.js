const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const mul = Domain._mul ?? Domain.mul
	const sub = Domain._sub ?? Domain.sub
	const toNumber = Domain._toNumber ?? Domain.toNumber
	const ZERO = Domain.fromNumber(0)
	const ONE = Domain.fromNumber(1)

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
