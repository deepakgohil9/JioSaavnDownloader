const express = require('express')
const { get_info } = require('../controllers/song')
const route = express.Router()

route.get('/', get_info)

module.exports = route