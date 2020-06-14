import mongoose from 'mongoose'

var Schema = mongoose.Schema({
    date: Date,
    pasut_sensor_tekanan: Number,
    pasut_sensor_ultrasonik: Number
})
var notifSchema = mongoose.Schema({
    nama: String,
    date: String,
    ketinggian: Number,
    lokasi: String
})
var Lokasi = mongoose.Schema({
    nama: String,
    latitude: Number,
    longitude: Number
})
var DeltaMaps = mongoose.Schema({
    latitude: Number,
    longitude: Number
})

const delta = mongoose.model('Lokasi', DeltaMaps)
const lokasi = mongoose.model('Lokasi', Lokasi)
const notif = mongoose.model('Notif', notifSchema)
const site1 = mongoose.model('Site-1', Schema)
const site2 = mongoose.model('Site-2', Schema)
const site3 = mongoose.model('Site-3', Schema)

export {
    delta,
    lokasi,
    notif,
    site1,
    site2,
    site3,
}

// convert date to JSON => var d = new Date()
// d.toJSON()