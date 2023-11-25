const express = require('express')
const cors = require('cors')

const error_handler = require('./middlewares/error_handler')
const song_route = require('./routes/song')

const PORT = process.env.PORT || 3000
const app = express()

// middlewares
app.use(cors())
app.use(express.json())
app.get('/', (req, res) => { res.send({ message: 'All systems operational! 🚀' }) })
app.use('/song', song_route)

app.use((req, res) => res.status(404).send({ message: 'requested endpoint not found' }))
app.use(error_handler)

app.listen(PORT, async () => {
	console.log('server started 🚀')
})