const EventModel = require('../models/event.js')
const UserModel = require('../models/user.js')

const ShoppingModel = require('../models/shoppingListe.js')
/**
 * Shopping
 * @class
 */
class Shopping {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', UserModel)
    this.EventModel = connect.model('Event', EventModel)

    this.ShoppingItem = connect.model('Shopping', ShoppingModel)

    this.createShoppingItem()
  }

  /**
   * Create shopping liste of a event
   */
  createShoppingItem () {
    this.app.post('/shopping/create/:idevent', (req, res) => {
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

module.exports = Shopping
