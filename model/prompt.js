const mongoose = require('mongoose')
const { Schema } = mongoose;

//Model for the question and answer
const promptSchema = new Schema({
    input: String,
    output: String
})

//Export Model to the main app.js
const Prompt = mongoose.model('Prompt', promptSchema);
module.exports = Prompt;