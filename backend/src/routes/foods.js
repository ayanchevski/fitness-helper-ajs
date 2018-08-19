const express = require('express')
const router = express.Router()
const Food = require('../models/Food')

// GET listing.
router.get('/', async (req, res, next) => {
  try {
    const loggedUser = req.session.user

    const all = await Food.findAll()
    const mine = loggedUser ? await Food.findByAuthor(loggedUser._id) : []

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
    
    const { name, carbs, fats, protein } = req.body
    const food = new Food({
      author: loggedUser._id,
      name,
      carbs,
      fats,
      protein,
      calories: 4*carbs + 4*protein + 9*fats
    })
    
    await food.save()

    food.author = loggedUser
    
    res.status(201).json({ food })
  } catch(err) {
    if (err.message.startsWith('E11000 duplicate key error')) {
      return res.status(409).json({ message: 'DuplicateFood' })
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
    
    const food = await Food.findById(req.params.id)
    if (!food) {
      return res.status(404).json({ message: 'FoodNotFound' })
    }
    
    const { carbs, fats, protein, name } = req.body
    if (name) food.name = name
    if (carbs !== undefined) food.carbs = carbs
    if (fats !== undefined) food.fats = fats
    if (protein !== undefined) food.protein = protein
    if (protein !== undefined || carbs  !== undefined || fats !== undefined ) food.calories = 4*food.carbs + 4*food.protein + 9*food.fats

    await Food.updateById(req.params.id, food)

    res.status(200).json({ food })
  } catch(err) {
    next(err)
  }
})

// Update
router.put('/image/:id', async (req, res, next) => {
  try {
    const loggedUser = req.session.user
    if (!loggedUser) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const food = await Food.findById(req.params.id)
    if (!food) {
      return res.status(404).json({ message: 'FoodNotFound' })
    }

    const { image } = req.body

    food.image = image

    await Food.updateById(req.params.id, food)

    res.status(200).json({ food })
  } catch (err) {
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
    
    await Food.deleteOneByAuthorAndId(loggedUser._id, req.params.id)

    res.status(204).end()
  } catch(err) {
    next(err)
  }
})

module.exports = router

