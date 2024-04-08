require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())

const usersRouter = require('./controllers/users')
const notesRouter=require('./controllers/notes')
const loginRouter=require('./controllers/login')

app.use('/api/users', usersRouter)
app.use('/api/notes',notesRouter)
app.use('/api/login',loginRouter)
const mongoose = require('mongoose')

const url =process.env.MONGODB_URI
mongoose.connect(url)
mongoose.set('strictQuery',false)



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})