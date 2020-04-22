// import express from 'express'
// const app = express()
// const server = require('http').Server(app)
// const io = require('socket.io')(server)
const axios = require('axios')
const parser = require('xml2json');
const moment = require('moment')
import {
    site1,
    site2,
    site3,
    notif
} from './model'

// ------- Get Data ---------


// Get data site 1
export const getsite_1 = (request, response) => {
    site1.find().exec((error, datas) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal mengambil datas!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil mengambil datas!',
            datas
        })
    })
}
// Get data site 2
export const getsite_2 = (request, response) => {
    site2.find().exec((error, datas) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal mengambil datas!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil mengambil datas!',
            datas
        })
    })
}

// get data site 3
export const getsite_3 = (request, response) => {
    site3.find().exec((error, datas) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal mengambil datas!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil mengambil datas!',
            datas
        })
    })
}

// Get data notif
export const getnotif = (request, response) => {
    notif.find().exec((error, datas) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal mengambil datas!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil mengambil datas!',
            datas
        })
    })
}



// ------- Add Data ---------

// add data potesial tsunami

// --------------- Area Percobaan -------------
let status, oldDate, dateNow, datePotensi, newPasut, oldPasut

// Koordinate lokasi Site Tigasmos
//  site 1
const site1Lat = -6.481760
const site1Lon = 105.669444
// site 2
const site2Lat = -5.916742
const site2Lon = 106.027434
// site 3
const site3Lat = -6.085411
const site3Lon = 106.727449


export const addsite_1 = (request, response) => {
    const newData = new site1(request.body)

    // --------
    async function main() {
        var tanggal
        let siteLatUp = site1Lat + 5
        let siteLatDown = site1Lat - 5
        let siteLonUp = site1Lon + 5
        let siteLonDown = site1Lon - 5
        let rangeLat, rangeLon, latPot, lonPot
        await axios.get("https://data.bmkg.go.id/lasttsunami.xml")
            .then(respon => {
                var json = parser.toJson(respon.data)
                var obj = JSON.parse(json)
                tanggal = obj.Infotsunami.Gempa.Tanggal
                latPot = obj.Infotsunami.Gempa.Lintang
                lonPot = obj.Infotsunami.Gempa.Bujur
                // tesing uncomment kode dibawah ini
                // latPot = -6.481760
                // lonPot = 105.669444
            })

        // ------------------------ PENTING --------------------------
        // untuk pengujian mengeluarkan nilai konfirmasi kedatangan 
        // lokasi masuk +- 5 dari lokasi tide gauge
        // ex:
        // latPot = -6.481760
        // lonPot = 105.669444
        // 
        // untuk uji notifikasi ganti dateNow dan yang dikirim oleh site tigasmos tanggal yang sama
        // ex:
        // dateNow = 14-Nov-19
        // dan post data dari site ex:
        //  awal pengiriman
        // {
        //     "pasut_sensor_tekanan":1,
        //     "pasut_sensor_ultrasonik":1,
        //     "date":"2019-11-14T17:11:47.000+07:00"
        // }
        // pengiriman ke 2
        // {
        //     "pasut_sensor_tekanan":2,
        //     "pasut_sensor_ultrasonik":2,
        //     "date":"2019-11-14T17:11:47.000+07:00"
        // }
        //  nilai pasut harus berambah >= 0.5 m

        // ------------------------ PENTING --------------------------

        newPasut = newData.pasut_sensor_ultrasonik
        dateNow = moment().format('DD-MMM-YY')
        // tesing uncomment kode dibawah
        // dateNow = "14-Nov-19"
        // ---------------
        datePotensi = tanggal

        // Filter Lokasi | bila lokasi +- 5 dari lat dan lon
        if (latPot > siteLatDown && latPot < siteLatUp) {
            rangeLat = true
        } else {
            rangeLat = false
        }

        if (lonPot > siteLonDown && lonPot < siteLonUp) {
            rangeLon = true
        } else {
            rangeLon = false
        }

        let hasil = newPasut - oldPasut
        if (oldDate != datePotensi) {
            status = 0
        }

        if (dateNow == datePotensi && status == 0 && rangeLon && rangeLat) {
            if (hasil >= 0.5) {
                console.log('Konfirmasi kedatangan tsunami')
                var notifikasi = {
                    'nama': 'site 1',
                    'date': moment().format(),
                    'ketinggian': hasil,
                    'lokasi': `${site1Lat}, ${site1Lon}`
                }
                const newNotifikasi = new notif(notifikasi)
                newNotifikasi.save()
                global.io.emit('notif', notifikasi)
                status = 1
                oldDate = datePotensi
            }
        }
        // console.log('old pasut : ' + oldPasut + ' | new pasut : ' + newPasut + ' | old date : ' + oldDate + ' | date pot : ' + datePotensi + ' | hasil : ' + hasil)
        oldPasut = newPasut
    }
    main()
    // handle post response
    newData.save((error, data) => {
        global.io.emit('site1', data)
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal menambah data!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil Menambahkan data',
            data
        })
    })
}

