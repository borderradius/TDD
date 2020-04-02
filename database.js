const sqlite3 = require('sqlite3').verbose()
// const path = require('path')

// const db_name = path.join(__dirname, 'data', 'apptest.db')
/**
 * :memory -> 메모리에 있는 디비사용
 * 추후 직접 구성한 로컬 디비파일 사용
 */
const db = new sqlite3.Database(':memory:', (err) => {
  if (err) {
    return console.error(err.message)
  }
  console.log("Successful connection to the database 'apptest.db'")
})

db.close((err) => {
  if (err) {
    return console.error(err.message)
  }
  console.log('Close the database connection');
})