const { urlencoded } = require('express');
const express = require('express');
const mongooseconfig = require('./config/Mongoose');
const approuter = require('./routers/routes');
const app = express();
const Port = 3000;


mongooseconfig()
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(approuter);


app.listen(Port, () => {
    console.log(`listen on http://localhost:${Port}`);
})

