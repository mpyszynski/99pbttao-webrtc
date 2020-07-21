const express = require('express')
const passport = require('passport')
const router = express.Router()
const frontEndUri = process.env.FRONT_END_URI || 'http://localhost:3000';

// @desc    Auth with Google
// @route   GET /auth/google
router.get('/google', passport.authenticate('google', { scope: ['profile'] }))

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(frontEndUri)
  }
)

// @desc    Logout user
// @route   /auth/logout
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect(frontEndUri)
})

module.exports = router