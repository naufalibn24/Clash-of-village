const mongoose = require('mongoose');
const Schema = mongoose.Schema

const FarmSchema = new Schema({
    Author: {
        type: Schema.Types.ObjectId,
        ref: 'Player',
    },
    FarmName: {
        type: String,
        default: 'MyFarm'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    collectedAt: {
        type: Date,
    }
});


const Farm = mongoose.model('Farm', FarmSchema)

module.exports = Farm