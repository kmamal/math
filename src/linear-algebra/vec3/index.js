const { memoize } = require('@kmamal/util/function/memoize')

const X = 0
const Y = 1
const Z = 2

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
		max: _max,
		min: _min,
		fromNumber: _fromNumber,
		toNumber: _toNumber,
	} = Domain

	const isFinite = ([ x, y, z ]) => true
		&& _isFinite(x)
		&& _isFinite(y)
		&& _isFinite(z)

	const isNaN = ([ x, y, z ]) => false
		|| _isNaN(x)
		|| _isNaN(y)
		|| _isNaN(z)

	const neg = ([ x, y, z ]) => [
		_neg(x),
		_neg(y),
		_neg(z),
	]
	const neg$$$ = (a) => {
		const [ x, y, z ] = a
		a[X] = _neg(x)
		a[Y] = _neg(y)
		a[Z] = _neg(z)
		return a
	}
	neg.$$$ = neg$$$

	const abs = ([ x, y, z ]) => [
		_abs(x),
		_abs(y),
		_abs(z),
	]
	const abs$$$ = (a) => {
		const [ x, y, z ] = a
		a[X] = _abs(x)
		a[Y] = _abs(y)
		a[Z] = _abs(z)
		return a
	}
	abs.$$$ = abs$$$

	const add = ([ ax, ay, az ], [ bx, by, bz ]) => [
		_add(ax, bx),
		_add(ay, by),
		_add(az, bz),
	]
	const add$$$ = (a, [ bx, by, bz ]) => {
		const [ ax, ay, az ] = a
		a[X] = _add(ax, bx)
		a[Y] = _add(ay, by)
		a[Z] = _add(az, bz)
		return a
	}
	add.$$$ = add$$$

	const sub = ([ ax, ay, az ], [ bx, by, bz ]) => [
		_sub(ax, bx),
		_sub(ay, by),
		_sub(az, bz),
	]
	const sub$$$ = (a, [ bx, by, bz ]) => {
		const [ ax, ay, az ] = a
		a[X] = _sub(ax, bx)
		a[Y] = _sub(ay, by)
		a[Z] = _sub(az, bz)
		return a
	}
	sub.$$$ = sub$$$

	const mul = ([ ax, ay, az ], [ bx, by, bz ]) => [
		_mul(ax, bx),
		_mul(ay, by),
		_mul(az, bz),
	]
	const mul$$$ = (a, [ bx, by, bz ]) => {
		const [ ax, ay, az ] = a
		a[X] = _mul(ax, bx)
		a[Y] = _mul(ay, by)
		a[Z] = _mul(az, bz)
		return a
	}
	mul.$$$ = mul$$$

	const div = ([ ax, ay, az ], [ bx, by, bz ]) => [
		_div(ax, bx),
		_div(ay, by),
		_div(az, bz),
	]
	const div$$$ = (a, [ bx, by, bz ]) => {
		const [ ax, ay, az ] = a
		a[X] = _div(ax, bx)
		a[Y] = _div(ay, by)
		a[Z] = _div(az, bz)
		return a
	}
	div.$$$ = div$$$

	const dot = ([ ax, ay, az ], [ bx, by, bz ]) => _add(
		_add(
			_mul(ax, bx),
			_mul(ay, by),
		),
		_mul(az, bz),
	)

	const cross = ([ ax, ay, az ], [ bx, by, bz ]) => [
		_sub(_mul(ay, bz), _mul(az, by)),
		_sub(_mul(az, bx), _mul(ax, bz)),
		_sub(_mul(ax, by), _mul(ay, bx)),
	]

	const angle2 = (a, b) => _acos(_max(-1, _min(1, _div(
		dot(a, b),
		_mul(norm(a), norm(b)),
	))))

	const eq = ([ ax, ay, az ], [ bx, by, bz ]) => true
		&& _eq(ax, bx)
		&& _eq(ay, by)
		&& _eq(az, bz)

	const neq = ([ ax, ay, az ], [ bx, by, bz ]) => false
		|| _neq(ax, bx)
		|| _neq(ay, by)
		|| _neq(az, bz)

	const scale = ([ x, y, z ], v) => [
		_mul(x, v),
		_mul(y, v),
		_mul(z, v),
	]
	const scale$$$ = (a, v) => {
		const [ x, y, z ] = a
		a[X] = _mul(x, v)
		a[Y] = _mul(y, v)
		a[Z] = _mul(z, v)
		return a
	}
	scale.$$$ = scale$$$

	const normSquared = (x) => dot(x, x)
	const norm = (x) => _sqrt(normSquared(x))

	const normalize = (x) => scale(x, _inverse(norm(x)))
	const normalize$$$ = (x) => scale$$$(x, _inverse(norm(x)))
	normalize.$$$ = normalize$$$

	const fromNumbers = (x, y, z) => [
		_fromNumber(x),
		_fromNumber(y),
		_fromNumber(z),
	]

	const toNumbers = ([ x, y, z ]) => [
		_toNumber(x),
		_toNumber(y),
		_toNumber(z),
	]

	return {
		...{ isFinite, isNaN },
		...{ neg, abs, add, sub, mul, div },
		...{ dot, cross, angle2 },
		...{ eq, neq },
		...{ scale, norm, normSquared, normalize },
		...{ fromNumbers, toNumbers },
	}
})

module.exports = { defineFor }
