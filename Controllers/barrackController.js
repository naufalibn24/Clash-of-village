const Barrack = require('../model/Barrack')
const Player = require('../model/Player')

class BarrackController {
    static async CreateBarrack(req, res, next) {
        const { BarrackName } = req.body
        const { playerId } = req.params
        const playerdata = await Player.findById(playerId)
        const resource = playerdata.Resources
        const { golds, foods } = playerdata.Resources
        console.log(resource.golds)
        if (resource.golds >= 30 && resource.foods >= 30) {
            // find si id barak
            // if (barrack.length <= 30)
            const updateresource = await Player.findByIdAndUpdate(playerId,
                {
                    $set: { 'Resources.golds': golds - 30, 'Resources.foods': foods - 30 }, new: true
                })
            console.log(updateresource)
            const barrack = await Barrack.create({ BarrackName, updateresource, Author: playerId })
            res.status(201).send(barrack)
            console.log(barrack)
        }
        else if (resource.golds < 30 || resource.foods < 30) {
            next({ name: 'GACUKUP' })
        }
        else {
            next({ name: 'DATA_ERROR' })
        }
    }
    static listBarracks(req, res, next) {
        const { playerId } = req.params
        Barrack.find({ Author: playerId })
            .then((result) => {
                res.status(200).json({ message: 'your racks', result })
                next()
            })
            .catch((err) => {
                next({ name: 'NOT_FOUND' })
            })
    };
    static async getBarrackInfo(req, res, next) {
        const { barrackId } = req.params
        const barrack = await Barrack.findById(barrackId)
        console.log(barrack)
        const { createdAt, collectedAt } = barrack
        const timeInMs = Date.now();
        const collect = collectedAt;
        if (collect == undefined) {
            const changedate = Date.parse(createdAt);
            let soldiers = Math.floor((timeInMs - changedate) / 60000)
            if (soldiers >= 10) {
                soldiers = 10;
                res.status(200).send({ barrack, soldiers })
            }
            else {
                res.status(200).send({ barrack, soldiers })
            }
        } else {
            const getcollect = Date.parse(collect)
            let soldiers = Math.floor((timeInMs - getcollect) / 60000)
            console.log(soldiers)
            if (soldiers >= 10) {
                soldiers = 10;
                res.status(200).send({ barrack, soldiers })
            }
            else {
                res.status(200).send({ barrack, soldiers })
            }
        }
    }
    static async CollectSoldiers(req, res, next) {
        const { barrackId } = req.params
        const barrack = await Barrack.findById(barrackId)
        const author = await Player.findById(barrack.Author)
        const { soldiers } = author.Resources
        const { createdAt, collectedAt } = barrack
        const timenow = Date.now()
        const collect = collectedAt
        if (collect == undefined) {
            const collecttime = new Date()
            console.log(collecttime)
            const date = Date.parse(createdAt)
            let getsoldiers = Math.floor((timenow - date) / 60000)
            if (getsoldiers >= 10) {
                getsoldiers = 10
                const collectsoldiers = await Player.findByIdAndUpdate(author.id,
                    { $set: { 'Resources.soldiers': soldiers + getsoldiers } }, { new: true })
                const barrackcollect = await Barrack.findByIdAndUpdate(barrackId,
                    { $set: { collectedAt: collecttime } }, { new: true })
                res.status(200).send({ getsoldiers, collectsoldiers: author.Resources, barrackcollect })
            }
            else {
                const collectsoldiers = await Player.findByIdAndUpdate(author.id,
                    { $set: { 'Resources.soldiers': soldiers + getsoldiers } }, { new: true })
                const barrackcollect = await Barrack.findByIdAndUpdate(barrackId,
                    { $set: { collectedAt: collecttime } }, { new: true })
                res.status(200).send({ getsoldiers, collectsoldiers: author.Resources, barrackcollect })
            }
        }
        else {
            const collecttime = new Date()
            const date = Date.parse(collect)
            let getsoldiers = Math.floor((timenow - date) / 60000)
            if (getsoldiers >= 10) {
                getsoldiers = 10
                const collectsoldiers = await Player.findByIdAndUpdate(author.id,
                    { $set: { 'Resources.soldiers': soldiers + getsoldiers } }, { new: true })
                const barrackcollect = await Barrack.findByIdAndUpdate(barrackId,
                    { $set: { collectedAt: collecttime } }, { new: true })
                res.status(200).send({ getsoldiers, collectsoldiers: author.Resources, barrackcollect })
            }
            else {
                const collectsoldiers = await Player.findByIdAndUpdate(author.id,
                    { $set: { 'Resources.soldiers': soldiers + getsoldiers } }, { new: true })
                const barrackcollect = await Barrack.findByIdAndUpdate(barrackId,
                    { $set: { collectedAt: collecttime } }, { new: true })
                res.status(200).send({ getsoldiers, collectsoldiers: author.Resources, barrackcollect })
            }
        }
    }
    static UpdateBarrack(req, res, next) {
        const { barrackId } = req.params
        const { BarrackName } = req.body
        const racksupdates = { BarrackName }
        for (let key in racksupdates) {
            if (!racksupdates[key]) {
                delete racksupdates[key]
            }
        }
        Barrack.findByIdAndUpdate(barrackId, racksupdates, { new: true })
            .then((updated) => {
                res.status(200).json({ success: true, message: 'updated successfully', data: { Newname: racksupdates } })
            })
            .catch(next)
    }
    static DeleteRacks(req, res, next) {
        const { barrackId } = req.params
        Barrack.findByIdAndDelete(barrackId)
            .then((deletedrack) => {
                res.status(200).json({ success: true, message: 'barrack has been deleted', deletedrack })
                next();
            })
            .catch((err) => next({ name: 'DELETED' }))
    }
}


module.exports = BarrackController