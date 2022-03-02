
/* eslint-disable
	one-var,
	one-var-declaration-per-line,
	sort-vars,
	no-multi-spaces
*/
const /* A1 is zero */        K1 = 0.209482141084728, G1 = 0.417959183673469
const A2 = 0.207784955007898, K2 = 0.204432940075298
const A3 = 0.405845151377397, K3 = 0.190350578064785, G2 = 0.381830050505119
const A4 = 0.586087235467691, K4 = 0.169004726639267
const A5 = 0.741531185599394, K5 = 0.140653259715525, G3 = 0.279705391489277
const A6 = 0.864864423359769, K6 = 0.104790010322250
const A7 = 0.949107912342759, K7 = 0.063092092629979, G4 = 0.129484966168870
const A8 = 0.991455371120813, K8 = 0.022935322010529
/* eslint-enable
	one-var,
	one-var-declaration-per-line,
	sort-vars,
	no-multi-spaces
*/

const integrateGaussKronrod = (func, from, to) => {
	let gauss = 0
	let kronrod = 0

	const mid = (from + to) / 2
	const halfDx = (to - from) / 2

	const f8 = func(mid)  // A1 is zero
	gauss += G1 * f8
	kronrod += K1 * f8

	const f7 = func(mid - A2 * halfDx)
	const f9 = func(mid + A2 * halfDx)
	kronrod += K2 * f7
	kronrod += K2 * f9

	const f6 = func(mid - A3 * halfDx)
	const f10 = func(mid + A3 * halfDx)
	gauss += G2 * f6
	gauss += G2 * f10
	kronrod += K3 * f6
	kronrod += K3 * f10

	const f5 = func(mid - A4 * halfDx)
	const f11 = func(mid + A4 * halfDx)
	kronrod += K4 * f5
	kronrod += K4 * f11

	const f4 = func(mid - A5 * halfDx)
	const f12 = func(mid + A5 * halfDx)
	gauss += G3 * f4
	gauss += G3 * f12
	kronrod += K5 * f4
	kronrod += K5 * f12

	const f3 = func(mid - A6 * halfDx)
	const f13 = func(mid + A6 * halfDx)
	kronrod += K6 * f3
	kronrod += K6 * f13

	const f2 = func(mid - A7 * halfDx)
	const f14 = func(mid + A7 * halfDx)
	gauss += G4 * f2
	gauss += G4 * f14
	kronrod += K7 * f2
	kronrod += K7 * f14

	const f1 = func(mid - A8 * halfDx)
	const f15 = func(mid + A8 * halfDx)
	kronrod += K8 * f1
	kronrod += K8 * f15

	gauss *= halfDx
	kronrod *= halfDx

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
