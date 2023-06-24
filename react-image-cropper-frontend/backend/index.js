const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();
// app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.urlencoded({ extended: true }))
app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

mongoose.connect("mongodb://127.0.0.1:27017/auth",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});()=>{
    console.log("connected to DB")
}


//user schema 
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = new mongoose.model("User", userSchema)

//routes routes
app.post("/Login",(req,res)=>{
    const {email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
           if(password === user.password){
               res.send({message:"login sucess",user:user})
           }else{
               res.send({message:"wrong credentials"})
           }
        }else{
            res.send("not register")
        }
    })
});
app.post("/Register",(req,res)=>{
    console.log(req.body) 
    const {name,email,password} =req.body;
    User.findOne({email:email},(err,user)=>{
        if(user){
            res.send({message:"user already exist"})
        }else {
            const user = new User({name,email,password,image})
            user.save(err=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({message:"sucessfull"})
                }
            })
        }
    })


}) 
const Data=require('./model/image')
app.post("/add",async(req,res)=>{
    const img=new Data(req.body)
    try{
        await img.save()
        res.status(201).json({
            status:'success',
            data:{

                img
            }
        })
    }catch(err){
        res.status(500).json({
            status:'failed',
            message:err
        })
    }
})
app.listen(6969,()=>{
    console.log("started")
})