// Add data site 2
export const addsite_2 = (request, response) => {
    const newData = new site2(request.body)

    async function main() {
        var tanggal
        let siteLatUp = site2Lat + 5
        let siteLatDown = site2Lat - 5
        let siteLonUp = site2Lon + 5
        let siteLonDown = site2Lon - 5
        let rangeLat, rangeLon, latPot, lonPot
        await axios.get("https://data.bmkg.go.id/lasttsunami.xml")
            .then(respon => {
                var json = parser.toJson(respon.data)
                var obj = JSON.parse(json)
                tanggal = obj.Infotsunami.Gempa.Tanggal
                latPot = obj.Infotsunami.Gempa.Lintang
                lonPot = obj.Infotsunami.Gempa.Bujur
                // tesing uncomment kode dibawah ini
                // latPot = -6.481760
                // lonPot = 105.669444
            })

        // ------------------------ PENTING --------------------------
        // untuk pengujian mengeluarkan nilai konfirmasi kedatangan 
        // lokasi masuk +- 5 dari lokasi tide gauge
        // ex:
        // latPot = -6.481760
        // lonPot = 105.669444
        // 
        // untuk uji notifikasi ganti dateNow dan yang dikirim oleh site tigasmos tanggal yang sama
        // ex:
        // dateNow = 14-Nov-19
        // dan post data dari site ex:
        //  awal pengiriman
        // {
        //     "pasut_sensor_tekanan":1,
        //     "pasut_sensor_ultrasonik":1,
        //     "date":"2019-11-14T17:11:47.000+07:00"
        // }
        // pengiriman ke 2
        // {
        //     "pasut_sensor_tekanan":2,
        //     "pasut_sensor_ultrasonik":2,
        //     "date":"2019-11-14T17:11:47.000+07:00"
        // }
        //  nilai pasut harus berambah >= 0.5 m

        // ------------------------ PENTING --------------------------

        newPasut = newData.pasut_sensor_ultrasonik
        dateNow = moment().format('DD-MMM-YY')
        // tesing uncomment kode dibawah
        // dateNow = "14-Nov-19"
        // ---------------
        datePotensi = tanggal

        // Filter Lokasi | bila lokasi +- 5 dari lat dan lon
        if (latPot > siteLatDown && latPot < siteLatUp) {
            rangeLat = true
        } else {
            rangeLat = false
        }

        if (lonPot > siteLonDown && lonPot < siteLonUp) {
            rangeLon = true
        } else {
            rangeLon = false
        }

        let hasil = newPasut - oldPasut
        if (oldDate != datePotensi) {
            status = 0
        }

        if (dateNow == datePotensi && status == 0 && rangeLon && rangeLat) {
            if (hasil >= 0.5) {
                console.log('Konfirmasi kedatangan tsunami')
                var notifikasi = {
                    'nama': 'site 2',
                    'date': moment().format(),
                    'ketinggian': hasil,
                    'lokasi': `${site2Lat}, ${site2Lon}`
                }
                const newNotifikasi = new notif(notifikasi)
                newNotifikasi.save()
                global.io.emit('notif', notifikasi)
                status = 1
                oldDate = datePotensi
            }
        }
        // console.log('old pasut : ' + oldPasut + ' | new pasut : ' + newPasut + ' | old date : ' + oldDate + ' | date pot : ' + datePotensi + ' | hasil : ' + hasil)
        oldPasut = newPasut
    }
    main()
    // handle post response

    newData.save((error, data) => {
        global.io.emit('site2', data)
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal menambah data!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil Menambahkan data',
            data
        })
    })
}

