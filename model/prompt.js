const mongoose = require('mongoose')
const { Schema } = mongoose;


const promptSchema = new Schema({
    input: String
})

const Prompt = mongoose.model('Prompt', promptSchema);
module.exports = Prompt;