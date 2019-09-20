const { Pool } = require('pg')
const { config } = require('./config')

const Chat = new Pool(config)

Chat.connect()

exports.getAllMessages = (cb) => {
  Chat.query('SELECT username, message FROM messages', (err, data) => {
    if (err) return cb(err)
    return cb(null, data)
  })
}

exports.postMessage = (data, cb) => {
  const text = 'INSERT INTO messages(username, message) VALUES($1, $2)'
  const values = [data.username, data.message]
  queryDB(text, values, cb)
}

exports.postCredentials = (credentials, cb) => {
  const text = 'INSERT INTO users(username, password) VALUES($1, $2)'
  const values = [credentials.username, credentials.password]
  queryDB(text, values, cb)
}

exports.selectByUsername = (username, cb) => {
  const text = 'SELECT * FROM users WHERE username = $1'
  const values = [username]
  queryDB(text, values, cb)
}

function queryDB(text, values, cb) {
  Chat.query(text, values, (err, response) => {
    if (err) return cb(err)
    return cb(null, response)
  })
}

