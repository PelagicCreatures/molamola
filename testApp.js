const express = require('express')
const app = express()
const port = 3000
const path = require('path')

app.get('/', (req, res) => {
	const file = path.join(__dirname, 'index.html')
	res.sendFile(file, {
		headers: {
			'Content-Type': 'text/html'
		}
	})
})

app.get('/dist/molamola.es.js', (req, res) => {
	const file = path.join(__dirname, '/dist/molamola.es.js')
	res.sendFile(file, {
		headers: {
			'Content-Type': 'application/javascript'
		}
	})
})

let count = 0
app.post('/form-post', express.json(), (req, res) => {
	res.send({
		status: 'ok',
		message: 'success',
		redirect: '/?redirect-' + (++count)
	})
})

app.post('/lookup', express.json(), (req, res) => {
	res.send({
		found: req.body.value === 'match'
	})
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
