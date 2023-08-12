import express from 'express'
import { userLogin, userLogout, userRegister } from '../controllers/userController.js'

export const router = express.Router() 

router.post('/register', userRegister)
router.post('/login',userLogin)
router.get('/logout',userLogout)

export const user = router