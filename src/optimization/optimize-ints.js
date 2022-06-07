const { getRandom } = require('./domain/get-random')
const { map } = require('@kmamal/util/array/map')

const {
	init: initPatternSearch,
	iter: iterPatternSearch,
	best: bestPatternSearch,
} = require('./pattern-search')

const init = (problem) => ({
	problem,
	initial: null,
})

const iter = async (state) => {
	if (state.patternSearch) {
		await iterPatternSearch(state.patternSearch)
		if (state.patternSearch.countFailed) {
			state.patternSearch.vectors.forEach((vector) => {
				map.$$$(vector, (x) => Math.ceil(x / 2))
			})
		} else {
			state.patternSearch.vectors.forEach((vector) => {
				map.$$$(vector, (x) => Math.ceil(x * 1.5))
			})
		}
		return
	}

	const { func, domain } = state.problem
	const solution = getRandom(domain)
	const value = await func(...solution)
	const point = { solution, value }

	if (!state.initial) {
		state.initial = point
		return
	}

	if (value < state.initial.value) {
		state.initial = point
		state.patternSearch = initPatternSearch(
			state.problem,
			{ initial: { point } },
		)
		state.patternSearch.vectors.forEach((vector) => {
			map.$$$(vector, (x) => Math.ceil(x))
		})
	}
}

const best = (state) => state.patternSearch
	? bestPatternSearch(state.patternSearch)
	: state.initial

module.exports = {
	init,
	iter,
	best,
}
