const haversine = require('../')
const fixtures = require('./fixtures')
const tape = require('tape')

fixtures.forEach(function (f) {
  tape('returns ' + f.expected + ' for ' + f.description || JSON.stringify(f.arguments), function (t) {
    const actual = haversine.apply(null, f.arguments)

    t.plan(1)
    t.ok(Math.round(actual) === f.expected, `${actual} ~= ${f.expected}`)
  })
})

tape('throws when longitude is missing', function (t) {
  const a = { latitude: 37.8136 }
  const b = { latitude: 33.8650, longitude: 151.2094 }

  t.plan(1)
  t.throws(function () { haversine(a, b) }, /start longitude must be a finite number/)
})