// Add data site 3
export const addsite_3 = (request, response) => {
    const newData = new site3(request.body)

    async function main() {
        var tanggal
        let siteLatUp = site3Lat + 5
        let siteLatDown = site3Lat - 5
        let siteLonUp = site3Lon + 5
        let siteLonDown = site3Lon - 5
        let rangeLat, rangeLon, latPot, lonPot
        await axios.get("https://data.bmkg.go.id/lasttsunami.xml")
            .then(respon => {
                var json = parser.toJson(respon.data)
                var obj = JSON.parse(json)
                tanggal = obj.Infotsunami.Gempa.Tanggal
                latPot = obj.Infotsunami.Gempa.Lintang
                lonPot = obj.Infotsunami.Gempa.Bujur
                // tesing uncomment kode dibawah ini
                // latPot = -6.481760
                // lonPot = 105.669444
            })

        // ------------------------ PENTING --------------------------
        // untuk pengujian mengeluarkan nilai konfirmasi kedatangan 
        // lokasi masuk +- 5 dari lokasi tide gauge
        // ex:
        // latPot = -6.481760
        // lonPot = 105.669444
        // 
        // untuk uji notifikasi ganti dateNow dan yang dikirim oleh site tigasmos tanggal yang sama
        // ex:
        // dateNow = 14-Nov-19
        // dan post data dari site ex:
        //  awal pengiriman
        // {
        //     "pasut_sensor_tekanan":1,
        //     "pasut_sensor_ultrasonik":1,
        //     "date":"2019-11-14T17:11:47.000+07:00"
        // }
        // pengiriman ke 2
        // {
        //     "pasut_sensor_tekanan":2,
        //     "pasut_sensor_ultrasonik":2,
        //     "date":"2019-11-14T17:11:47.000+07:00"
        // }
        //  nilai pasut harus berambah >= 0.5 m

        // ------------------------ PENTING --------------------------

        newPasut = newData.pasut_sensor_ultrasonik
        dateNow = moment().format('DD-MMM-YY')
        // tesing uncomment kode dibawah
        // dateNow = "14-Nov-19"
        // ---------------
        datePotensi = tanggal

        // Filter Lokasi | bila lokasi +- 5 dari lat dan lon
        if (latPot > siteLatDown && latPot < siteLatUp) {
            rangeLat = true
        } else {
            rangeLat = false
        }

        if (lonPot > siteLonDown && lonPot < siteLonUp) {
            rangeLon = true
        } else {
            rangeLon = false
        }

        let hasil = newPasut - oldPasut
        if (oldDate != datePotensi) {
            status = 0
        }

        if (dateNow == datePotensi && status == 0 && rangeLon && rangeLat) {
            if (hasil >= 0.5) {
                console.log('Konfirmasi kedatangan tsunami')
                var notifikasi = {
                    'nama': 'site 3',
                    'date': moment().format(),
                    'ketinggian': hasil,
                    'lokasi': `${site3Lat}, ${site3Lon}`
                }
                const newNotifikasi = new notif(notifikasi)
                newNotifikasi.save()
                global.io.emit('notif', notifikasi)
                status = 1
                oldDate = datePotensi
            }
        }
        // console.log('old pasut : ' + oldPasut + ' | new pasut : ' + newPasut + ' | old date : ' + oldDate + ' | date pot : ' + datePotensi + ' | hasil : ' + hasil)
        oldPasut = newPasut
    }
    main()
    // handle post response

    newData.save((error, data) => {
        global.io.emit('site3', data)
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal menambah data!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil Menambahkan data',
            data
        })
    })
}