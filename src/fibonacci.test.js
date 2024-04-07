const { test } = require('@kmamal/testing')
const N = require('@kmamal/numbers/js')
const { fibonacci } = require('./fibonacci').defineFor(N)

test("fibonacci", (t) => {
	t.equal(fibonacci(0), 1)
	t.equal(fibonacci(1), 1)
	t.equal(fibonacci(2), 2)
	t.equal(fibonacci(3), 3)
	t.equal(fibonacci(4), 5)
	t.equal(fibonacci(5), 8)
	t.equal(fibonacci(6), 13)
	t.equal(fibonacci(7), 21)
	t.equal(fibonacci(8), 34)
	t.equal(fibonacci(9), 55)
})
