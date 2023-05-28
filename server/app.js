import express from 'express'
import { product } from './routes/productRoute.js'
import { user } from './routes/userRoute.js'
import { connection } from './config/db.js'
import { error } from './middlewares/error.js'

const app = express()

app.use(express.json())
app.use(error)
app.use('/api/v1',product)
app.use('/api/v1',user)
connection()

export default app;