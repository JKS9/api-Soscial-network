const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  name: String,
  description: String,
  date_start: {
    type: Date,
    defaut: new Date()
  },
  date_end: Date,
  location: {
    lat: String,
    long: String
  },
  administrators_ids: {
    type: Array,
    default: []
  },
  moderators_ids: {
    type: Array,
    default: []
  },
  members_ids: {
    type: Array,
    default: []
  }
}, {
  collection: 'events',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
