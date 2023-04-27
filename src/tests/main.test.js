const request = require('supertest')
const { hash } = require('bcryptjs')
const app = require('../app')
const User = require('../models/user')
const { createEmailVerificationToken, createPasswordResetToken } = require('../utils/tokens')

describe('Authentication API', () => {
  describe('GET /status', () => {
    it('should return "Live!! 👌"', async () => {
      const response = await request(app).get('/status')
      expect(response.status).toBe(200)
      expect(response.text).toBe('Live!! 👌')
    })
  })
  describe('GET /protected', () => {
    it('should return "You are not logged in! 😢" if the user is not authenticated', async () => {
      const response = await request(app).get('/protected')
      expect(response.status).toBe(404)
      expect(response.body.message).toBe('No token! 🤔')
    })
    it('should return "You are logged in! 🤗" with the user information if the user is authenticated', async () => {
      // Create a mock user
      await User.deleteMany({})
      const tempUser = new User({
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
      const response = await request(app)
        .get('/protected')
        .set('Authorization', `Bearer ${user.body.accessToken}`)
      expect(response.status).toBe(200)
      expect(response.body.message).toBe('You are logged in! 🤗')
    }, 50000)
  })
  describe('POST /verify-email/:id/:token', () => {
    it('should return "User doesn\'t exist! 😢" if the user ID is invalid', async () => {
      const response = await request(app).post('/verify-email/123/abc')
      expect(response.status).toBe(500)
      expect(response.body.message).toBe('Error sending email!')
    })
    it('should return "Invalid token! 😢" if the token is invalid', async () => {
      // Create a mock user
      await User.deleteMany({})
      const user = new User({
        name: 'Giridhar',
        email: 'talla_11915139@nitkkr.ac.in',
        password: await hash('password123', 12),
        phoneNumber: '1234567890',
      })
      await user.save()
      const response = await request(app).post(`/verify-email/${user._id}/abc`)
      expect(response.status).toBe(500)
      expect(response.body.type).toBe('error')
      expect(response.body.message).toBe('Invalid token! 😢')
    })
    it("should verify the user's email and send a confirmation email if the token is valid", async () => {
      // Create a mock user
      await User.deleteMany({})
      const user = new User({
        name: 'Giridhar',
        email: 'talla_11915139@nitkkr.ac.in',
        password: await hash('password123', 12),
        phoneNumber: '1234567890',
      })
      await user.save()
      // Generate a valid token for the user's email
      // const user = await User.findOne({ email: 'talla_11915139@nitkkr.ac.in' })
      const token = createEmailVerificationToken({ _id: user._id, email: user.email })
      const response = await request(app).post(`/verify-email/${user._id}/${token}`)
      expect(response.status).toBe(200)
      expect(response.body.message).toBe('Email verification success! 📧')
      // Check that the user's "verified" flag has been set to true
      const updatedUser = await User.findById(user._id)
      expect(updatedUser.verified).toBe(true)
      // TODO: Test that the confirmation email was sent successfully
    }, 50000)
  })
  describe('Password reset endpoints', () => {
    let testUser
    beforeAll(async () => {
      await User.deleteMany({})
      testUser = new User({
        name: 'Test User',
        email: 'giridhar.talla2002@gmail.com',
        password: await hash('password', 12),
        phoneNumber: '1234567890',
      })
      await testUser.save()
    })

    describe('POST /send-password-reset-email', () => {
      it('should return an error message if user does not exist', async () => {
        const response = await request(app)
          .post('/send-password-reset-email')
          .send({ email: 'nonexistent@example.com' })
        expect(response.status).toBe(401)
        expect(response.body.type).toBe('error')
        expect(response.body.message).toBe("User doesn't exist! 😢")
      })
      it('should send a password reset email if user exists', async () => {
        const response = await request(app)
          .post('/send-password-reset-email')
          .send({ email: testUser.email })
        expect(response.status).toBe(200)
        expect(response.body.type).toBe('success')
        expect(response.body.message).toBe('Password reset link has been sent to your email! 📧')
      })
    })

    describe('POST /reset-password/:id/:token', () => {
      let passwordResetToken
      beforeAll(() => {
        passwordResetToken = createPasswordResetToken(testUser)
      })

      it('should return an error message if user does not exist', async () => {
        const response = await request(app)
          .post(`/reset-password/nonexistent/${passwordResetToken}`)
          .send({ newPassword: 'newpassword' })
        expect(response.status).toBe(500)
        expect(response.body.type).toBe('error')
        expect(response.body.message).toBe('Error sending email!')
      })

      it('should return an error message if token is invalid', async () => {
        const response = await request(app)
          .post(`/reset-password/${testUser._id}/invalid-token`)
          .send({ newPassword: 'newpassword' })
        expect(response.status).toBe(500)
        expect(response.body.type).toBe('error')
        expect(response.body.message).toBe('Invalid token! 😢')
      })

      it('should reset the password and send a confirmation email if token is valid', async () => {
        const response = await request(app)
          .post(`/reset-password/${testUser._id}/${passwordResetToken}`)
          .send({ newPassword: 'newpassword' })
        expect(response.status).toBe(200)
        expect(response.body.type).toBe('success')
        expect(response.body.message).toBe('Password reset successful!')
        const updatedUser = await User.findById(testUser._id)
        expect(updatedUser.password).not.toBe(testUser.password)
        // TODO: Test that the confirmation email is sent
      })
    })
  })
})
