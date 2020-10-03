const Domain = require('../domain')
const amrap = require('../../amrap')

// [x] any domain
// [x] uses func
// [ ] uses gradient
// [x] limit time
// [x] limit evaluations
// [x] limit epsilon
// [x] continue from state

const minimizeDirectional = async (problem, limits, _state) => {
	const state = _state || await (async () => {
		const { func, domain, initial } = problem
		const finite_domain = Domain.finitizeDomain(domain)
		const variables = initial || Domain.midpoint(finite_domain)
		const value = await func(...variables)

		const steps = Domain.halfRanges(finite_domain)

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
		}
	})()

	const { func, domain, order } = problem
	const { variables, finite_domain, steps, evaluations, time } = state
	let { value } = state
	Domain.clamp_BANG(variables, finite_domain)

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
			console.log(value, variables, steps)
			let did_improve = true
			while (did_improve) {
				did_improve = false
				// console.log('  ', value)

				for (let ii = 0; ii < order; ii++) {
					const original = variables[ii]

					// Forward
					forward: {
						variables[ii] += steps[ii]
						if (variables[ii] > finite_domain[ii].to) { break forward }

						const new_value = await func.apply(null, variables) //eslint-disable-line
						// console.log('f', variables, ii, original, value, new_value, steps)
						if (new_value >= value) { break forward }

						value = new_value
						did_improve = true
						continue
					}

					variables[ii] = original

					// Backward
					backward: {
						variables[ii] -= steps[ii]
						if (variables[ii] < finite_domain[ii].from) { break backward }

						const new_value = await func.apply(null, variables) //eslint-disable-line
						// console.log('b', variables, ii, original, value, new_value, steps)
						if (new_value >= value) { break backward }

						value = new_value
						did_improve = true
						continue
					}

					variables[ii] = original
				}
			}

			for (let ii = 0; ii < order; ii++) {
				steps[ii] /= 2
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

module.exports = minimizeDirectional
