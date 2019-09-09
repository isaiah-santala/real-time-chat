const express = require('express')
const app = express()

const cors = require('cors')

const data = require('./example')
const PORT = 3001

app.use(cors())

app.get('/messages', (req, res) => {
  res.status(200).send(data)
})

app.listen(PORT, () => console.log('...listening on port:' + PORT))