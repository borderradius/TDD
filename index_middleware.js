import express from 'express'
import morgan from 'morgan';
const app = express()

/**
 * when make middleware 'use'
 */
function logger(req, res, next) {
  console.log('i am logger')
  next() // next해주지 않으면 다음 미들웨어가 동작하지 않음.
}

/**
 * another middleware
 */
function logger2(req, res, next) {
  console.log('i am logger 2')
  next()
}

function commonmw(req, res, next) {
  console.log('commonmw');
  next(new Error('err!!!!!'))
}

function errormw(err, req, res, next) {
  console.log(err.message);
  next()
}

/**
 * 미들웨어인 logger -> logger2 순차적으로 실행
 */
app.use(logger)
app.use(logger2)
app.use(morgan('dev'))
app.use(commonmw)
app.use(errormw)

app.listen(3000, (req, res) => {
  console.log('Server is ready to Listen')
})