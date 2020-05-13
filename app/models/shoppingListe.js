const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id_event: {
    type: String
  },
  name: {
    type: String
  },
  quantity: {
    type: String
  },
  date_going: {
    type: Number
  },
  id_user: {
    type: String
  }
}, {
  collection: 'shopping_list',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
