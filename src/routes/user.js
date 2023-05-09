const express = require('express')
const router = express.Router()
const { isAuth } = require('../utils/isAuth')
const Review = require('../models/review')
const Product = require('../models/product')
const User = require('../models/user')

router.get('/', async (req, res) => {
  try {
    const users = await User.find({})
    return res.status(200).json(users)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error! 😢',
      type: 'error',
    })
  }
})

// Define route for getting user's own profile information
// 644b9943abb40e22051e672a : 5139
// 644bb98031828d3660be9c60 : 2002
router.get('/me', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate('wishlist')
      .populate({
        path: 'reviews',
        populate: {
          path: 'reviewer',
          select: '_id name profileImage',
          model: 'User',
        },
      })
      .exec()
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
router.put('/me', isAuth, async (req, res) => {
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

// Get user profile details
router.get('/:id', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: 'reviews',
      populate: {
        path: 'reviewer',
        select: '_id name profileImage',
        model: 'User',
      },
    })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json(user)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Get reviews given to user
router.get('/:id/reviews', isAuth, async (req, res) => {
  try {
    const reviews = await Review.find({
      'target.id': req.params.id,
      'target.type': 'User',
    })
      .populate('reviewer', '_id name profileImage')
      .sort({ createdAt: -1 })

    console.log({ reviews })

    res.json(reviews)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

// Get products listed by user
router.get('/:id/products', async (req, res) => {
  try {
    const products = await Product.find({ seller: req.params.id })
      .select('_id name image category price createdAt')
      .populate('category')
    // .populate('reviews')
    // .populate('seller', '_id name profileImage')

    console.log({ products })

    res.json(products)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server Error' })
  }
})

module.exports = router
