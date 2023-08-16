import express from 'express'
import { forgotPassword, resetPassword, userLogin, userLogout, userRegister } from '../controllers/userController.js'

export const router = express.Router() 

router.post('/register', userRegister)
router.post('/login',userLogin)
router.get('/logout', userLogout)
router.post('/password/forgot', forgotPassword)
router.put('/password/reset/:token',resetPassword)

export const user = router