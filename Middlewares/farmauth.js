const Farm = require('../model/Farm')
const jwt = require('jsonwebtoken')


const farmauth = (req, res, next) => {
    const { farmId } = req.params
    const { token } = req.headers
    const payload = jwt.verify(token, 'APASIH')
    Farm.findById(farmId)
        .then((farm) => {
            if (farm) {
                if (farm.Author.toString() === payload.id) next();
                console.log(payload)
            } else next({ name: 'INVALID_TOKEN' });
        })
        .catch((err) => next({ name: 'TOKEN_NOT_FOUND' }))
}



module.exports = farmauth