const express = require('express')
const routes = express.Router()

const {
    login,
    register
} = require('../controllers/auth')

routes.route('/login').post(login)
routes.route('/register').post(register)

module.exports = routes