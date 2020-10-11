
const defineFor = (Domain) => {
	const { gt, mod } = Domain
	const ZERO = Domain.fromNumber(0)

	return (_a, _b) => {
		let a = _a
		let b = _b

		while (gt(a, ZERO)) {
			const r = mod(b, a)
			b = a
			a = r
		}

		return b
	}
}

module.exports = { defineFor }
