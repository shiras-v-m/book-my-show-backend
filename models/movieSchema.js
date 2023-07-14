const mongoose=require('mongoose')
const movieSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    releaseDate:{
        type:Date,
        required:true
    },
    posterUrl:{
        type:String,
        required:true
    },
    featured:{
        type:Boolean
    },
    actors:[{
        type:String,required:true
    }],
    admin:{
        type:String,
        required:true
    }
})

const movie=mongoose.model("movie",movieSchema)
module.exports=movie