
const defineFor = (Domain) => {
	const { eq, gt, mod } = Domain
	const ZERO = Domain.fromNumber(0)

	return (_a, _b) => {
		let a = _a
		let b = _b

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
