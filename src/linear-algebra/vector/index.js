const { every } = require('@kmamal/util/array/every')
const { map } = require('@kmamal/util/array/map')
const { combine } = require('@kmamal/util/array/combine')

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
		eq: _eq,
		neq: _neq,
		sqrt: _sqrt,
		_fromNumber,
		_toNumber,
	} = Domain
	const ZERO = Domain.fromNumber(0)

	const isFinite = (x) => every(x, _isFinite)
	const isNaN = (x) => every(x, _isNaN)

	const neg = (x) => map(x, _neg)
	const neg$$$ = (x) => map.$$$(x, _neg)
	neg.$$$ = neg$$$

	const abs = (x) => map(x, _abs)
	const abs$$$ = (x) => map.$$$(x, _abs)
	abs.$$$ = abs$$$

	const add = (a, b) => combine(a, b, _add)
	const add$$$ = (a, b) => combine.$$$(a, b, _add)
	add.$$$ = add$$$

	const sub = (a, b) => combine(a, b, _sub)
	const sub$$$ = (a, b) => combine.$$$(a, b, _sub)
	sub.$$$ = sub$$$

	const mul = (a, b) => combine(a, b, _mul)
	const mul$$$ = (a, b) => combine.$$$(a, b, _mul)
	mul.$$$ = mul$$$

	const div = (a, b) => combine(a, b, _div)
	const div$$$ = (a, b) => combine.$$$(a, b, _div)
	div.$$$ = div$$$

	const dot = (a, b) => {
		const length = Math.max(a.length, b.length)
		let result = ZERO
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
	const norm = (x) => _sqrt(normSquared(x))

	const normalize = (x) => scale(x, 1 / norm(x))
	const normalize$$$ = (x) => scale$$$(x, 1 / norm(x))
	normalize.$$$ = normalize$$$

	const fromNumbers = (...nums) => map.$$$(nums, _fromNumber)
	const toNumbers = (vec) => map(vec, _toNumber)

	return {
		...{ isFinite, isNaN },
		...{ neg, abs, add, sub, mul, div, dot },
		...{ eq, neq },
		...{ scale, norm, normSquared, normalize },
		...{ fromNumbers, toNumbers },
	}
}

module.exports = { defineFor }
