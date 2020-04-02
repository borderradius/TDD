const express = require('express')
const app = express()
const db = require('./database')

app.listen(3000, () => {
  console.log('Server started=========')
})

app.get('/', (req, res, next) => {
  console.log('Requested URL is / ');
  res.send('root')
})
app.get('/user', (req, res, next) => {
  console.log('Requested URL is /user ');
  res.send('user')
})