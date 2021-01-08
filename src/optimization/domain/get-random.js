const { map } = require('@xyz/util/array/map')
const { randFloat } = require('@xyz/util/random/rand-float')

const getDimensionRandom = ({ from, to }) => randFloat(from, to)

const getRandom = (domain) => map(domain, getDimensionRandom)

module.exports = { getRandom }
