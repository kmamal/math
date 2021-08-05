/* eslint-disable array-element-newline */

const { memoize } = require('@kmamal/util/function/memoize')
const { swap } = require('@kmamal/util/array/swap')

const M11 = 0
const M21 = 1
const M31 = 2
const M12 = 3
const M22 = 4
const M32 = 5
const M13 = 6
const M23 = 7
const M33 = 8

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
		1, 0, 0,
		0, 1, 0,
		0, 0, 1,
	]

	const isFinite = ([
		m11, m21, m31,
		m12, m22, m32,
		m13, m23, m33,
	]) => true
		&& _isFinite(m11) && _isFinite(m21) && _isFinite(m31)
		&& _isFinite(m12) && _isFinite(m22) && _isFinite(m32)
		&& _isFinite(m13) && _isFinite(m23) && _isFinite(m33)

	const isNaN = ([
		m11, m21, m31,
		m12, m22, m32,
		m13, m23, m33,
	]) => false
		|| _isNaN(m11) || _isNaN(m21) || _isNaN(m31)
		|| _isNaN(m12) || _isNaN(m22) || _isNaN(m32)
		|| _isNaN(m13) || _isNaN(m23) || _isNaN(m33)

	const neg = ([
		m11, m21, m31,
		m12, m22, m32,
		m13, m23, m33,
	]) => [
		_neg(m11), _neg(m21), _neg(m31),
		_neg(m12), _neg(m22), _neg(m32),
		_neg(m13), _neg(m23), _neg(m33),
	]

	const neg$$$ = (m) => {
		const [
			m11, m21, m31,
			m12, m22, m32,
			m13, m23, m33,
		] = m

		m[M11] = _neg(m11)
		m[M21] = _neg(m21)
		m[M31] = _neg(m31)

		m[M12] = _neg(m12)
		m[M22] = _neg(m22)
		m[M32] = _neg(m32)

		m[M13] = _neg(m13)
		m[M23] = _neg(m23)
		m[M33] = _neg(m33)

		return m
	}
	neg.$$$ = neg$$$

	const add = (
		[
			a11, a21, a31,
			a12, a22, a32,
			a13, a23, a33,
		],
		[
			b11, b21, b31,
			b12, b22, b32,
			b13, b23, b33,
		],
	) => [
		_add(a11, b11), _add(a21, b21), _add(a31, b31),
		_add(a12, b12), _add(a22, b22), _add(a32, b32),
		_add(a13, b13), _add(a23, b23), _add(a33, b33),
	]

	const add$$$ = (a, [
		b11, b21, b31,
		b12, b22, b32,
		b13, b23, b33,
	]) => {
		const [
			a11, a21, a31,
			a12, a22, a32,
			a13, a23, a33,
		] = a

		a[M11] = _add(a11, b11)
		a[M21] = _add(a21, b21)
		a[M21] = _add(a31, b31)

		a[M12] = _add(a12, b12)
		a[M22] = _add(a22, b22)
		a[M22] = _add(a32, b32)

		a[M12] = _add(a13, b13)
		a[M22] = _add(a23, b23)
		a[M22] = _add(a33, b33)

		return a
	}
	add.$$$ = add$$$

	const sub = (
		[
			a11, a21, a31,
			a12, a22, a32,
			a13, a23, a33,
		],
		[
			b11, b21, b31,
			b12, b22, b32,
			b13, b23, b33,
		],
	) => [
		_sub(a11, b11), _sub(a21, b21), _sub(a31, b31),
		_sub(a12, b12), _sub(a22, b22), _sub(a32, b32),
		_sub(a13, b13), _sub(a23, b23), _sub(a33, b33),
	]

	const sub$$$ = (a, [
		b11, b21, b31,
		b12, b22, b32,
		b13, b23, b33,
	]) => {
		const [
			a11, a21, a31,
			a12, a22, a32,
			a13, a23, a33,
		] = a

		a[M11] = _sub(a11, b11)
		a[M21] = _sub(a21, b21)
		a[M31] = _sub(a31, b31)

		a[M12] = _sub(a12, b12)
		a[M22] = _sub(a22, b22)
		a[M32] = _sub(a32, b32)

		a[M13] = _sub(a13, b13)
		a[M23] = _sub(a23, b23)
		a[M33] = _sub(a33, b33)

		return a
	}
	sub.$$$ = sub$$$

	const mul = (
		[
			a11, a21, a31,
			a12, a22, a32,
			a13, a23, a33,
		],
		[
			b11, b21, b31,
			b12, b22, b32,
			b13, b23, b33,
		],
	) => [
		_add(_add(_mul(a11, b11), _mul(a21, b12)), _mul(a31, b13)),
		_add(_add(_mul(a11, b21), _mul(a21, b22)), _mul(a31, b23)),
		_add(_add(_mul(a11, b31), _mul(a21, b32)), _mul(a31, b33)),

		_add(_add(_mul(a12, b11), _mul(a22, b12)), _mul(a32, b13)),
		_add(_add(_mul(a12, b21), _mul(a22, b22)), _mul(a32, b23)),
		_add(_add(_mul(a12, b31), _mul(a22, b32)), _mul(a32, b33)),

		_add(_add(_mul(a13, b11), _mul(a23, b12)), _mul(a33, b13)),
		_add(_add(_mul(a13, b21), _mul(a23, b22)), _mul(a33, b23)),
		_add(_add(_mul(a13, b31), _mul(a23, b32)), _mul(a33, b33)),
	]

	const mul$$$ = (a, [
		b11, b21, b31,
		b12, b22, b32,
		b13, b23, b33,
	]) => {
		const [
			a11, a21, a31,
			a12, a22, a32,
			a13, a23, a33,
		] = a

		a[M11] = _add(_add(_mul(a11, b11), _mul(a21, b12)), _mul(a31, b13))
		a[M21] = _add(_add(_mul(a11, b21), _mul(a21, b22)), _mul(a31, b23))
		a[M31] = _add(_add(_mul(a11, b31), _mul(a21, b32)), _mul(a31, b33))

		a[M12] = _add(_add(_mul(a12, b11), _mul(a22, b12)), _mul(a32, b13))
		a[M22] = _add(_add(_mul(a12, b21), _mul(a22, b22)), _mul(a32, b23))
		a[M32] = _add(_add(_mul(a12, b31), _mul(a22, b32)), _mul(a32, b33))

		a[M13] = _add(_add(_mul(a13, b11), _mul(a23, b12)), _mul(a33, b13))
		a[M23] = _add(_add(_mul(a13, b21), _mul(a23, b22)), _mul(a33, b23))
		a[M33] = _add(_add(_mul(a13, b31), _mul(a23, b32)), _mul(a33, b33))

		return a
	}
	mul.$$$ = mul$$$

	const transpose = ([
		m11, m21, m31,
		m12, m22, m32,
		m13, m23, m33,
	]) => [
		m11, m12, m13,
		m21, m22, m23,
		m31, m32, m33,
	]

	const transpose$$$ = (m) => {
		swap.$$$(m, M12, M21)
		swap.$$$(m, M13, M31)

		swap.$$$(m, M23, M32)

		return m
	}
	transpose.$$$ = transpose$$$

	const mulVector = (
		[
			m11, m21, m31,
			m12, m22, m32,
			m13, m23, m33,
		],
		[ v1, v2, v3 ],
	) => [
		_add(_add(_mul(m11, v1), _mul(m21, v2)), _mul(m31, v3)),
		_add(_add(_mul(m12, v1), _mul(m22, v2)), _mul(m32, v3)),
		_add(_add(_mul(m13, v1), _mul(m23, v2)), _mul(m33, v3)),
	]

	const mulVector$$$ = ([
		a11, a21, a31,
		a12, a22, a32,
		a13, a23, a33,
	], v) => {
		const [ v1, v2, v3 ] = v

		v[0] = _add(_add(_mul(a11, v1), _mul(a21, v2)), _mul(a31, v3))
		v[1] = _add(_add(_mul(a12, v1), _mul(a22, v2)), _mul(a32, v3))
		v[2] = _add(_add(_mul(a13, v1), _mul(a23, v2)), _mul(a33, v3))

		return v
	}
	mulVector.$$$ = mulVector$$$

	const eq = (
		[
			a11, a21, a31,
			a12, a22, a32,
			a13, a23, a33,
		],
		[
			b11, b21, b31,
			b12, b22, b32,
			b13, b23, b33,
		],
	) => true
		&& _eq(a11, b11) && _eq(a21, b21) && _eq(a31, b31)
		&& _eq(a12, b12) && _eq(a22, b22) && _eq(a32, b32)
		&& _eq(a13, b13) && _eq(a23, b23) && _eq(a33, b33)

	const neq = (
		[
			a11, a21, a31,
			a12, a22, a32,
			a13, a23, a33,
		],
		[
			b11, b21, b31,
			b12, b22, b32,
			b13, b23, b33,
		],
	) => false
		|| _neq(a11, b11) || _neq(a21, b21) || _neq(a31, b31)
		|| _neq(a12, b12) || _neq(a22, b22) || _neq(a32, b32)
		|| _neq(a13, b13) || _neq(a23, b23) || _neq(a33, b33)

	const scale = ([
		m11, m21, m31,
		m12, m22, m32,
		m13, m23, m33,
	], v) => [
		_mul(m11, v), _mul(m21, v), _mul(m31, v),
		_mul(m12, v), _mul(m22, v), _mul(m32, v),
		_mul(m13, v), _mul(m23, v), _mul(m33, v),
	]
	const scale$$$ = (m, v) => {
		const [
			m11, m21, m31,
			m12, m22, m32,
			m13, m23, m33,
		] = m

		m[M11] = _mul(m11, v)
		m[M21] = _mul(m21, v)
		m[M31] = _mul(m31, v)

		m[M12] = _mul(m12, v)
		m[M22] = _mul(m22, v)
		m[M32] = _mul(m32, v)

		m[M13] = _mul(m13, v)
		m[M23] = _mul(m23, v)
		m[M33] = _mul(m33, v)

		return m
	}
	scale.$$$ = scale$$$

	const minor = ([
		m11, m21, m31,
		m12, m22, m32,
		m13, m23, m33,
	], i, j) => {
		switch (i) {
			case 0: switch (j) {
				case 0: return _sub(_mul(m22, m33), _mul(m32, m23))
				case 1: return _sub(_mul(m12, m33), _mul(m32, m13))
				case 2: return _sub(_mul(m12, m23), _mul(m22, m13))
				default: return null
			}
			case 1: switch (j) {
				case 0: return _sub(_mul(m21, m33), _mul(m31, m23))
				case 1: return _sub(_mul(m11, m33), _mul(m31, m13))
				case 2: return _sub(_mul(m11, m23), _mul(m21, m13))
				default: return null
			}
			case 2: switch (j) {
				case 0: return _sub(_mul(m21, m32), _mul(m31, m22))
				case 1: return _sub(_mul(m11, m32), _mul(m31, m12))
				case 2: return _sub(_mul(m11, m22), _mul(m21, m12))
				default: return null
			}
			default: return null
		}
	}

	const cofactor = ([
		m11, m21, m31,
		m12, m22, m32,
		m13, m23, m33,
	], i, j) => {
		switch (i) {
			case 0: switch (j) {
				case 0: return _sub(_mul(m22, m33), _mul(m32, m23))
				case 1: return _neg(_sub(_mul(m12, m33), _mul(m32, m13)))
				case 2: return _sub(_mul(m12, m23), _mul(m22, m13))
				default: return null
			}
			case 1: switch (j) {
				case 0: return _neg(_sub(_mul(m21, m33), _mul(m31, m23)))
				case 1: return _sub(_mul(m11, m33), _mul(m31, m13))
				case 2: return _neg(_sub(_mul(m11, m23), _mul(m21, m13)))
				default: return null
			}
			case 2: switch (j) {
				case 0: return _sub(_mul(m21, m32), _mul(m31, m22))
				case 1: return _neg(_sub(_mul(m11, m32), _mul(m31, m12)))
				case 2: return _sub(_mul(m11, m22), _mul(m21, m12))
				default: return null
			}
			default: return null
		}
	}

	const cofactors = ([
		m11, m21, m31,
		m12, m22, m32,
		m13, m23, m33,
	]) => [
		_sub(_mul(m22, m33), _mul(m32, m23)),
		_neg(_sub(_mul(m12, m33), _mul(m32, m13))),
		_sub(_mul(m12, m23), _mul(m22, m13)),

		_neg(_sub(_mul(m21, m33), _mul(m31, m23))),
		_sub(_mul(m11, m33), _mul(m31, m13)),
		_neg(_sub(_mul(m11, m23), _mul(m21, m13))),

		_sub(_mul(m21, m32), _mul(m31, m22)),
		_neg(_sub(_mul(m11, m32), _mul(m31, m12))),
		_sub(_mul(m11, m22), _mul(m21, m12)),
	]

	const adjugate = ([
		m11, m21, m31,
		m12, m22, m32,
		m13, m23, m33,
	]) => [
		_sub(_mul(m22, m33), _mul(m32, m23)),
		_neg(_sub(_mul(m21, m33), _mul(m31, m23))),
		_sub(_mul(m21, m32), _mul(m31, m22)),

		_neg(_sub(_mul(m12, m33), _mul(m32, m13))),
		_sub(_mul(m11, m33), _mul(m31, m13)),
		_neg(_sub(_mul(m11, m32), _mul(m31, m12))),

		_sub(_mul(m12, m23), _mul(m22, m13)),
		_neg(_sub(_mul(m11, m23), _mul(m21, m13))),
		_sub(_mul(m11, m22), _mul(m21, m12)),
	]

	const determinant = ([
		m11, m21, m31,
		m12, m22, m32,
		m13, m23, m33,
	]) => _add(
		_sub(
			_mul(m11, _sub(_mul(m22, m33), _mul(m32, m23))),
			_mul(m21, _sub(_mul(m12, m33), _mul(m32, m13))),
		),
		_mul(m31, _sub(_mul(m12, m23), _mul(m22, m13))),
	)

	const inverse = (m) => {
		const d = determinant(m)
		if (_eq(d, _ZERO)) { return null }

		const id = _inverse(d)
		const [
			m11, m21, m31,
			m12, m22, m32,
			m13, m23, m33,
		] = m

		return [
			_mul(id, _sub(_mul(m22, m33), _mul(m32, m23))),
			_mul(id, _neg(_sub(_mul(m21, m33), _mul(m31, m23)))),
			_mul(id, _sub(_mul(m21, m32), _mul(m31, m22))),

			_mul(id, _neg(_sub(_mul(m12, m33), _mul(m32, m13)))),
			_mul(id, _sub(_mul(m11, m33), _mul(m31, m13))),
			_mul(id, _neg(_sub(_mul(m11, m32), _mul(m31, m12)))),

			_mul(id, _sub(_mul(m12, m23), _mul(m22, m13))),
			_mul(id, _neg(_sub(_mul(m11, m23), _mul(m21, m13)))),
			_mul(id, _sub(_mul(m11, m22), _mul(m21, m12))),
		]
	}

	const fromNumbers = (
		m11, m21, m31,
		m12, m22, m32,
		m13, m23, m33,
	) => [
		_fromNumber(m11), _fromNumber(m21), _fromNumber(m31),
		_fromNumber(m12), _fromNumber(m22), _fromNumber(m32),
		_fromNumber(m13), _fromNumber(m23), _fromNumber(m33),
	]

	const toNumbers = ([
		m11, m21, m31,
		m12, m22, m32,
		m13, m23, m33,
	]) => [
		_toNumber(m11), _toNumber(m21), _toNumber(m31),
		_toNumber(m12), _toNumber(m22), _toNumber(m32),
		_toNumber(m13), _toNumber(m23), _toNumber(m33),
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
