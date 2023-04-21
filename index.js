import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const PORT = process.env.PORT | 5000

mongoose.connect(process.env.DB_URL).then(() => {
  console.log('db connected')
})

app.post('/register', (req, res) => {
  
})

app.listen(PORT, () => {
  console.log('server started listening at port: ', PORT)
})
