
const makeGcd = (Domain) => {
	const { gt, mod } = Domain
	const zero = Domain.fromNumber(0)

	return (_a, _b) => {
		let a = _a
		let b = _b

		while (gt(a, zero)) {
			const r = mod(b, a)
			b = a
			a = r
		}

		return b
	}
}

module.exports = { makeGcd }
