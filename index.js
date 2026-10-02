const atan2 = Math.atan2
const cos = Math.cos
const sin = Math.sin
const sqrt = Math.sqrt
const PI = Math.PI

// equatorial mean radius of Earth (in meters)
const R = 6378137

function squared (x) { return x * x }
function toRad (x) { return x * PI / 180.0 }
function hav (x) {
  return squared(sin(x / 2))
}

function readPoint (point, label) {
  if (point == null) {
    throw new TypeError(`haversine-distance: ${label} coordinate is missing`)
  }

  const lat = Array.isArray(point) ? point[1] : point.latitude ?? point.lat
  const lng = Array.isArray(point) ? point[0] : point.longitude ?? point.lng ?? point.lon

  if (!Number.isFinite(lat)) {
    throw new TypeError(`haversine-distance: ${label} latitude must be a finite number`)
  }
  if (!Number.isFinite(lng)) {
    throw new TypeError(`haversine-distance: ${label} longitude must be a finite number`)
  }

  return { lat: toRad(lat), lng: toRad(lng) }
}

// hav(theta) = hav(bLat - aLat) + cos(aLat) * cos(bLat) * hav(bLon - aLon)
function haversineDistance (a, b) {
  const start = readPoint(a, 'start')
  const end = readPoint(b, 'end')

  const ht = hav(end.lat - start.lat) + cos(start.lat) * cos(end.lat) * hav(end.lng - start.lng)
  return 2 * R * atan2(sqrt(ht), sqrt(1 - ht))
}

module.exports = haversineDistance
