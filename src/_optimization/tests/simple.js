
const sphere = (order) => ({
	order,
	func (...args) {
		let sum = 0
		for (const x of args) {
			sum += x ** 2
		}
		return sum
	},
	domain: new Array(order).fill({ type: 'real' }),
})


const rastrigin = (order) => ({
	order,
	func (...args) {
		let sum = 0
		for (const x of args) {
			sum += x ** 2 - 10 * Math.cos(2 * Math.PI * x)
		}
		return 10 * order + sum
	},
	domain: new Array(order).fill({ type: 'real', from: -5.12, to: 5.12 }),
})


const ackley = () => ({
	order: 2,
	func (x, y) {
		return 20 - 20 * Math.exp(-Math.sqrt((x ** 2 + y ** 2) / 2) / 5)
				+ Math.E - Math.exp((Math.cos(2 * Math.PI * x) + Math.cos(2 * Math.PI * y)) / 2)
	},
	domain: new Array(2).fill({ type: 'real', from: -5, to: 5 }),
})


const rosenbrock = (order) => ({
	order,
	func (...args) {
		let sum = 0
		for (let i = 1; i < order; i++) {
			const x = args[i - 1]
			const x_1 = args[i]
			sum += 100 * (x_1 - x ** 2) ** 2 + (x - 1) ** 2
		}
		return sum
	},
	domain: new Array(order).fill({ type: 'real', from: -100, to: 100 }),
})


const beale = () => ({
	order: 2,
	func (x, y) {
		return 0
				+ (1.5 - x + x * y) ** 2
				+ (2.25 - x + x * y ** 2) ** 2
				+ (2.625 - x + x * y ** 3) ** 2
	},
	domain: new Array(2).fill({ type: 'real', from: -4.5, to: 4.5 }),
})


const goldstein_price = () => ({
	order: 2,
	func (x, y) {
		const x2 = x ** 2
		const y2 = y ** 2
		return (1 + (x + y + 1) ** 2 * (19 - 14 * x + 3 * x2 - 14 * y + 6 * x * y + 3 * y2))
				* (30 + (2 * x - 3 * y) ** 2 * (18 - 32 * x + 12 * x2 + 48 * y - 36 * x * y + 27 * y2)) - 3
	},
	domain: new Array(2).fill({ type: 'real', from: -2, to: 2 }),
})


const booth = () => ({
	order: 2,
	func (x, y) {
		return (x + 2 * y - 7) ** 2 + (2 * x + y - 5) ** 2
	},
	domain: new Array(2).fill({ type: 'real', from: -10, to: 10 }),
})


const bukin_6 = () => ({
	order: 2,
	func (x, y) {
		return 100 * Math.sqrt(Math.abs(y - 0.01 * x ** 2)) + 0.01 * Math.abs(x + 10)
	},
	domain: [ { type: 'real', from: -15, to: -5 }, { type: 'real', from: -3, to: 3 } ],
})


const matyas = () => ({
	order: 2,
	func (x, y) {
		return 0.26 * (x ** 2 + y ** 2) - 0.48 * x * y
	},
	domain: new Array(2).fill({ type: 'real', from: -10, to: 10 }),
})


const levi_13 = () => ({
	order: 2,
	func (x, y) {
		return Math.sin(3 * Math.PI * x) ** 2
				+ (x - 1) ** 2 * (1 + Math.sin(3 * Math.PI * y) ** 2)
				+ (y - 1) ** 2 * (1 + Math.sin(2 * Math.PI * y) ** 2)
	},
	domain: new Array(2).fill({ type: 'real', from: -10, to: 10 }),
})


const himmelblau = () => ({
	order: 2,
	func (x, y) {
		return (x ** 2 + y - 11) ** 2 + (x + y ** 2 - 7) ** 2
	},
	domain: new Array(2).fill({ type: 'real', from: -5, to: 5 }),
})


const three_hump_camel = () => ({
	order: 2,
	func (x, y) {
		return 2 * x ** 2 - 1.05 * x ** 4 + x ** 6 / 6 + x * y + y ** 2
	},
	domain: new Array(2).fill({ type: 'real', from: -5, to: 5 }),
})


const easom = () => ({
	order: 2,
	func (x, y) {
		return 1 - Math.cos(x) * Math.cos(y) * Math.exp(-((x - Math.PI) ** 2 + (y - Math.PI) ** 2))
	},
	domain: new Array(2).fill({ type: 'real', from: -100, to: 100 }),
})


const schaffer_2 = () => ({
	order: 2,
	func (x, y) {
		const x2 = x ** 2
		const y2 = y ** 2
		return 0.5 + (Math.sin(x2 - y2) ** 2 - 0.5) / (1 + 0.001 * (x2 + y2)) ** 2
	},
	domain: new Array(2).fill({ type: 'real', from: -100, to: 100 }),
})


module.exports = {
	sphere,
	rastrigin,
	ackley,
	rosenbrock,
	beale,
	goldstein_price,
	booth,
	bukin_6,
	matyas,
	levi_13,
	himmelblau,
	three_hump_camel,
	easom,
	schaffer_2,
}
