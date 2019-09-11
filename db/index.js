const { Pool } = require('pg')
const { config } = require('./config')

const Messages = new Pool(config)

Messages.connect()

exports.getAllMessages = (cb) => {
  Messages.query('SELECT username, message FROM messages', (err, data) => {
    if (err) return cb(err)
    return cb(null, data)
  })
}

exports.postMessage = (data, cb) => {
  const text = `INSERT INTO messages(username, message,) VALUES ('${data.username}', '${data.message}')`
  Messages.query(text, (err, response) => {
      if (err) return cb(err)
      return cb(null, response)
  })
}