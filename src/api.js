import openSocket from 'socket.io-client'
const socket = openSocket('http://localhost:3001')


function authenticateUser(setState) {

  const token = window.localStorage.getItem('authToken')

  socket.emit('authenticate user', token)

  socket.on('send user to login', () => setState('view', 'LOGIN'))

  socket.on('invalid username or password', () => alert('invalid username or password'))

  socket.on('user is valid', user => {
      subscribeToMessages((messages) => setState('messages', messages))
      subscribeToLobby((lobby) => setState('lobby', lobby ))
      setState('view', 'CHAT')
      setState('user', JSON.parse(user))
  })
}


function loginUser(userType, userData) {

  switch (userType) {
    case 'EXISTING':
      socket.emit('login existing user', JSON.stringify(userData))
      break;

    case 'NEW':
      socket.emit('register new user', JSON.stringify(userData))

      socket.on('login newly registered user', credentials => 
        socket.emit('login existing user', credentials))
      break;

    default:
      socket.emit('login new user', JSON.stringify(userData))
      break;
  }

  socket.on('assign new token', token => {
    console.log('saving token to localstorage')
    window.localStorage.setItem('authToken', token)
    console.log('reloading browser')
    window.location.reload(true)
  })
}


function checkIfUsernameIsValid(username, usernameIsValid) {

  socket.emit('verify username is unique', username)

  socket.on('username is available', () => usernameIsValid()) 
}


function subscribeToMessages(cb) {

  socket.on('new messages', messages => cb(messages))

  socket.on('invalid message', () => alert('message contains 1 or more invalid characters'))

  socket.emit('subscribe to messages')
}


function subscribeToLobby(cb) {

  socket.on('lobby was updated', lobby => cb(lobby))

  socket.emit('subscribe to lobby')
}


function postMessage(data) {
  socket.emit('new message', JSON.stringify(data))
}

function logout() {
  window.localStorage.setItem('authToken', '')
  window.location.reload(true)
}


export { authenticateUser, subscribeToMessages, 
  postMessage, checkIfUsernameIsValid, loginUser, logout }