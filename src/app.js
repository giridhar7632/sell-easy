const cors = require('cors')
const express = require('express')
const { connect } = require('mongoose')
const cookieParser = require('cookie-parser')

// Routes
const authRouter = require('./routes/auth')
const mainRouter = require('./routes/index')
const productRouter = require('./routes/product')
const categoryRouter = require('./routes/category')
const userRouter = require('./routes/user')
const cartRouter = require('./routes/cart')
const wishlistRouter = require('./routes/wishlist')
const reviewsRouter = require('./routes/reviews')
const conversationRouter = require('./routes/conversation')
const messageRouter = require('./routes/message')
const { MONGO_URI } = require('./utils/config')
const logger = require('./utils/logger')
const { requestLogger } = require('./utils/middleware')

const app = express()

// middleware functions
app.use((req, res, next) => {
  const allowedOrigins = [
    'http://127.0.0.1:3000',
    'http://localhost:3000',
    'http://localhost:5000',
    'http://127.0.0.1:5000',
    'http://localhost:8080',
    'https://sell-easy.vercel.app',
    'https://sell-easy-giridhar7632.vercel.app',
  ]
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})
// app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(requestLogger)
// app.use(
// 	cors({
// 		origin: 'http://localhost:3000',
// 		credentials: true,
// 	})
// )

app.use('/api', mainRouter)
app.use('/api/auth', authRouter)
app.use('/api/products', productRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/users', userRouter)
app.use('/api/cart', cartRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/conversations', conversationRouter)
app.use('/api/messages', messageRouter)

// connecting to mongodb atlas
connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB connection is established successfully! 🎉'))
  .catch((err) => logger.error('Something went wrong: ' + err?.message))

module.exports = app
