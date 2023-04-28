const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { hash } = require('bcryptjs')

describe('User API', () => {
  let token, user

  // Define a beforeAll hook to connect to the database and set up test data
  beforeEach(async () => {
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
  })

  afterAll(async () => {
    // Remove the test user from the database
    await user.deleteOne()
  })

  describe('GET /api/me', () => {
    test('should return user profile when authenticated', async () => {
      const response = await request(app).get('/api/me').set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body.email).toBe(user.email)
    })

    test('should return 401 error when not authenticated', async () => {
      const response = await request(app).get('/api/me')
      expect(response.status).toBe(401)
      expect(response.body.message).toBe('No token! 🤔')
    })

    test('should return 404 error when user is not found', async () => {
      await user.deleteOne()
      const response = await request(app).get('/api/me').set('Authorization', `Bearer ${token}`)
      expect(response.status).toBe(404)
      // expect(response.body.message).toBe("User doesn't exist! 😕")
      expect(response.body.type).toBe('error')
    })
  })

  describe('PUT /api/me', () => {
    test('should update user profile when authenticated', async () => {
      const newName = 'Giridhar Talla'
      const response = await request(app)
        .put('/api/me')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: newName })
      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Profile updated successfully! 🎉')
      expect(response.body.user.name).toBe(newName)
    })

    test('should return 401 error when not authenticated', async () => {
      const response = await request(app).put('/api/me').send({ name: 'Test' })
      expect(response.status).toBe(401)
      expect(response.body.message).toBe('No token! 🤔')
    })

    test('should return 404 error when user is not found', async () => {
      await user.deleteOne()
      const response = await request(app)
        .put('/api/me')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Test' })
      expect(response.status).toBe(404)
      // expect(response.body.message).toBe("User doesn't exist! 😕")
      expect(response.body.type).toBe('error')
    })
  })
})
