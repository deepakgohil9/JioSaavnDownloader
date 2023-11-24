const get_song_info = require('../utils/get_song_info')

const get_info = async (req, res, next) => {
	try {
		console.log(req.query)
		const token = req.query.song_url.split('/').pop()
		const data = await get_song_info(token)
		res.send({ message: 'sucess', ...data })
	} catch (error) {
		next(error)
	}
}

module.exports = { get_info }