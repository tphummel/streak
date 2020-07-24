'use strict'

function rowSatisfiesCriteria ({ row, criteria }) {
  if (criteria && criteria.minValue != null) {
    if (row[criteria.column] < criteria.minValue) {
      return false
    }
  }

  if (criteria && criteria.maxValue != null) {
    if (row[criteria.column] > criteria.maxValue) {
      return false
    }
  }

  return true
}

function getStreaks ({ data, displayColumn, criteria }) {
  const streaks = []
  let active = []
  const minStreakLength = 2

  data.forEach(row => {
    const streakInProgress = active.length > 0
    const criteriaSatisfied = rowSatisfiesCriteria({ row, criteria })

    if (streakInProgress) {
      if (criteriaSatisfied) {
        active.push(row)
      } else {
        if (active.length >= minStreakLength) streaks.push(active)
        active = []
      }
    } else {
      if (criteriaSatisfied) active.push(row)
    }
  })

  const output = streaks.map(raw => {
    return {
      start: raw[0][displayColumn],
      end: raw[raw.length - 1][displayColumn],
      value: raw.length,
      active: false
    }
  })

  if (active.length >= minStreakLength) {
    output.push({
      start: active[0][displayColumn],
      end: active[active.length - 1][displayColumn],
      value: active.length,
      active: true
    })
  }

  return output
}

module.exports = getStreaks
module.exports.rowSatisfiesCriteria = rowSatisfiesCriteria
