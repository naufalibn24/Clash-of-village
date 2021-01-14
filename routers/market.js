const express = require('express')
const approuter = express.Router()
const MarketController = require('../Controllers/marketController')
const marketauth = require('../Middlewares/marketauth')
const auth = require('../Middlewares/auth')

approuter.get('/markets/all/:playerId', auth, MarketController.listmarket)
approuter.get('/markets/:marketId', marketauth, MarketController.getMarketInfo)
approuter.post('/markets/:playerId', auth, MarketController.CreateMarket)
approuter.put('/markets/:marketId', marketauth, MarketController.UpdateMarket)
approuter.delete('/markets/:marketId', marketauth, MarketController.DeleteMarket)
approuter.get('/markets/:marketId/collect', marketauth, MarketController.Collectgold)

module.exports = approuter
