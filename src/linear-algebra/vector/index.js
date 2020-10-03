const {
	array: {
		every,
		map,
	},
} = require('@xyz/utils')

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
	const zero = Domain.fromNumber(0)
	const half = Domain.fromNumber(0.5)

	const isFinite = (x) => every(x, _isFinite)
	const isNaN = (x) => every(x, _isNaN)

	const neg = (x) => map(x, _neg)
	const neg$$$ = (x) => map.$$$(x, _neg)
	neg.$$$ = neg$$$

	const add = (a, b) => {
		const length = Math.max(a.length, b.length)
		const result = Array(length)
		for (let i = 0; i < length; i++) {
			result[i] = _add(a[i], b[i])
		}
		return result
	}
	const add$$$ = (a, b) => {
		const length = Math.max(a.length, b.length)
		for (let i = 0; i < length; i++) {
			a[i] = _add(a[i], b[i])
		}
		return a
	}
	add.$$$ = add$$$

	const sub = (a, b) => {
		const length = Math.max(a.length, b.length)
		const result = Array(length)
		for (let i = 0; i < length; i++) {
			result[i] = _sub(a[i], b[i])
		}
		return result
	}
	const sub$$$ = (a, b) => {
		const length = Math.max(a.length, b.length)
		for (let i = 0; i < length; i++) {
			a[i] = _sub(a[i], b[i])
		}
		return a
	}
	sub.$$$ = sub$$$

	const dot = (a, b) => {
		const length = Math.max(a.length, b.length)
		let result = zero
		for (let i = 0; i < length; i++) {
			result = _add(result, _mul(a[i], b[i]))
		}
		return result
	}

	const eq = (a, b) => {
		const length = Math.max(a.length, b.length)
		for (let i = 0; i < length; i++) {
			if (!_eq(a[i], b[i])) { return false }
		}
		return true
	}

	const neq = (a, b) => {
		const length = Math.max(a.length, b.length)
		for (let i = 0; i < length; i++) {
			if (_neq(a[i], b[i])) { return true }
		}
		return false
	}

	const scale = (x, v) => map(x, (y) => _mul(y, v))
	const scale$$$ = (x, v) => map.$$$(x, (y) => _mul(y, v))
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

module.exports = { makeVector }
