const { test } = require('@kmamal/testing')
const { reverse } = require('./reverse')

test("geometry.polygon.reverse", (t) => {
	/* eslint-disable comma-spacing */
	t.equal(reverse([ 0,0, 1,1 ]), [ 1,1, 0,0 ])
	t.equal(reverse([ 1,1, 0,0 ]), [ 0,0, 1,1 ])
	t.equal(reverse([ 0,0, 1,1, 1,0 ]), [ 1,0, 1,1, 0,0 ])
	t.equal(reverse([ 0,0, 1,0, 1,1 ]), [ 1,1, 1,0, 0,0 ])
	t.equal(reverse([ 0,0, 0,1, 1,1, 1,0 ]), [ 1,0, 1,1, 0,1, 0,0 ])
	t.equal(reverse([ 0,0, 1,0, 1,1, 0,1 ]), [ 0,1, 1,1, 1,0, 0,0 ])
	/* eslint-enable comma-spacing */
})