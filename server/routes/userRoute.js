import express from 'express'
import { forgotPassword, userLogin, userLogout, userRegister } from '../controllers/userController.js'

export const router = express.Router() 

router.post('/register', userRegister)
router.post('/login',userLogin)
router.get('/logout', userLogout)
router.post('/password/forgot',forgotPassword)

export const user = router