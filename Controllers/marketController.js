const Market = require('../model/Market')
const Player = require('../model/Player')

class MarketController {
    static async CreateMarket(req, res, next) {
        const { MarketName } = req.body
        const { playerId } = req.params
        const playerdata = await Player.findById(playerId)
        const resource = playerdata.Resources
        const { golds, foods } = playerdata.Resources
        console.log(resource.golds)
        console.log(resource.foods)
        if (resource.golds >= 30 && resource.foods >= 10) {
            // find si id barak
            // if (barrack.length <= 30)
            const updateresource = await Player.findByIdAndUpdate(playerId,
                {
                    $set: { 'Resources.golds': golds - 30, 'Resources.foods': foods - 10 }, new: true
                })
            console.log(updateresource)
            const market = await Market.create({ MarketName, updateresource, Author: playerId })
            res.status(201).send(market)
            console.log(market)
        }
        else if (resource.golds < 30 || resource.foods < 10) {
            next({ name: 'GACUKUP' })
        }
        else {
            next({ name: 'DATA_ERROR' })
        }
    };
    static listmarket(req, res, next) {
        const { playerId } = req.params
        Market.find({ Author: playerId })
            .then((result) => {
                res.status(200).json({ message: 'your market', result })
                next()
            })
            .catch((err) => {
                next({ name: 'NOT_FOUND' })
            })
    };
    static async getMarketInfo(req, res, next) {
        const { marketId } = req.params
        const market = await Market.findById(marketId)
        console.log(market)
        const { createdAt, collectedAt } = market
        const timeInMs = Date.now();
        const collect = collectedAt;
        console.log('apaalu')
        if (collect == undefined) {
            const changedate = Date.parse(createdAt);
            let gold = Math.floor((timeInMs - changedate) / 60000)
            if (gold >= 20) {
                gold = 20;
                res.status(200).send({ market, gold })
            }
            else {
                res.status(200).send({ market, gold })
            }
        } else {
            const getcollect = Date.parse(collect)
            let gold = Math.floor((timeInMs - getcollect) / 60000)
            console.log(gold)
            if (gold >= 20) {
                gold = 20;
                res.status(200).send({ market, gold })
            }
            else {
                res.status(200).send({ market, gold })
            }
        }
    }
    static async Collectgold(req, res, next) {
        const { marketId } = req.params
        const market = await Market.findById(marketId)
        const author = await Player.findById(market.Author)
        const { golds } = author.Resources
        console.log(golds)
        console.log(author)
        const { createdAt, collectedAt } = market
        const timenow = Date.now()
        const collect = collectedAt
        if (collect == undefined) {
            const collecttime = new Date()
            console.log(collecttime)
            const date = Date.parse(createdAt)
            let getgolds = Math.floor((timenow - date) / 60000)
            if (getgolds >= 20) {
                getgolds = 20
                const collectgold = await Player.findByIdAndUpdate(author.id,
                    { $set: { 'Resources.golds': golds + getgolds } }, { new: true })
                const marketcollect = await Market.findByIdAndUpdate(marketId,
                    { $set: { collectedAt: collecttime } }, { new: true })
                res.status(200).send({ getgolds, collectgold: author.Resources, marketcollect })
            }
            else {
                const collectgold = await Player.findByIdAndUpdate(author.id,
                    { $set: { 'Resources.golds': golds + getgolds } }, { new: true })
                const marketcollect = await Market.findByIdAndUpdate(marketId,
                    { $set: { collectedAt: collecttime } }, { new: true })
                res.status(200).send({ getgolds, collectgold: author.Resources, marketcollect })
            }
        }
        else {
            const collecttime = new Date()
            const date = Date.parse(collect)
            let getgolds = Math.floor((timenow - date) / 60000)
            if (getgolds >= 20) {
                getgolds = 20
                const collectgold = await Player.findByIdAndUpdate(author.id,
                    { $set: { 'Resources.golds': golds + getgolds } }, { new: true })
                const marketcollect = await Market.findByIdAndUpdate(marketId,
                    { $set: { collectedAt: collecttime } }, { new: true })
                res.status(200).send({ getgolds, collectgold: author.Resources, marketcollect })
            }
            else {
                const collectgold = await Player.findByIdAndUpdate(author.id,
                    { $set: { 'Resources.golds': golds + getgolds } }, { new: true })
                const marketcollect = await Market.findByIdAndUpdate(marketId,
                    { $set: { collectedAt: collecttime } }, { new: true })
                res.status(200).send({ getgolds, collectgold: author.Resources, marketcollect, })
            }
        }
    }
    static UpdateMarket(req, res, next) {
        const { marketId } = req.params
        const { MarketName } = req.body
        const marketupdate = { MarketName }
        for (let key in marketupdate) {
            if (!marketupdate[key]) {
                delete marketupdate[key]
            }
        }
        Market.findByIdAndUpdate(marketId, marketupdate, { new: true })
            .then((result) => {
                res.status(200).json({ success: true, message: 'updated successfully', result })
                console.log(result)
            })
            .catch(next)

    }
    static DeleteMarket(req, res, next) {
        const { marketId } = req.params
        Market.findByIdAndDelete(marketId)
            .then((deletedMarket) => {
                res.status(200).json({ success: true, message: 'market has been deleted', deletedMarket })
                next();
            })
            .catch((err) => next({ name: 'DELETED' }))
    }

}


module.exports = MarketController