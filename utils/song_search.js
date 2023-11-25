module.exports = async (q) => {
	let data = await fetch(`https://www.jiosaavn.com/api.php?__call=autocomplete.get&query=${q}&_format=json&_marker=0&ctx=web6dot0`)
	data = await data.json()

	if (data.songs == undefined) {
		throw new Error('Failed to search song!')
	}

	const tokens = data?.songs?.data?.map((element) => {
		return element.url.split('/').pop()
	})
	return tokens
}