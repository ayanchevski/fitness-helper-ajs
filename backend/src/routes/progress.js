const express = require('express')
const router = express.Router()
const Progress = require('../models/Progress')

// GET listing.
router.get('/', async (req, res, next) => {
  try {
    const loggedUser = req.session.user
  
    const progress = loggedUser ? await Progress.findByAuthor(loggedUser._id) : []
    
    res.status(200).json({ progress })
  } catch (err) {
    next(err)
  }
})

// Upsert
router.post('/', async (req, res, next) => {
  try {
    const loggedUser = req.session.user
    if (!loggedUser) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    let progress

    const newProgress = new Progress({
      author: loggedUser._id,
      date: req.body.date ? new Date(req.body.date) : new Date(), 
      weight: req.body.weight,
    })

    const oldProgress = await Progress.findOneByAuthorDate(loggedUser._id, newProgress.date)
    if (oldProgress) {
      // update
      oldProgress.weight = newProgress.weight
      await Progress.updateById(oldProgress._id, oldProgress)
      
      progress = oldProgress
    } else {
      // create
      await newProgress.save()
      newProgress.author = loggedUser
      
      progress = newProgress
    }
    
    return res.status(201).json({ progress })
  } catch(err) {
    if (err.message.startsWith('E11000 duplicate key error')) {
      return res.status(409).json({ message: 'DuplicateProgress' })
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

    const progress = await Progress.findById(req.params.id)
    if (!progress) {
      return res.status(404).json({ message: 'ProgressRecordNotFound' })
    }

    const { date, weight } = req.body
    if (date) progress.date = new Date(date)
    if (weight !== undefined) progress.weight = weight

    await Progress.updateById(req.params.id, progress)

    res.status(200).json({ progress })
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
    
    await Progress.deleteOneByAuthorAndId(loggedUser._id, req.params.id)

    res.status(204).end()
  } catch(err) {
    next(err)
  }
})

module.exports = router

