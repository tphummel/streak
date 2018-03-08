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

const cp = require('child_process')

tap.test(function cliWithMax (t) {
  const inputData = JSON.stringify([
    ['2017-01-01', 3],
    ['2017-01-02', 5],
    ['2017-01-03', 0],
    ['2017-01-04', 0],
    ['2017-01-05', 9],
    ['2017-01-06', 0],
    ['2017-01-07', 0],
    ['2017-01-08', 5]
  ])

  const cmd = `echo -n '${inputData}' | ./cli.js --label 0 --column 1 --max 0`

  cp.exec(cmd, {
    shell: 'bash'
  }, (err, stdout, stderr) => {
    t.ifErr(err)

    let outputData
    try {
      outputData = JSON.parse(stdout)
    } catch (e) {
      t.fail(e)
    }

    t.equal(outputData.length, 2)
    t.end()
  })
})

tap.test(function cliHelp (t) {
  const cmd = `./cli.js --help`

  cp.exec(cmd, {
    shell: 'bash'
  }, (err, stdout, stderr) => {
    t.ifErr(err)
    t.ok(stdout.length > 0)
    t.end()
  })
})

tap.test(function cliVersion (t) {
  const cmd = `./cli.js --version`

  cp.exec(cmd, {
    shell: 'bash'
  }, (err, stdout, stderr) => {
    t.ifErr(err)
    t.ok(stdout.length > 0)
    t.end()
  })
})

tap.test(function cliVersion (t) {
  const cmd = `echo -n '[a1]' | ./cli.js`

  cp.exec(cmd, {
    shell: 'bash'
  }, (err, stdout, stderr) => {
    t.equal(err.code, 1)
    t.end()
  })
})
