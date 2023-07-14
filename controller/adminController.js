const admin=require('../models/adminSchema')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

exports.register=async (req,res,next)=>{
    console.log("inside admin register")
    const {email,password}=req.body
    
    if(!email || !password){
        res.status(401).json("Please enter all the inputs")
    }
    else{
        try{
            const response=await admin.findOne({email})
            if(response){
                res.status(401).json("Admin is already registered. Please login!")
            }
            else{
               const newPassword=bcrypt.hashSync(password)
                const newAdmin=new admin({
                    email,
                    password:newPassword,
                    addedmovies:[]
                })
                await newAdmin.save()
                res.status(200).json("Admin registered successfully")
            }
        }
        catch(error){
            res.status(406).json(error)
        }
    }
}

exports.login= async (req,res,next)=>{
    const {email,password}=req.body

    if(!email || !password){
        res.status(401).json("Please enter a valid input")
    }
    else{
        try{
            const userExist= await admin.findOne({email})
            if(userExist){
                const isPasswordSame=bcrypt.compareSync(password,userExist.password)
                if(isPasswordSame){
                    const token=jwt.sign({id:userExist._id},process.env.SECRET_KEY,
                        {
                            expiresIn:'7d'
                            // admin can't add movies after 7days
                        })
                   return res.status(200).json({message:"Admin logged in successfully",token,id:userExist._id})
                }
                else{
                    res.status(401).json("Invalid password")
                }
            }
            else{
                res.status(401).json("Admin does not exist")
            }
        }
        catch(error){
            res.status(406).json(error)
        }
    }
}