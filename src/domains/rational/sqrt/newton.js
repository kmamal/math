
const N = 10

const sqrt = ({ num: anum, den: aden }) => {
	let snum = 1n
	let sden = 1n
	for (let i = 0; i < N; i++) {
		const tnum = anum * sden
		const tden = aden * snum
		snum = snum * tden + tnum * sden
		sden = 2n * (sden + tden)
	}
	return { num: snum, den: sden }
}

module.exports = { sqrt }
