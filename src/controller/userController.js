const express = require('express');
const userModel = require('../model/userModel');
const mongodb = require("mongoose");
const ObjectId = mongodb.Types.ObjectId;

exports.createUser = async (req, res) => {
    const { name, email, password, mobile, isAdmin } = req.body;
    try{
    if(!name || !email || !password || !mobile){
        return res.status(400).send({message:"All fields are required which are name, email, password, mobile"});
    }
    const findEmail = await userModel.findOne({email:email});
    if(findEmail){
        return res.status(400).send({message:"User already exists with this email"});
    }
    const findMobile = await userModel.findOne({mobile:mobile});
    if(findMobile){
        return res.status(400).send({message:"User already exists with this mobile"});
    }
    const user = new userModel({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
    })
    user.isAdmin = isAdmin||false;
    const result = await user.save();
    return res.status(200).send({message:"User created successfully",data:result});
}catch(err){
    console.log(err);
    return res.status(500).send(err.message);
}
}


exports.getAllUsers = async (req, res) => {
    try{
    const result = await userModel.aggregate([
        {
            $sort: { createdAt: -1 }
        }

    ]); 
    return res.status(200).send({message:"All users",totalUser:result.length,data:result});
}catch(err){
    console.log(err);
    return res.status(500).send(err.message);
}
}


exports.getAllAdmin = async (req, res) => {
    try{
    const result = await userModel.aggregate([
        {
            $match:{
                isAdmin:true
            },
        },
        {
            $sort:{
                createdAt:-1
            }
        }
    ])
    return res.status(200).send({message:"All Admins",data:result});
}catch(err){
    console.log(err);
    return res.status(500).send(err.message);
}
}

exports.findUserById = async (req, res) => {
    const {id} = req.params;
    try{
    const result = await userModel.aggregate([{
        $match:{
            _id: new ObjectId(id)
        }
    }])
    if(result.length==0){
        return res.status(400).send({message:"User not found"});
    }
    console.log(result);
    return res.status(200).send({message:"User found",data:result});
}catch(err){
    console.log(err);
    return res.status(500).send(err.message);
}
}