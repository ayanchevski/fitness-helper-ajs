const mongoose = require('mongoose')

const schema = mongoose.Schema({
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now, require: true},
  weight: { type: Number, required: true },
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

schema.statics.findOneByAuthorDate = async function(author, date) {
  return this.findOne({ author, date }).exec()
}

schema.statics.deleteOneByAuthorAndId = async function(author, id) {
  return this.findOneAndDelete({ author, _id: id }).exec()
}

schema.statics.updateById = async function(id, update) {
  return this.findByIdAndUpdate(id, update).exec()
}

schema.index({ author: 1, date: 1 }, { unique: true })
schema.on('index', console.error)

module.exports = mongoose.model('Progress', schema)
