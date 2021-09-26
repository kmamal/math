const { memoize } = require('@kmamal/util/function/memoize')

const X = 0
const Y = 1

const defineFor = memoize((Domain) => {
	const {
		isFinite: _isFinite,
		isNaN: _isNaN,
		neg: _neg,
		abs: _abs,
		add: _add,
		sub: _sub,
		mul: _mul,
		div: _div,
		inverse: _inverse,
		eq: _eq,
		neq: _neq,
		sqrt: _sqrt,
		acos: _acos,
		atan2: _atan2,
		max: _max,
		min: _min,
		fromNumber: _fromNumber,
		toNumber: _toNumber,
	} = Domain

	const ONE = _fromNumber(1)
	const MINUS_ONE = _fromNumber(-1)

	const isFinite = ([ x, y ]) => true
		&& _isFinite(x)
		&& _isFinite(y)

	const isNaN = ([ x, y ]) => false
		|| _isNaN(x)
		|| _isNaN(y)

	const neg = ([ x, y ]) => [
		_neg(x),
		_neg(y),
	]
	const negTo = (dst, [ x, y ]) => {
		dst[0] = _neg(x)
		dst[1] = _neg(y)
		return dst
	}
	const neg$$$ = (a) => {
		const [ x, y ] = a
		a[X] = _neg(x)
		a[Y] = _neg(y)
		return a
	}
	neg.to = negTo
	neg.$$$ = neg$$$

	const abs = ([ x, y ]) => [
		_abs(x),
		_abs(y),
	]
	const absTo = (dst, [ x, y ]) => {
		dst[0] = _abs(x)
		dst[1] = _abs(y)
		return dst
	}
	const abs$$$ = (a) => {
		const [ x, y ] = a
		a[X] = _abs(x)
		a[Y] = _abs(y)
		return a
	}
	abs.to = absTo
	abs.$$$ = abs$$$

	const add = ([ ax, ay ], [ bx, by ]) => [
		_add(ax, bx),
		_add(ay, by),
	]
	const addTo = (dst, [ ax, ay ], [ bx, by ]) => {
		dst[0] = _add(ax, bx)
		dst[1] = _add(ay, by)
		return dst
	}
	const add$$$ = (a, [ bx, by ]) => {
		const [ ax, ay ] = a
		a[X] = _add(ax, bx)
		a[Y] = _add(ay, by)
		return a
	}
	add.to = addTo
	add.$$$ = add$$$

	const sub = ([ ax, ay ], [ bx, by ]) => [
		_sub(ax, bx),
		_sub(ay, by),
	]
	const subTo = (dst, [ ax, ay ], [ bx, by ]) => {
		dst[0] = _sub(ax, bx)
		dst[1] = _sub(ay, by)
		return dst
	}
	const sub$$$ = (a, [ bx, by ]) => {
		const [ ax, ay ] = a
		a[X] = _sub(ax, bx)
		a[Y] = _sub(ay, by)
		return a
	}
	sub.to = subTo
	sub.$$$ = sub$$$

	const mul = ([ ax, ay ], [ bx, by ]) => [
		_mul(ax, bx),
		_mul(ay, by),
	]
	const mulTo = (dst, [ ax, ay ], [ bx, by ]) => {
		dst[0] = _mul(ax, bx)
		dst[1] = _mul(ay, by)
		return dst
	}
	const mul$$$ = (a, [ bx, by ]) => {
		const [ ax, ay ] = a
		a[X] = _mul(ax, bx)
		a[Y] = _mul(ay, by)
		return a
	}
	mul.to = mulTo
	mul.$$$ = mul$$$

	const div = ([ ax, ay ], [ bx, by ]) => [
		_div(ax, bx),
		_div(ay, by),
	]
	const divTo = (dst, [ ax, ay ], [ bx, by ]) => {
		dst[0] = _div(ax, bx)
		dst[1] = _div(ay, by)
		return dst
	}
	const div$$$ = (a, [ bx, by ]) => {
		const [ ax, ay ] = a
		a[X] = _div(ax, bx)
		a[Y] = _div(ay, by)
		return a
	}
	div.to = divTo
	div.$$$ = div$$$

	const dot = ([ ax, ay ], [ bx, by ]) => _add(
		_mul(ax, bx),
		_mul(ay, by),
	)

	const cross = ([ ax, ay ], [ bx, by ]) => _sub(
		_mul(ax, by),
		_mul(ay, bx),
	)

	const angle = ([ x, y ]) => x === 0 && y === 0 ? NaN : _atan2(y, x)

	const angle2 = (a, b) => _acos(_max(MINUS_ONE, _min(ONE, _div(
		dot(a, b),
		_mul(norm(a), norm(b)),
	))))

	const eq = ([ ax, ay ], [ bx, by ]) => true
		&& _eq(ax, bx)
		&& _eq(ay, by)

	const neq = ([ ax, ay ], [ bx, by ]) => false
		|| _neq(ax, bx)
		|| _neq(ay, by)

	const scale = ([ x, y ], v) => [
		_mul(x, v),
		_mul(y, v),
	]
	const scaleTo = (dst, [ x, y ], v) => {
		dst[0] = _mul(x, v)
		dst[1] = _mul(y, v)
		return dst
	}
	const scale$$$ = (a, v) => {
		const [ x, y ] = a
		a[X] = _mul(x, v)
		a[Y] = _mul(y, v)
		return a
	}
	scale.to = scaleTo
	scale.$$$ = scale$$$

	const normSquared = (x) => dot(x, x)
	const norm = (x) => _sqrt(normSquared(x))

	const normalize = (x) => scale(x, _inverse(norm(x)))
	const normalize$$$ = (x) => scale$$$(x, _inverse(norm(x)))
	normalize.$$$ = normalize$$$

	const copy = (dst, [ x, y ]) => {
		dst[0] = x
		dst[1] = y
	}

	const clone = ([ x, y ]) => [ x, y ]

	const fromNumbers = (x, y) => [
		_fromNumber(x),
		_fromNumber(y),
	]

	const toNumbers = ([ x, y ]) => [
		_toNumber(x),
		_toNumber(y),
	]

	return {
		...{ isFinite, isNaN },
		...{ neg, abs, add, sub, mul, div },
		...{ dot, cross, angle, angle2 },
		...{ eq, neq },
		...{ scale, norm, normSquared, normalize },
		...{ copy, clone },
		...{ fromNumbers, toNumbers },
	}
})

module.exports = { defineFor }
