import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import cloudinary from 'cloudinary'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import { product } from './routes/productRoute.js'
import { order } from './routes/orderRoute.js'
import { user } from './routes/userRoute.js'
import { connection } from './config/db.js'
import { error } from './middlewares/error.js'

const corsOptions = {
  origin: 'https://i-buy-pi.vercel.app',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const app = express()            
app.use(cors(corsOptions));

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(cookieParser())
app.use(error)
app.use('/api/v1',product)
app.use('/api/v1', user)
app.use('/api/v1',order)
connection()

export default app;