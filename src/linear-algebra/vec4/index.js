
const X = 0
const Y = 1
const Z = 2
const W = 3

const defineFor = (Domain) => {
	const {
		isFinite: _isFinite,
		isNaN: _isNaN,
		neg: _neg,
		add: _add,
		sub: _sub,
		mul: _mul,
		pow: _pow,
		eq: _eq,
		neq: _neq,
	} = Domain
	const half = Domain.fromNumber(0.5)

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

	const dot = ([ ax, ay, az, aw ], [ bx, by, bz, bw ]) => _add(
		_mul(ax, bx),
		_mul(ay, by),
		_mul(az, bz),
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
		a[X] = x * v
		a[Y] = y * v
		a[Z] = z * v
		a[W] = w * v
		return a
	}
	scale.$$$ = scale$$$

	const normSquared = (x) => dot(x, x)
	const norm = (x) => _pow(normSquared(x), half)

	const normalize = (x) => scale(x, norm(x))
	const normalize$$$ = (x) => scale$$$(x, norm(x))
	normalize.$$$ = normalize$$$

	return {
		...{ isFinite, isNaN },
		...{ neg, add, sub, dot },
		...{ eq, neq },
		...{ scale, norm, normSquared, normalize },
	}
}

module.exports = { defineFor }
