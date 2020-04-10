const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
  name: String,
  description: String,
  icone_group: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQp23GuzNT0Zojv_xcabt_RUaWxe7eKo65aay2RnPq0mCOf5NTK&usqp=CAU'
  },
  image_fond: {
    type: String,
    default: 'https://images.lanouvellerepublique.fr/image/upload/t_1020w/f_auto/5b95be27be7744fb5c8b467b.jpg'
  },
  date_start: {
    type: Date,
    defaut: new Date()
  },
  administrators_id: String,
  moderators_ids: {
    type: Array,
    default: []
  },
  members_ids: {
    type: Array,
    default: []
  },
  autorisation_members: {
    type: String,
    // 1 = autorisation pour parler et créer des events
    // 2 = autorisation pour parler mais pas créer d'events
    // 3 = aucune action possible (ne peut pas parler, ne peut pas créer d'events)
    default: '1'
  },
  events_ids: {
    type: Array,
    default: []
  },
  conversation_id: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: 'Privé'
  }
}, {
  collection: 'Groupe',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

module.exports = Schema
