import express from 'express'
import { authorizeRoles, isUserAuthenticated } from '../middlewares/auth.js'
import { getSingleOrder, myOrders, newOrder } from '../controllers/orderController.js'

const router = express.Router()

router.post('/orders/create', isUserAuthenticated, newOrder)
router.get('/order/:id', isUserAuthenticated, getSingleOrder)
router.get('/my-orders',isUserAuthenticated,myOrders)

export const order = router