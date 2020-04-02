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
  res.json(users)
})

app.listen(3000, () => {
  console.log('Server is ready to listening on port 3000')
})

module.exports = app;
// export {
//   app
// }