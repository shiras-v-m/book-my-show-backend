const user=require('../models/userSchema')

// package used to encrypt the password
const bcrypt=require('bcryptjs')
exports.adduser=async (req,res,next)=>{
    console.log(req.body);
    const {name,email,password}=req.body
    try{
        if(!name && !email && !password){
            res.status(401).json('Please enter all the fields')
        }
        else{
        const response=await user.findOne({email})
        if(response){
            res.status(401).json('User already exist!!Please login')

        }
        else{
            // encrypted password
            const hashedPassword=bcrypt.hashSync(password)
           const newUser=new user({
            name,
            email,
            password:hashedPassword
           })
           await newUser.save();
           res.status(200).json('user added successfully')
        }
    }
    }
    catch(error){
        console.log(error);
        res.status(406).json(error)
    }
}

exports.getallusers= async (req,res,next)=>{
    try{
        const response=await user.find()
        if(response){
            res.status(200).json(response)
        } 
    }
    catch(error){
        res.status(406).json(error)
    }
}

exports.updateuser= async (req,res,next)=>{
    const id=req.params.id
    const {name,email,password}=req.body

        if(!name && !email && !password){
            res.status(401).json('Invalid inputs')
        }
        else{
            const hashedPassword=bcrypt.hashSync(password)
           try{
            const response=await user.findByIdAndUpdate(id,{name,email,password:hashedPassword})
            if(response){
                res.status(200).json('User Updated successfully')
            }
            else{
                res.status(406).json("User not found")
            }
           } 
        catch(error){
            res.status(401).json(error)
        }
    }
}

exports.deleteuser=async (req,res,next)=>{
    const id=req.params.id;
    
    try{
        const response=await user.findByIdAndDelete(id)
        if(response){
            res.status(200).json('User delete successfully')
        }
        else{
            res.status(404).json('User not found')
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}

exports.login=async (req,res,next)=>{
    const {email,password}=req.body
    try{
        const userexist=await user.findOne({email})
        if(userexist){
            // compare entered password with password converted from hashedPassword to normal password
     
            console.log("entered password :",password);
            console.log("hashed password converted:",userexist.password)
            
            const isPasswordSame=bcrypt.compareSync(password,userexist.password)
            if(isPasswordSame){
                res.status(200).json("User logged in successfully")
            }
            else{
                // 400- unauthorized
                res.status(400).json("Invalid password")
            }
        }
        else{
            res.status(404).json("User does not exist")
        }
    }
    catch(error){
        res.status(401).json(error)
    }
}