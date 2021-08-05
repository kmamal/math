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
		let writeIndex = _start

		{
			let left
			let right
			let leftX = Infinity
			let rightX = -Infinity
			for (let i = _start; i !== _end; i++) {
				const point = arr[i]
				const x = point[0]
				if (lt(x, leftX)) {
					left = point
					leftX = x
				} else if (gt(x, rightX)) {
					right = point
					rightX = x
				}
			}

			let pAbove
			let pBelow
			let pAboveD = -Infinity
			let pBelowD = Infinity

			for (let i = _start; i !== _end; i++) {
				const point = arr[i]

				if (V2.eq(point, left)) {
					swap(arr, i, writeIndex++)
					continue
				}

				const d = SDF.point2halfplane(point, left, right)
				if (gt(d, ZERO)) {
					swap(arr, i, writeIndex++)

					if (gt(d, pAboveD)) {
						pAbove = point
						pAboveD = d
					}
				} else if (lt(d, ZERO)) {
					if (lt(d, pBelowD)) {
						pBelow = point
						pBelowD = d
					}
				}
			}

			pAbove && stack.push({ a: left, b: right, p: pAbove, start: 0, end: writeIndex })
			pBelow && stack.push({ a: right, b: left, p: pBelow, start: writeIndex, end: _end })
		}

		writeIndex = _start

		for (;;) {
			const item = stack.pop()
			if (!item) { break }

			const { a, b, p, start, end } = item

			if (p === null) {
				arr[writeIndex++] = a
				continue
			} else if (end - start === 2) {
				arr[writeIndex++] = a
				arr[writeIndex++] = p
				continue
			}

			let separator = start

			let pLeft
			let pRight
			let pLeftD = -Infinity
			let pRightD = Infinity

			for (let i = start; i !== end; i++) {
				const point = arr[i]

				if (V2.eq(point, a)) {
					swap(arr, i, separator++)
					continue
				}

				const d1 = SDF.point2halfplane(point, a, p)
				const d2 = SDF.point2halfplane(point, p, b)
				if (gt(d1, 0)) {
					swap(arr, i, separator++)

					if (gt(d1, pLeftD)) {
						pLeft = point
						pLeftD = d1
					}
				} else if (gt(d2, ZERO)) {
					if (lt(d2, pRightD)) {
						pRight = point
						pRightD = d2
					}
				}
			}

			pLeft && stack.push({ a, b: p, p: pLeft, start, end: separator })
			pRight && stack.push({ a: p, b, p: pRight, start: separator, end })
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
