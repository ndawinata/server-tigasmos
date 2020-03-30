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
    site3
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

// Get data site 3
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
        // var tanggal, d, dn, dt
        // var d
        var tanggal
        let site1LatUp = site1Lat + 5
        let site1LatDown = site1Lat - 5
        let site1LonUp = site1Lon + 5
        let site1LonDown = site1Lon - 5
        let rangeLat, rangeLon, latPot, lonPot
        await axios.get("https://data.bmkg.go.id/lasttsunami.xml")
            .then(respon => {
                var json = parser.toJson(respon.data)
                var obj = JSON.parse(json)
                tanggal = obj.Infotsunami.Gempa.Tanggal
                latPot = obj.Infotsunami.Gempa.Lintang
                lonPot = obj.Infotsunami.Gempa.Bujur
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
        datePotensi = tanggal

        // Filter Lokasi | bila lokasi +- 5 dari lat dan lon
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

        let hasil = newPasut - oldPasut
        if (oldDate != datePotensi) {
            status = 0
        }

        if (dateNow == datePotensi && status == 0 && rangeLon && rangeLat) {
            if (hasil >= 0.5) {
                console.log('Konfirmasi kedatangan tsunami')
                status = 1
                oldDate = datePotensi
            }
        }
        console.log('old pasut : ' + oldPasut + ' | new pasut : ' + newPasut + ' | old date : ' + oldDate + ' | date pot : ' + datePotensi + ' | hasil : ' + hasil)
        oldPasut = newPasut
    }
    main()



    // // --------
    // newPasut = newData.pasut_sensor_ultrasonik
    // dateNow = request.body.datenow
    // datePotensi = request.body.datepot

    // let hasil = newPasut - oldPasut
    // if (oldDate != datePotensi) {
    //     status = 0
    // }

    // if (dateNow == datePotensi && status == 0) {
    //     if (hasil >= 0.5) {
    //         console.log('Konfirmasi kedatangan tsunami')
    //         status = 1
    //         oldDate = datePotensi
    //     }
    // }
    // console.log('old pasut : ' + oldPasut + ' | new pasut : ' + newPasut + ' | old date : ' + oldDate + ' | date pot : ' + datePotensi + ' | hasil : ' + hasil)
    // oldPasut = newPasut

    // // --------------- Area Percobaan -------------

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
    newData.save((error, data) => {
        io.emit('site2', data)
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
    newData.save((error, data) => {
        io.emit('site3', data)
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