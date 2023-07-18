const { sign } = require('jsonwebtoken')
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_LIFE } = require('./config')

// signing the access token
const createAccessToken = (id) => {
  return sign({ id }, ACCESS_TOKEN_SECRET, {
    expiresIn: 15 * 60,
  })
}

// signing the refresh token
const createRefreshToken = (id) => {
  return sign({ id }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_LIFE,
  })
}

// sending the access token to the client
const sendAccessToken = (_req, res, user, accessToken) => {
  res.json({
    accessToken,
    user,
    message: 'Sign in Successful 🥳',
    type: 'success',
  })
}

// sending the refresh token to the client as a cookie
const sendRefreshToken = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // expires in 7 days
    // domain: 'sell-easy.vercel.app',
    SameSite: 'None',
    sameSite: 'none',
    secure: true, // make sure to set this to true if your website is being served over HTTPS
  })
}

// for verifying the email
const createEmailVerificationToken = ({ _id, email }) => {
  const secret = email
  return sign({ id: _id }, secret, {
    expiresIn: '90d',
  })
}

const createPasswordResetToken = ({ _id, email, password }) => {
  const secret = password
  return sign({ id: _id, email }, secret, {
    expiresIn: 15 * 60, // 15 minutes
  })
}

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
  createEmailVerificationToken,
  createPasswordResetToken,
}
