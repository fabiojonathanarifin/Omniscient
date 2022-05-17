const mongoose = require('mongoose')
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost:27017/textReply')
    .then(() => {
        console.log("Monggo connection open!")
    })
    .catch(err => {
        console.log("Mongo connection error!")
        console.log(err)
    })


const responsesSchema = new Schema({
    response: String
})

const  Response = mongoose.model('Response', responsesSchema);
module.exports = Response;