const express=require('express')

const router= new express.Router()

const userController=require('../controller/userController')
router.post('/user/adduser',userController.adduser)
router.get('/user/getallusers',userController.getallusers)
router.put('/user/:id',userController.updateuser)
router.delete('/user/:id',userController.deleteuser)
router.post('/user/login',userController.login)
module.exports=router


