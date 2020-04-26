const request = require('supertest')
const should = require('should')
const app = require('./index')

describe('GET /users는', () => {
  describe('성공시', () => {
    it('유저 객체를 담은 배열로 반환', done => {
      request(app)
        .get('/users')
        .end((err, res) => {
          if (err) new Error()
          res.body.should.be.instanceOf(Array)
          done()
        })
    })
    it('최대 limit 갯수만큼 응답한다', done => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          if (err) new Error()
          res.body.should.have.lengthOf(2)
          done()
        })
    })
  })
  describe('실패시', () => {
    it('limit이 숫자형이 아니면 400을 응답', done => {
      request(app)
        .get('/users?limit=two')
        .expect(400) // 400 http status code 를 기대함.
        .end(done)
    })
  })
})

describe('GET /users/:id 는', () => {
  describe('성공시', () => {
    it('id가 1인 유저의 객체를 반환한다. ', done => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          res.body.should.have.property('id', 1)
          done()
        })
    })
  })
  describe('실패시', () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다.', done => {
      request(app)
        .get('/users/one')
        .expect(400)
        .end(done)
    })
    it('id로 유저를 찾을 수 없을경우 404로 응답한다.', done => {
      request(app)
        .get('/users/999')
        .expect(404)
        .end(done)
    })
  })
})

describe('DELETE /users/:id', () => {
  describe('성공시', () => {
    it('204를 응답한다.', done => {
      request(app)
        .delete('/users/1')
        .expect(204)
        .end(done)
    })
  })
  describe('실패시', () => {
    it('id가 숫자가 아닐 경우 400으로 응답한다.', done => {
      request(app)
        .delete('/users/one')
        .expect(400)
        .end(done)
    })
  })
})

describe('POST /users', () => {
  describe('성공시', () => {
    let body, name = 'daniel'

    before(done => {
      request(app)
        .post('/users')
        .send({ name })
        .expect(201)
        .end((err, res) => {
          body = res.body
          done()
        })
    })
    it('생성된 객체를 반환한다.', () => {
      body.should.have.property('id')
    })
    it('입력한 네임을 반환한다.', () => {
      body.should.have.property('name', name)
    })
  })
  describe('실패시', () => {
    it('name 파라미터 누락시 400을 반환한다.', done => {
      request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end(done)
    })
    it('name이 중복일 경우 409를 반환', done => {
      request(app)
        .post('/users')
        .send({name: 'hari'})
        .expect(409)
        .end(done)
    })
  })
})

describe('PUT /users/:id', () => {
  describe('성공시', () => {
    const name = 'chris mod'
    it('변경된 name을 반환', done => {
      request(app)
        .put('/users/3')
        .send({name})
        .end((err, res) => {
          res.body.should.have.property('name', name)
          done()
        })
    })
  })
})