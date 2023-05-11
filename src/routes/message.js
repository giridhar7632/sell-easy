const express = require('express')
const router = express.Router()
const Conversation = require('../models/conversation')
const Message = require('../models/message')
const User = require('../models/user')
const { isAuth } = require('../utils/isAuth')
const logger = require('../utils/logger')
//add

router.post('/', isAuth, async (req, res) => {
  const { content, conversationId } = req.body

  if (!content || !conversationId) {
    console.log('Invalid data passed into request')
    return res.status(400).json({
      message: 'Bad request! 😕',
      type: 'error',
    })
  }

  let newMessage = {
    sender: req.user._id,
    content: content,
    chat: conversationId,
  }

  try {
    let message = await Message.create(newMessage)

    message = await message.populate([
      { path: 'sender', select: 'name profileImage' },
      { path: 'chat' },
    ])
    message = await User.populate(message, {
      path: 'users',
      select: '_id name email profileImage',
    })

    await Conversation.findByIdAndUpdate(conversationId, { latestMessage: message })

    res.json(message)
  } catch (error) {
    logger.error(error)
    return res.status(500).json({
      type: 'error',
      message: 'Error sending message!',
      error,
    })
  }
})

//get

router.get('/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.conversationId }).populate([
      { path: 'sender', select: '_id name email profileImage' },
      { path: 'chat' },
    ])
    res.status(200).json(messages)
  } catch (error) {
    logger.error(error)
    return res.status(500).json({
      type: 'error',
      message: 'Error fetching conversation!',
      error,
    })
  }
})

module.exports = router
