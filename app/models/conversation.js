const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id_groupe: {
    type: String
  },
  id_event: {
    type: String
  },
  date_start: {
    type: Date,
    defaut: new Date()
  }
}, {
  collection: 'conversation',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
