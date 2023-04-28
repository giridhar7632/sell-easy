const express = require('express')
const router = express.Router()
const Wishlist = require('../models/wishlist')
const { isAuth } = require('../utils/isAuth')

// Get all wishlists of a user
router.get('/', isAuth, async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ user: req.user._id }).populate('products')
    res.json(wishlists)
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      message: 'Internal server error! 😢',
      type: 'error',
    })
  }
})

// Create a new wishlist
router.post('/', isAuth, async (req, res) => {
  const { name, description } = req.body
  try {
    const wishlist = new Wishlist({
      user: req.user._id,
      name: name,
      description: description,
    })
    const savedWishlist = await wishlist.save()
    res.json(savedWishlist)
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      message: 'Internal server error! 😢',
      type: 'error',
    })
  }
})

// Add a product to a wishlist
router.post('/:id/products', isAuth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      _id: req.params.id,
      user: req.user._id,
    })
    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist doesn't exist! 😢",
        type: 'error',
      })
    }
    wishlist.products.push(req.body.productId)
    const updatedWishlist = await wishlist.save()
    res.json(updatedWishlist)
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      message: 'Internal server error! 😢',
      type: 'error',
    })
  }
})

// Delete a product from a wishlist
router.delete('/:id/products/:productId', isAuth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      _id: req.params.id,
      user: req.user._id,
    })
    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist doesn't exist! 😢",
        type: 'error',
      })
    }
    wishlist.products.pull(req.params.productId)
    const updatedWishlist = await wishlist.save()
    res.json(updatedWishlist)
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      message: 'Internal server error! 😢',
      type: 'error',
    })
  }
})

// Delete a wishlist
router.delete('/:id', isAuth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({
      _id: req.params.id,
      user: req.user._id,
    })
    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist doesn't exist! 😢",
        type: 'error',
      })
    }
    await wishlist.deleteOne()
    res.json({
      message: 'Wishlist deleted successfully! 🎉',
      type: 'success',
    })
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      message: 'Internal server error! 😢',
      type: 'error',
    })
  }
})

module.exports = router
