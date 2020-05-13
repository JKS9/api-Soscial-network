const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  id_billet: {
    type: String
  },
  id_event: {
    type: String
  },
  quantity: {
    type: String
  },
  prix_Unitaire: {
    type: Number
  },
  prix_total: {
    type: String
  },
  id_user_buy: {
    type: String
  },
  city: {
    type: String
  },
  city_code: { 
    type: String
  },
  street_number: { 
    type: String
  },
  street_type: { 
    type: String
  },
  street_name: {
    type: String
  },
  date_buy: {
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
