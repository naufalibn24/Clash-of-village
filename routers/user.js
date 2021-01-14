const express = require('express')
const approuter = express.Router()
const PlayerController = require('../Controllers/playerController')
const authorization = require('../middlewares/auth')


approuter.post('/register', PlayerController.register);
approuter.post('/login', PlayerController.login)
approuter.get('/:playerId', authorization, PlayerController.Getplayer)
approuter.put('/:playerId', authorization, PlayerController.UpdatePlayer)
approuter.post('/:playerId/attack/:opponentId', PlayerController.Invadeplayer)
module.exports = approuter