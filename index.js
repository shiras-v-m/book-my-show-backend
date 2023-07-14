// load environmental variable from .env to process.env
require('dotenv').config()

// import express to create server
const express=require('express')

// allow client to make request for resources from front-end to back-end
const cors=require('cors')

// creating server
const server=express()

// setup port number for server
const PORT = 3000 || process.env.PORT


// use cor,json parser in server app ( Javascript doesn't know json)
server.use(cors())
server.use(express.json())

const userRouter=require('./Routes/userRouter')
const adminRouter=require('./Routes/adminRouter')
const movieRouter=require('./Routes/movieRouter')
server.use(userRouter)
server.use(adminRouter)
server.use(movieRouter)

require('./db/connection')

// run server
server.listen(PORT,()=>{
    console.log('Bank server started at port number ',PORT);
})


server.get('/',(req,res)=>{
    res.send("<h2 style='text-align:center;color:green;'>aovis server started successfully!</h2>")
})