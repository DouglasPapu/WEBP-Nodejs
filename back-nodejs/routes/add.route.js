const express = require('express');
const postRoute = express.Router();

let PostModel = require('../models/Post');

//index
postRoute.route('/').get((req, res) => {
    PostModel.find((error, data) => {
        if(error){
            return next(error)
        }else{
            res.json(data);
        }
    });
})

//Begin post
postRoute.route('/create-user').post((req, res, next) => {
    PostModel.create(req.body, (error, data) => {
        if(error){
            return next(error)
        }else {
            res.json(data);
        }
    })
})


module.exports = postRoute; 