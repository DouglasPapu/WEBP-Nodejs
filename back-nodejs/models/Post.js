const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let postSchema = new Schema({
    name: {
        type: String
    },
    username:{
        type: String
    },
    id: {
        type: Number
    },
    password: {
        type: String
    },
    photo: {
        type: String
    },
    active: {
        type: Boolean
    }
},{
    colecction: 'posts'
})

module.exports= mongoose.model('Post', postSchema)