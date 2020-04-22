// const axios = require('axios')
// const X2JS = require('xml2json');
const moment = require('moment')
d = new Date("25-Mar-18")
m = Date()
// d.setHours(+7)
//  penambahan UTC +7

k = new Date(d)
b = moment(k).format('DD-MMM-YY')

console.log(d)
console.log(m)
console.log(k)
console.log("moment : " + moment().format('DD-MMM-YY'))
console.log(b)


// get data with ajax
// import axios from 'axios'


// var parser = require('xml2json');

// var xml = "<foo attr=\"value\">bar</foo>";
// console.log("input -> %s", xml)

// // xml to json
// var json = parser.toJson(xml);
// console.log("to json -> %s", json);
// constructor(props) {
// super(props);
// this.state = 0
// }

// var obj = 0
// var nilai = 0
// let nilai = 90
// function tesresponse9(){

// }
// let tesresponse =
//     axios.get("https://data.bmkg.go.id/lasttsunami.xml")
//         .then(response => {
//             // console.log(response.data)
//             nilai = response.data
//                 return nilai
//             }

//             // function (data) {
//             //     // console.log(data.data)
//             //     var xml = data.data
//             //     var json = parser.toJson(xml)
//             //     obj = JSON.parse(json)
//             //     // window.nilai = 20
//             //     // var bumi = 20

//             //     babe = 20
//             //     // nilai = babe
//             //     // console.log(babe)
//             //     return {nilai :nilai+babe}

//             // }

//         )

// setTimeout(()=>{
//     var c = tesresponse
//     console.log(c)
// })
// // console.log(x)

// console.log(obj)



// const fetch = require('node-fetch');

// fetch('https://data.bmkg.go.id/lasttsunami.xml')
//     //   .then(response => response.json())
//     .then(res => console.log(res))
// console.log(data)
// var x2js = new X2JS();
// var tsunami = x2js.xml2json(xmlDoc)