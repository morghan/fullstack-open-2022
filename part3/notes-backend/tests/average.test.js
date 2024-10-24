const { test, describe } = require('node:test')
const assert = require('node:assert')
const { average } = require('../utils/for_testing')

describe('Average', () => {
  test('of one value is the value itself', () => {
    const result = average([2])

    assert.strictEqual(result, 2)
  })

  test('of many is calculated correctly', () => {
    assert.strictEqual(average([1, 2, 3, 4]), 2.5)
  })

  test('of empty array is zero', () => {
    assert.strictEqual(average([]), 0)
  })
})
