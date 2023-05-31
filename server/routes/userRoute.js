import express from 'express'
import { userLogin, userRegister } from '../controllers/userController.js'

export const router = express.Router() 

router.post('/register', userRegister)
router.post('/login',userLogin)

export const user = router