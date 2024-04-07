const { memoize } = require('@kmamal/util/function/memoize')

const defineFor = memoize((Domain) => {
	const add = Domain._add ?? Domain.add
	const sub = Domain._sub ?? Domain.sub
	const toNumber = Domain._toNumber ?? Domain.toNumber
	const ONE = Domain.fromNumber(1)

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
