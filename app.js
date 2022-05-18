require('dotenv').config('./.env')
const express = require('express')
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Prompt = require('./model/prompt')
const { Configuration, OpenAIApi } = require("openai");

//connecting to mongoDB
mongoose.connect('mongodb://localhost:27017/textReply')
    .then(() => {
        console.log("Monggo connection open!")
    })
    .catch(err => {
        console.log(err)
    })

//API key usage
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//default prompt is used to make a default pattern for the AI to recognize what to do.
const defaultPrompt = "I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with \"Unknown\".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: Where were the 1992 Olympics held?\nA: The 1992 Olympics were held in Barcelona, Spain.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ: "

//setting path to views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

//parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

//rendering the views/app.ejs
app.get('/app', async (req, res) => {
    const prompts = await Prompt.find({});
    res.render('app', { prompts })
})

//posting and saving the prompt input and output after being process with GPT-3 AI to mongoDB
app.post('/app', async (req, res) => {
    const prompt = new Prompt(req.body.prompt);
    const question = defaultPrompt.concat(prompt.input, '\nA:')
    //Use API
    const completion = await openai.createCompletion("text-curie-001", {
        prompt: question,
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\n"],
    });
    const answer = await completion.data.choices[0].text;
    prompt.output = answer;
    await prompt.save();
    res.redirect('app')
})


app.listen(3000, () => {
    console.log('APP IS LISTENING ON PORT 3000!');
})