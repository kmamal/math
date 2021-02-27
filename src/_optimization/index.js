// const domain = [
// 	{ from: -200, to: 200 },
// 	{ from: 0, to: 20000 },
// 	{ from: -10, to: 10 },
// ]

// const first_pass = await minimize(
// 	{
// 		func: estimateError,
// 		domain,
// 		initial: [ 0, 0, 0 ],
// 	},
// 	{ time: 3e3 },
// )

// console.log(first_pass)

// const second_pass = await minimize(
// 	{
// 		func: estimateError,
// 		domain,
// 		initial: first_pass.variables,
// 	},
// 	{ time: 3e3 },
// 	null,
// )

// console.log(second_pass)

// const third_pass = await minimize(
// 	{
// 		func: estimateError,
// 		domain,
// 		initial: second_pass.variables,
// 	},
// 	{ time: 3e3 },
// )

// console.log(third_pass)

const Algorithms = require('./algorithms')
const fp = require('lodash/fp')

const REAL_LINE = { from: -Infinity, to: Infinity }

const calculateOrder = ({ order, domain, initial, func, gradient }) => order
	|| (domain && domain.length)
	|| (initial && initial.length)
	|| func && func.length
	|| gradient && gradient.length
	|| null

const validateProblem = ({ func, gradient, order, domain, initial }) => {
	if (!func && !gradient) { throw new Error("No function or gradient given") }

	if (domain.length !== order) {
		const error = new Error("Unexpected number of dimensions")
		error.expected = order
		error.found = domain.length
		throw error
	}

	for (let i = 0; i < order; i++) {
		const { from, to } = domain[i] || {}
		const invalid_from = typeof from !== 'number' || Number.isNaN(from)
		const invalid_to = typeof to !== 'number' || Number.isNaN(to)
		if (invalid_from || invalid_to) {
			const error = new Error("Invalid domain")
			error.domain = domain[i]
			error.index = i
			throw error
		}
	}

	if (initial) {
		if (initial.length !== order) {
			const error = new Error("Unexpected number of variables")
			error.expected = order
			error.found = initial.length
			throw error
		}

		for (let i = 0; i < order; i++) {
			const variable = initial[i]
			if (variable < domain[i].from || domain[i].to < variable) {
				const error = new Error("Initial variable outside of range")
				error.variable = variable
				error.domain = domain[i]
				error.index = i
				throw error
			}
		}
	}
}

const normalizeProblem = (_problem) => {
	const problem = fp.cloneDeep(_problem)

	problem.order = calculateOrder(problem)
	if (!problem.order) { throw new Error("No dimensions given") }

	problem.domain = fp.pipe(
		() => problem.domain,
		fp.defaultTo(fp.times(fp.constant(REAL_LINE), problem.order)),
		fp.map(fp.defaults(REAL_LINE)),
	)()

	validateProblem(problem)
	return problem
}

const minimize = (_problem, _limits, state) => {
	const problem = normalizeProblem(_problem)

	const limits = fp.defaults({
		time: Infinity,
		evaluations: Infinity,
		epsilon: fp.times(() => Number.EPSILON, problem.order),
	}, _limits)

	// Pick a strategy
	// NOTE: This must be updated as more algorithms are added.
	let algorithm = null

	if (state === null) {
	// if (algorithm === null && problem.func) {
		algorithm = Algorithms.directional
	}

	if (algorithm === null && problem.func) {
		algorithm = Algorithms.random
	}

	if (algorithm === null) {
		throw new Error("No algorithm available for this problem and limits")
	}

	// Solve
	return algorithm(problem, limits, state)
}

// HACK
// TODO: find all roots
const solve = (problem, limits) => {
	const { func, ...rest_problem } = problem
	if (!func) { throw new Error("No function specified") }

	const abs_func = (...args) => Math.abs(func(...args))
	const order = calculateOrder(problem) // Because we erase the `func.length` information

	const minimization_problem = {
		...rest_problem,
		order,
		func: abs_func,
		gradient: undefined,
	}
	const { variables, ...rest_state } = minimize(minimization_problem, limits)

	const value = func(...variables)
	return { variables, ...rest_state, value }
}

module.exports = {
	minimize,
	solve,
	normalizeProblem,
}
