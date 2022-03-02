
const defineFor = (Domain) => {
	const eq = Domain._eq ?? Domain.eq
	const gt = Domain._gt ?? Domain.gt
	const mod = Domain._mod ?? Domain.mod
	const ZERO = Domain.fromNumber(0)

	return (_a, _b) => {
		let a = _a
		let b = _b

		if (eq(a, ZERO) && eq(b, ZERO)) {
			return ZERO
		}

		if (gt(a, b)) {
			const t = a
			a = b
			b = t
		}

		while (!eq(a, ZERO)) {
			const r = mod(b, a)
			b = a
			a = r
		}

		return b
	}
}

module.exports = { defineFor }
