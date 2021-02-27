
const calculateRate = (order, trials) => {
	const num_directions = 3 ** order - 1
	const halving_time = trials * num_directions
	const rate = (1 / 2) ** (1 / halving_time)
	return rate
}

module.exports = { calculateRate }
