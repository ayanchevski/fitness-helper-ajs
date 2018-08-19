const express = require('express')
const router = express.Router()
const Exercise = require('../models/Exercise')

// GET listing.
router.get('/', async (req, res, next) => {
  try {
    const loggedUser = req.session.user

    const all = await Exercise.findAll()
    const mine = loggedUser ? await Exercise.findByAuthor(loggedUser._id) : []

    res.status(200).json({ mine, all })
  } catch (err) {
    next(err)
  }
})

// Create
router.post('/', async (req, res, next) => {
  try {
    const loggedUser = req.session.user
    if (!loggedUser) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const exercise = new Exercise({
      author: loggedUser._id,
      name: req.body.name,
      caloriesPerHour: req.body.caloriesPerHour
    })
    
    await exercise.save()
    exercise.author = loggedUser
    
    res.status(201).json({ exercise })
  } catch(err) {
    if (err.message.startsWith('E11000 duplicate key error')) {
      return res.status(409).json({ message: 'DuplicateExercise' })
    }
    next(err)
  }
})

// Update
router.put('/:id', async (req, res, next) => {
  try {
    const loggedUser = req.session.user
    if (!loggedUser) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    
    const exercise = await Exercise.findById(req.params.id)
    if (!exercise) {
      return res.status(404).json({ message: 'ExerciseNotFound' })
    }
    
    const { name, caloriesPerHour } = req.body
    if (name) exercise.name = name
    if (caloriesPerHour !== undefined) exercise.caloriesPerHour = caloriesPerHour

    await Exercise.updateById(req.params.id, exercise)

    res.status(200).json({ exercise })
  } catch(err) {
    next(err)
  }
})

// Delete
router.delete('/:id', async (req, res, next) => {
  try {
    const loggedUser = req.session.user
    if (!loggedUser) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    
    await Exercise.deleteOneByAuthorAndId(loggedUser._id, req.params.id)

    res.status(204).end()
  } catch(err) {
    next(err)
  }
})

module.exports = router

