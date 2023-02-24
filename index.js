import express from 'express'

const app = express()
const PORT = process.env.PORT | 5000

app.get('/', (req, res) => {
	res.json({
		name: 'home',
	})
})

app.get('/deekshith', (req, res) => {
	res.json({
		name: 'deekshith',
	})
})

app.listen(PORT, () => {
	console.log('server started listening at port: ', PORT)
})
