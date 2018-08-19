const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', async (req, res) => {
  res.status(200).json({ message: 'Hello' })
})

module.exports = router

