
const X = 0
const Y = 1

const defineFor = (Domain) => {
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
	} = Domain

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

	const abs = ([ x, y ]) => [
		_abs(x),
		_abs(y),
	]
	const abs$$$ = (a) => {
		const [ x, y ] = a
		a[X] = _abs(x)
		a[Y] = _abs(y)
		return a
	}
	abs.$$$ = abs$$$

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

	const cross = ([ ax, ay ], [ bx, by ]) => _sub(
		_mul(ax, by),
		_mul(ay, bx),
	)

	const angle = (a, b) => _acos(_max(-1, _min(1, _div(
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
	const scale$$$ = (a, v) => {
		const [ x, y ] = a
		a[X] = x * v
		a[Y] = y * v
		return a
	}
	scale.$$$ = scale$$$

	const normSquared = (x) => dot(x, x)
	const norm = (x) => _sqrt(normSquared(x))

	const normalize = (x) => scale(x, _inverse(norm(x)))
	const normalize$$$ = (x) => scale$$$(x, _inverse(norm(x)))
	normalize.$$$ = normalize$$$

	return {
		...{ isFinite, isNaN },
		...{ neg, abs, add, sub, dot, cross, angle },
		...{ eq, neq },
		...{ scale, norm, normSquared, normalize },
	}
}

module.exports = { defineFor }
