import express from 'express'
import router from './routes/productRoute.js'
import { connection } from './config/db.js'
import { error } from './middlewares/error.js'

const app = express()

app.use(express.json())
app.use(error)
app.use('/api/v1', router)
connection()

export default app;