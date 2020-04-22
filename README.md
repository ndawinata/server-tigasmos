[![Tigasmos Logo](https://github.com/ndawinata/server-tigasmos/blob/master/logo-resize.png)](http://tigasmos-stmkg.my.id/)

Tide Gauge Monitoring Station adalah stasiun yang digunakan untuk memonitor pasang dan surut air laut menggunakan
sensor untuk mengukur ketinggian pasang dan surut air laut terhadap mean sea level. data hasil pengamatan pasang dan
surut air laut akan ditampilkan ke website, aplikasi mobile android, dan aplikasi mobile iOS. source code pada halaman
ini adalah source code pada server tigasmos yang berperan sebagai server middleware. server menerima data dari station
tigasmosmos menggunakan konsep IoT dengan http POST lalu data akan di tampilkan secara realtime di seluruh platform tigasmos menggunakan websocket.

## Quick Start

Install dependencies:

```bash
$ npm install  or  yarn install
$ npm install pm2@latest -g
or
$ yarn global add pm2
```

Start
Start the server:

```bash
$ npm start or yarn start
or
$ pm2 start dist/index.js
or
$ pm2 start src/server.js
```
Build
untuk mebuild program :
```bash
$ yarn run build
or 
$ npm run build
```

Sebelum Production 
pastkan membersihkan folder dist :
```bash
$ yarn run clean
or 
$ npm run clean
```

Production
```bash
$ yarn run production
or 
$ npm run production
```

stop PM2
```bash
$ pm2 stop app_name
$ pm2 stop id_app
$ pm2 stop all
```
untuk memonitor :
```bash
$ pm2 monit
$ pm2 plus
```

View the server at: http://localhost:5000

## Developer

Nanda Winata

Sekolah Tinggi Meteorologi Klimatologi dan Geofisika (STMKG)

41.16.0025
