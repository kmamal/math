const { memoize } = require('@kmamal/util/function/memoize')

const X = 0
const Y = 1
const Z = 2
const W = 3

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
		eq: _eq,
		neq: _neq,
		sqrt: _sqrt,
		fromNumber: _fromNumber,
		toNumber: _toNumber,
	} = Domain

	const isFinite = ([ x, y, z, w ]) => true
		&& _isFinite(x)
		&& _isFinite(y)
		&& _isFinite(z)
		&& _isFinite(w)

	const isNaN = ([ x, y, z, w ]) => false
		|| _isNaN(x)
		|| _isNaN(y)
		|| _isNaN(z)
		|| _isNaN(w)

	const neg = ([ x, y, z, w ]) => [
		_neg(x),
		_neg(y),
		_neg(z),
		_neg(w),
	]
	const neg$$$ = (a) => {
		const [ x, y, z, w ] = a
		a[X] = _neg(x)
		a[Y] = _neg(y)
		a[Z] = _neg(z)
		a[W] = _neg(w)
		return a
	}
	neg.$$$ = neg$$$

	const abs = ([ x, y, z, w ]) => [
		_abs(x),
		_abs(y),
		_abs(z),
		_abs(w),
	]
	const abs$$$ = (a) => {
		const [ x, y, z, w ] = a
		a[X] = _abs(x)
		a[Y] = _abs(y)
		a[Z] = _abs(z)
		a[W] = _abs(w)
		return a
	}
	abs.$$$ = abs$$$

	const add = ([ ax, ay, az, aw ], [ bx, by, bz, bw ]) => [
		_add(ax, bx),
		_add(ay, by),
		_add(az, bz),
		_add(aw, bw),
	]
	const add$$$ = (a, [ bx, by, bz, bw ]) => {
		const [ ax, ay, az, aw ] = a
		a[X] = _add(ax, bx)
		a[Y] = _add(ay, by)
		a[Z] = _add(az, bz)
		a[W] = _add(aw, bw)
		return a
	}
	add.$$$ = add$$$

	const sub = ([ ax, ay, az, aw ], [ bx, by, bz, bw ]) => [
		_sub(ax, bx),
		_sub(ay, by),
		_sub(az, bz),
		_sub(aw, bw),
	]
	const sub$$$ = (a, [ bx, by, bz, bw ]) => {
		const [ ax, ay, az, aw ] = a
		a[X] = _sub(ax, bx)
		a[Y] = _sub(ay, by)
		a[Z] = _sub(az, bz)
		a[W] = _sub(aw, bw)
		return a
	}
	sub.$$$ = sub$$$

	const mul = ([ ax, ay, az, aw ], [ bx, by, bz, bw ]) => [
		_mul(ax, bx),
		_mul(ay, by),
		_mul(az, bz),
		_mul(aw, bw),
	]
	const mul$$$ = (a, [ bx, by, bz, bw ]) => {
		const [ ax, ay, az, aw ] = a
		a[X] = _mul(ax, bx)
		a[Y] = _mul(ay, by)
		a[Z] = _mul(az, bz)
		a[W] = _mul(aw, bw)
		return a
	}
	mul.$$$ = mul$$$

	const div = ([ ax, ay, az, aw ], [ bx, by, bz, bw ]) => [
		_div(ax, bx),
		_div(ay, by),
		_div(az, bz),
		_div(aw, bw),
	]
	const div$$$ = (a, [ bx, by, bz, bw ]) => {
		const [ ax, ay, az, aw ] = a
		a[X] = _div(ax, bx)
		a[Y] = _div(ay, by)
		a[Z] = _div(az, bz)
		a[W] = _div(aw, bw)
		return a
	}
	div.$$$ = div$$$

	const dot = ([ ax, ay, az, aw ], [ bx, by, bz, bw ]) => _add(
		_add(
			_add(
				_mul(ax, bx),
				_mul(ay, by),
			),
			_mul(az, bz),
		),
		_mul(aw, bw),
	)

	const eq = ([ ax, ay, az, aw ], [ bx, by, bz, bw ]) => true
		&& _eq(ax, bx)
		&& _eq(ay, by)
		&& _eq(az, bz)
		&& _eq(aw, bw)

	const neq = ([ ax, ay, az, aw ], [ bx, by, bz, bw ]) => false
		|| _neq(ax, bx)
		|| _neq(ay, by)
		|| _neq(az, bz)
		|| _neq(aw, bw)

	const scale = ([ x, y, z, w ], v) => [
		_mul(x, v),
		_mul(y, v),
		_mul(z, v),
		_mul(w, v),
	]
	const scale$$$ = (a, v) => {
		const [ x, y, z, w ] = a
		a[X] = _mul(x, v)
		a[Y] = _mul(y, v)
		a[Z] = _mul(z, v)
		a[W] = _mul(w, v)
		return a
	}
	scale.$$$ = scale$$$

	const normSquared = (x) => dot(x, x)
	const norm = (x) => _sqrt(normSquared(x))

	const normalize = (x) => scale(x, norm(x))
	const normalize$$$ = (x) => scale$$$(x, norm(x))
	normalize.$$$ = normalize$$$

	const fromNumbers = (x, y, z, w) => [
		_fromNumber(x),
		_fromNumber(y),
		_fromNumber(z),
		_fromNumber(w),
	]

	const toNumbers = ([ x, y, z, w ]) => [
		_toNumber(x),
		_toNumber(y),
		_toNumber(z),
		_toNumber(w),
	]

	return {
		...{ isFinite, isNaN },
		...{ neg, abs, add, sub, mul, div, dot },
		...{ eq, neq },
		...{ scale, norm, normSquared, normalize },
		...{ fromNumbers, toNumbers },
	}
})

module.exports = { defineFor }
