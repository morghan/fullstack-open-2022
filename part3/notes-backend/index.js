require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Note = require('./models/note')
const app = express()

app.use(express.static('build')) // Serving frontend prod build as static content
app.use(cors())
app.use(express.json()) // Request body parser

let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		date: '2022-05-30T17:30:31.098Z',
		important: true,
	},
	{
		id: 2,
		content: 'Browser can execute only Javascript',
		date: '2022-05-30T18:39:34.091Z',
		important: false,
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		date: '2022-05-30T19:20:14.298Z',
		important: true,
	},
]

app.get('/', (request, response) => {
	response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
	Note.find({}).then((notes) => {
		response.json(notes)
	})
})

app.get('/api/notes/:id', (request, response, next) => {
	Note.findById(request.params.id)
		.then((note) => {
			if (note) {
				response.json(note)
			} else {
				response.status(404).end()
			}
		})
		.catch((error) => next(error))
})

app.post('/api/notes', (request, response) => {
	const body = request.body
	if (!body.content) {
		return response.status(400).json({ error: 'content missing' })
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date(),
	})
	note.save().then((savedNote) => {
		console.log(savedNote)
		response.json(savedNote)
	})
})

app.delete('/api/notes/:id', (request, response, next) => {
	Note.findByIdAndRemove(request.params.id)
		.then((result) => {
			response.status(204).end()
		})
		.catch((error) => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
	const body = request.body

	const note = {
		content: body.content,
		important: body.important,
	}

	Note.findByIdAndUpdate(request.params.id, note, { new: true })
		.then((updatedNote) => {
			response.json(updatedNote)
		})
		.catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
	console.log(error.message)
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	}
	// In case other type of error occurs, send it to
	// express' default error handler
	next(error)
}

// Custom error-handling middleware must be loaded last
// after all routes calls and other middleware i.e. app.use()
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
