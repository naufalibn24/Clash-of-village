const express = require('express');
const approuter = express.Router()
const userRoutes = require('./user')
const marketRoutes = require('./market')
const farmRoutes = require('./farm')
const barrackRoutes = require('./barrack')

const errorHandler = require('../Middlewares/errorHandler')

approuter.use('/users', userRoutes)
approuter.use('/building', marketRoutes)
approuter.use('/building', farmRoutes)
approuter.use('/building', barrackRoutes)



approuter.use(errorHandler)

module.exports = approuter