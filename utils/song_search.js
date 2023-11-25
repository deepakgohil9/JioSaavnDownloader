module.exports = async (q, n) => {
	let data = await fetch(`https://www.jiosaavn.com/api.php?__call=search.getResults&q=${q}&n=${n}&_format=json&_marker=0&api_version=4&ctx=web6dot0`)
	data = await data.json()

	if (data.results == undefined) {
		throw new Error('Failed to search song!')
	}

	const tokens = data.results?.map((element) => {
		return element.perma_url.split('/').pop()
	})
	return tokens
}