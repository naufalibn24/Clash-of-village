const mongoose = require('mongoose')

const monggoseurl = 'mongodb://localhost/ClashOfVillage'

module.exports = () => {
    mongoose.connect(monggoseurl, {
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
    )
};
const db = mongoose.connection
db.on('error', (e) => console.log(e));
db.once('open', () => {
    console.log('we are connected to', monggoseurl)
});

