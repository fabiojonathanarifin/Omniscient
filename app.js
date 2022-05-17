require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Prompt = require('./model/prompt')
const Response = require('./model/response')

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

app.get('/app', async (req, res) => {
    const prompts = await Prompt.find({});
    res.render('app', { prompts })
})

app.post('/app', async (req,res) => {
    const prompt = new Prompt(req.body.prompt);
    await prompt.save();
    res.redirect('app')
})


app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!');
})