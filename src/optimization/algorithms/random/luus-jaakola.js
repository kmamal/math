const { random } = require('@xyz/util/random/random')
const { clone } = require('@xyz/util/array/clone')
const { getHalfRanges } = require('../../domain/get-half-ranges')
const { clamp } = require('../../domain/clamp')

// Sampling from a hyperbox
// REFS: https://en.wikipedia.org/wiki/Luus%E2%80%93Jaakola

const __initializeLuusJaakola = (problem) => {
	const solution = clone(problem.initial)
	const value = -Infinity
	const steps = getHalfRanges(problem.domain)
	const evaluations = 0
	const _candidate = new Array(problem.order)
	return { solution, value, steps, evaluations, _candidate }
}

const __searchLuusJaakola = (state, problem) => {
	const { solution, steps, _candidate: candidate } = state

	for (let i = 0; i < candidate.length; i++) {
		candidate[i] = solution[i] + steps[i] * (random() * 2 - 1)
	}
	clamp(candidate, problem.domain)

	const value = problem.func(candidate)
	state.evaluations++

	if (value <= state.value) { return }

	state.value = value
	const tmp = state.solution
	state.solution = candidate
	state._candidate = tmp
}

const searchLuusJaakola = (problem, limits) => {
	const { time, steps, eps } = limits

	const state = __initializeLuusJaakola(problem)
	for (;;) {
		const done = __searchLuusJaakola(state, problem)
		if (done) { break }
		if (state.evaluations > 1000) { break }
	}
	return state
}

module.exports = {
	__initializeLuusJaakola,
	__searchLuusJaakola,
	searchLuusJaakola,
}
