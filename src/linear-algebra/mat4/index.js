/* eslint-disable array-element-newline */

const { memoize } = require('@kmamal/util/function/memoize')
const { swap } = require('@kmamal/util/array/swap')

const M11 = 0
const M21 = 1
const M31 = 2
const M41 = 3
const M12 = 4
const M22 = 5
const M32 = 6
const M42 = 7
const M13 = 8
const M23 = 9
const M33 = 10
const M43 = 11
const M14 = 12
const M24 = 13
const M34 = 14
const M44 = 15

const defineFor = memoize((Domain) => {
	const {
		isFinite: _isFinite,
		isNaN: _isNaN,
		neg: _neg,
		add: _add,
		sub: _sub,
		mul: _mul,
		eq: _eq,
		neq: _neq,
		fromNumber: _fromNumber,
		toNumber: _toNumber,
	} = Domain

	const identity = () => [
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1,
	]

	const isFinite = ([
		m11, m21, m31, m41,
		m12, m22, m32, m42,
		m13, m23, m33, m43,
		m14, m24, m34, m44,
	]) => true
		&& _isFinite(m11) && _isFinite(m21) && _isFinite(m31) && _isFinite(m41)
		&& _isFinite(m12) && _isFinite(m22) && _isFinite(m32) && _isFinite(m42)
		&& _isFinite(m13) && _isFinite(m23) && _isFinite(m33) && _isFinite(m43)
		&& _isFinite(m14) && _isFinite(m24) && _isFinite(m34) && _isFinite(m44)

	const isNaN = ([
		m11, m21, m31, m41,
		m12, m22, m32, m42,
		m13, m23, m33, m43,
		m14, m24, m34, m44,
	]) => false
		|| _isNaN(m11) || _isNaN(m21) || _isNaN(m31) || _isNaN(m41)
		|| _isNaN(m12) || _isNaN(m22) || _isNaN(m32) || _isNaN(m42)
		|| _isNaN(m13) || _isNaN(m23) || _isNaN(m33) || _isNaN(m43)
		|| _isNaN(m14) || _isNaN(m24) || _isNaN(m34) || _isNaN(m44)

	const neg = ([
		m11, m21, m31, m41,
		m12, m22, m32, m42,
		m13, m23, m33, m43,
		m14, m24, m34, m44,
	]) => [
		_neg(m11), _neg(m21), _neg(m31), _neg(m41),
		_neg(m12), _neg(m22), _neg(m32), _neg(m42),
		_neg(m13), _neg(m23), _neg(m33), _neg(m43),
		_neg(m14), _neg(m24), _neg(m34), _neg(m44),
	]

	const neg$$$ = (m) => {
		const [
			m11, m21, m31, m41,
			m12, m22, m32, m42,
			m13, m23, m33, m43,
			m14, m24, m34, m44,
		] = m

		m[M11] = _neg(m11)
		m[M21] = _neg(m21)
		m[M31] = _neg(m31)
		m[M41] = _neg(m41)

		m[M12] = _neg(m12)
		m[M22] = _neg(m22)
		m[M32] = _neg(m32)
		m[M42] = _neg(m42)

		m[M13] = _neg(m13)
		m[M23] = _neg(m23)
		m[M33] = _neg(m33)
		m[M43] = _neg(m43)

		m[M14] = _neg(m14)
		m[M24] = _neg(m24)
		m[M34] = _neg(m34)
		m[M44] = _neg(m44)

		return m
	}
	neg.$$$ = neg$$$

	const add = (
		[
			a11, a21, a31, a41,
			a12, a22, a32, a42,
			a13, a23, a33, a43,
			a14, a24, a34, a44,
		],
		[
			b11, b21, b31, b41,
			b12, b22, b32, b42,
			b13, b23, b33, b43,
			b14, b24, b34, b44,
		],
	) => [
		_add(a11, b11), _add(a21, b21), _add(a31, b31), _add(a41, b41),
		_add(a12, b12), _add(a22, b22), _add(a32, b32), _add(a42, b42),
		_add(a13, b13), _add(a23, b23), _add(a33, b33), _add(a43, b43),
		_add(a14, b14), _add(a24, b24), _add(a34, b34), _add(a44, b44),
	]

	const add$$$ = (a, [
		b11, b21, b31, b41,
		b12, b22, b32, b42,
		b13, b23, b33, b43,
		b14, b24, b34, b44,
	]) => {
		const [
			a11, a21, a31, a41,
			a12, a22, a32, a42,
			a13, a23, a33, a43,
			a14, a24, a34, a44,
		] = a

		a[M11] = _add(a11, b11)
		a[M21] = _add(a21, b21)
		a[M31] = _add(a31, b31)
		a[M41] = _add(a41, b41)

		a[M12] = _add(a12, b12)
		a[M22] = _add(a22, b22)
		a[M32] = _add(a32, b32)
		a[M42] = _add(a42, b42)

		a[M13] = _add(a13, b13)
		a[M23] = _add(a23, b23)
		a[M33] = _add(a33, b33)
		a[M43] = _add(a43, b43)

		a[M14] = _add(a14, b14)
		a[M24] = _add(a24, b24)
		a[M34] = _add(a34, b34)
		a[M44] = _add(a44, b44)

		return a
	}
	add.$$$ = add$$$

	const sub = (
		[
			a11, a21, a31, a41,
			a12, a22, a32, a42,
			a13, a23, a33, a43,
			a14, a24, a34, a44,
		],
		[
			b11, b21, b31, b41,
			b12, b22, b32, b42,
			b13, b23, b33, b43,
			b14, b24, b34, b44,
		],
	) => [
		_sub(a11, b11), _sub(a21, b21), _sub(a31, b31), _sub(a41, b41),
		_sub(a12, b12), _sub(a22, b22), _sub(a32, b32), _sub(a42, b42),
		_sub(a13, b13), _sub(a23, b23), _sub(a33, b33), _sub(a43, b43),
		_sub(a14, b14), _sub(a24, b24), _sub(a34, b34), _sub(a44, b44),
	]

	const sub$$$ = (a, [
		b11, b21, b31, b41,
		b12, b22, b32, b42,
		b13, b23, b33, b43,
		b14, b24, b34, b44,
	]) => {
		const [
			a11, a21, a31, a41,
			a12, a22, a32, a42,
			a13, a23, a33, a43,
			a14, a24, a34, a44,
		] = a

		a[M11] = _sub(a11, b11)
		a[M21] = _sub(a21, b21)
		a[M31] = _sub(a31, b31)
		a[M41] = _sub(a41, b41)

		a[M12] = _sub(a12, b12)
		a[M22] = _sub(a22, b22)
		a[M32] = _sub(a32, b32)
		a[M42] = _sub(a42, b42)

		a[M13] = _sub(a13, b13)
		a[M23] = _sub(a23, b23)
		a[M33] = _sub(a33, b33)
		a[M43] = _sub(a43, b43)

		a[M14] = _sub(a14, b14)
		a[M24] = _sub(a24, b24)
		a[M34] = _sub(a34, b34)
		a[M44] = _sub(a44, b44)

		return a
	}
	sub.$$$ = sub$$$

	const mul = (
		[
			a11, a21, a31, a41,
			a12, a22, a32, a42,
			a13, a23, a33, a43,
			a14, a24, a34, a44,
		],
		[
			b11, b21, b31, b41,
			b12, b22, b32, b42,
			b13, b23, b33, b43,
			b14, b24, b34, b44,
		],
	) => [
		_add(_add(_add(_mul(a11, b11), _mul(a21, b12)), _mul(a31, b13)), _mul(a41, b14)),
		_add(_add(_add(_mul(a11, b21), _mul(a21, b22)), _mul(a31, b23)), _mul(a41, b24)),
		_add(_add(_add(_mul(a11, b31), _mul(a21, b32)), _mul(a31, b33)), _mul(a41, b34)),
		_add(_add(_add(_mul(a11, b41), _mul(a21, b42)), _mul(a31, b43)), _mul(a41, b44)),

		_add(_add(_add(_mul(a12, b11), _mul(a22, b12)), _mul(a32, b13)), _mul(a42, b14)),
		_add(_add(_add(_mul(a12, b21), _mul(a22, b22)), _mul(a32, b23)), _mul(a42, b24)),
		_add(_add(_add(_mul(a12, b31), _mul(a22, b32)), _mul(a32, b33)), _mul(a42, b34)),
		_add(_add(_add(_mul(a12, b41), _mul(a22, b42)), _mul(a32, b43)), _mul(a42, b44)),

		_add(_add(_add(_mul(a13, b11), _mul(a23, b12)), _mul(a33, b13)), _mul(a43, b14)),
		_add(_add(_add(_mul(a13, b21), _mul(a23, b22)), _mul(a33, b23)), _mul(a43, b24)),
		_add(_add(_add(_mul(a13, b31), _mul(a23, b32)), _mul(a33, b33)), _mul(a43, b34)),
		_add(_add(_add(_mul(a13, b41), _mul(a23, b42)), _mul(a33, b43)), _mul(a43, b44)),

		_add(_add(_add(_mul(a14, b11), _mul(a24, b12)), _mul(a34, b13)), _mul(a44, b14)),
		_add(_add(_add(_mul(a14, b21), _mul(a24, b22)), _mul(a34, b23)), _mul(a44, b24)),
		_add(_add(_add(_mul(a14, b31), _mul(a24, b32)), _mul(a34, b33)), _mul(a44, b34)),
		_add(_add(_add(_mul(a14, b41), _mul(a24, b42)), _mul(a34, b43)), _mul(a44, b44)),
	]

	const mul$$$ = (a, [
		b11, b21, b31, b41,
		b12, b22, b32, b42,
		b13, b23, b33, b43,
		b14, b24, b34, b44,
	]) => {
		const [
			a11, a21, a31, a41,
			a12, a22, a32, a42,
			a13, a23, a33, a43,
			a14, a24, a34, a44,
		] = a

		a[M11] = _add(_add(_add(_mul(a11, b11), _mul(a21, b12)), _mul(a31, b13)), _mul(a41, b14))
		a[M21] = _add(_add(_add(_mul(a11, b21), _mul(a21, b22)), _mul(a31, b23)), _mul(a41, b24))
		a[M31] = _add(_add(_add(_mul(a11, b31), _mul(a21, b32)), _mul(a31, b33)), _mul(a41, b34))
		a[M41] = _add(_add(_add(_mul(a11, b41), _mul(a21, b42)), _mul(a31, b43)), _mul(a41, b44))

		a[M12] = _add(_add(_add(_mul(a12, b11), _mul(a22, b12)), _mul(a32, b13)), _mul(a42, b14))
		a[M22] = _add(_add(_add(_mul(a12, b21), _mul(a22, b22)), _mul(a32, b23)), _mul(a42, b24))
		a[M32] = _add(_add(_add(_mul(a12, b31), _mul(a22, b32)), _mul(a32, b33)), _mul(a42, b34))
		a[M42] = _add(_add(_add(_mul(a12, b41), _mul(a22, b42)), _mul(a32, b43)), _mul(a42, b44))

		a[M13] = _add(_add(_add(_mul(a13, b11), _mul(a23, b12)), _mul(a33, b13)), _mul(a43, b14))
		a[M23] = _add(_add(_add(_mul(a13, b21), _mul(a23, b22)), _mul(a33, b23)), _mul(a43, b24))
		a[M33] = _add(_add(_add(_mul(a13, b31), _mul(a23, b32)), _mul(a33, b33)), _mul(a43, b34))
		a[M43] = _add(_add(_add(_mul(a13, b41), _mul(a23, b42)), _mul(a33, b43)), _mul(a43, b44))

		a[M14] = _add(_add(_add(_mul(a14, b11), _mul(a24, b12)), _mul(a34, b13)), _mul(a44, b14))
		a[M24] = _add(_add(_add(_mul(a14, b21), _mul(a24, b22)), _mul(a34, b23)), _mul(a44, b24))
		a[M34] = _add(_add(_add(_mul(a14, b31), _mul(a24, b32)), _mul(a34, b33)), _mul(a44, b34))
		a[M44] = _add(_add(_add(_mul(a14, b41), _mul(a24, b42)), _mul(a34, b43)), _mul(a44, b44))

		return a
	}
	mul.$$$ = mul$$$

	const transpose = ([
		m11, m21, m31, m41,
		m12, m22, m32, m42,
		m13, m23, m33, m43,
		m14, m24, m34, m44,
	]) => [
		m11, m12, m13, m14,
		m21, m22, m23, m24,
		m31, m32, m33, m34,
		m41, m42, m43, m44,
	]

	const transpose$$$ = (m) => {
		swap.$$$(m, M12, M21)
		swap.$$$(m, M13, M31)
		swap.$$$(m, M14, M41)

		swap.$$$(m, M23, M32)
		swap.$$$(m, M24, M42)

		swap.$$$(m, M34, M43)

		return m
	}
	transpose.$$$ = transpose$$$

	const mulVector = (
		[
			a11, a21, a31, a41,
			a12, a22, a32, a42,
			a13, a23, a33, a43,
			a14, a24, a34, a44,
		],
		[ v1, v2, v3, v4 ],
	) => [
		_add(_add(_add(_mul(a11, v1), _mul(a21, v2)), _mul(a31, v3)), _mul(a41, v4)),
		_add(_add(_add(_mul(a12, v1), _mul(a22, v2)), _mul(a32, v3)), _mul(a42, v4)),
		_add(_add(_add(_mul(a13, v1), _mul(a23, v2)), _mul(a33, v3)), _mul(a43, v4)),
		_add(_add(_add(_mul(a14, v1), _mul(a24, v2)), _mul(a34, v3)), _mul(a44, v4)),
	]

	const mulVector$$$ = ([
		a11, a21, a31, a41,
		a12, a22, a32, a42,
		a13, a23, a33, a43,
		a14, a24, a34, a44,
	], v) => {
		const [ v1, v2, v3, v4 ] = v

		v[0] = _add(_add(_add(_mul(a11, v1), _mul(a21, v2)), _mul(a31, v3)), _mul(a41, v4))
		v[1] = _add(_add(_add(_mul(a12, v1), _mul(a22, v2)), _mul(a32, v3)), _mul(a42, v4))
		v[2] = _add(_add(_add(_mul(a13, v1), _mul(a23, v2)), _mul(a33, v3)), _mul(a43, v4))
		v[3] = _add(_add(_add(_mul(a14, v1), _mul(a24, v2)), _mul(a34, v3)), _mul(a44, v4))

		return v
	}
	mulVector.$$$ = mulVector$$$

	const eq = (
		[
			a11, a21, a31, a41,
			a12, a22, a32, a42,
			a13, a23, a33, a43,
			a14, a24, a34, a44,
		],
		[
			b11, b21, b31, b41,
			b12, b22, b32, b42,
			b13, b23, b33, b43,
			b14, b24, b34, b44,
		],
	) => true
		&& _eq(a11, b11) && _eq(a21, b21) && _eq(a31, b31) && _eq(a41, b41)
		&& _eq(a12, b12) && _eq(a22, b22) && _eq(a32, b32) && _eq(a42, b42)
		&& _eq(a13, b13) && _eq(a23, b23) && _eq(a33, b33) && _eq(a43, b43)
		&& _eq(a14, b14) && _eq(a24, b24) && _eq(a34, b34) && _eq(a44, b44)

	const neq = (
		[
			a11, a21, a31, a41,
			a12, a22, a32, a42,
			a13, a23, a33, a43,
			a14, a24, a34, a44,
		],
		[
			b11, b21, b31, b41,
			b12, b22, b32, b42,
			b13, b23, b33, b43,
			b14, b24, b34, b44,
		],
	) => false
		|| _neq(a11, b11) || _neq(a21, b21) || _neq(a31, b31) || _neq(a41, b41)
		|| _neq(a12, b12) || _neq(a22, b22) || _neq(a32, b32) || _neq(a42, b42)
		|| _neq(a13, b13) || _neq(a23, b23) || _neq(a33, b33) || _neq(a43, b43)
		|| _neq(a14, b14) || _neq(a24, b24) || _neq(a34, b34) || _neq(a44, b44)

	const scale = ([
		m11, m21, m31, m41,
		m12, m22, m32, m42,
		m13, m23, m33, m43,
		m14, m24, m34, m44,
	], v) => [
		_mul(m11, v), _mul(m21, v), _mul(m31, v), _mul(m41, v),
		_mul(m12, v), _mul(m22, v), _mul(m32, v), _mul(m42, v),
		_mul(m13, v), _mul(m23, v), _mul(m33, v), _mul(m43, v),
		_mul(m14, v), _mul(m24, v), _mul(m34, v), _mul(m44, v),
	]

	const scale$$$ = (m, v) => {
		const [
			m11, m21, m31, m41,
			m12, m22, m32, m42,
			m13, m23, m33, m43,
			m14, m24, m34, m44,
		] = m

		m[M11] = _mul(m11, v)
		m[M21] = _mul(m21, v)
		m[M31] = _mul(m31, v)
		m[M41] = _mul(m41, v)

		m[M12] = _mul(m12, v)
		m[M22] = _mul(m22, v)
		m[M32] = _mul(m32, v)
		m[M42] = _mul(m42, v)

		m[M13] = _mul(m13, v)
		m[M23] = _mul(m23, v)
		m[M33] = _mul(m33, v)
		m[M43] = _mul(m43, v)

		m[M14] = _mul(m14, v)
		m[M24] = _mul(m24, v)
		m[M34] = _mul(m34, v)
		m[M44] = _mul(m44, v)

		return m
	}
	scale.$$$ = scale$$$

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
		...{ scale },
		...{ fromNumbers, toNumbers },
	}
})

module.exports = { defineFor }
