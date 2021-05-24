
const PHI = (1 + Math.sqrt(5)) / 2
const INVPHI = 1 / PHI
const INVPHI2 = INVPHI * INVPHI

const __initGoldenRatio = (func, a, b) => {
	const c = a + INVPHI2 * (b - a)
	const d = a + INVPHI * (b - a)
	const fc = func(c)
	const fd = func(d)
	const evaluations = 2

	return { evaluations, a, b, c, fc, d, fd }
}

const __iterGoldenRatio = (state, func) => {
	const { c, fc, d, fd } = state

	if (fd < fc) {
		state.a = c
		state.c = d
		state.fc = fd
		state.d = state.a + INVPHI * (state.b - state.a)
		state.fd = func(state.d)
	} else {
		state.b = d
		state.d = c
		state.fd = fc
		state.c = state.a + INVPHI2 * (state.b - state.a)
		state.fc = func(state.c)
	}
	state.evaluations++
}

const searchGoldenRatio = (func, a, b) => {
	const state = __initGoldenRatio(func, a, b)
	state.evaluations += 2
	for (let i = 0; i < 10; i++) {
		__iterGoldenRatio(state, func)
	}
	return (state.b + state.a) / 2
}

module.exports = {
	__initGoldenRatio,
	__iterGoldenRatio,
	searchGoldenRatio,
}
