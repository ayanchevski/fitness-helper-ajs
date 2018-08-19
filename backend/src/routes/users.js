const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.get('/', async (req, res, next) => {
  try {
    const user = req.session.user
    const users = await User.findAll()

    res.status(200).json({ me: user, all: users })
  } catch (err) {
    next(err)
  }
})

// Login
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOneByNameAndPassword(req.body.username, req.body.password)
    if (!user) {
      return res.status(401).json({ message: 'UserNotFound' })
    }

    req.session.regenerate(err => {
      if (err) {
        console.error(err)
      }
      req.session.user = user
      return res.status(200).json({ user })
    })
  } catch(err) {
    next(err)
  }
})

// Logout
router.post('/logout', async (req, res, next) => {
  try {
    
    req.session.destroy(err => {
      if (err) {
        console.error(err)
      }
      return res.status(204).end()
    })

  } catch(err) {
    next(err)
  }
})

// GET user by ID
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
  
    res.status(200).json({ user })
  } catch(err) {
    next(err)
  }
})

// Create
router.post('/', async (req, res, next) => {
  try {
    const user = new User({
      username: req.body.username,
      password: req.body.password
    })

    await user.save()
  
    req.session.user = user
    res.status(201).json({ user })
  } catch(err) {
    if (err.message.startsWith('E11000 duplicate key error')) {
      return res.status(409).json({ message: 'DuplicateUser'})
    }
    next(err)
  }
})

module.exports = router

