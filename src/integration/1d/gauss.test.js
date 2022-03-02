const { test } = require('@kmamal/testing')
const {
	integrateGauss,
	integrateGaussN,
} = require('./gauss')

const { transformIndefinite } = require('./indefinite-transform')

const testFloatEqual = (t, actual, expected, tollerance = 1e-5) => t.ok(
	expected - tollerance <= actual && actual <= expected + tollerance,
	{ actual, expected },
)


const constant = () => 3
const identity = (x) => x
const quadratic = (x) => x * x
const normal = (x) => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI)

const easyCases = [
	[ constant, 0, 1, 3 ],
	[ constant, -1, 1, 6 ],
	[ constant, -9, -10, -3 ],

	[ identity, 0, 1, 0.5 ],
	[ identity, -1, 1, 0 ],
	[ identity, -2, 1, -1.5 ],

	[ quadratic, 0, 1, 1 / 3 ],
	[ quadratic, -1, 1, 2 / 3 ],
]

test("math.integration.1d.gauss", (t) => {
	for (const [ func, from, to, expected ] of easyCases) {
		testFloatEqual(t, integrateGauss(func, from, to), expected)
	}
})

const hardCases = [
	[ transformIndefinite(normal), -1, 1, 1 ],
	[ transformIndefinite(normal), 0, 1, 0.5 ],
]

test("math.integration.1d.gaussN", (t) => {
	for (const [ func, from, to, expected ] of easyCases) {
		testFloatEqual(t, integrateGaussN(func, from, to, 5), expected)
	}

	for (const [ func, from, to ] of [ ...easyCases, ...hardCases ]) {
		t.equal(integrateGaussN(func, from, to, 1), integrateGauss(func, from, to))
	}
})
