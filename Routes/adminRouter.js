const express=require('express')

const router=new express.Router()

const adminController=require('../controller/adminController')

router.post('/admin/register',adminController.register)
router.post('/admin/login',adminController.login)

module.exports=router