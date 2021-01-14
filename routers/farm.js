const express = require('express')
const approuter = express.Router()
const FarmController = require('../Controllers/farmController')
const farmauth = require('../Middlewares/farmauth')
const auth = require('../Middlewares/auth')


approuter.post('/farms/:playerId', auth, FarmController.CreateFarm)
approuter.get('/farms/all/:playerId', auth, FarmController.listFarms)
approuter.get('/farms/:farmId', farmauth, FarmController.getFarmInfo)
approuter.put('/farms/:farmId', farmauth, FarmController.UpdateFarm)
approuter.get('/farms/:farmId/collect', farmauth, FarmController.Collectfood)
approuter.delete('/farms/:farmId', farmauth, FarmController.DeleteFarm)


module.exports = approuter
