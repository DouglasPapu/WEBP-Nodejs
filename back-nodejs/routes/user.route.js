const express = require('express');
const userRoute = express.Router();

let UserModel = require('../models/User');

//index
userRoute.route('/').get((req, res) => {
    UserModel.find((error, data) => {
        if(error){
            return next(error)
        }else{
            res.json(data);
        }
    });
})

//create user
userRoute.route('/create-user').post((req, res, next) => {
    UserModel.create(req.body, (error, data) => {
        if(error){
            return next(error)
        }else {
            res.json(data);
        }
    })
})

//update user
userRoute.route('/update-user/:id').put((req, res, next) => {
    UserModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if(error){
            return next(error);
        }else{
            res.json(data);
            console.log('User updated');
        }
    })
});

module.exports = userRoute; 