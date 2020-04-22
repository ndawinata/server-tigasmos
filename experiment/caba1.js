const axios = require('axios')
var parser = require('xml2json');
var b = 0;
// (async function main() {
//     var a = 10
//     await axios.get("https://data.bmkg.go.id/lasttsunami.xml")
//         .then(respon => {
//             var json = parser.toJson(respon.data)
//             obj = JSON.parse(json)
//             tanggal = obj.Infotsunami.Gempa.Tanggal
//             // console.log(tanggal)
//             a = a + 20
//             b = a
//             // return tanggal
//         })

//     console.log(a)
// })()

async function main() {
    var a = 10
    await axios.get("https://data.bmkg.go.id/lasttsunami.xml")
        .then(respon => {
            var json = parser.toJson(respon.data)
            obj = JSON.parse(json)
            tanggal = obj.Infotsunami.Gempa.Tanggal
            // console.log(tanggal)
            a = a + 20
            b = a
            // return tanggal
        })

    console.log(a)
}

main()