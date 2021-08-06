const { memoize } = require('@kmamal/util/function/memoize')
const { clone } = require('@kmamal/util/array/clone')
const { swap } = require('@kmamal/util/array/swap')

const defineFor = memoize((Domain) => {
	const { lt, gt, fromNumber } = Domain
	const ZERO = fromNumber(0)
	const V2 = require('../../../linear-algebra/vec2').defineFor(Domain)
	const SDF = require('../sdf').defineFor(Domain)

	const __quickhullConvexHull = (arr, _start, _end) => {
		const stack = []
		let writeIndex

		{
			const _second = _start + 1
			const _last = _end - 1

			const first = arr[_start]
			let left = first
			let right = first
			let leftX = first[0]
			let rightX = first[0]
			let leftIndex = _start
			let rightIndex = _start
			for (let i = _second; i !== _end; i++) {
				const point = arr[i]
				const x = point[0]
				if (lt(x, leftX)) {
					left = point
					leftX = x
					leftIndex = i
				} else if (gt(x, rightX)) {
					right = point
					rightX = x
					rightIndex = i
				}
			}

			swap.$$$(arr, leftIndex, _start)
			if (rightIndex === _start) { rightIndex = leftIndex }
			swap.$$$(arr, rightIndex, _last)

			console.log(arr)

			writeIndex = _second

			let pAbove = null
			let pBelow = null
			let pAboveD = -Infinity
			let pBelowD = Infinity
			let pAboveIndex
			for (let i = _second; i !== _last; i++) {
				const point = arr[i]

				const d = SDF.point2halfplane(point, left, right)
				if (gt(d, ZERO)) {
					if (gt(d, pAboveD)) {
						pAbove = point
						pAboveD = d
						pAboveIndex = writeIndex
					}

					swap.$$$(arr, i, writeIndex++)
					console.log("above", i, writeIndex - 1, arr)
				} else if (lt(d, ZERO)) {
					if (lt(d, pBelowD)) {
						pBelow = point
						pBelowD = d
						swap.$$$(arr, i, _last - 1)
						console.log("bottom", i, _last - 1, arr)
					}
				}
			}

			let startAbove
			if (pAbove !== null) {
				swap.$$$(arr, pAboveIndex, _second)
				startAbove = _second + 1
			} else {
				startAbove = _second
			}
			const endBelow = pBelow ? _last - 1 : _last
			stack.push({ a: right, b: left, p: pBelow, start: writeIndex, end: endBelow })
			stack.push({ a: left, b: right, p: pAbove, start: startAbove, end: writeIndex })
		}

		writeIndex = _start

		while (stack.length > 0) {
			const item = stack.pop()
			console.log(item)
			console.log(arr)

			const { a, b, p, start, end } = item
			const second = start + 1
			const last = end - 1

			if (p === null) {
				console.log(a)
				arr[writeIndex++] = a
				continue
			} else if (end - start === 0) {
				console.log(a)
				console.log(p)
				arr[writeIndex++] = a
				arr[writeIndex++] = p
				continue
			}

			let separator = start

			let pLeft = null
			let pRight = null
			let pLeftD = -Infinity
			let pRightD = Infinity
			let pLeftIndex
			for (let i = start; i !== end; i++) {
				const point = arr[i]

				const d1 = SDF.point2halfplane(point, a, p)
				const d2 = SDF.point2halfplane(point, p, b)
				if (gt(d1, 0)) {
					if (gt(d1, pLeftD)) {
						pLeft = point
						pLeftD = d1
						pLeftIndex = separator
					}

					swap.$$$(arr, i, separator++)
				} else if (gt(d2, ZERO)) {
					if (lt(d2, pRightD)) {
						pRight = point
						pRightD = d2
						swap.$$$(arr, i, last)
					}
				}
			}

			let startLeft
			if (pLeft !== null) {
				swap.$$$(arr, pLeftIndex, second)
				startLeft = second
			} else {
				startLeft = start
			}
			const endRight = pRight ? last : end
			stack.push({ a: p, b, p: pRight, start: separator, end: endRight })
			stack.push({ a, b: p, p: pLeft, start: startLeft, end: separator })
		}

		return writeIndex - _start || null
	}

	const quickhullConvexHull$$$ = (points) => {
		const { length } = points
		if (length < 3) { return null }
		const n = __quickhullConvexHull(points, 0, points.length)
		if (n === null) { return null }
		points.length = n
		return points
	}

	const quickhullConvexHull = (points) => {
		const { length } = points
		if (length < 3) { return null }
		const res = clone(points)
		const n = __quickhullConvexHull(res, 0, points.length)
		if (n === null) { return null }
		res.length = n
		return res
	}

	quickhullConvexHull.$$$ = quickhullConvexHull$$$

	return {
		__quickhullConvexHull,
		quickhullConvexHull,
	}
})

module.exports = { defineFor }
