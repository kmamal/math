const Domain = require('../domain')
const Tests = require('.')

const testMinimizer = (minimizer, limits) => {
	for (const name of Object.keys(Tests.simple)) {
		let problem = Tests.simple[name]
		if (typeof problem === 'function') {
			problem = problem(2)
		}

		console.group()
		console.groupEnd()
	}
}

module.exports = testMinimizer
