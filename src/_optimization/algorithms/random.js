const Domain = require('../domain')
const amrap = require('../../amrap')
const random = require('../../random')

// [x] any domain
// [x] uses func
// [ ] uses gradient
// [x] limit time
// [x] limit evaluations
// [x] limit epsilon
// [x] continue from state

const minimizeRandom = async (problem, limits, _state) => {
	const state = _state || await (async () => {
		const { func, order, domain, initial } = problem
		const finite_domain = Domain.finitizeDomain(domain)
		const variables = initial || Domain.getRandom(finite_domain)
		const value = await func(...variables)

		const steps = Domain.halfRanges(finite_domain)

		const num_directions = 3 ** order - 1
		const halving_time = 100 * num_directions
		const cooling_rate = (1 / 2) ** (1 / halving_time)

		return {
			// Common
			value,
			variables,
			evaluations: 0,
			time: 0,
			// Variable
			steps,
			// Constant
			finite_domain,
			cooling_rate,
		}
	})()

	const { func, domain, order } = problem
	const { finite_domain, steps, cooling_rate, evaluations, time } = state
	let { variables, value } = state
	Domain.clamp_BANG(variables, finite_domain)
	let candidate = new Array(order)

	let smallest_epsilon = Infinity
	let smallest_epsilon_index = null
	for (let i = 0; i < order; i++) {
		const epsilon = limits.epsilon[i]
		if (epsilon < smallest_epsilon) {
			smallest_epsilon = epsilon
			smallest_epsilon_index = i
		}
	}

	const iterate = async (n) => {
		const remaining = limits.evaluations - evaluations
		const iterations = Math.min(n, remaining)

		for (let i = 0; i < iterations; i++) {
			for (let ii = 0; ii < order; ii++) {
				candidate[ii] = variables[ii] + steps[ii] * random(-1, 1)
			}
			Domain.clamp_BANG(candidate, finite_domain)

			const new_value = await func.apply(null, candidate) //eslint-disable-line

			if (new_value < value) {
				value = new_value
				const temp = variables
				variables = candidate
				candidate = temp

				// Increment steps on hits
				for (let ii = 0; ii < order; ii++) {
					steps[ii] /= cooling_rate
				}
			} else {
				// Decrement steps on miss
				for (let ii = 0; ii < order; ii++) {
					steps[ii] *= cooling_rate
				}

				const step = steps[smallest_epsilon_index]
				const scale = Math.abs(variables[smallest_epsilon_index] || Number.MIN_VALUE)
				if (step / scale < smallest_epsilon) {
					for (let ii = 0; ii < order; ii++) {
						steps[ii] = (variables[ii] || Number.MIN_VALUE) * limits.epsilon[ii] * 2
					}
					return true
				}
			}
		}

		return iterations === remaining
	}

	const time_per_rep = time / evaluations
	const estimate = limits.time * time_per_rep || 1
	const { ellapsed, reps } = await amrap(iterate, limits.time - time, { initial: estimate })

	state.value = value
	state.variables = Domain.infinitizeVariables(domain, variables)
	state.evaluations += reps
	state.time += ellapsed
	return state
}

module.exports = minimizeRandom
