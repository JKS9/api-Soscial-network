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

    this.DeleteOneItemShopping()

    this.updateShoppingItem()

    this.ShowSHoppingItem()
  }

  /**
   * Create shopping liste of a event
   */
  createShoppingItem () {
    this.app.post('/shopping/create/:idevent', (req, res) => {
      try {
        this.EventModel.findById(req.params.idevent).then(event => {
          if (event.shopping === true || event.shopping) {
            if (event.administrators_ids.some(o => req.body.idsend.includes(o)) || event.moderators_ids.some(o => req.body.idsend.includes(o)) || event.members_ids.some(o => req.body.idsend.includes(o))) {
              this.ShoppingItem.find({ id_user: req.body.idsend, id_event: req.params.idevent }).then(shoppingItem => {
                if (shoppingItem.length === 0) {
                  this.ShoppingItem.find({ name: req.body.name }).then(shoppingName => {
                    if (shoppingName.length === 0) {
                      const newticket = {
                        id_event: req.params.idevent,
                        name: req.body.name,
                        quantity: req.body.quantity,
                        id_user: req.body.idsend
                      }
                      const shoppingModel = this.ShoppingItem(newticket)
                      shoppingModel.save().then(shoppinItem => {
                        res.status(201).json({
                          code: 201,
                          message: 'success add new item in shopping list',
                          shopping_item: shoppinItem
                        })
                      }).catch(err => {
                        res.status(500).json({
                          code: 512,
                          message: err
                        })
                      })
                    } else {
                      res.status(403).json({
                        code: 403,
                        message: 'item déja présent dans la shopping liste'
                      })
                    }
                  }).catch(err => {
                    res.status(500).json({
                      code: 512,
                      message: err
                    })
                  })
                } else {
                  res.status(403).json({
                    code: 403,
                    message: 'vous avez déjà enregistrer un item dans cette liste'
                  })
                }
              }).catch(err => {
                res.status(500).json({
                  code: 512,
                  message: err
                })
              })
            } else {
              res.status(403).json({
                code: 403,
                message: 'vous ne fait epas partie de event'
              })
            }
          } else {
            res.status(403).json({
              code: 403,
              message: 'La shopping liste nes pas active'
            })
          }
        }).catch(err => {
          res.status(500).json({
            code: 500,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * Delete one item in shopping liste 
   */
  DeleteOneItemShopping () {
    this.app.delete('/shopping/delete/:item/:idsend', (req, res) => {
      try {
        this.ShoppingItem.findById(req.params.item).then(item => {
          this.EventModel.findById(item.id_event).then(event => {
            if (event.administrators_ids.some(o => req.params.idsend.includes(o)) || event.moderators_ids.some(o => req.params.idsend.includes(o)) || item.id_user === req.params.idsend) {
              this.ShoppingItem.findByIdAndRemove(req.params.item).then(deleteItem => {
                res.status(200).json({
                  code: 200,
                  message: 'success delete shopping item'
                })
              }).catch(err => {
                res.status(500).json({
                  code: 500,
                  message: err
                })
              })
            } else {
              res.status(403).json({
                code: 403,
                message: 'vous ne faite pas partie de event'
              })
            }
          }).catch(err => {
            res.status(500).json({
              code: 500,
              message: err
            })
          })
        }).catch(err => {
          res.status(500).json({
            code: 512,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * Update one shopping item
   */
  updateShoppingItem () {
    this.app.put('/shopping/update/:item/:idsend', (req, res) => {
      try {
        this.ShoppingItem.findById(req.params.item).then(item => {
          this.EventModel.findById(item.id_event).then(event => {
            if (event.administrators_ids.some(o => req.params.idsend.includes(o)) || event.moderators_ids.some(o => req.params.idsend.includes(o)) || item.id_user === req.params.idsend) {
              const updateItem = {
                name: req.body.name,
                quantity: req.body.quantity
              }
              this.ShoppingItem.findOneAndUpdate(req.params.item, updateItem).then(update => {
                res.status(201).json({
                  code: 201,
                  message: 'shopping item update'
                })
              }).catch(err => {
                res.status(500).json({
                  code: 500,
                  message: err
                })
              })
            } else {
              res.status(403).json({
                code: 403,
                message: 'vous ne faite pas partie de event'
              })
            }
          }).catch(err => {
            res.status(500).json({
              code: 500,
              message: err
            })
          })
        }).catch(err => {
          res.status(500).json({
            code: 512,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  /**
   * Update one shopping item
   */
  ShowSHoppingItem () {
    this.app.get('/shopping/:idevent', (req, res) => {
      try {
        this.ShoppingItem.find({ id_event: req.params.idevent }).then(items => {
          res.status(201).json({
            code: 201,
            message: items
          })
        }).catch(err => {
          res.status(500).json({
            code: 512,
            message: err
          })
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
