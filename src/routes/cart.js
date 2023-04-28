const express = require('express')
const router = express.Router()
const { isAuth } = require('../utils/isAuth')
const logger = require('../utils/logger')
const Cart = require('../models/cart')

// Get cart
router.get('/', isAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate('products.product')
    const total = cart.products.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
    return res.json({ cart, total })
  } catch (error) {
    logger.error(error)
    return res.status(500).json({ message: 'Internal server error! 😢', type: 'error' })
  }
})

// Add item to cart
router.post('/', isAuth, async (req, res) => {
  try {
    const { productId, quantity } = req.body
    let cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        product: productId,
        quantity: quantity,
      })
      await cart.save()
    }

    const cartItem = await Cart.findOne({
      user: req.user._id,
      products: {
        $elemMatch: {
          product: productId,
        },
      },
    })
    if (cartItem) {
      return res.status(400).json({
        message: 'Product already exists in the cart! 🛒',
        type: 'error',
      })
    }

    const filter = { _id: cart._id, 'products.product': { $ne: productId } } // Check if the product already exists in the cart
    const update = { $push: { products: { product: productId, quantity: quantity } } }
    const options = { new: true } // Return the updated document

    const updatedCart = await Cart.findOneAndUpdate(filter, update, options).populate(
      'products.product'
    )
    const total = updatedCart.products.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    )
    return res.json({
      message: 'Product added to cart! 🛒',
      type: 'success',
      cart: updatedCart,
      total,
    })
  } catch (error) {
    logger.error(error)
    return res.status(500).json({ message: 'Internal server error! 😢', type: 'error' })
  }
})

// Remove item from cart
router.delete('/:id', isAuth, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
    if (!cart) {
      return res.status(404).json({
        message: "Cart doesn't exist! 😢",
        type: 'error',
      })
    }

    // Check if the item to be deleted exists in the cart
    const cartItemIndex = cart.products.findIndex((item) => item.product == req.params.id)
    if (cartItemIndex === -1) {
      return res.status(404).json({
        message: "Product doesn't exist in cart! 😢",
        type: 'error',
      })
    }

    // Remove the item from the cart
    cart.products.splice(cartItemIndex, 1)
    await cart.save()

    // Get updated cart total
    const updatedCart = await Cart.findOne({ user: req.user._id })
      .populate({
        path: 'products.product',
        populate: 'seller',
      })
      .select('-user')
      .lean()
    const cartTotal = updatedCart.products.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    )

    res.json({
      message: 'Product removed from cart! 😃',
      type: 'success',
      cart: updatedCart,
      total: cartTotal,
    })
  } catch (err) {
    logger.error(error)
    return res.status(500).json({ message: 'Internal server error! 😢', type: 'error' })
  }
})

module.exports = router
