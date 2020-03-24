// import express from 'express'
// const app = express()
// const server = require('http').Server(app)
// const io = require('socket.io')(server)
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

// Add data site 1
export const addsite_1 = (request, response) => {
    const newData = new site1(request.body)
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