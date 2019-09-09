const express = require('express')
const app = express()

const cors = require('cors')
const bodyParser = require('body-parser')
const { messageIsNotValid } = require('./serverFns')

const data = require('./example')
const PORT = 3001

app.use(cors())
app.use(bodyParser.json())

app.get('/messages', (req, res) => {
  res.status(200).send(data)
})

app.post('/messages/create', (req, res) => {
  console.log(req.body)
  if (messageIsNotValid(req.body.message)) return res.status(422).send()

  data.data.push(req.body)
  res.status(201).send()
})

app.listen(PORT, () => console.log('...listening on port:' + PORT))