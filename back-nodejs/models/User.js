const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let userSchema = new Schema({
    name: [{
        firstname: {type: String}, 
        lastname: {type: String},
    }  
    ],     
    username:{
        type: String
    },
    identification:[{
        type: {type: String}, 
        number: {type: Number},
    }  
    ], 
    password: {
        type: String
    },
    photo: {
        type: String
    },
    active: {
        type: Boolean,
        default: false
    }
},{
    colecction: 'users'
})

module.exports= mongoose.model('User', userSchema)