
const defineFor = (Domain) => {
	const { _eq, _gt, _mod } = Domain
	const ZERO = Domain.fromNumber(0)

	return (_a, _b) => {
		let a = _a
		let b = _b

		if (_eq(a, ZERO) && _eq(b, ZERO)) {
			return ZERO
		}

		if (_gt(a, b)) {
			const t = a
			a = b
			b = t
		}

		while (!_eq(a, ZERO)) {
			const r = _mod(b, a)
			b = a
			a = r
		}

		return b
	}
}

module.exports = { defineFor }
