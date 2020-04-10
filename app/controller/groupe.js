const EventModel = require('../models/event.js')
const UserModel = require('../models/user.js')
const GroupeModel = require('../models/groupe.js')

/**
 * Event
 * @class
 */
class Groupe {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', UserModel)
    this.EventModel = connect.model('Event', EventModel)
    this.GroupeModel = connect.model('Groupe', GroupeModel)

    this.createGroup()
  }

  createGroup () {
    this.app.post('/groupe/create/', (req, res) => {
      res.status(200).json({
        code: 200,
        message: 'Creat groupe'
      })
    })
  }
}

module.exports = Groupe
