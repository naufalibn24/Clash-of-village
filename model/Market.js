const mongoose = require('mongoose');
const Schema = mongoose.Schema

const MarketSchema = new Schema({
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
    },
    MarketName: {
        type: String,
        default: 'Mymarket'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    collectedAt: {
        type: Date,
    }
});


const Market = mongoose.model('Market', MarketSchema)

module.exports = Market
