const { getRandom } = require('./domain/get-random')
const { getHalfRanges } = require('./domain/get-half-ranges')
const { clamp } = require('./domain/clamp')

const { defineFor } = require('../linear-algebra/vector')
const N = require('../domains/number')
const V = defineFor(N)

const init = async (
	{ order, domain, func },
	{ initial = {}, vectors: _vectors, ...options } = {},
) => {
	const solution = initial.solution ?? getRandom(domain)
	const value = initial.value ?? await func(...solution)

	let vectors = _vectors
	if (!vectors) {
		const halfRanges = getHalfRanges(domain)
		vectors = new Array(order * 2)
		let writeIndex = 0
		for (let i = 0; i < order; i++) {
			const vector1 = new Array(order).fill(0)
			vector1[i] = halfRanges[i]
			vectors[writeIndex++] = vector1

			const vector2 = [ ...vector1 ]
			vector2[i] *= -1
			vectors[writeIndex++] = vector2
		}
	}

	return {
		order,
		domain,
		func,
		solution,
		value,
		vectors,
		countFailed: 0,
		...options,
	}
}

const iter = async (state) => {
	const { func, domain, solution, value, vectors } = state

	let bestCandidate
	let bestCandidateValue = value
	for (const vector of vectors) {
		const candidate = V.add(solution, vector)
		clamp.$$$(domain, candidate)
		const candidateValue = await func(...candidate)
		if (candidateValue < bestCandidateValue) {
			bestCandidate = candidate
			bestCandidateValue = candidateValue
		}
	}

	if (bestCandidate) {
		state.solution = bestCandidate
		state.value = bestCandidateValue
		state.countFailed = 0
	} else {
		state.countFailed++
	}
}

const best = (state) => ({
	solution: state.solution,
	value: state.value,
})

module.exports = {
	init,
	iter,
	best,
}
