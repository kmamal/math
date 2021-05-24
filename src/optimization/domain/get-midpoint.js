const { map } = require('@kmamal/util/array/map')

const getDimensionMid = ({ from, to }) => (to / 2 - from / 2) + from

const getMidpoint = (domain) => map(domain, getDimensionMid)

module.exports = { getMidpoint }
