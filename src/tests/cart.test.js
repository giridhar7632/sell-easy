const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Product = require('../models/product')
const Cart = require('../models/cart')
const logger = require('../utils/logger')
const { hash } = require('bcryptjs')
const mongoose = require('mongoose')

describe('Cart API', () => {
  let token, user, product, tempProduct, productId, cart

  // Define a beforeAll hook to connect to the database and set up test data
  beforeAll(async () => {
    await User.deleteMany({})

    const tempUser = new User({
      name: 'Giridhar',
      email: 'talla_11915139@nitkkr.ac.in',
      password: await hash('password123', 12),
      phoneNumber: '1234567890',
    })

    await tempUser.save()

    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'talla_11915139@nitkkr.ac.in',
        password: 'password123',
      })
      .expect(200)

    token = response.body.accessToken
    user = await User.findById(tempUser._id)

    tempProduct = new Product({
      name: 'Macbook Air',
      price: 999,
      description: 'A thin and light laptop',
      seller: tempUser._id,
      category: new mongoose.Types.ObjectId().toHexString(),
      popularity: 50,
      image: 'https://source.unsplash.com/random/?macbookair',
      media: [
        'https://source.unsplash.com/random/?macbookair',
        'https://source.unsplash.com/random/?macbookair',
      ],
    })

    await tempProduct.save()
    productId = tempProduct._id

    product = await Product.findById(productId)
  })

  afterAll(async () => {
    // Remove the test user from the database
    await user.deleteOne()
  })

  beforeEach(async () => {
    // Clear the cart collection before each test
    await Cart.deleteMany()

    // Create a new cart for testing
    cart = new Cart({
      user: user._id,
      products: [
        {
          product: tempProduct._id,
          quantity: 1,
        },
      ],
    })
    await cart.save()
  })

  describe('GET /cart', () => {
    test('should return the user cart with total', async () => {
      const res = await request(app)
        .get('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)

      expect(res.body.cart.user).toEqual(user._id.toString())
      expect(res.body.total).toEqual(tempProduct.price)
    })

    test('should return 500 if error occurs', async () => {
      jest.spyOn(logger, 'error').mockImplementation(() => {})
      jest.spyOn(Cart, 'findOne').mockImplementationOnce(() => {
        throw new Error('Database error')
      })

      const res = await request(app)
        .get('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .expect(500)

      expect(res.body).toEqual({ message: 'Internal server error! 😢', type: 'error' })
      expect(logger.error).toHaveBeenCalledTimes(1)
      expect(Cart.findOne).toHaveBeenCalledTimes(1)
      expect(Cart.findOne).toHaveBeenCalledWith({ user: user._id })

      logger.error.mockRestore()
      Cart.findOne.mockRestore()
    })

    test('should return 401 if user is not authenticated', async () => {
      const res = await request(app).get('/api/cart')
      expect(res.status).toBe(401)
    })
  })

  describe('POST /cart', () => {
    test('should add product to the cart', async () => {
      const testProduct = new Product({
        name: 'Test Product',
        price: 999,
        description: 'Test description',
        seller: new mongoose.Types.ObjectId().toHexString(),
        category: new mongoose.Types.ObjectId().toHexString(),
        popularity: 50,
        image: 'https://source.unsplash.com/random/?macbookair',
        media: [
          'https://source.unsplash.com/random/?macbookair',
          'https://source.unsplash.com/random/?macbookair',
        ],
      })

      await testProduct.save()
      const newProduct = {
        productId: testProduct._id,
        quantity: 1,
      }

      const res = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .send(newProduct)
        .expect(200)

      expect(res.body.message).toEqual('Product added to cart! 🛒')
      expect(res.body.cart.products.length).toEqual(2)
    })

    test('should return 400 if product already exists in the cart', async () => {
      const existingProduct = {
        productId: tempProduct._id,
        quantity: 1,
      }

      const res = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .send(existingProduct)
        .expect(400)

      expect(res.body.message).toEqual('Product already exists in the cart! 🛒')
      expect(res.body.type).toEqual('error')
    })

    test('should return 500 if error occurs', async () => {
      jest.spyOn(logger, 'error').mockImplementation(() => {})
      jest.spyOn(Cart, 'findOne').mockImplementationOnce(() => {
        throw new Error('Database error')
      })

      const res = await request(app)
        .post('/api/cart')
        .set('Authorization', `Bearer ${token}`)
        .expect(500)

      expect(logger.error).toHaveBeenCalledTimes(1)
      expect(res.body).toEqual({ message: 'Internal server error! 😢', type: 'error' })

      // Restore the mocked functions to their original implementation
      logger.error.mockRestore()
      Cart.findOne.mockRestore()
    })
  })

  describe('DELETE /cart/:id', () => {
    test('should return 404 if product does not exist in cart', async () => {
      const fakeProductId = new mongoose.Types.ObjectId()
      const response = await request(app)
        .delete(`/api/cart/${fakeProductId}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        message: "Product doesn't exist in cart! 😢",
        type: 'error',
      })
    })

    test('should remove the product from the cart and return updated cart and total', async () => {
      // const updatedCart = {
      //   user: user._id,
      //   products: [],
      // }
      const response = await request(app)
        .delete(`/api/cart/${productId}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(200)
      expect(response.body.message).toEqual('Product removed from cart! 😃')
    })

    test('should return 404 if cart does not exist', async () => {
      await Cart.deleteMany()

      const response = await request(app)
        .delete(`/api/cart/${productId}`)
        .set('Authorization', `Bearer ${token}`)

      expect(response.status).toBe(404)
      expect(response.body).toEqual({
        message: "Cart doesn't exist! 😢",
        type: 'error',
      })
    })
  })
})
