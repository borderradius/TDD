import http from 'http';

const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((req, res) => {

  if (req.url === '/') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Hello world\n')
  } else if (req.url === '/users') {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('User List')
  } else {
    res.statusCode = 404
    res.end('Not Found')
  }



})

server.listen(port, hostname, () => {
  console.log(`Server ready to listen at ${hostname}:${port}`)
})