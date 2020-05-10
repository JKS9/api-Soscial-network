const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id_album: {
    type: String
  },
  id_user: {
    type: String
  },
  name_file: {
    type: String
  },
  date_start: {
    type: Date,
    defaut: new Date()
  }
}, {
  collection: 'album_photo',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
