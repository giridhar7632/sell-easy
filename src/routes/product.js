const express = require('express')
const router = express.Router()
const logger = require('../utils/logger')
const Product = require('../models/product')
const { isAuth } = require('../utils/isAuth')
const getPaginatedData = require('../utils/pagination')
const Review = require('../models/review')
const mongoose = require('mongoose')

// get all products
// GET /products?page=1&limit=10&search=phone&sort=-price
router.get('/', isAuth, async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '', sort = '-popularity' } = req.query
    const query = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            {
              category: {
                $in: await Category.find({
                  name: { $regex: search, $options: 'i' },
                }).distinct('_id'),
              },
            },
          ],
        }
      : {}
    const paginatedProducts = await getPaginatedData(Product, {
      filters: query,
      page,
      limit,
      sort,
      populate: [{ path: 'seller', select: '_id name profileImage', model: 'User' }, 'category'],
    })

    res.status(200).json(paginatedProducts)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error fetching all products! 😢', type: 'error', error })
  }
})

// get a product
router.get('/:productId', isAuth, async (req, res) => {
  try {
    const productId = req.params.productId
    const product = await Product.findById(productId).populate('seller', '_id name profileImage')

    if (!product) {
      return res.status(404).json({
        message: 'Product not found! 😢',
        type: 'error',
      })
    }

    res.status(200).json(product)
  } catch (error) {
    logger.error(error)

    return res.status(500).json({
      type: 'error',
      message: 'Error fetching product! 😢',
      error,
    })
  }
})

// get reviews of a product
router.get('/:productId/reviews', async (req, res) => {
  try {
    const productId = req.params.productId

    // Check if the product exists in the database
    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({
        message: 'Product not found!',
        type: 'error',
      })
    }

    // Start a database transaction
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
      // Get all reviews for the product
      const reviews = await Review.find({ 'target.type': 'Product', 'target.id': productId })
        .populate('reviewer', '_id name profileImage')
        .sort({ createdAt: -1 })
        .session(session)

      // Commit the transaction
      await session.commitTransaction()

      res.json({
        reviews,
      })
    } catch (error) {
      // Rollback the transaction if an error occurs
      await session.abortTransaction()
      console.error(error)
      res.status(500).json({
        message: 'Error updating database! 😢',
        type: 'error',
      })
    } finally {
      // End the transaction session
      session.endSession()
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: 'Error fetching reviews! 😢',
      type: 'error',
    })
  }
})

// add a product
router.post('/', isAuth, async (req, res) => {
  try {
    const { name, description, price, category, seller, image, media } = req.body

    // Create a new product document using the product schema
    const newProduct = new Product({ name, description, price, category, seller, image, media })

    // Save the new product document to the database
    await newProduct.save()

    const user = req.user

    if (user.role === 'user') {
      user.role = 'seller'
      await user.save()
    }

    return res.status(201).json({
      message: 'Product added successfully! 🎉',
      type: 'success',
      product: newProduct,
    })
  } catch (error) {
    logger.error(error)

    return res.status(500).json({
      type: 'error',
      message: 'Error adding product! 😢',
      error,
    })
  }
})

// Update a product
router.put('/:id', isAuth, async (req, res) => {
  try {
    const productId = req.params.id
    const product = await Product.findById(productId)

    if (!product) {
      return res.status(404).json({
        message: 'Product not found! 😢',
        type: 'error',
      })
    }

    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: 'You are not authorized to perform this action! 🔒',
        type: 'error',
      })
    }

    const updates = req.body
    Object.assign(product, updates)

    const updatedProduct = await product.save()
    return res.status(200).json({
      message: 'Product updated successfully 🎉',
      type: 'success',
      product: updatedProduct,
    })
  } catch (error) {
    logger.error(error)

    return res.status(500).json({
      message: 'Error updating product',
      type: 'error',
      error,
    })
  }
})

// delete a product
router.delete('/:id', isAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({
        message: "Product doesn't exist! 😢",
        type: 'error',
      })
    }

    // Check if the user is the creator of the product
    if (product.seller.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "You're not authorized to delete this product! 🔒",
        type: 'error',
      })
    }

    await product.deleteOne()

    return res.status(200).json({
      message: 'Product deleted successfully! 🎉',
    })
  } catch (error) {
    logger.error(error)

    return res.status(500).json({
      type: 'error',
      message: 'Error deleting the product! 😢',
      error,
    })
  }
})

module.exports = router
