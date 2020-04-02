const utils = require('./utils')
const should = require('should')

// 테스트 수트 - 테스트 환경 구성
describe('utils.js모듈의 capitalize 함수는', () => {
  it('문자열의 첫번째 문자를 대문자로 변환한다.', () => {
    // test code
    const result = utils.capitalize('hello')
    result.should.be.equal('Hello') // 상당히 직관적이네?? 영어문장 읽는 느낌.
  })
})