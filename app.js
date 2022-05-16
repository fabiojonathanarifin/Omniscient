const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/textReply')
    .then(() => {
        console.log("Monggo connection open!")
    })
    .catch(err => {
        console.log("Mongo connection error!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('app')
})


app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!');
})