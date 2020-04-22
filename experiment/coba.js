import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
// import Route from './route'

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const port = 9000

var d = Date()
// d.prototype.getDate()

var h = {
    date: Date,
}
h.date = d
var m = h.date.toString()
// console.log(m)
// console.log(typeof (h.date))

var site = [
    "site1",
    "site2",
    "site3"
]

app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept')
    next();
})

// set bodyParser sebagai middleware yang akan memparsing body request
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// app.use(function (req, res, next) {
//     req.io = io;
//     next();
// });

// connect ke database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/cobacoba', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
var schema = mongoose.Schema({
    name: String,
    date: Date()
});
var absen = mongoose.model('cobacoba', schema);


site.forEach((namaSite)=>{
    app.post('/:id', (req, res) => {
        const newData = new namaSite(req.body)
        newData.save((error, data) => {
            io.emit('masuk', data)
            if (error) {
                return res.json({
                    'success': false,
                    'message': 'Gagal menambah data!',
                    error
                })
            }
            return res.json({
                'success': true,
                'message': 'Berhasil Menambahkan data',
                data
            })
        })
    })
})

server.listen(port, () => {
    console.log(`berjalan di port ${port}`)
})

// app.post('/absen', (req, res) => {
//     const newData = new absen(req.body)
//     newData.save((error, data) => {
//         io.emit('masuk', data)
//         if (error) {
//             return res.json({
//                 'success': false,
//                 'message': 'Gagal menambah data!',
//                 error
//             })
//         }
//         return res.json({
//             'success': true,
//             'message': 'Berhasil Menambahkan data',
//             data
//         })
//     })
// })