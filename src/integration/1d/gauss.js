
const C = Math.sqrt(3) / 6
const CL = 0.5 - C
const CR = 0.5 + C

const integrateGauss = (func, from, to) => {
	const dx = to - from
	const dxl = dx * CL
	const dxr = dx * CR

	const xa = from + dxl
	const xb = from + dxr
	const fa = func(xa)
	const fb = func(xb)
	const sum = dx * (fa + fb) / 2

	return sum
}

const integrateGaussN = (func, from, to, intervals) => {
	const dx = (to - from) / intervals
	const dxl = dx * CL
	const dxr = dx * CR

	let sum = 0
	for (let i = 0; i < intervals; i++) {
		const xa = from + i * dx + dxl
		const xb = from + i * dx + dxr
		const fa = func(xa)
		const fb = func(xb)
		sum += fa + fb
	}
	sum = sum * dx / 2

	return sum
}

module.exports = {
	integrateGauss,
	integrateGaussN,
}
