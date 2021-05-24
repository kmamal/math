const { map } = require('@kmamal/util/array/map')

// NOTE: The full range (from -MAX_VALUE to MAX_VALUE) would overflow.

const getDimensionHalfRange = ({ from, to }) => to / 2 - from / 2

const getHalfRanges = (domain) => map(domain, getDimensionHalfRange)

module.exports = { getHalfRanges }
