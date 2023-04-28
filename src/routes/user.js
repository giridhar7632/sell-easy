const express = require('express')
const router = express.Router()
const { isAuth } = require('../utils/isAuth')
// const User = require('../models/user')

// Define route for getting user's own profile information
router.get('/', isAuth, async (req, res) => {
  try {
    const user = req.user
    // await user.populate(['wishlist', 'orders'])
    // If user is not found, return 404 error
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exist! 😕",
        type: 'error',
      })
    }

    // If user is found, return user object
    res.status(200).json(user)
  } catch (error) {
    // If there's an error, return 500 error
    console.log(error)
    res.status(500).json({
      message: 'Internal server error! 😢',
      type: 'error',
    })
  }
})

// Define route for updating user's own profile information
router.put('/', isAuth, async (req, res) => {
  try {
    const user = req.user
    // If user is not found, return 404 error
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exist! 😕",
        type: 'error',
      })
    }

    const updates = req.body
    Object.assign(user, updates)
    // Save updated user object to the database
    await user.save()

    // Return success message and updated user object
    res.status(200).json({
      message: 'Profile updated successfully! 🎉',
      user,
    })
  } catch (error) {
    // If there's an error, return 500 error
    console.log(error)
    res.status(500).json({
      message: 'Internal server error! 😢',
      type: 'error',
    })
  }
})

module.exports = router
