const { Pool } = require('pg')
const { config } = require('./config')

const Chat = new Pool(config)

Chat.connect()

exports.getAllMessages = (cb) => {
  Chat.query('SELECT username, message FROM messages', (err, res) => {
    if (err) return cb(err)
    return cb(null, res.rows)
  })
}

exports.getAllActiveUsers = (cb) => {
  Chat.query('SELECT * FROM active', (err, res) => {
    if (err) return cb(err)
    return cb(null, res.rows)
  })
}

exports.addUserToActiveLobby = (username, cb) => {
  const text = 'INSERT INTO active(username) VALUES($1)'
  const values = [username]
  queryDB(text, values, cb)
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
  Chat.query(text, values, (err, res) => {
    if (err) return cb(err)
    return cb(null, res.rows[0])
  })
}

