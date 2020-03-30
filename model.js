import mongoose from 'mongoose'

var Schema = mongoose.Schema({
    date: Date,
    pasut_sensor_tekanan: Number,
    pasut_sensor_ultrasonik: Number
})
var notifSchema = mongoose.Schema({
    date: Date,
    pesan: String,
    lokasi: String
})

const notif = mongoose.model('Notif', notifSchema)
const site1 = mongoose.model('Site-1', Schema)
const site2 = mongoose.model('Site-2', Schema)
const site3 = mongoose.model('Site-3', Schema)

export {
    notif,
    site1,
    site2,
    site3,
}

// convert date to JSON => var d = new Date()
// d.toJSON()