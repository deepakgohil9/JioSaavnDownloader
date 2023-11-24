// Author: Deepak Gohil
//Description: This script allows you to download songs from JioSaavn.
// Usage: node bin/downloader.js <song_url> <download>
// 		Params: 
// 			<song_url> 		Jio Saavn Song URL
// 			<download> 		Boolean. Set to true to download the song; otherwise, it will only dump song info data.



const fs = require('fs')
const path = require('path')
const stream = require('stream')
const get_song_data = require('../utils/get_song_info')

const download = async (url, name) => {
	const res = await fetch(url)
	if (res.ok) {
		const download_path = path.join(__dirname, '..', 'downloads')
		if (!fs.existsSync(download_path)){
			fs.mkdirSync(download_path, { recursive: true })
		}

		const write_stream = fs.createWriteStream(path.join(download_path, name + '.mp4'))
		stream.Readable.fromWeb(res.body).pipe(write_stream)
	}
}

const __main__ = async () => {
	const token = process.argv[2].split('/').pop()
	const d = await get_song_data(token)
	console.log(d)
	if (process.argv[3] == 'true') {
		download(d.media_url, d.title)
	}
}

__main__()
