const get_song_info = require('../utils/get_song_info')
const song_search = require('../utils/song_search')

const get_info = async (req, res, next) => {
	try {
		const token = req.query.song_url.split('/').pop()
		const data = await get_song_info(token)
		res.send({ message: 'sucess', ...data })
	} catch (error) {
		next(error)
	}
}

const get_search_info = async (req, res, next) => {
	try {
		const n = req.query.n || 10
		if (req.query.q == undefined || req.query.q == '') {
			res.status(400).send({ message: 'Query param "q" is required and should not be an empty string!' })
			return
		}

		const tokens = await song_search(req.query.q, n)
		const data = await Promise.all(tokens.map((token) => {
			return get_song_info(token)
		}))
		res.send({ message: 'sucess', data })
	} catch (error) {
		next(error)
	}
}

module.exports = { get_info, get_search_info }