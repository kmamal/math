const { sampleNormal } = require('./normal')

const sampleSphere = (n) => {
	const values = new Array(n)
	let r

	do {
		let sum = 0
		for (let i = 0; i < n; i++) {
			const x = sampleNormal()
			values[i] = x
			sum += x * x
		}

		r = Math.sqrt(sum)
	} while (r === 0)

	for (let i = 0; i < n; i++) {
		values[i] /= r
	}

	return values
}

module.exports = { sampleSphere }
