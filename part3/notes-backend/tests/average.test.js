const { average } = require('../utils/for_testing')

describe('Average', () => {
  test('of one value is the value itself', () => {
    const result = average([2])

    expect(result).toBe(2)
  })

  test('of many is calculated correctly', () => {
    expect(average([1, 2, 3, 4])).toBe(2.5)
  })

  test('of empty array is zero', () => {
    expect(average([])).toBe(0)
  })
})
