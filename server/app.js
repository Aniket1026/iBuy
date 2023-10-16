import express from 'express'
import cookieParser from 'cookie-parser'
import { product } from './routes/productRoute.js'
import { order } from './routes/orderRoute.js'
import { user } from './routes/userRoute.js'
import { connection } from './config/db.js'
import { error } from './middlewares/error.js'
import cors from 'cors'

const app = express()
const corsOptions = {
  origin: "https://i-969z5k65y-aniket1026.vercel.app",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json())
app.use(cookieParser())
app.use(error)
app.use('/api/v1',product)
app.use('/api/v1', user)
app.use('/api/v1',order)
connection()

export default app;