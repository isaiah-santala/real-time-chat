const jwt = require('jsonwebtoken')

exports.messageIsNotValid = message => message.includes('<')

exports.createNewToken = (user, cb) => {

  const userStr = JSON.stringify({
    username: user.username,
    id: user.id
  })

  jwt.sign(userStr, 'secrets', (err, token) => {
    if (err) return cb(err)
    console.log('created new token')
    cb(null, JSON.stringify(token))
  })
}