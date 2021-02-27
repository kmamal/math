
const PHI = (1 + Math.sqrt(5)) / 2
const INVPHI = 1 / PHI
const INVPHI2 = INVPHI * INVPHI

const __initGoldenRatio = (func, _a, _fa, _b, _fb) => {
	let evaluations = 0
	let a = _a
	let fa = _fa
	let b = _b
	let fb = _fb
	evaluations++

	let c
	let fc

	for (;;) {
		c = a + INVPHI2 * (b - a)
		fc = func(c)
		evaluations++

		if (fc >= fa) {
			b = c
			fb = fc
		} else if (fc >= fb) {
			a = c
			fa = fc
		} else {
			break
		}
	}

	const d = a + INVPHI * (b - a)
	const fd = func(d)
	evaluations++

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
	const fa = func(a)
	const fb = func(b)
	const state = __initGoldenRatio(func, a, fa, b, fb)
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
