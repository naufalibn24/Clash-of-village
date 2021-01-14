const mongoose = require('mongoose');
const Schema = mongoose.Schema

const BarrackSchema = new Schema({
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
    },
    BarrackName: {
        type: String,
        default: 'MyBarrack',
        max: 30
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    collectedAt: {
        type: Date,
    }
});


const Barrack = mongoose.model('Barrack', BarrackSchema)

module.exports = Barrack