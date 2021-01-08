
// Refs: https://en.wikipedia.org/wiki/Numerical_integration#Integrals_over_infinite_intervals

// [-Inf, +Inf] -> [-1, 1]
const transformIndefinite = (func) => (x) => {
	const x2 = x * x
	const one_over_sub = 1 / (1 - x2)
	const y = x * one_over_sub
	const c = (1 + x2) * one_over_sub * one_over_sub
	return func(y) * c
}

// [a, +Inf] -> [0, 1]
const transformSemiPositive = (func, a) => (x) => {
	const one_over_sub = 1 - x
	const y = a + x * one_over_sub
	const c = one_over_sub * one_over_sub
	return func(y) * c
}

// [-Inf, a] -> [0, 1]
const transformSemiNegative = (func, a) => (x) => {
	const one_over_x = 1 / x
	const y = a - (1 - x) * one_over_x
	const c = one_over_x * one_over_x
	return func(y) * c
}

module.exports = {
	transformIndefinite,
	transformSemiPositive,
	transformSemiNegative,
}
