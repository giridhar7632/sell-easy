const http = require('http')
const app = require('./app')
const server = http.createServer(app)
const io = require('socket.io')(server)
const logger = require('./utils/logger')

let users = []

const addUser = (userId, socketId) => {
  logger.info({ userId })
  !users.some((user) => user.userId === userId) && users.push({ userId, socketId })
}

const removeUser = (socketId) => {
  logger.info({ socketId })
  users = users.filter((user) => user.socketId !== socketId)
}

const getUser = (userId) => {
  return users.find((user) => user.userId === userId)
}

io.on('connection', (socket) => {
  //when ceonnect
  logger.info('a user connected.')

  //take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id)
    io.emit('getUsers', users)
  })

  //send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId)
    io.to(user.socketId).emit('getMessage', {
      senderId,
      text,
    })
  })

  //when disconnect
  socket.on('disconnect', () => {
    logger.info('a user disconnected!')
    removeUser(socket.id)
    io.emit('getUsers', users)
  })
})

module.exports = server
