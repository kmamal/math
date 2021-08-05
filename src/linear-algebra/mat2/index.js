/* eslint-disable array-element-newline */

const { memoize } = require('@kmamal/util/function/memoize')
const { swap } = require('@kmamal/util/array/swap')

const M11 = 0
const M21 = 1
const M12 = 2
const M22 = 3

const defineFor = memoize((Domain) => {
	const {
		isFinite: _isFinite,
		isNaN: _isNaN,
		neg: _neg,
		add: _add,
		sub: _sub,
		mul: _mul,
		inverse: _inverse,
		eq: _eq,
		neq: _neq,
		fromNumber: _fromNumber,
		toNumber: _toNumber,
	} = Domain
	const _ZERO = _fromNumber(0)

	const identity = () => [
		1, 0,
		0, 1,
	]

	const isFinite = ([
		m11, m21,
		m12, m22,
	]) => true
		&& _isFinite(m11) && _isFinite(m21)
		&& _isFinite(m12) && _isFinite(m22)

	const isNaN = ([
		m11, m21,
		m12, m22,
	]) => false
		|| _isNaN(m11) || _isNaN(m21)
		|| _isNaN(m12) || _isNaN(m22)

	const neg = ([
		m11, m21,
		m12, m22,
	]) => [
		_neg(m11), _neg(m21),
		_neg(m12), _neg(m22),
	]

	const neg$$$ = (m) => {
		const [
			m11, m21,
			m12, m22,
		] = m

		m[M11] = _neg(m11)
		m[M21] = _neg(m21)

		m[M12] = _neg(m12)
		m[M22] = _neg(m22)

		return m
	}
	neg.$$$ = neg$$$

	const add = (
		[
			a11, a21,
			a12, a22,
		],
		[
			b11, b21,
			b12, b22,
		],
	) => [
		_add(a11, b11), _add(a21, b21),
		_add(a12, b12), _add(a22, b22),
	]

	const add$$$ = (a, [
		b11, b21,
		b12, b22,
	]) => {
		const [
			a11, a21,
			a12, a22,
		] = a

		a[M11] = _add(a11, b11)
		a[M21] = _add(a21, b21)

		a[M12] = _add(a12, b12)
		a[M22] = _add(a22, b22)

		return a
	}
	add.$$$ = add$$$

	const sub = (
		[
			a11, a21,
			a12, a22,
		],
		[
			b11, b21,
			b12, b22,
		],
	) => [
		_sub(a11, b11), _sub(a21, b21),
		_sub(a12, b12), _sub(a22, b22),
	]

	const sub$$$ = (a, [
		b11, b21,
		b12, b22,
	]) => {
		const [
			a11, a21,
			a12, a22,
		] = a

		a[M11] = _sub(a11, b11)
		a[M21] = _sub(a21, b21)

		a[M12] = _sub(a12, b12)
		a[M22] = _sub(a22, b22)

		return a
	}
	sub.$$$ = sub$$$

	const mul = ([
		a11, a21,
		a12, a22,
	], [
		b11, b21,
		b12, b22,
	]) => [
		_add(_mul(a11, b11), _mul(a21, b12)),
		_add(_mul(a11, b21), _mul(a21, b22)),

		_add(_mul(a12, b11), _mul(a22, b12)),
		_add(_mul(a12, b21), _mul(a22, b22)),
	]

	const mul$$$ = (a, [
		b11, b21,
		b12, b22,
	]) => {
		const [
			a11, a21,
			a12, a22,
		] = a

		a[M11] = _add(_mul(a11, b11), _mul(a21, b12))
		a[M21] = _add(_mul(a11, b21), _mul(a21, b22))

		a[M12] = _add(_mul(a12, b11), _mul(a22, b12))
		a[M22] = _add(_mul(a12, b21), _mul(a22, b22))

		return a
	}
	mul.$$$ = mul$$$

	const transpose = ([
		m11, m21,
		m12, m22,
	]) => [
		m11, m12,
		m21, m22,
	]

	const transpose$$$ = (m) => {
		swap.$$$(m, M12, M21)

		return m
	}
	transpose.$$$ = transpose$$$

	const mulVector = ([
		a11, a21,
		a12, a22,
	], [ v1, v2 ]) => [
		_add(_mul(a11, v1), _mul(a21, v2)),
		_add(_mul(a12, v1), _mul(a22, v2)),
	]

	const mulVector$$$ = ([
		a11, a21,
		a12, a22,
	], v) => {
		const [ v1, v2 ] = v

		v[0] = _add(_mul(a11, v1), _mul(a21, v2))
		v[1] = _add(_mul(a12, v1), _mul(a22, v2))

		return v
	}
	mulVector.$$$ = mulVector$$$

	const eq = ([
		a11, a21,
		a12, a22,
	], [
		b11, b21,
		b12, b22,
	]) => true
		&& _eq(a11, b11) && _eq(a21, b21)
		&& _eq(a12, b12) && _eq(a22, b22)

	const neq = ([
		a11, a21,
		a12, a22,
	], [
		b11, b21,
		b12, b22,
	]) => false
		|| _neq(a11, b11) || _neq(a21, b21)
		|| _neq(a12, b12) || _neq(a22, b22)

	const scale = ([
		m11, m21,
		m12, m22,
	], v) => [
		_mul(m11, v), _mul(m21, v),
		_mul(m12, v), _mul(m22, v),
	]

	const scale$$$ = (m, v) => {
		const [
			m11, m21,
			m12, m22,
		] = m

		m[M11] = _mul(m11, v)
		m[M21] = _mul(m21, v)

		m[M12] = _mul(m12, v)
		m[M22] = _mul(m22, v)

		return m
	}
	scale.$$$ = scale$$$

	const minor = (m, i, j) => m[(1 - i) * 2 + (1 - j)]

	const cofactor = (m, i, j) => {
		const factor = minor(m, i, j)
		return i + j % 2 ? neg(factor) : factor
	}

	const cofactors = ([
		m11, m21,
		m12, m22,
	]) => [
		m22, _neg(m12),
		_neg(m21), m11,
	]

	const adjugate = ([
		m11, m21,
		m12, m22,
	]) => [
		m22, _neg(m21),
		_neg(m12), m11,
	]

	const determinant = ([
		m11, m21,
		m12, m22,
	]) => _sub(_mul(m11, m22), _mul(m21, m12))

	const inverse = (m) => {
		const d = determinant(m)
		if (_eq(d, _ZERO)) { return null }

		const id = _inverse(d)
		const [
			m11, m21,
			m12, m22,
		] = m

		return [
			_mul(id, m22),
			_mul(id, _neg(m21)),

			_mul(id, _neg(m12)),
			_mul(id, m11),
		]
	}

	const fromNumbers = (
		m11, m21,
		m12, m22,
	) => [
		_fromNumber(m11), _fromNumber(m21),
		_fromNumber(m12), _fromNumber(m22),
	]

	const toNumbers = ([
		m11, m21,
		m12, m22,
	]) => [
		_toNumber(m11), _toNumber(m21),
		_toNumber(m12), _toNumber(m22),
	]

	return {
		...{ identity },
		...{ isFinite, isNaN },
		...{ neg, add, sub, mul, transpose, mulVector },
		...{ eq, neq },
		...{ scale, determinant, inverse },
		...{ fromNumbers, toNumbers },
	}
})

module.exports = { defineFor }
