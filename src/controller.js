import axios from 'axios'
import moment from 'moment'
import parseString from 'xml2js'
const parse = parseString.parseString

import {
    site1,
    site2,
    site3,
    notif,
    lokasi,
    deltamaps
} from './model'

// ------- Get Data ---------

// Get Lokasi Delta
export const getdelta = (request, response) => {
    deltamaps.find().exec((error, datas) => {
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

// Get Lokasi Lokasi
export const getlokasi = (request, response) => {
    lokasi.find().exec((error, datas) => {
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
                let obj
                parse(respon.data, (err, res)=>{
                    let dat = JSON.stringify(res)
                    let json = JSON.parse(dat)
                    obj = json
                })

                // tanggal = obj.Infotsunami.Gempa.Tanggal
                // uncomment dibawah untuk custom tgl potensi tsunami
                // tanggal = '03-Apr-20'
                tanggal =  moment().format('DD-MMM-YY')
                // latPot = obj.Infotsunami.Gempa.Lintang
                // lonPot = obj.Infotsunami.Gempa.Bujur
                // tesing uncomment kode dibawah ini
                latPot = -6.481760
                lonPot = 105.669444
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
        // dateNow = "03-Apr-20"
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
        hasil = hasil.toFixed(2)
        if (oldDate != datePotensi) {
            status = 0
        }

        if (dateNow == datePotensi && status == 0 && rangeLon && rangeLat) {
            if (hasil >= 0.5) {
                console.log('Konfirmasi kedatangan tsunami')
                var notifikasi = {
                    'nama': 'site 1',
                    'date': newData.date,
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
        global.io.emit('site-1', data)
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
                let obj
                parse(respon.data, (err, res)=>{
                    let dat = JSON.stringify(res)
                    let json = JSON.parse(dat)
                    obj = json
                })

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
        hasil = hasil.toFixed(2)
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
        global.io.emit('site-2', data)
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
                let obj
                parse(respon.data, (err, res)=>{
                    let dat = JSON.stringify(res)
                    let json = JSON.parse(dat)
                    obj = json
                })

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
        hasil = hasil.toFixed(2)
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
        global.io.emit('site-3', data)
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

// Add Delta Maps
export const adddelta = (request, response) => {
    const newData = new deltamaps(request.body)

    newData.save((error, data) => {
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

// Add Lokasi
export const addlokasi = (request, response) => {
    const newData = new lokasi(request.body)

    newData.save((error, data) => {
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

// Add data Notif
export const addnotif = (request, response) => {
    const newData = new notif(request.body)

    newData.save((error, data) => {
        global.io.emit('notif', data)
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

// Put, get by id, delete

// -------------- Delta Maps ------------------
// put
export const updatedelta = (request, response) => {
    deltamaps.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true }, (error, data) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal mengupdate data!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil mengupdate data!',
            data
            })
        })
}
// delete
export const deletedelta = (request, response) => {
    deltamaps.findByIdAndRemove({ _id: request.params.id }).exec((error, data) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Terjadi error!',
                error
                })
            }
        if (Object.keys(data).length > 0) {
            return response.json({
            'success': true,
            'message': `Berhasil menghapus data Id ${request.params.id}`,
            data
            })
        } else {
            return response.json({
            'success': true,
            'message': `Tidak ada data dengan Id ${request.params.id}`,
            })
        }
    })
}

// -------------- Lokasi ------------------
// put
export const updatelokasi = (request, response) => {
    lokasi.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true }, (error, data) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal mengupdate data!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil mengupdate data!',
            data
            })
        })
}
// delete
export const deletelokasi = (request, response) => {
    lokasi.findByIdAndRemove({ _id: request.params.id }).exec((error, data) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Terjadi error!',
                error
                })
            }
        if (Object.keys(data).length > 0) {
            return response.json({
            'success': true,
            'message': `Berhasil menghapus data Id ${request.params.id}`,
            data
            })
        } else {
            return response.json({
            'success': true,
            'message': `Tidak ada data dengan Id ${request.params.id}`,
            })
        }
    })
}

// -------------- Site 1 ------------------

