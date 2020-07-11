const express = require('express');
const app = express();
const config = require('config');
const mongoose = require('mongoose');
const Link = require('./models/Links');
const uniqid = require('uniqid');
const port = 3000;

const mongo = config.get('mongo');

const connecToDB = async ()=>{
    await mongoose.connect(mongo,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        useCreateIndex:true
    });
    console.log('Connected to DB');
}

app.use(express.json());

app.listen(port,()=>{
    console.log(`Listening on port ${port}`);
    connecToDB();
});

app.post('/create',async(req,res)=>{
    try{
        const {url} = req.body;
        const link = await Link.findOne({url});
        if(link){
            return res.json({
                "short":url.short,
            });
        }
        const newLink = new Link({
            url:url,
            short:uniqid.time(),
        });
        await newLink.save();
        res.json(newLink);
    }catch(e){
        console.log(e);
        res.status(500).json({
            msg:"Server Error"
        })
    }
});

app.get('/:short',async(req,res)=>{
    try{
        const short = req.params.short;
        const link = await Link.findOne({short});
        res.redirect('http://'+link.url);
    }catch(e){
        console.log(e);
        res.status(404);
    }
});