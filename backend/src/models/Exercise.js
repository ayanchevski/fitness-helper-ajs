const mongoose = require('mongoose')

const schema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true },
  name: { type: String, required: true, unique: true },
  caloriesPerHour: { type: Number, required: true },
})
/* todo: consider virtual getters - darn usefull */
/* todo: consider using middlewear - http://mongoosejs.com/docs/middleware.html */
schema.virtual('id').get(function () {
  return this._id.toHexString()
})

schema.statics.findAll = async function() {
  return this.find().populate('author').exec()
}

schema.statics.findByAuthor = async function(author) {
  return this.find({ author }).populate('author').exec()
}

schema.statics.deleteOneByAuthorAndId = async function(author, id) {
  return this.findOneAndDelete({ author, _id: id }).exec()
}

schema.statics.updateById = async function(id, update) {
  return this.findByIdAndUpdate(id, update).exec()
}

module.exports = mongoose.model('Exercise', schema)
