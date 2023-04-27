const { createTransport } = require('nodemailer')
const { emailTemplate } = require('./templates')
const { CLIENT_URL, EMAIL_HOST, EMAIL_USER, EMAIL_PASSWORD } = require('./config')

const createPasswordResetUrl = (id, token) => `${CLIENT_URL}/reset-password/${id}/${token}`

const createEmailVerificationUrl = (id, token) => `${CLIENT_URL}/verify-email/${id}/${token}`

const transporter = createTransport({
  service: EMAIL_HOST,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
})

const passwordResetTemplate = (user, url) => {
  const { name, email } = user
  return {
    from: `Sell Easy <noreply@talla_11915139@nitkkr.ac.in>`,
    to: email,
    subject: `Sell Easy - Password Reset Link`,
    html: emailTemplate({
      title: 'Password Reset Link',
      subject: 'Sell Easy - Password Reset Link',
      body: `Hey ${name}!
			Reset your password by clicking on the button below.`,
      link: url,
      btn: 'Reset Password',
      footer: `The link will expire in 15 mins!
		If you haven't requested password reset, please ignore!
		`,
    }),
  }
}

const emailVerificationTemplate = (user, url) => {
  const { name, email } = user
  return {
    from: `Sell Easy <noreply@talla_11915139@nitkkr.ac.in>`,
    to: email,
    subject: `Verify your email! ${name}`,
    html: emailTemplate({
      title: 'Email Verification Link',
      subject: 'Sell Easy - Email Verification Link',
      body: `Hey ${name}!
			Verify your email by clicking the button below.`,
      link: url,
      btn: 'Verify',
      footer: `If you haven't created an account, please ignore!
		`,
    }),
  }
}

const passwordResetConfirmationTemplate = (user) => {
  const { name, email } = user

  return {
    from: `Sell Easy <noreply@talla_11915139@nitkkr.ac.in>`,
    to: email,
    subject: `Sell Easy - Password Reset Successful`,
    html: emailTemplate({
      title: 'Password Reset Successful',
      subject: 'Sell Easy - Password Reset Successful',
      body: `Hey ${name}!
			You have successfully completed resetting your password.`,
      footer: `If you haven't changed your password, please reset it by clicking forgot password!
		`,
    }),
  }
}

const emailVerifyConfirmationTemplate = (user) => {
  const { name, email } = user

  return {
    from: `Sell Easy <noreply@talla_11915139@nitkkr.ac.in>`,
    to: email,
    subject: `Sell Easy - Email Verification Successful`,
    html: emailTemplate({
      title: 'Email Verification Successful',
      subject: 'Sell Easy - Email Verification Successful',
      body: `Hey ${name}!
			Your email address has been successfully verified. Thank you for signing up for Sell Easy. We look forward to helping you buy and sell used goods easily.`,
      footer: `If you are not expecting this email, please ignore!
		`,
    }),
  }
}

module.exports = {
  transporter,
  createPasswordResetUrl,
  createEmailVerificationUrl,
  passwordResetTemplate,
  emailVerificationTemplate,
  passwordResetConfirmationTemplate,
  emailVerifyConfirmationTemplate,
}
