const express = require('express')
const router = express.Router()
const AppController = require('../controllers/app.controller')


router.get('/', AppController.renderPage)
module.exports = router