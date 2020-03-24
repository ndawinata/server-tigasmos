import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import Route from './route'

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
global.io = io

const port = 5000

// izinkan Cors
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

// connect ke database
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/server-tigasmos', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// set route
app.use('/api', Route)
app.get('/', (request, response) => {
    return response.end('Api Working')
})

server.listen(port, () => {
    console.log(`berjalan di port ${port}`)
})