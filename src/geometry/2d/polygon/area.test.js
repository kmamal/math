const { test } = require('@kmamal/testing')
const { area } = require('./area')

const floatEqual = (t, actual, expected, tollerance = 1e-5) => t.ok(
	expected - tollerance <= actual && actual <= expected + tollerance,
	{ actual, expected },
)

test("geometry.polygon.area", (t) => {
	/* eslint-disable comma-spacing */
	floatEqual(t, area([ 0,0, 1,0 ]), 0)
	floatEqual(t, area([ 0,0, 1,1, 1,0 ]), 0.5)
	floatEqual(t, area([ 0,0, 1,0, 1,1 ]), -0.5)
	floatEqual(t, area([ 0,0, 0,1, 1,1, 1,0 ]), 1)
	floatEqual(t, area([ 0,0, 1,0, 1,1, 0,1 ]), -1)
	/* eslint-enable comma-spacing */
})
