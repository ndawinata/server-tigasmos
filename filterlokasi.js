const site1Lat = -6.481760
const site1Lon = 105.669444
const site2Lat = -5.916742
const site2Lon = 106.027434
const site3Lat = -6.085411
const site3Lon = 106.727449

let site1LatUp = site1Lat + 5
let site1LatDown = site1Lat - 5
let site1LonUp = site1Lon + 5
let site1LonDown = site1Lon - 5
let rangeLat, rangeLon, latPot, lonPot
// input test
latPot = -6.481760
lonPot = 105.669444

if (latPot > site1LatDown && latPot < site1LatUp) {
    rangeLat = true
} else {
    rangeLat = false
}

if (lonPot > site1LonDown && lonPot < site1LonUp) {
    rangeLon = true
} else {
    rangeLon = false
}
budi = 2
if (rangeLon && rangeLon && budi == 2) {
    console.log('Range Lat : ' + rangeLat + ' | Range Lon : ' + rangeLon)
}