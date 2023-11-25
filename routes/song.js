const express = require('express')
const { get_info, get_search_info } = require('../controllers/song')
const route = express.Router()

route.get('/', get_info)
route.get('/search', get_search_info)

module.exports = route