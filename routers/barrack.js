const express = require('express')
const approuter = express.Router()
const BarrackController = require('../Controllers/barrackController')
const rackauth = require('../Middlewares/barrackauth')
const auth = require('../Middlewares/auth')


approuter.post('/barrack/:playerId', auth, BarrackController.CreateBarrack)
approuter.get('/barrack/all/:playerId', auth, BarrackController.listBarracks)
approuter.get('/barrack/:barrackId', rackauth, BarrackController.getBarrackInfo)
approuter.put('/barrack/:barrackId', rackauth, BarrackController.UpdateBarrack)
approuter.get('/barrack/:barrackId/collect', rackauth, BarrackController.CollectSoldiers)
approuter.delete('/barrack/:barrackId', rackauth, BarrackController.DeleteRacks)



module.exports = approuter