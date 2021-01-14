const jwt = require('jsonwebtoken')
const Player = require('../model/Player')

const playerauthorization = (req, res, next) => {
    const { playerId } = req.params
    const { token } = req.headers
    const payload = jwt.verify(token, 'APASIH')
    Player.findById(playerId)
        .then((player => {
            if (player) {
                if (player.Id == payload.id)
                    console.log(payload)
                next();
            }
            else next({ name: 'INVALID_TOKEN' })
        }))
        .catch((err) => ({ name: 'TOKEN_NOT_FOUND' }))
}

module.exports = playerauthorization