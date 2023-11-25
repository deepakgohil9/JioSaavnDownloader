module.exports = async (token) => {
	let data = await fetch(`https://www.jiosaavn.com/api.php?__call=webapi.get&token=${token}&type=song&ctx=web6dot0&api_version=4&_format=json`)
	data = await data.json()

	if (data.songs == undefined) {
		throw new Error('Failed to fetch song info!')
	}

	const encode_uri = encodeURIComponent(data.songs?.[0].more_info.encrypted_media_url)
	const bitrate = data.songs?.[0].more_info['320kbps'] ? 320 : 128

	let song_url_data = await fetch(`https://www.jiosaavn.com/api.php?__call=song.generateAuthToken&url=${encode_uri}&bitrate=${bitrate}&api_version=4&_format=json`)
	song_url_data = await song_url_data.json()

	if (song_url_data.auth_url == undefined || song_url_data.auth_url == false) {
		throw new Error('Failed to fetch song stream url!')
	}

	const song_data = {
		title: data.songs?.[0].title,
		subtitle: data.songs?.[0].subtitle,
		image: data.songs?.[0].image,
		explicit_content: data.songs?.[0].explicit_content,
		music: data.songs?.[0].more_info.music,
		album: data.songs?.[0].more_info.album,
		label: data.songs?.[0].more_info.label,
		bitrate: bitrate,
		duration: Math.floor(data.songs?.[0].more_info.duration / 60) + ':' + data.songs?.[0].more_info.duration % 60,
		media_url: song_url_data?.auth_url,
		copyright_text: data.songs?.[0].more_info.copyright_text
	}
	return song_data
}