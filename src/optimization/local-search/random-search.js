const { getHalfRanges } = require('../../domain/get-half-ranges')
const { getRandom } = require('../../domain/get-random')
const { max } = require('@kmamal/util/array/max')

const { getNeighborHypersphere } = require('./random-neighbor/hypersphere')
const { clamp } = require('../../domain/clamp')

const { __iterHillClimbing } = require('./metaheuristics/hill-climbing')
const { __iterHillSimulatedAnnealing } = require('./metaheuristics/simulated-annealing')

const randomSearch = (problem, limits) => {
	const { domain, func } = problem

	const solution = getRandom(domain)
	const steps = getHalfRanges(domain)
	const state = {
		solution,
		value: func(solution),
		steps,
		evaluations: 1,
		error: max(steps),
		elapsed: 0,
	}

	const {
		evaluations: eval_limit,
		eps: error_limit,
		time: time_limit,
	} = limits

	const start_time = Date.now()
	for (;;) {
		const candidate = getNeighborHypersphere(solution, steps)
		clamp.$$$(candidate, domain)

		__iterHillClimbing(state, problem, candidate)

		// if (error_limit !== undefined && state.error >= error_limit) { break }
		if (eval_limit !== undefined && state.evaluations >= eval_limit) { break }
		if (time_limit !== undefined && Date.now() - start_time >= time) { break }

		// update steps
	}
	state.elapsed = Date.now() - start_time

	return state
}

module.exports = { randomSearch }
