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
  image: {
    type: String,
    default: 'https://images.lanouvellerepublique.fr/image/upload/t_1020w/f_auto/5b95be27be7744fb5c8b467b.jpg'
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
  },
  groupe_ids: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: 'Public'
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
