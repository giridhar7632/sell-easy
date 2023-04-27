const request = require('supertest')
const app = require('../app')
const User = require('../models/user')
const { hash } = require('bcryptjs')

describe('Authentication API', () => {
  describe('POST /register', () => {
    test('Should create a new user', async () => {
      await User.deleteMany({})
      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Giridhar',
          email: 'talla_11915139@nitkkr.ac.in',
          password: 'password123',
          phoneNumber: '1234567890',
        })
        .expect(200)
      expect(response.body.message).toEqual(
        'Verify your email by clicking the link sent to your email! 📧'
      )
    }, 20000)
    test('Should return an error if the user already exists', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          name: 'Giridhar',
          email: 'talla_11915139@nitkkr.ac.in',
          password: 'password123',
          phoneNumber: '1234567890',
        })
        .expect(500)
      expect(response.body.message).toEqual('User already exists! Try logging in. 😄')
    })
  })
  describe('POST /login', () => {
    test('Should log in a user with valid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'talla_11915139@nitkkr.ac.in',
          password: 'password123',
        })
        .expect(200)
      expect(response.body.user.email).toBe('talla_11915139@nitkkr.ac.in')
      expect(response.body.accessToken).toBeDefined()
    })
    test('Should return an error if the user does not exist', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent.user@example.com',
          password: 'password123',
        })
        .expect(404)
      expect(response.body.message).toEqual("User doesn't exist! 😢")
    })
    test('Should return an error if the password is incorrect', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'talla_11915139@nitkkr.ac.in',
          password: 'wrongpassword',
        })
        .expect(403)
      expect(response.body.message).toEqual('Password is incorrect! ⚠️')
    })
  })
  describe('POST /logout', () => {
    test('Should clear the refresh token cookie', async () => {
      const response = await request(app).post('/auth/logout').expect(200)
      expect(response.body.message).toEqual('Logged out successfully! 🤗')
      expect(response.headers['set-cookie']).toEqual(
        expect.arrayContaining(['refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT'])
      )
    })
  })
  describe('POST /refresh_token', () => {
    test('Should refresh the access token', async () => {
      await User.deleteMany({})

      tempUser = new User({
        name: 'Giridhar',
        email: 'talla_11915139@nitkkr.ac.in',
        password: await hash('password123', 12),
        phoneNumber: '1234567890',
      })

      await tempUser.save()

      const user = await request(app)
        .post('/auth/login')
        .send({
          email: 'talla_11915139@nitkkr.ac.in',
          password: 'password123',
        })
        .expect(200)

      refreshToken = user.headers['set-cookie']
        .filter((cookie) => cookie.startsWith('refreshToken'))
        .map((cookie) => cookie.split(';')[0])
        .join(';')

      const response = await request(app)
        .post('/auth/refresh_token')
        .set('Cookie', `${refreshToken}`)
        .expect(200)

      expect(response.body.accessToken).toBeDefined()
      expect(response.headers['set-cookie']).toBeDefined()
      expect(response.headers['set-cookie']).toHaveLength(1)
      expect(response.headers['set-cookie'][0]).toMatch(/refreshToken=/)
    }, 50000)

    test('Should return 404 if no refresh token is provided', async () => {
      const response = await request(app).post('/auth/refresh_token').expect(404)
      expect(response.body.accessToken).not.toBeDefined()
      expect(response.body.user).not.toBeDefined()
      expect(response.body.message).toBe('No refresh token! 🤔')
    })

    test('Should return 401 if the refresh token is invalid', async () => {
      const response = await request(app)
        .post('/auth/refresh_token')
        .set('Cookie', 'refreshToken=invalid_token')
        .expect(401)

      expect(response.body.accessToken).not.toBeDefined()
      expect(response.body.message).toBe('Invalid refresh token! 🤔')
      expect(response.body.type).toBe('error')
    })
  })
})
