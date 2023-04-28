const express = require('express')
const { isAuth } = require('../utils/isAuth')
const Review = require('../models/review')
const User = require('../models/user')
const Product = require('../models/product')

const router = express.Router()

router.get('/written', isAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ reviewer: req.user._id })
      .populate('target.id')
      .sort({ createdAt: 'desc' })
    res.status(200).json(reviews)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error! 😢' })
  }
})

// Get reviews received by a user
router.get('/received/:id', isAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    const reviews = await Review.find({ 'target.id': req.params.id })
      .populate('reviewer')
      .sort({ createdAt: 'desc' })
    res.status(200).json(reviews)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error! 😢' })
  }
})

// Get all reviews for a product or seller
router.get('/:type/:id', async (req, res) => {
  try {
    const { type, id } = req.params

    // Check if the target is a product or a seller
    if (!type || !id) {
      return res.status(400).json({
        message: 'Please specify target type and ID! 🤔',
        type: 'error',
      })
    }

    // Check if the target exists in the database
    const TargetModel = type === 'Product' ? Product : User
    const targetObj = await TargetModel.findById(id)
    if (!targetObj) {
      return res.status(404).json({
        message: `${type} not found! 😢`,
        type: 'error',
      })
    }
    // "id": "644bb98031828d3660be9c60"
    // Get all reviews for the target
    const reviews = await Review.find({
      'target.type': type,
      'target.id': id,
    }).populate('reviewer')

    res.json({
      reviews,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Internal server error! 😢',
      type: 'error',
    })
  }
})

// Add a review
router.post('/', isAuth, async (req, res) => {
  try {
    const { target, rating, comment } = req.body

    // Check if the target is a product or a seller
    if (!target.type || !target.id) {
      return res.status(400).json({
        message: 'Please specify target type and ID! 🤔',
        type: 'error',
      })
    }

    // Check if the target exists in the database
    const TargetModel = target.type === 'Product' ? Product : User
    const targetObj = await TargetModel.findById(target.id)
    if (!targetObj) {
      return res.status(404).json({
        message: `${target.type} not found! 😢`,
        type: 'error',
      })
    }

    // Create the review object
    const review = new Review({
      target: {
        type: target.type,
        id: target.id,
      },
      reviewer: req.user._id,
      rating,
      comment,
    })

    // Save the review to the database
    const savedReview = await review.save()

    res.status(201).json({
      message: 'Review added successfully! 👍',
      review: savedReview,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Internal server error! 😢',
      type: 'error',
    })
  }
})

// Delete a review
router.delete('/:id', isAuth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }
    if (review.reviewer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this review! 🔒' })
    }
    await review.deleteOne()
    res.status(200).json({ message: 'Review deleted successfully! 😀' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error! 😢', type: 'error' })
  }
})

module.exports = router
