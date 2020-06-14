import express from 'express'
import * as controller from './controller'

const Route = express.Router()

Route.route('/delta')
    .get(controller.getdelta)
    .post(controller.adddelta)

Route.route('/lokasi')
    .get(controller.getlokasi)
    .post(controller.addlokasi)

Route.route('/notif')
    .get(controller.getnotif)
    .post(controller.addnotif)

Route.route('/site-1')
    .get(controller.getsite_1)
    .post(controller.addsite_1)

Route.route('/site-2')
    .get(controller.getsite_2)
    .post(controller.addsite_2)

Route.route('/site-3')
    .get(controller.getsite_3)
    .post(controller.addsite_3)

Route.route('/lokasi/:id')
    .put(controller.updatelokasi)
    .delete(controller.deletelokasi)

Route.route('/delta/:id')
    .put(controller.updatedelta)
    .delete(controller.deletedelta)

Route.route('/site-1/:id')
    .get(controller.getonesite_1)
    .put(controller.updatesite1)
    .delete(controller.deletesite1)

Route.route('/site-2/:id')
    .get(controller.getonesite_2)
    .put(controller.updatesite2)
    .delete(controller.deletesite2)

Route.route('/site-3/:id')
    .get(controller.getonesite_3)
    .put(controller.updatesite3)
    .delete(controller.deletesite3)

Route.route('/notif/:id')
    .get(controller.getonenotif)
    .put(controller.updatenotif)
    .delete(controller.deletenotif)

export default Route