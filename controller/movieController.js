const jwt = require('jsonwebtoken')
const movie=require("../models/movieSchema")
exports.addMovie= async (req,res,next)=>{
    // first we check wethear the token is valid (wethear token expires)
    const extractedToken=req.headers.authorization.split(" ")[1]  //bearer token (postman - auth - > bearer token)
    let adminId;
    if(extractedToken){
    //    return console.log(extractedToken);
        
    // verify token by using secret key in .env
    jwt.verify(extractedToken,process.env.SECRET_KEY,(err,decrypted)=>{

        if(err){
            return res.status(406).json(err)
        }
        else{
            adminId=decrypted.id
            return 
             
        }
    })
    
    // create new movie
    const {name,description,releaseDate,posterUrl,featured,actors}=req.body
    if(!name || !description || !releaseDate || !posterUrl || !featured || !actors){
       return res.status(406).json("Please provide a valid input")
    }
    else{
        try{
            const response=await movie.findOne({name})
            if(response){
                res.status(406).json("Movie already exist")
            }
            else{
                const newMovie=new movie({
                    name,
                    description,
                    releaseDate:new Date(`${releaseDate}`),
                    posterUrl,
                    featured,
                    actors,
                    admin:adminId
                })
                await newMovie.save()
                 res.status(200).json("Movie added successfully")
              
            }
        }
        catch(error){
           return res.status(401).json(error)
        }
    }
    } 
    else{
        return res.status(404).json("Token not found")
    }
    
}

exports.getallMovies= async(req,res,next)=>{
    try{
    const response=await movie.find()
    if(!response){
        res.status(406).json("No movies found")
    }
    else{
        res.status(200).json(response)
    }
        }
        catch(error){
            res.status(401).json(error)
        }
}