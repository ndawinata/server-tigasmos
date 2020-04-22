 // --------
 async function main() {
    var tanggal, d, dn
    // var d
    await axios.get("https://data.bmkg.go.id/lasttsunami.xml")
        .then(respon => {
            var json = parser.toJson(respon.data)
            var obj = JSON.parse(json)
            tanggal = obj.Infotsunami.Gempa.Tanggal
            // console.log(tanggal)

            // return tanggal
        })
    d = new Date(tanggal)
    dn = new Date()
    console.log("tigasmos : " + newData.date)
    console.log("potensi : " +d)
    console.log("sekarang : " +dn)
}
main()