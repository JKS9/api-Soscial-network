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
    this.createBilletBuy()

    this.DeleteBillet()

    this.UpdateTicket()

    this.showTicket()
    this.showTicketBuy()
  }

  /**
   * Create tickets of a event
   */
  createBillet () {
    this.app.post('/billet/create/:idevent', (req, res) => {
      try {
        this.EventModel.findById(req.params.idevent).then(event => {
          if (event.administrators_ids[0] === req.body.idsend) {
            const newTicket = {
              id_event: req.params.idevent,
              id_user_creator: req.body.idsend,
              name: req.body.name,
              price: req.body.price,
              nb_quantity: req.body.nb_quantity
            }
            const ticketModel = this.BilletModel(newTicket)
            ticketModel.save().then(newticket => {
              res.status(201).json({
                code: 201,
                message: 'success add new ticket in this event',
                ticket: newticket
              })
            }).catch(err => {
              if (err) {
                res.status(400).json({
                  code: 400,
                  message: 'creat shopping item failed'
                })
              }
            })
          } else {
            res.status(403).json({
              code: 403,
              message: 'you dont have the permission'
            })
          }
        }).catch(err => {
          if (err) {
            res.status(400).json({
              code: 400,
              message: 'event not found'
            })
          }
        })
      } catch (err) {
        if (err) {
          res.status(400).json({
            code: 400,
            message: 'bad request'
          })
        }
      }
    })
  }

  /**
   * Create tickets buy user
   */
  createBilletBuy () {
    this.app.post('/billet/buy/:idbillet', (req, res) => {
      try {
        this.BilletModel.findById(req.params.idbillet).then(ticket => {
          this.EventModel.findById(ticket.id_event).then(event => {
            if (event.status === 'public') {
              const buyTicket = {
                id_billet: req.params.idbillet,
                id_event: ticket.id_event,
                quantity: req.body.quantity,
                prix_Unitaire: ticket.price,
                prix_total: ticket.price * req.body.quantity,
                id_user_buy: req.body.idsend,
                city: req.body.city,
                city_code: req.body.code,
                street_number: req.body.street_number,
                street_type: req.body.street_type,
                street_name: req.body.street_name
              }
              const buyTicketModel = this.BilletBuyModel(buyTicket)
              buyTicketModel.save().then(newticketBuy => {
                res.status(201).json({
                  code: 201,
                  message: 'success for buy new ticket in this event',
                  ticket: newticketBuy
                })
              }).catch(err => {
                if (err) {
                  res.status(400).json({
                    code: 400,
                    message: 'buy ticket failed'
                  })
                }
              })
            } else {
              if (event.administrators_ids.some(o => req.body.idsend.includes(o)) || event.moderators_ids.some(o => req.body.idsend.includes(o)) || event.members_ids.some(o => req.body.idsend.includes(o))) {
                const buyTicket = {
                  id_billet: req.params.idbillet,
                  id_event: ticket.id_event,
                  quantity: req.body.quantity,
                  prix_Unitaire: ticket.price,
                  prix_total: ticket.price * req.body.quantity,
                  id_user_buy: req.body.idsend,
                  city: req.body.city,
                  city_code: req.body.code,
                  street_number: req.body.street_number,
                  street_type: req.body.street_type,
                  street_name: req.body.street_name
                }
                const buyTicketModel = this.BilletBuyModel(buyTicket)
                buyTicketModel.save().then(newticketBuy => {
                  res.status(201).json({
                    code: 201,
                    message: 'success for buy new ticket in this event',
                    ticket: newticketBuy
                  })
                }).catch(err => {
                  if (err) {
                    res.status(400).json({
                      code: 400,
                      message: 'buy ticket failed'
                    })
                  }
                })
              } else {
                res.status(400).json({
                  code: 400,
                  message: 'you dont have a permission'
                })
              }
            }
          }).catch(err => {
            if (err) {
              res.status(400).json({
                code: 400,
                message: 'not found'
              })
            }
          })
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'ticket not found'
            })
          }
        })
      } catch (err) {
        if (err) {
          res.status(400).json({
            code: 400,
            message: 'bad request'
          })
        }
      }
    })
  }

  /**
   * Delete ticker
   */
  DeleteBillet () {
    this.app.delete('/billet/delete/:idbillet/:idsend', (req, res) => {
      try {
        this.BilletModel.findById(req.params.idbillet).then(ticket => {
          if (ticket.id_user_creator === req.params.idsend) {
            this.BilletModel.findByIdAndRemove(req.params.idbillet).then(deleteTicket => {
              res.status(201).json({
                code: 201,
                message: 'success delete ticket'
              })
            }).catch(err => {
              if (err) {
                res.status(403).json({
                  code: 403,
                  message: 'delete failed'
                })
              }
            })
          } else {
            res.status(403).json({
              code: 403,
              message: 'you dont have a permission'
            })
          }
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'ticket not found'
            })
          }
        })
      } catch (err) {
        if (err) {
          res.status(400).json({
            code: 400,
            message: 'bad request'
          })
        }
      }
    })
  }

  /**
   * Update ticker
   */
  UpdateTicket () {
    this.app.put('/billet/update/:idbillet/:idsend', (req, res) => {
      try {
        this.BilletModel.findById(req.params.idbillet).then(ticket => {
          if (ticket.id_user_creator === req.params.idsend) {
            const updatetickets = {
              name: req.body.name,
              price: req.body.price,
              nb_quantity: req.body.nb_quantity
            }
            this.BilletModel.findByIdAndUpdate(req.params.idbillet, updatetickets).then(updateTicket => {
              res.status(201).json({
                code: 201,
                message: 'success update ticket'
              })
            }).catch(err => {
              if (err) {
                res.status(403).json({
                  code: 403,
                  message: 'update ticket failed'
                })
              }
            })
          } else {
            res.status(403).json({
              code: 403,
              message: 'you dont have a permission'
            })
          }
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'ticket not found'
            })
          }
        })
      } catch (err) {
        if (err) {
          res.status(400).json({
            code: 400,
            message: 'bad request'
          })
        }
      }
    })
  }

  /**
   * Show ticket
   */
  showTicket () {
    this.app.get('/billet/:idevent/:idsend', (req, res) => {
      try {
        this.EventModel.findById(req.params.idevent).then(event => {
          if (event.status === 'public') {
            this.BilletModel.find({ id_event: req.params.idevent }).then(ticket => {
              res.status(200).json({
                code: 200,
                message: ticket
              })
            }).catch(err => {
              if (err) {
                res.status(403).json({
                  code: 403,
                  message: 'ticket not found'
                })
              }
            })
          } else {
            if (event.administrators_ids.some(o => req.body.idsend.includes(o)) || event.moderators_ids.some(o => req.body.idsend.includes(o)) || event.members_ids.some(o => req.body.idsend.includes(o))) {
              this.BilletModel.find({ id_event: req.params.idevent }).then(ticket => {
                res.status(200).json({
                  code: 200,
                  message: ticket
                })
              }).catch(err => {
                if (err) {
                  res.status(403).json({
                    code: 403,
                    message: 'ticket not found'
                  })
                }
              })
            } else {
              res.status(403).json({
                code: 403,
                message: 'you dont have a permission'
              })
            }
          }
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'event not found'
            })
          }
        })
      } catch (err) {
        if (err) {
          res.status(400).json({
            code: 400,
            message: 'bad request'
          })
        }
      }
    })
  }

  /**
   * Show ticket buy user
   */
  showTicketBuy () {
    this.app.get('/billet/buy/:idevent/:idsend', (req, res) => {
      try {
        this.EventModel.findById(req.params.idevent).then(event => {
          if (event.administrators_ids.some(o => req.params.idsend.includes(o))) {
            this.BilletBuyModel.find({ id_event: req.params.idevent }).then(ticket => {
              res.status(200).json({
                code: 200,
                message: ticket
              })
            }).catch(err => {
              if (err) {
                res.status(403).json({
                  code: 403,
                  message: 'ticket not found'
                })
              }
            })
          } else {
            res.status(403).json({
              code: 403,
              message: 'you dont have a permission'
            })
          }
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'event not found'
            })
          }
        })
      } catch (err) {
        if (err) {
          res.status(400).json({
            code: 400,
            message: 'bad request'
          })
        }
      }
    })
  }
}

module.exports = billetterie
