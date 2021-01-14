const { query } = require('express')
const Farm = require('../model/Farm')
const Player = require('../model/Player')

class FarmController {
    static async CreateFarm(req, res, next) {
        const { FarmName } = req.body
        const { playerId } = req.params
        const playerdata = await Player.findById(playerId)
        const resource = playerdata.Resources
        const { golds, foods } = playerdata.Resources
        console.log(resource.golds)
        console.log(resource.foods)
        if (resource.golds >= 10 && resource.foods >= 30) {
            const updateResource = await Player.findByIdAndUpdate(playerId,
                {
                    $set: { 'Resources.golds': golds - 10, 'Resources.foods': foods - 30 }, new: true
                })
            console.log(updateResource)
            const farm = await Farm.create({ FarmName, updateResource, Author: playerId })
            console.log(farm)
            res.status(201).send(farm)
        }
        else if (resource.golds < 10 || resource.foods < 30) {
            next({ name: 'GACUKUP' })
        }
        else {
            next({ name: 'DATA_ERROR' })
            console.log(next)
        }
    };
    static listFarms = (req, res, next) => {
        const { playerId } = req.params
        Farm.find({ Author: playerId })
            .then((results) => {
                res.status(200).json({ message: 'your farm', results })
                next()
            })
            .catch((err) => {
                next({ name: 'NOT_FOUND' })
            })
    }
    static async getFarmInfo(req, res, next) {
        const { farmId } = req.params
        const farm = await Farm.findById(farmId)
        const author = await Player.findById(farm.Author)
        const { foods } = author.Resources
        console.log(foods)
        console.log(farm)
        const { createdAt, collectedAt } = farm
        console.log(createdAt)
        const timenow = Date.now();
        const collect = collectedAt
        console.log(timenow)
        if (collect == undefined) {
            const date = new Date()
            const create = Date.parse(createdAt)
            console.log(create)
            let food = Math.floor((timenow - create) / 60000)
            console.log(food)
            if (food >= 20) {
                food = 20
                console.log(food)
                res.status(200).send({ msg: 'sucsess', farm, food })
            }
            else {
                res.status(200).send({ msg: 'sucsess', farm, food })
            }
        } else {
            const getcollect = Date.parse(collect)
            let food = Math.floor((timenow - getcollect) / 60000)
            console.log(food)
            if (food >= 20) {
                food = 20
                res.status(200).send({ msg: 'sucsess', farm, food })
            }
            else {
                res.status(200).send({ msg: 'sucsess', farm, food })
            }
        }
    }
    static async Collectfood(req, res, next) {
        const { farmId } = req.params
        const farm = await Farm.findById(farmId)
        const author = await Player.findById(farm.Author)
        const { foods } = author.Resources
        const { createdAt, collectedAt } = farm
        const timenow = Date.now();
        const collect = collectedAt
        if (collect == undefined) {
            const newdate = new Date();
            const date = Date.parse(createdAt)
            let getfoods = Math.floor((timenow - date) / 60000)
            if (getfoods >= 20) {
                getfoods = 20
                const userfood = await Player.findByIdAndUpdate(author.id,
                    { $set: { 'Resources.foods': foods + getfoods } }, { new: true })
                const farmcollections = await Farm.findByIdAndUpdate(farmId,
                    { $set: { collectedAt: newdate } }, { new: true })
                res.status(200).send({ getfoods, userfood: author.Resources, farmcollections })
                next()
            }
            else {
                const userfood = await Player.findByIdAndUpdate(author.id,
                    { $set: { 'Resources.foods': foods + getfoods } }, { new: true })
                const farmcollections = await Farm.findByIdAndUpdate(farmId,
                    { $set: { collectedAt: newdate } }, { new: true })
                res.status(200).send({ getfoods, userfood: author.Resources, farmcollections })
                next()
            }

        }
        else if (collect !== undefined) {
            const newdate = new Date()
            const date = Date.parse(collect)
            let getfoods = Math.floor((timenow - date) / 60000)
            if (getfoods >= 20) {
                getfoods = 20
                const userfood = await Player.findByIdAndUpdate(author.id,
                    { $set: { 'Resources.foods': foods + getfoods } }, { new: true })
                const farmcollections = await Farm.findByIdAndUpdate(farmId,
                    { $set: { collectedAt: newdate } }, { new: true })
                res.status(200).send({ getfoods, userfood: author.Resources, farmcollections })
                next()
            }
            else {
                const userfood = await Player.findByIdAndUpdate(author.id,
                    { $set: { 'Resources.foods': foods + getfoods } }, { new: true })
                const farmcollections = await Farm.findByIdAndUpdate(farmId,
                    { $set: { collectedAt: newdate } }, { new: true })
                res.status(200).send({ getfoods, userfood: author.Resources, farmcollections })
                next()
            }
        }
        else {
            next({ name: 'SABAR' })
        }
    }
    static UpdateFarm(req, res, next) {
        const { farmId } = req.params
        const { FarmName } = req.body
        const farmupdate = { FarmName }
        for (let key in farmupdate) {
            if (!farmupdate[key]) {
                delete farmupdate[key]
            }
        }
        Farm.findByIdAndUpdate(farmId, farmupdate, { new: true })
            .then((updated) => {
                res.status(200).json({ success: true, message: 'updated successfully', data: { FarmName: updated.FarmName, } })
                console.log(updated)
            })
            .catch(next)
    }
    static DeleteFarm(req, res, next) {
        const { farmId } = req.params
        Farm.findByIdAndDelete(farmId)
            .then((deletedfarm) => {
                res.status(200).json({ success: true, message: 'farm has been deleted', deletedfarm })
                next();
            })
            .catch((err) => next({ name: 'DELETED' }))
    }
}


module.exports = FarmController