const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id_photo: {
    type: String
  },
  id_send: {
    type: String
  },
  commentaire: {
    type: String
  },
  date_start: {
    type: Date,
    defaut: new Date()
  }
}, {
  collection: 'photo_commetaire',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
