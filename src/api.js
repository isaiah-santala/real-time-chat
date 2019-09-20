import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3001')

function subscribeToMessages(cb) {

  socket.on('new messages', messages => cb(messages))

  socket.on('invalid message', () => alert('message contains 1 or more invalid characters'))

  socket.emit('subscribeToMessages')
}

function postMessage(data) {
  socket.emit('new message', JSON.stringify(data))
}

function loginExistingUser(data) {
  socket.emit('login existing user', JSON.stringify(data))
}

function signUpNewUser(data) {
  socket.emit('login new user', JSON.stringify(data))
}

function authenticateUser(changeView, loadMessages) {
  const token = window.localStorage.getItem('authToken')

  socket.emit('authenticateUser', token)

  socket.on('sendUserToLogin', () => changeView('LOGIN'))

  socket.on('userIsLoggedIn', (token) => {
    subscribeToMessages(loadMessages)
    changeView('CHAT')
  })
}

function checkIfUsernameIsValid(username, usernameIsValid) {
  socket.emit('verify username is unique', username)

  socket.on('username is available', () => usernameIsValid()) 
}

export { authenticateUser, subscribeToMessages, 
  postMessage, loginExistingUser, signUpNewUser, checkIfUsernameIsValid }