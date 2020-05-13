const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id_event: {
    type: String
  },
  id_user_creator: {
    type: String
  },
  name: {
    type: String
  },
  price: {
    type: String
  },
  nb_quantity: {
    type: Number
  },
  date_create: {
    type: Date,
    defaut: new Date()
  }
}, {
  collection: 'billetterie',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
