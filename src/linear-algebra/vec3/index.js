
const X = 0
const Y = 1
const Z = 2

const makeVector = (Domain) => {
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

	const dot = ([ ax, ay, az ], [ bx, by, bz ]) => _add(
		_mul(ax, bx),
		_mul(ay, by),
		_mul(az, bz),
	)

	const cross = ([ ax, ay, az ], [ bx, by, bz ]) => [
		_sub(_mul(ay, bz), _mul(az, by)),
		_sub(_mul(az, bx), _mul(ax, bz)),
		_sub(_mul(ax, by), _mul(ay, bx)),
	]

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
		a[X] = x * v
		a[Y] = y * v
		a[Z] = z * v
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
		...{ neg, add, sub, dot, cross },
		...{ eq, neq },
		...{ scale, norm, normSquared, normalize },
	}
}

module.exports = { makeVector }
