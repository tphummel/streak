#!/usr/bin/env node

'use strict'

const minimist = require('minimist')
const getStdin = require('get-stdin')

const lib = require('./index')

const argv = minimist(process.argv, {
  string: ['label', 'column', 'min', 'max'],
  boolean: ['help', 'version'],
  alias: {
    l: 'label',
    c: 'column',
    h: 'help',
    v: 'version'
  },
  default: {
    label: 0,
    column: 1
  }
})

if (argv.help) {
  printUsage()
  process.exit(0)
}

if (argv.version) {
  console.log(require('./package.json').version)
  process.exit(0)
}

getStdin().then(str => {
  try {
    var input = JSON.parse(str)
  } catch (e) {
    console.log('stdin was not valid valid json. failed to parse')
    process.exit(1)
  }

  const result = lib({
    data: input,
    displayColumn: argv.label,
    criteria: {
      column: argv.column,
      minValue: argv.min,
      maxValue: argv.max
    }
  })
  console.log(JSON.stringify(result))
})

function printUsage () {
  const usage = `
  Streak.

  Usage:
    streak --label|-l <idx> --column|-c <idx> --min <val> [--max <val>]
    streak -h | --help
    streak -v | --version

  Options:
    -l --label    index of column holding label. zero-indexed. [default: 0]
    -c --column   index of column holding criteria. zero-indexed. [default: 1]
    --min         Numeric criteria to evaluate criteria field (>=). [default: 1]
    --max         Numeric criteria to evaluate criteria field (<=)

    -h --help     Show this screen.
    -v --version  Show version.

  Example:
    echo -n '[["2017-01-01", 3],["2017-01-02", 5],["2017-01-03", 5],["2017-01-07", 1]]' \\
      | streak -l 0 -c 1 --min 5
  `
  console.log(usage)
}
