const Market = require('../model/Market')
const jwt = require('jsonwebtoken')


const marketauth = (req, res, next) => {
    const { marketId } = req.params
    const { token } = req.headers
    const payload = jwt.verify(token, 'APASIH')
    Market.findById(marketId)
        .then((market) => {
            if (market) {
                if (market.Author.toString() === payload.id) next();
                console.log(payload)
            } else next({ name: 'INVALID_TOKEN' });
        })
        .catch((err) => next({ name: 'TOKEN_NOT_FOUND' }))
}



module.exports = marketauth