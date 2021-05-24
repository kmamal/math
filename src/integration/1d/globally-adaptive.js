const { Heap } = require('@kmamal/util/structs/heap')

const __initializeGloballyAdaptive = (rule, from, to) => {
	const rounds = 1

	const { value, error } = rule(from, to)

	const intervals = new Heap()
	intervals.add(1 / error, { from, to, value, error })

	return { rounds, value, error, intervals }
}

const __iterateGloballyAdaptive = (state, rule) => {
	state.rounds++
	const { intervals } = state

	const entry = intervals.pop()
	if (entry === undefined) { return true }

	const { from, to, value, error } = entry.value
	const mid = (from + to) / 2

	const { value: v1, error: e1 } = rule(from, mid)
	const { value: v2, error: e2 } = rule(mid, to)

	const delta_error = e1 + e2 - error
	if (delta_error > 0) { return false }
	state.error += delta_error

	const delta_value = v1 + v2 - value
	state.value += delta_value

	intervals.add(1 / e1, { from, to: mid, value: v1, error: e1 })
	intervals.add(1 / e2, { from: mid, to, value: v2, error: e2 })

	return false
}

const integrateGloballyAdaptive = (rule, from, to, options = {}) => {
	const { eps = 1e-5, rounds = 100 } = options

	const state = __initializeGloballyAdaptive(rule, from, to)
	for (;;) {
		const done = __iterateGloballyAdaptive(state, rule)
		if (done) { break }
		if (state.rounds >= rounds) { break }
		if (state.error <= eps) { break }
	}

	return state.value
}

module.exports = {
	__initializeGloballyAdaptive,
	__iterateGloballyAdaptive,
	integrateGloballyAdaptive,
}
