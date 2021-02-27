
const iterSimulatedAnnealing = (state, problem, candidate) => {
	const value = problem.func(candidate)
	state.evaluations++

	if (value <= state.value) { return false }
	//

	state.value = value
	state.solution = candidate
	return true
}

module.exports = { iterSimulatedAnnealing }
