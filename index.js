const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const app = express()



let users = [
  { id: 1, name: 'alice' },
  { id: 2, name: 'hari' },
  { id: 3, name: 'chris' },
]

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.get('/users', (req, res) => {
  req.query.limit = req.query.limit || 10
  const limit = parseInt(req.query.limit, 10)
  if (Number.isNaN(limit)) {
    return res.status(400).end()
  }
  res.json(users.slice(0, limit))
})

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) return res.status(400).end()
  const user = users.filter((a) => a.id === id)[0]
  if (!user) return res.status(404).end()
  res.json(user)
})

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id, 10)
  if (Number.isNaN(id)) res.status(400).end()
  users = users.filter((a) => a.id !== id)
  res.status(204).end()
})

app.post('/users', (req, res) => {
  const name = req.body.name
  const id = Date.now()
  const user = {id, name}
  users.push(user)
  res.status(201).json(user)
  
})

app.listen(3000, () => {
  console.log('Server is ready to listening on port 3000')
})

module.exports = app;