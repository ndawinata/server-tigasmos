import express from 'express'
import * as controller from './controller'

const Route = express.Router()

Route.route('/notif')
    .get(controller.getnotif)

Route.route('/site-1')
    .get(controller.getsite_1)
    .post(controller.addsite_1)

Route.route('/site-2')
    .get(controller.getsite_2)
    .post(controller.addsite_2)

Route.route('/site-3')
    .get(controller.getsite_3)
    .post(controller.addsite_3)

export default Route