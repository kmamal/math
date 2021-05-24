const { clone } = require('@kmamal/util/array/clone')
const { getRandom } = require('../domain/get-random')

const __initMultiStart = (state, problem, algo, n) => {
	state.starts = 0
}

const __iterMultiStart = (state, problem, algo, n) => {
	//
}
const searchMultiStart = (heuristic, problem, limits) => {
	const { evaluations, eps, time } = limits

	const state = algo.init(heuristic, problem)
	for (;;) {
		const done = algo.iter(state, heuristic, problem)
		if (done) { break }
		if (state.evaluations > evaluations) { break }
	}

	return state
}

module.exports = {
	__initMultiStart,
	__iterMultiStart,
	searchMultiStart,
}
