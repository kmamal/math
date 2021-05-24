const { map } = require('@kmamal/util/array/map')
const { randFloat } = require('@kmamal/util/random/rand-float')

const getDimensionRandom = ({ from, to }) => randFloat(from, to)

const getRandom = (domain) => map(domain, getDimensionRandom)

module.exports = { getRandom }
