const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log(
		'Please provide the password as an argument: node mongo.js <password>'
	)
	process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@fullstackopen.gdxcsye.mongodb.net/noteApp?retryWrites=true&w=majority`

const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// mongoose
// 	.connect(url)
// 	.then((result) => {
// 		console.log('connected')

// 		const note = new Note({
// 			content: 'Here we go again',
// 			date: new Date(),
// 			important: false,
// 		})

// 		return note.save()
// 	})
// 	.then(() => {
// 		console.log('note saved!')
// 		return mongoose.connection.close()
// 	})
// 	.catch((err) => console.log(err))
mongoose
	.connect(url)
	.then((result) => {
		console.log('connected')
		Note.find({ important: false }).then((result) => {
			result.forEach((note) => {
				console.log(note)
			})
			console.log('closing connection')
			mongoose.connection.close()
		})
	})
	.catch((err) => console.log(err))
