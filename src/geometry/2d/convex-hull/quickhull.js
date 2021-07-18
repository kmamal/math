const V2 = require('../vec2')
const Distance = require('../distance')
const { clone, swap } = require('@kmamal/util/array')

const __convexHull = (arr, _start, _end) => {
	let stack
	let write_index = _start

	{
		let left
		let right
		let left_x
		let right_x
		for (let i = _start; i !== _end; i++) {
			const point = arr[i]
			const x = point[0]
			if (x < left_x) {
				left = point
				left_x = x
			} else if (x > right_x) {
				right = point
				right_x = x
			}
		}

		let p_above
		let p_below
		let p_above_d = -Infinity
		let p_below_d = Infinity

		for (let i = _start; i !== _end; i++) {
			const point = arr[i]

			if (V2.eq(point, left)) {
				swap(i, write_index++)
				continue
			}

			const d = Distance.point2halfplane(point, left, right)
			if (d > 0) {
				swap(i, write_index++)

				if (d > p_above_d) {
					p_above = point
					p_above_d = d
				}
			} else if (d < 0) {
				if (d < p_below_d) {
					p_below = point
					p_below_d = d
				}
			}
		}

		if (p_above === null && p_below === null) { return null }

		stack = [
			 { a: right, b: left, p: p_below, start: write_index, end: _end },
			 { a: left, b: right, p: p_above, start: 0, end: write_index },
		]
	}

	write_index = _start

	for (;;) {
		const item = stack.pop()
		if (!item) { break }

		const { a, b, p, start, end } = item

		if (p === null) {
			arr[write_index++] = a
			continue
		} else if (end - start === 2) {
			arr[write_index++] = a
			arr[write_index++] = p
			continue
		}

		let separator = start

		let p_left
		let p_right
		let p_left_d = -Infinity
		let p_right_d = Infinity

		for (let i = start; i !== end; i++) {
			const point = arr[i]

			if (V2.eq(point, a)) {
				swap(i, separator++)
				continue
			}

			const d1 = Distance.point2halfplane(point, a, p)
			const d2 = Distance.point2halfplane(point, p, b)
			if (d1 > 0) {
				swap(i, separator++)

				if (d1 > p_left_d) {
					p_left = point
					p_left_d = d1
				}
			} else if (d2 > 0) {
				if (d2 < p_right_d) {
					p_right = point
					p_right_d = d2
				}
			}
		}

		stack.push({ a, b: p, p: p_left, start, end: separator })
		stack.push({ a: p, b, p: p_right, start: separator, end })
	}

	return write_index - _start
}

const convexHull$$$ = (points) => {
	const { length } = points
	if (length < 3) { return null }
	const n = __convexHull(points, 0, points.length)
	if (n === null) { return null }
	points.length = n
	return points
}

const convexHull = (points) => {
	const { length } = points
	if (length < 3) { return null }
	const res = clone(points)
	const n = __convexHull(res, 0, points.length)
	if (n === null) { return null }
	res.length = n
	return res
}

convexHull.$$$ = convexHull$$$

module.exports = {
	__convexHull,
	convexHull,
}
