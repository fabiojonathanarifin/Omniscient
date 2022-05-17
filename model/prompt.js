const mongoose = require('mongoose')
const { Schema } = mongoose;


const promptSchema = new Schema({
    input: String,
    output: String
})

const Prompt = mongoose.model('Prompt', promptSchema);
module.exports = Prompt;