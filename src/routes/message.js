const express = require('express')
const router = express.Router()
const Message = require('../models/message')
const { isAuth } = require('../utils/isAuth')
const logger = require('../utils/logger')
//add

router.post('/', isAuth, async (req, res) => {
  const newMessage = new Message(req.body)

  try {
    const savedMessage = await newMessage.save()
    res.status(200).json(savedMessage)
  } catch (error) {
    logger.error(error)
    return res.status(500).json({
      type: 'error',
      message: 'Error creating user!',
      error,
    })
  }
})

//get

router.get('/:conversationId', async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    })
    res.status(200).json(messages)
  } catch (error) {
    logger.error(error)
    return res.status(500).json({
      type: 'error',
      message: 'Error creating user!',
      error,
    })
  }
})

module.exports = router
