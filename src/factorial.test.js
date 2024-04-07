const { test } = require('@kmamal/testing')
const N = require('@kmamal/numbers/js')
const factorial = require('./factorial').defineFor(N)

test("factorial", (t) => {
	t.equal(factorial(0), 0)
	t.equal(factorial(1), 1)
	t.equal(factorial(2), 2)
	t.equal(factorial(3), 6)
	t.equal(factorial(4), 24)
	t.equal(factorial(5), 120)
	t.equal(factorial(6), 720)
})
