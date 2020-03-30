// simulasi tanggal dan kenaikan pasut sehingga mengeluarkan notif

let status = 0
let oldDate = 0
let dateNow = 0
let datePotensi = 0
let newPasut = 0
let oldPasut = 0

newPasut = newData.pasut_sensor_ultrasonik
dateNow = request.body.datenow
datePotensi = request.body.datepot

let hasil = newPasut - oldPasut
    if (oldDate != datePotensi) {
        status = 0
    }
    
    if (dateNow == datePotensi && status == 0) {
        if (hasil >= 0.5) {
            console.log('Konfirmasi kedatangan tsunami')
            status = 1
            oldDate = datePotensi
        }
    }
    console.log('old pasut : ' + oldPasut + ' | new pasut : ' + newPasut + ' | old date : ' + oldDate + ' | date pot : ' + datePotensi + ' | hasil : ' + hasil)
    oldPasut = newPasut