const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Note = require('../models/note')

const api = supertest(app)

describe('Note API', () => {
  beforeEach(async () => {
    await Note.deleteMany({})

    const noteObjects = helper.initialNotes.map((note) => new Note(note))
    const notePromises = noteObjects.map((note) => note.save())
    await Promise.all(notePromises)

    console.log('🚀 ~ Database reset')
  })

  test('notes are returned as json', async () => {
    await api
      .get('/api/notes')
      .expect(200)
      // used regex to check if header contains the string, since the actual string contains more info, such as encoding
      .expect('Content-Type', /application\/json/)
  })

  test('there are two notes', async () => {
    const response = await api.get('/api/notes')

    assert.strictEqual(response.body.length, helper.initialNotes.length)
  })

  test('there is a note about HTML', async () => {
    const response = await api.get('/api/notes')

    const contents = response.body.map((note) => note.content)

    assert.strictEqual(contents.includes('HTML is easy'), true)
  })

  test('a valid note can be added', async () => {
    const newNote = {
      content: 'async/await simplifies making async calls',
      date: new Date(),
      important: true
    }

    await api
      .post('/api/notes')
      .send(newNote)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const notesAtEnd = await helper.notesInDb()

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1)

    const contents = notesAtEnd.map((note) => note.content)

    assert(contents.includes('async/await simplifies making async calls'))
  })

  test('note without content is not added', async () => {
    const newNote = {
      date: new Date(),
      important: false
    }

    await api.post('/api/notes').send(newNote).expect(400)

    const notesAtEnd = await helper.notesInDb()

    assert.strictEqual(notesAtEnd.length, helper.initialNotes.length)
  })

  test('a specific note can be fetched', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToFetch = notesAtStart[0]

    const resultNote = await api
      .get(`/api/notes/${noteToFetch.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(resultNote.body, noteToFetch)
  })

  test('a note can be deleted', async () => {
    const notesAtStart = await helper.notesInDb()

    const noteToDelete = notesAtStart[0]

    await api.delete(`/api/notes/${noteToDelete.id}`).expect(204)

    const notesAtEnd = await helper.notesInDb()

    const contents = notesAtEnd.map((note) => note.content)

    assert(!contents.includes(noteToDelete.content))

    assert.strictEqual(notesAtEnd.length, notesAtStart.length - 1)
  })

  after(async () => {
    await mongoose.connection.close()
    console.log('🚀 ~ Database connection closed')
  })
})
