const mongoose = require('mongoose')
const crypto = require('crypto')

const encrypt = password => {
  const hmac = crypto.createHmac('sha256', 'happy dog salsts')
  hmac.update(password)
  return hmac.digest('hex')
}

const schema = mongoose.Schema({
  username: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true, set: encrypt },
  registrationDate: { type: Date, default: Date.now }
})

schema.virtual('id').get(function () {
  return this._id.toHexString()
})

schema.statics.findAll = async function() {
  return this.find().exec()
}
schema.statics.findOneByName = async function(username) {
  return this.findOne({ username }).exec()
}
schema.statics.findOneByNameAndPassword = async function(username, password) {
  return this.findOne({ username, password }).exec()
}

module.exports = mongoose.model('User', schema)
