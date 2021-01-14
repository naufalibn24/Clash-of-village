const Barrack = require('../model/Barrack')
const jwt = require('jsonwebtoken')


const rackauth = (req, res, next) => {
    const { barrackId } = req.params
    const { token } = req.headers
    const payload = jwt.verify(token, 'APASIH')
    Barrack.findById(barrackId)
        .then((racks) => {
            if (racks) {
                if (racks.Author.toString() === payload.id) next();
                console.log(payload)
            } else next({ name: 'INVALID_TOKEN' });
        })
        .catch((err) => next({ name: 'TOKEN_NOT_FOUND' }))
}



module.exports = rackauth