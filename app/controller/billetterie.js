const EventModel = require('../models/event.js')
const UserModel = require('../models/user.js')

const BilletModel = require('../models/billetterie.js')
const BilletBuyModel = require('../models/billetterieBuy.js')
/**
 * billetterie
 * @class
 */
class billetterie {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', UserModel)
    this.EventModel = connect.model('Event', EventModel)

    this.BilletModel = connect.model('billetterie', BilletModel)
    this.BilletBuyModel = connect.model('billetterie_buy', BilletBuyModel)

    this.createBillet()
  }

  /**
   * Create tickets of a event
   */
  createBillet () {
    this.app.post('/billet/create/:idevent', (req, res) => {
      try {
        res.status(200).json({
          code: 200,
          message: 'ça marche'
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }
}

module.exports = billetterie
