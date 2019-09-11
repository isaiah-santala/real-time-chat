const { Pool } = require('pg')
const { config } = require('./config')

const SDC = new Pool(config)

SDC.connect()

exports.getItemById = (id, cb) => {
  SDC.query(`SELECT * FROM items WHERE itemId = ${id}`, (err, data) => {
    if (err) return cb(err)
    return cb(null, data)
  })
}