// get by id
export const getonesite_1 = (request, response) => {
    site1.find({ _id: request.params.id }).exec((error, data) => {
        if (error) {
        return response.json({
            'success': false,
            'message': 'Gagal mengambil data!',
            error
        })
    }
        return response.json({
            'success': true,
            'message': 'Berhasil mengambil data!',
            data
        })
    })
}

// Put / Update

export const updatesite1 = (request, response) => {
    site1.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true }, (error, data) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal mengupdate data!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil mengupdate data!',
            data
            })
        })
}

// delete data

export const deletesite1 = (request, response) => {
    site1.findByIdAndRemove({ _id: request.params.id }).exec((error, data) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Terjadi error!',
                error
                })
            }
        if (Object.keys(data).length > 0) {
            return response.json({
            'success': true,
            'message': `Berhasil menghapus data Id ${request.params.id}`,
            data
            })
        } else {
            return response.json({
            'success': true,
            'message': `Tidak ada data dengan Id ${request.params.id}`,
            })
        }
    })
}

// -------------- Site 2 ------------------

// get by id
export const getonesite_2 = (request, response) => {
    site2.find({ _id: request.params.id }).exec((error, data) => {
        if (error) {
        return response.json({
            'success': false,
            'message': 'Gagal mengambil data!',
            error
        })
    }
        return response.json({
            'success': true,
            'message': 'Berhasil mengambil data!',
            data
        })
    })
}

// Put / Update
export const updatesite2 = (request, response) => {
    site2.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true }, (error, data) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal mengupdate data!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil mengupdate data!',
            data
            })
        })
}

// delete data

export const deletesite2 = (request, response) => {
    site2.findByIdAndRemove({ _id: request.params.id }).exec((error, data) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Terjadi error!',
                error
                })
            }
        if (Object.keys(data).length > 0) {
            return response.json({
            'success': true,
            'message': `Berhasil menghapus data Id ${request.params.id}`,
            data
            })
        } else {
            return response.json({
            'success': true,
            'message': `Tidak ada data dengan Id ${request.params.id}`,
            })
        }
    })
}

// -------------- Site 3 ------------------

// get by id
export const getonesite_3 = (request, response) => {
    site3.find({ _id: request.params.id }).exec((error, data) => {
        if (error) {
        return response.json({
            'success': false,
            'message': 'Gagal mengambil data!',
            error
        })
    }
        return response.json({
            'success': true,
            'message': 'Berhasil mengambil data!',
            data
        })
    })
}

// Put / Update
export const updatesite3 = (request, response) => {
    site3.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true }, (error, data) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal mengupdate data!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil mengupdate data!',
            data
            })
        })
}

// delete data

export const deletesite3 = (request, response) => {
    site3.findByIdAndRemove({ _id: request.params.id }).exec((error, data) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Terjadi error!',
                error
                })
            }
        if (Object.keys(data).length > 0) {
            return response.json({
            'success': true,
            'message': `Berhasil menghapus data Id ${request.params.id}`,
            data
            })
        } else {
            return response.json({
            'success': true,
            'message': `Tidak ada data dengan Id ${request.params.id}`,
            })
        }
    })
}

// -------------- Notif ------------------

// get by id
export const getonenotif = (request, response) => {
    notif.find({ _id: request.params.id }).exec((error, data) => {
        if (error) {
        return response.json({
            'success': false,
            'message': 'Gagal mengambil data!',
            error
        })
    }
        return response.json({
            'success': true,
            'message': 'Berhasil mengambil data!',
            data
        })
    })
}

// Put / Update
export const updatenotif = (request, response) => {
    notif.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true }, (error, data) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Gagal mengupdate data!',
                error
            })
        }
        return response.json({
            'success': true,
            'message': 'Berhasil mengupdate data!',
            data
            })
        })
}

// delete data

export const deletenotif = (request, response) => {
    notif.findByIdAndRemove({ _id: request.params.id }).exec((error, data) => {
        if (error) {
            return response.json({
                'success': false,
                'message': 'Terjadi error!',
                error
                })
            }
        if (Object.keys(data).length > 0) {
            return response.json({
            'success': true,
            'message': `Berhasil menghapus data Id ${request.params.id}`,
            data
            })
        } else {
            return response.json({
            'success': true,
            'message': `Tidak ada data dengan Id ${request.params.id}`,
            })
        }
    })
}