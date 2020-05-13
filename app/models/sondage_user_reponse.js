const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id_question: {
    type: String
  },
  id_reponse: {
    type: String
  },
  id_user: {
    type: String
  }
}, {
  collection: 'sondage_user_reponse',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
