const express=require('express')

const router=new express.Router()

const movieController=require('../controller/movieController')

router.post("/admin/addmovie",movieController.addMovie)

router.get("/getallmovies",movieController.getallMovies)

module.exports=router