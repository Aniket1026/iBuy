import express from 'express'
import { isUserAuthenticated } from '../middlewares/auth.js'
import { newOrder } from '../controllers/orderController.js'

const router = express.Router()

router.post('/orders/create', isUserAuthenticated, newOrder)


export const order = router