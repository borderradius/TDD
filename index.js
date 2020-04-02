// import express from 'express'
const express = require('express')
// import morgan from 'morgan';
const morgan = require('morgan')
const app = express()

const users = [
  { id: 1, name: 'alice' },
  { id: 2, name: 'hari' },
  { id: 3, name: 'chris' },
]

app.use(morgan('dev'))

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
  const user = users.filter((a) => a.id === id)[0]
  res.json(user)
})

app.listen(3000, () => {
  console.log('Server is ready to listening on port 3000')
})

module.exports = app;