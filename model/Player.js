const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
const { getMaxListeners } = require('./Market');


const PlayerSchema = new Schema({

    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        minlength: [6]
    },
    password: {
        type: String,
        required: true,
        minlength: [6]
    },
    Townhallname: {
        type: String,
        default: 'MyKingdom'
    },
    Medals: {
        type: Number,
        default: 0,
        MIN_VALUE: 0,
    },
    Resources: {
        golds: Number,
        foods: Number,
        soldiers: Number,
    }
});

PlayerSchema.pre('save', function (next) {
    Player.findOne({ email: this.email, username: this.username })
        .then((players) => {
            if (players) next({ name: 'ALREADY_USED' });
            else {
                const salt = bcrypt.genSaltSync(10);
                this.password = bcrypt.hashSync(this.password, salt)
                console.log(this.password)
                next();
            }
        })
        .catch((e) => next({ name: 'DATA ERROR' }))
})


const Player = mongoose.model('Player', PlayerSchema)

module.exports = Player
