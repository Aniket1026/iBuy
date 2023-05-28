import express from 'express'
import { userRegister } from '../controllers/userController.js'

export const router = express.Router() 

router.post('/register', userRegister)

export const user = router