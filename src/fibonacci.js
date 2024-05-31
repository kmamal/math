const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Algebra) => {
	const add = Algebra._add ?? Algebra.add
	const sub = Algebra._sub ?? Algebra.sub
	const toNumber = Algebra._toNumber ?? Algebra.toNumber
	const ONE = Algebra.fromNumber(1)

	const cache = [ ONE, ONE ]

	const fibonacci = (n) => {
		const i = toNumber(n)
		if (i < cache.length) { return cache[i] }

		const n1 = sub(n, ONE)
		const n2 = sub(n1, ONE)
		const res = add(fibonacci(n1), fibonacci(n2))

		cache[i] = res
		return res
	}

	return { fibonacci }
})

module.exports = { defineFor }
