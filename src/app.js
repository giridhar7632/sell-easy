const cors = require('cors')
const express = require('express')
const { connect } = require('mongoose')
const cookieParser = require('cookie-parser')

// Routes
const authRouter = require('./routes/auth')
const mainRouter = require('./routes/index')
const categoryRouter = require('./routes/category')
const { MONGO_URI } = require('./utils/config')
const logger = require('./utils/logger')
const { requestLogger } = require('./utils/middleware')

const app = express()

// middleware functions
// app.use((req, res, next) => {
// 	const allowedOrigins = [
// 		'http://127.0.0.1:3000',
// 		'http://localhost:3000',
// 		'http://localhost:5000',
// 		'http://127.0.0.1:5000',
// 		'http://localhost:8080',
// 			]
// 	const origin = req.headers.origin
// 	if (allowedOrigins.includes(origin)) {
// 		res.setHeader('Access-Control-Allow-Origin', origin)
// 	}
// 	// res.setHeader('Access-Control-Allow-Origin', req.headers.origin)
// 	res.setHeader(
// 		'Access-Control-Allow-Methods',
// 		'OPTIONS, GET, POST, PUT, PATCH, DELETE'
// 	)
// 	res.setHeader('Access-Control-Allow-Credentials', true)
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
// 	next()
// })
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

app.use('/', mainRouter)
app.use('/auth', authRouter)
app.use('/api/categories', categoryRouter)

// connecting to mongodb atlas
connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB connection is established successfully! 🎉'))
  .catch((err) => logger.error('Something went wrong: ' + err?.message))

module.exports = app
