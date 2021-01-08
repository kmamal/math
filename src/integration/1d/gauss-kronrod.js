
/* eslint-disable one-var, one-var-declaration-per-line, sort-vars, no-multi-spaces */
const /* A1 is zero */        K1 = 0.209482141084728, G1 = 0.417959183673469
const A2 = 0.207784955007898, K2 = 0.204432940075298
const A3 = 0.405845151377397, K3 = 0.190350578064785, G2 = 0.381830050505119
const A4 = 0.586087235467691, K4 = 0.169004726639267
const A5 = 0.741531185599394, K5 = 0.140653259715525, G3 = 0.279705391489277
const A6 = 0.864864423359769, K6 = 0.104790010322250
const A7 = 0.949107912342759, K7 = 0.063092092629979, G4 = 0.129484966168870
const A8 = 0.991455371120813, K8 = 0.022935322010529
/* eslint-enable one-var, one-var-declaration-per-line, sort-vars, no-multi-spaces */

const integrateGaussKronrod = (func, from, to) => {
	let gauss = 0
	let kronrod = 0

	const mid = (from + to) / 2
	const half_dx = (to - from) / 2

	const f_8 = func(mid)  // A1 is zero
	gauss += G1 * f_8
	kronrod += K1 * f_8

	const f_7 = func(mid - A2 * half_dx)
	const f_9 = func(mid + A2 * half_dx)
	kronrod += K2 * f_7
	kronrod += K2 * f_9

	const f_6 = func(mid - A3 * half_dx)
	const f_10 = func(mid + A3 * half_dx)
	gauss += G2 * f_6
	gauss += G2 * f_10
	kronrod += K3 * f_6
	kronrod += K3 * f_10

	const f_5 = func(mid - A4 * half_dx)
	const f_11 = func(mid + A4 * half_dx)
	kronrod += K4 * f_5
	kronrod += K4 * f_11

	const f_4 = func(mid - A5 * half_dx)
	const f_12 = func(mid + A5 * half_dx)
	gauss += G3 * f_4
	gauss += G3 * f_12
	kronrod += K5 * f_4
	kronrod += K5 * f_12

	const f_3 = func(mid - A6 * half_dx)
	const f_13 = func(mid + A6 * half_dx)
	kronrod += K6 * f_3
	kronrod += K6 * f_13

	const f_2 = func(mid - A7 * half_dx)
	const f_14 = func(mid + A7 * half_dx)
	gauss += G4 * f_2
	gauss += G4 * f_14
	kronrod += K7 * f_2
	kronrod += K7 * f_14

	const f_1 = func(mid - A8 * half_dx)
	const f_15 = func(mid + A8 * half_dx)
	kronrod += K8 * f_1
	kronrod += K8 * f_15

	gauss *= half_dx
	kronrod *= half_dx

	return { gauss, kronrod }
}


const { integrateGloballyAdaptive } = require('./globally-adaptive')

const integrateGloballyAdaptiveGaussKronrod = (func, from, to) => {
	const rule = (a, b) => {
		const { gauss, kronrod } = integrateGaussKronrod(func, a, b)
		const value = kronrod
		const error = Math.abs(gauss - kronrod)
		return { value, error }
	}
	return integrateGloballyAdaptive(rule, from, to)
}


module.exports = {
	integrateGaussKronrod,
	integrateGloballyAdaptiveGaussKronrod,
}
