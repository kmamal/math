const { test } = require('@xyz/testing')
const { defineFor } = require('./gcd')
const N = require('./domains/number')
const gcd = defineFor(N)

test("gcd", (t) => {
	t.equal(gcd(1, 1), 1)
	t.equal(gcd(1, 2), 1)
	t.equal(gcd(2, 1), 1)
	t.equal(gcd(2, 2), 2)
	t.equal(gcd(8, 12), 4)
	t.equal(gcd(12, 8), 4)
})
