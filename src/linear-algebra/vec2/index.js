
const X = 0
const Y = 1

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
	const neg$$$ = (a) => {
		const [ x, y ] = a
		a[X] = _neg(x)
		a[Y] = _neg(y)
		return a
	}
	neg.$$$ = neg$$$

	const add = ([ ax, ay ], [ bx, by ]) => [
		_add(ax, bx),
		_add(ay, by),
	]
	const add$$$ = (a, [ bx, by ]) => {
		const [ ax, ay ] = a
		a[X] = _add(ax, bx)
		a[Y] = _add(ay, by)
		return a
	}
	add.$$$ = add$$$

	const sub = ([ ax, ay ], [ bx, by ]) => [
		_sub(ax, bx),
		_sub(ay, by),
	]
	const sub$$$ = (a, [ bx, by ]) => {
		const [ ax, ay ] = a
		a[X] = _sub(ax, bx)
		a[Y] = _sub(ay, by)
		return a
	}
	sub.$$$ = sub$$$

	const dot = ([ ax, ay ], [ bx, by ]) => _add(
		_mul(ax, bx),
		_mul(ay, by),
	)

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
	const scale$$$ = (a, v) => {
		const [ x, y ] = a
		a[X] = x * v
		a[Y] = y * v
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
