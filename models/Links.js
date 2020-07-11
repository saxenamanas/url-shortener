const mongoose = require('mongoose');


const Links = mongoose.Schema({
    url:{
        type:String,
        required:true,
        unique:true
    },
    short:{
        type:String,
        required:true,
        uniquie:true,
    }
});

module.exports = Link = mongoose.model('Link',Links);