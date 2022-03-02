
// Refs: https://en.wikipedia.org/wiki/Numerical_integration#Integrals_over_infinite_intervals

// [-Inf, +Inf] -> [-1, 1]
const transformIndefinite = (func) => (x) => {
	const xSquared = x * x
	const oneOver = 1 / (1 - xSquared)
	const y = x * oneOver
	const c = (1 + xSquared) * oneOver * oneOver
	return func(y) * c
}

// [a, +Inf] -> [0, 1]
const transformSemiPositive = (func, a) => (x) => {
	const oneOver = 1 / (1 - x)
	const y = a + x * oneOver
	const c = oneOver * oneOver
	return func(y) * c
}

// [-Inf, a] -> [0, 1]
const transformSemiNegative = (func, a) => (x) => {
	const oneOver = 1 / x
	const y = a - (1 - x) * oneOver
	const c = oneOver * oneOver
	return func(y) * c
}

module.exports = {
	transformIndefinite,
	transformSemiPositive,
	transformSemiNegative,
}
