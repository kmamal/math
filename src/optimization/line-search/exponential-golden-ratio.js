const { __initGoldenRatio, __iterGoldenRatio } = require('./golden-ratio')

const PHI = (1 + Math.sqrt(5)) / 2
const INVPHI = 1 / PHI

const __initExponentialGoldenRatio = (func, _a, _fa, step) => {
	const a = _a
	const fa = _fa

	const c = a + step
	const fc = func(c)

	if (fc >= fa) {
		const state = __initGoldenRatio(func, a, fa, c, fc)
		state.evaluations += 1
		return state
	}

	return { evaluations: 1, a, c, fc, step }
}

const __expandExponentialGoldenRatio = (state, func) => {
	const { c, fc, step } = state

	const next_step = step * PHI
	const b = c + next_step
	const fb = func(b)
	state.evaluations++

	if (fb >= fc) {
		state.b = b
		state.d = state.a + INVPHI * (b - state.a)
		state.fd = func(state.d)
		state.evaluations++
		return
	}

	state.a = c
	state.c = b
	state.fc = fb
	state.step = next_step
}

const exponentialGoldenRatio = (func, a, step) => {
	const fa = func(a)
	const state = __initExponentialGoldenRatio(func, a, fa, step)
	state.evaluations += 1
	for (;;) {
		if (state.d) { break }
		__expandExponentialGoldenRatio(state, func)
	}
	for (let i = 0; i < 10; i++) {
		__iterGoldenRatio(state, func)
	}
	return (state.b + state.a) / 2
}

module.exports = {
	__initExponentialGoldenRatio,
	__expandExponentialGoldenRatio,
	exponentialGoldenRatio,
}
