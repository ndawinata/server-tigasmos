// // import { response } from "express"
const axios = require('axios')
// let nilai = 10
// let tesresponse =  axios.get('https://data.bmkg.go.id/lasttsunami.xml')
//     .then(response => async function x(response){
//         return nilai1 = 90
//     }
//     )
// console.log(await tesresponse.x.nilai1)
// result = 10

// function f() {

//     // let promise = new Promise((resolve, reject) => {
//     //     setTimeout(() => resolve("done!"), 1000)
//     // });
//     let tesresponse = axios.get('https://data.bmkg.go.id/lasttsunami.xml')
//         .then(function x(response) {
//             return nilai1 = 90
//         })
//     // var result = await promise; // wait until the promise resolves (*)
//     return result = 90
//     // "done!"
// }

// x = f()
// console.log(x)


// function getNameById() {
//     return axios.get('https://data.bmkg.go.id/lasttsunami.xml')
//         .then(response => {

//             return console.log(10)
//         })
// }
// var c = getNameById()

// console.log(c)


// -----------------------
// const resolvedprom = Promise.resolve(33)

// let theProm = resolvedprom
//     .then(value=>{
//         console.log('nananan')
//         return value
//     })
// // console.log(theProm)
// setTimeout(()=>{
//     var c = theProm
//     console.log(c)
// })
// -----------------------
// var p1 = new Promise((resolve, reject)=>{
//     resolve('Success!')
//     // reject('error cuy')
// })
// p1.then(value=>{
//     console.log(value)
// }, reason=>{
//     console.error(reason)
// })
var parser = require('xml2json');
state = {
    text: 'text disini'
}
var nama = ""
callFirstName = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('Nanda')
        }, 3000)
    })
}
callLastName = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(' Winata')
        }, 3000)
    })
}
cariTanggal = () => {
    axios.get("https://data.bmkg.go.id/lasttsunami.xml")
        .then(respon => {
            var json = parser.toJson(respon.data)
            obj = JSON.parse(json)
            tanggal = obj.Infotsunami.Gempa.Tanggal
            // console.log(tanggal)
            return tanggal
        })
}
cariLintang = ()=>{
    axios.get("https://data.bmkg.go.id/lasttsunami.xml")
        .then(respon => {
            var json = parser.toJson(respon.data)
            obj = JSON.parse(json)
            lintang = obj.Infotsunami.Gempa.Lintang
            return lintang
            // console.log(lintang)

        })
}
// login = async () => {
//     const first = await callFirstName()
//     const last = await callLastName()
//     nama = first + last
//     // console.log(nama)
//     return first + last
// }
// login()
// console.log(login())
// login()
cariLintang().then(data=>
    console.log(data)
)

// data = async () => {
//     const dptTanggal = await cariTanggal()
//     const dptLintang = await cariLintang()
//     console.log(dptLintang)
// }
// data()