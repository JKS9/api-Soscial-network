const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id_message: {
    type: String
  },
  id_sende: {
    type: String
  },
  commentaire: {
    type: String
  },
  date_send: {
    type: Date,
    defaut: new Date()
  }
}, {
  collection: 'commentaire',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
