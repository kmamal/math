
const defineFor = (Domain) => {
	const add = Domain._add ?? Domain.add
	const sub = Domain._sub ?? Domain.sub
	const toNumber = Domain._toNumber ?? Domain.toNumber
	const ONE = Domain.fromNumber(1)

	const cache = [ ONE, ONE ]

	const fib = (n) => {
		const i = toNumber(n)
		if (cache.length > i) { return cache[i] }

		const n1 = sub(n, ONE)
		const n2 = sub(n1, ONE)
		const res = add(fib(n1), fib(n2))

		cache[i] = res
		return res
	}

	return fib
}

module.exports = { defineFor }
