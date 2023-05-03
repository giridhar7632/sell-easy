const express = require('express')
const { isAuth } = require('../utils/isAuth')
const logger = require('../utils/logger')
const Review = require('../models/review')
const User = require('../models/user')
const Product = require('../models/product')
const mongoose = require('mongoose')

const router = express.Router()

router.get('/written', isAuth, async (req, res) => {
  try {
    const reviews = await Review.find({ reviewer: req.user._id })
      .populate({
        path: 'target.id',
        select: '_id name profileImage',
        model: 'User',
      })
      .sort({ createdAt: 'desc' })
    res.status(200).json(reviews)
  } catch (error) {
    logger.error(error)
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
      .populate({
        path: 'reviewer',
        select: '_id name profileImage',
        model: 'User',
      })
      .sort({ createdAt: 'desc' })
    res.status(200).json(reviews)
  } catch (error) {
    logger.error(error)
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
    }).populate({
      path: 'reviewer',
      select: '_id name profileImage',
      model: 'User',
    })

    res.json({
      reviews,
    })
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      message: 'Internal server error! 😢',
      type: 'error',
    })
  }
})

// Add a review
router.post('/', isAuth, async (req, res) => {
  const session = await mongoose.startSession()
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
    const targetObj = await TargetModel.findById(target.id).session(session)
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

    await session.withTransaction(async () => {
      // Save the review to the database
      const savedReview = await review.save({ session })

      // Update the comments of the user who wrote the review
      await User.findByIdAndUpdate(req.user._id, { $push: { comments: review._id } }, { session })

      // Update the reviews of the user who received the review
      const model = await TargetModel.findByIdAndUpdate(
        target.id,
        {
          $push: { reviews: review._id },
          $inc: { numReviews: 1 },
          $set: {
            rating: (targetObj.rating * targetObj.numReviews + rating) / (targetObj.numReviews + 1),
          },
        },
        { session, new: true }
      )

      return {
        savedReview,
        model,
      }
    })

    res.status(201).json({
      message: 'Review added successfully! 👍',
      type: 'success',
      review: savedReview,
    })
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      message: 'Internal server error! 😢',
      type: 'error',
    })
  } finally {
    session.endSession()
  }
})

// update a review
router.put('/:id', isAuth, async (req, res) => {
  try {
    const { rating, comment } = req.body
    const review = await Review.findById(req.params.id)
    if (!review) {
      return res.status(404).json({ message: 'Review not found' })
    }
    if (review.reviewer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to edit this review! 🔒' })
    }

    const TargetModel = review.target.type === 'Product' ? Product : User
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      // Update the review
      review.rating = rating
      review.comment = comment
      await review.save({ session })

      // Update the comments of the user who wrote the review
      await User.findByIdAndUpdate(req.user._id, { $push: { comments: review._id } }, { session })

      // Update the reviews of the user or product that received the review
      const targetObj = await TargetModel.findById(review.target.id).session(session)
      const reviews = await Review.find({ 'target.id': review.target.id }).session(session)
      const numReviews = reviews.length
      const totalRatings = reviews.reduce((sum, review) => sum + review.rating, 0)
      const newRating = totalRatings / numReviews
      targetObj.rating = newRating
      await targetObj.save({ session })

      await session.commitTransaction()

      res.status(200).json({ message: 'Review updated successfully! 👍' })
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error! 😢', type: 'error' })
  }
})

// Delete a review
router.delete('/:id', isAuth, async (req, res) => {
  const session = await mongoose.startSession()
  try {
    await session.withTransaction(async () => {
      const review = await Review.findById(req.params.id).session(session)
      if (!review) {
        return res.status(404).json({ message: 'Review not found' })
      }
      if (review.reviewer.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'You are not authorized to delete this review! 🔒' })
      }

      // Update the comments of the user who wrote the review
      await User.findByIdAndUpdate(review.reviewer, { $pull: { comments: review._id } }).session(
        session
      )

      // Update the reviews of the user who received the review
      const TargetModel = review.target.type === 'Product' ? Product : User
      const target = await TargetModel.findById(review.target.id).session(session)
      if (!target) {
        throw new Error(`${review.target.type} not found! 😢`)
      }
      const index = target.reviews.findIndex((id) => id.toString() === req.params.id.toString())
      if (index === -1) {
        throw new Error('Review not found in target reviews array')
      }
      target.reviews.splice(index, 1)
      const numReviews = target.reviews.length
      const oldRating = target.rating
      const newRating = numReviews > 0 ? (oldRating * numReviews - target.rating) / numReviews : 0
      target.rating = newRating
      await target.save()

      await review.deleteOne().session(session)
    })

    res.status(200).json({ message: 'Review deleted successfully! 😀' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error! 😢', type: 'error' })
  } finally {
    session.endSession()
  }
})

module.exports = router
