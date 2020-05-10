const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id_conversation: {
    type: String
  },
  id_user: {
    type: String
  },
  message: {
    type: String
  },
  date_send: {
    type: Date,
    defaut: new Date()
  }
}, {
  collection: 'messages',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
