const { test } = require('@xyz/testing')
const {
	integrateGaussKronrod,
	integrateGloballyAdaptiveGaussKronrod,
} = require('./gauss-kronrod')

const { transformIndefinite } = require('./indefinite-transform')

const testFloatEqual = (t, actual, expected, tollerance = 1e-5) => t.ok(
	expected - tollerance <= actual && actual <= expected + tollerance,
	{ actual, expected },
)


const constant = () => 3
const identity = (x) => x
const quadratic = (x) => x * x
const normal = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI)

const cases = [
	[ constant, 0, 1, 3 ],
	[ constant, -1, 1, 6 ],
	[ constant, -9, -10, -3 ],

	[ identity, 0, 1, 0.5 ],
	[ identity, -1, 1, 0 ],
	[ identity, -2, 1, -1.5 ],

	[ quadratic, 0, 1, 1 / 3 ],
	[ quadratic, -1, 1, 2 / 3 ],

	[ transformIndefinite(normal), -1, 1, 1 ],
	[ transformIndefinite(normal), 0, 1, 0.5 ],
]

test("math.integration.1d.gauss-kronrod", (t) => {
	for (const [ func, from, to, expected ] of cases) {
		testFloatEqual(t, integrateGaussKronrod(func, from, to).kronrod, expected, 1e-4)
	}
})

test("math.integration.1d.globaly-adaptive-gauss-kronrod", (t) => {
	for (const [ func, from, to, expected ] of cases) {
		testFloatEqual(t, integrateGloballyAdaptiveGaussKronrod(func, from, to), expected)
	}
})
