const Player = require('../model/Player')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const e = require('express');

class playerController {
    static register(req, res, next) {
        const { email, username, password } = req.body
        const players = new Player({
            email, username, password, Townhallname: username, Resources: { golds: 100, foods: 100, soldiers: 0 }
        })
        players.save()
            .then((players) => {
                res.status(201).json({ sucsess: true, msg: 'Successfully', data: { _id: players.__id, email: players.email, username: players.username, Townhall: players.Townhallname, Resources: players.Resources } });
            })
            .catch(next);
    }
    static login(req, res, next) {
        const { username, password } = req.body
        console.log(username)
        Player.findOne({ username: username })
            .then((players) => {
                console.log(players)
                if (players) {
                    const validpassword = (bcrypt.compareSync(password, players.password))
                    console.log(validpassword)
                    if (validpassword) {
                        const payload = { id: players.id }
                        const token = jwt.sign(payload, 'APASIH')
                        res.status(200).json({ sucsess: true, token, players: players.Id })
                        next()
                    }
                    else {
                        next({ name: 'Salah_Password' })
                    }
                }
                else {
                    console.log(players)
                    next({ name: 'NOT_FOUND' })
                }

            })
            .catch(next);
    }
    static Getplayer(req, res, next) {
        const { playerId } = req.params
        Player.findById(playerId)
            .then((player) => {
                console.log(player)
                res.status(200).json({ sucsess: true, message: 'infonya nih', data: { Townhall: player.Townhallname, Resources: player.Resources } })
            })
            .catch(next);
    }
    static UpdatePlayer(req, res, next) {
        const { playerId } = req.params
        const { Townhallname, username } = req.body

        const playerupdate = { Townhallname, username }

        for (let key in playerupdate) {
            if (!playerupdate[key]) {
                delete playerupdate[key]
            }
        }
        Player.findByIdAndUpdate(playerId, playerupdate, { new: true })
            .then((updated) => {
                res.status(200).json({ success: true, message: 'updated successfully', data: { Townhall: updated.Townhallname, username: updated.username } })
            })
            .catch(next);
    }
    static async Invadeplayer(req, res, next) {
        const { playerId, opponentId } = req.params
        const player = await Player.findById(playerId)
        const opponent = await Player.findById(opponentId)
        console.log(opponent)
        const playerresource = player.Resources
        console.log(playerresource)
        const opponentresource = opponent.Resources
        console.log(opponentresource)
        // const { golds, foods, soldiers } = player.Resources
        console.log(playerresource.foods)
        const arr = []
        for (let i = 0; i < 3; i++) {
            arr.push(Math.random() < (playerresource.soldiers / (opponentresource.soldiers + 1)))
        }
        const victory = arr.filter(el => el).length
        console.log(victory)
        if (victory >= 2) {
            const getgolds = Math.floor(opponentresource.golds / 2)
            console.log(getgolds)
            const getfoods = Math.floor(opponentresource.foods / 2)
            const winning = await Player.findByIdAndUpdate(playerId, {
                $set: {
                    'Resources.golds': playerresource.golds + getgolds, 'Resources.foods': playerresource.foods +
                        getfoods, 'Medals': player.Medals + 5
                }
            }, { new: true })
            const therestsoldiers = await Player.findByIdAndUpdate(opponentId, {
                $set: { 'Resources.soldiers': 0 }
            }, { new: true })
            res.status(200).json({ sucsess: true, victory, winning })
        }
        else {
            const lostmedal = Math.floor(player.Medals / 2)
            const loser = await Player.findByIdAndUpdate(playerId, {
                $set: { 'Medals': lostmedal }
            }, { new: true })
            const defender = await Player.findByIdAndUpdate(opponentId, {
                $set: { 'Medals': opponent.Medals + 2 }
            }, { new: true })
            res.status(200).json({ success: true, defender })
        }
    }
}

module.exports = playerController;