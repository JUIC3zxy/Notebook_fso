const User = require('../models/users')

const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

const mongoose = require('mongoose')
const noteSchema = new mongoose.Schema({
    content: {
        type: String,
        require: true
    },
    important: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Note = mongoose.model('Note', noteSchema)

notesRouter.get('/', async (request, response) => {
    const notes = await Note
        .find({}).populate('user', { username: 1, name: 1 })

    response.json(notes)

})

notesRouter.get('/:id', (request, response) => {

    Note.findById(request.params.id).then(note => {
        if (note) {
            response.json(note)
        } else {
            response.status(404).end()
        }
    }).catch(error => {
        console.log(error)
        response.status(500).end()
    })
})

notesRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (body.content === undefined) {
        return response.status(400).json({ error: "content missing" })
    }
    const note = new Note({
        content: body.content,
        important: body.important || false,
        user: user.id
    })
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()
    response.status(201).json(savedNote)
})


module.exports = notesRouter