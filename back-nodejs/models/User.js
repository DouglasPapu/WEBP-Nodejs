const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
    name: {
        firstName: { type: String, require: true },
        lastName: { type: String, require: true }
    },
    username: { type: String, require:true },
    identification: {
        type: { type: String, require: true },
        number: { type: String, require: true }
    },
    password: { type: String, require: true },
    photo: { type: String, require: true },
    active: {
        type: Boolean, default: false, require: true
    }
}, {
    collection: 'users'
})

module.exports = mongoose.model('User', userSchema)