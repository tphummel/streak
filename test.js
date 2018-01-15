'use strict'

const tap = require('tap')
const lib = require('./index.js')

tap.test(function singleStreak (t) {
  const result = lib({
    data: [
      ['2017-01-01', 3],
      ['2017-01-02', 5],
      ['2017-01-03', 5],
      ['2017-01-04', 6],
      ['2017-01-05', 9],
      ['2017-01-06', 6],
      ['2017-01-07', 1]
    ],
    criteria: {
      column: 1,
      minValue: 5,
      maxValue: null
    },
    displayColumn: 0
  })

  console.log(result)

  t.equal(result.length, 1)

  t.equal(result[0].start, '2017-01-02')
  t.equal(result[0].end, '2017-01-06')
  t.equal(result[0].value, 5)
  t.end()
})

tap.test(function singleStreakMaxValue (t) {
  const result = lib({
    data: [
      ['2017-01-01', 3],
      ['2017-01-02', 5],
      ['2017-01-03', 5],
      ['2017-01-04', 6],
      ['2017-01-05', 9],
      ['2017-01-06', 6],
      ['2017-01-07', 1]
    ],
    criteria: {
      column: 1,
      minValue: null,
      maxValue: 5
    },
    displayColumn: 0
  })

  t.equal(result.length, 1)

  t.equal(result[0].start, '2017-01-01')
  t.equal(result[0].end, '2017-01-03')
  t.equal(result[0].value, 3)
  t.end()
})

tap.test(function doubleStreak (t) {
  const result = lib({
    data: [
      ['2017-01-01', 3],
      ['2017-01-02', 5],
      ['2017-01-03', 5],
      ['2017-01-04', 0],
      ['2017-01-05', 9],
      ['2017-01-06', 6],
      ['2017-01-07', 7],
      ['2017-01-08', 1]
    ],
    criteria: {
      column: 1,
      minValue: 5,
      maxValue: null
    },
    displayColumn: 0
  })

  t.equal(result.length, 2)

  t.equal(result[0].start, '2017-01-02')
  t.equal(result[0].end, '2017-01-03')
  t.equal(result[0].value, 2)

  t.equal(result[1].start, '2017-01-05')
  t.equal(result[1].end, '2017-01-07')
  t.equal(result[1].value, 3)

  t.end()
})

tap.test(function activeStreak (t) {
  const result = lib({
    data: [
      ['2017-01-01', 3],
      ['2017-01-02', 5],
      ['2017-01-03', 2],
      ['2017-01-04', 0],
      ['2017-01-05', 9],
      ['2017-01-06', 6],
      ['2017-01-07', 7],
      ['2017-01-08', 5]
    ],
    criteria: {
      column: 1,
      minValue: 5,
      maxValue: null
    },
    displayColumn: 0
  })

  t.equal(result.length, 1)

  t.equal(result[0].start, '2017-01-05')
  t.equal(result[0].end, '2017-01-08')
  t.equal(result[0].value, 4)
  t.equal(result[0].active, true)

  t.end()
})

tap.test(function rowSatisfiesCriteriaTrue (t) {
  const row = ['2017-01-01', 5]
  const criteria = {
    minValue: 5,
    column: 1
  }
  t.ok(lib.rowSatisfiesCriteria({row, criteria}))
  t.end()
})

tap.test(function rowSatisfiesCriteriaFalse (t) {
  const row = ['2017-01-01', 2]
  const criteria = {
    minValue: 5,
    column: 1
  }
  t.notOk(lib.rowSatisfiesCriteria({row, criteria}))
  t.end()
})
