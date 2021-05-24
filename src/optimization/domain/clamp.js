const { clamp: clampNumber } = require('@kmamal/util/number/clamp')
const { clone } = require('@kmamal/util/array/clone')

const __clamp = (dst, src, domain) => {
	for (let i = 0; i < domain.length; i++) {
		const { from, to } = domain[i]
		const x = src[i]
		dst[i] = clampNumber(x, from, to)
	}
}

const clamp$$$ = (variables, domain) => {
	__clamp(variables, variables, domain)
	return variables
}

const clamp = (variables, domain) => {
	const res = clone(variables)
	__clamp(res, variables, domain)
	return res
}

clamp.$$$ = clamp$$$

module.exports = { clamp }
