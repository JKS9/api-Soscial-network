const EventModel = require('../models/event.js')
const UserModel = require('../models/user.js')

/**
 * Event
 * @class
 */
class Event {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', UserModel)
    this.EventModel = connect.model('Event', EventModel)

    this.createEvent()

    this.addMenbers()
    this.addModerators()
    this.addAdministrateur()

    this.deleteMenbers()
    this.DeleteEvent()

    this.showEvent()
    this.showEventById()

    this.updateEvent()
  }

  createEvent () {
    this.app.post('/event/create/', (req, res) => {
      try {
        const eventModel = this.EventModel(req.body)
        const administrators = req.body.administrators_ids

        this.UserModel.find({_id: {$in: administrators}}).then(user => {
          if (user.length === administrators.length) {
            eventModel.save().then(event => {
              res.status(200).json(event || {})
            }).catch(err => {
              res.status(500).json({
                code: 500,
                message: err
              })
            })
          } else {
            res.status(404).json({
              code: 404,
              message: 'imposible de créer un évenement, Administrateur selectionner introuvable'
            })
          }
        })
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  addMenbers () {
    this.app.post('/event/addMembers/:idevent', (req, res) => {
      try {   
        this.EventModel.findById(req.params.idevent, 'members_ids moderators_ids administrators_ids status').then(eventUser => {
          console.log(eventUser)

          switch (eventUser.status) {
            case 'public':
              if (eventUser.members_ids.some(o => req.body.members_ids.includes(o))) {
                res.status(400).json({
                  code: 203,
                  message: 'un utilisateur déja présent dans cette evenement'
                })
                return
              }
              eventUser.members_ids.push(...req.body.members_ids)
    
              eventUser.save().then(() => {
                res.status(200).json(eventUser || {})
              }).catch(err => {
                res.status(500).json({
                  code: 300,
                  message: err
                })
              })
              break
            case 'Privé':
              if (eventUser.moderators_ids.some(o => req.body.idsend.includes(o)) || eventUser.administrators_ids.some(o => req.body.idsend.includes(o))) {
                if (eventUser.members_ids.some(o => req.body.members_ids.includes(o))) {
                  res.status(400).json({
                    code: 203,
                    message: 'un utilisateur déja présent dans cette evenement'
                  })
                  return
                }
                eventUser.members_ids.push(...req.body.members_ids)
      
                eventUser.save().then(() => {
                  res.status(200).json(eventUser || {})
                }).catch(err => {
                  res.status(500).json({
                    code: 300,
                    message: err
                  })
                })
              } else {
                res.status(400).json({
                  code: 203,
                  message: 'vous ne pouvez pas ajouter des user'
                })
              }
              break
            case 'secret':
              if (eventUser.administrators_ids.some(o => req.body.idsend.includes(o))) {
                if (eventUser.members_ids.some(o => req.body.members_ids.includes(o))) {
                  res.status(400).json({
                    code: 203,
                    message: 'utilisateur déja présent dans cette evenement' 
                  })
                  return
                }
                eventUser.members_ids.push(...req.body.members_ids)
      
                eventUser.save().then(() => {
                  res.status(200).json(eventUser || {})
                }).catch(err => {
                  res.status(500).json({
                    code: 300,
                    message: err
                  })
                })
              } else {
                res.status(400).json({
                  code: 203,
                  message: 'vous ne pouvez pas ajouter des user'
                })
              }
              break
          }
        }).catch(err => {
          res.status(500).json({
            code: 400,
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

  addModerators () {
    this.app.post('/event/addModo/:idevent', (req, res) => {
      try {        
        this.EventModel.findById(req.params.idevent, 'moderators_ids administrators_ids').then(eventModo => {
          console.log(eventModo)

          if (eventModo.administrators_ids.some(o => req.body.idsend.includes(o))) {
            if (eventModo.moderators_ids.some(o => req.body.moderators_ids.includes(o))) {
              res.status(400).json({
                code: 203,
                message: 'utilisateur déja modérateur' 
              })
              return
            }
            eventModo.moderators_ids.push(...req.body.moderators_ids)
  
            eventModo.save().then(() => {
              res.status(200).json(eventModo || {})
            }).catch(err => {
              res.status(500).json({
                code: 300,
                message: err
              })
            })
          } else {
            res.status(400).json({
              code: 203,
              message: 'vous ne pouvez pas ajouter de modérateurs'
            })
          }
        }).catch(err => {
          res.status(500).json({
            code: 400,
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

  addAdministrateur () {
    this.app.post('/event/addAdmin/:idevent', (req, res) => {
      try {        
        this.EventModel.findById(req.params.idevent, 'administrators_ids').then(eventAdmin => {
          console.log(eventAdmin)

          if (eventAdmin.administrators_ids[0] === req.body.idsend) {
            if (eventAdmin.administrators_ids.some(o => req.body.administrators_ids.includes(o))) {
              res.status(400).json({
                code: 203,
                message: 'utilisateur déja admin' 
              })
              return
            }
            eventAdmin.administrators_ids.push(...req.body.administrators_ids)
  
            eventAdmin.save().then(() => {
              res.status(200).json(eventAdmin || {})
            }).catch(err => {
              res.status(500).json({
                code: 300,
                message: err
              })
            })
          } else {
            res.status(400).json({
              code: 203,
              message: 'vous ne pouvez pas ajouter d admin'
            })
          }
        }).catch(err => {
          res.status(500).json({
            code: 400,
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

  deleteMenbers () {
    this.app.delete('/event/deleteMenbers/:idevent', (req, res) => {
      try {        
        this.EventModel.findById(req.params.idevent, 'members_ids moderators_ids administrators_ids').then(eventUser => {
          console.log(eventUser)
          if (eventUser.moderators_ids.some(o => req.body.idsend.includes(o)) || eventUser.administrators_ids.some(o => req.body.idsend.includes(o))) {
            if (!eventUser.members_ids.some(o => req.body.members_ids.includes(o))) {
              res.status(400).json({
                code: 203,
                message: ' utilisateur introuvable'
              })
              return
            }
            eventUser.members_ids = eventUser.members_ids.filter(function (item) {
              return !req.body.members_ids.includes(item)
            })
            eventUser.save().then(() => {
              res.status(200).json(eventUser || {})
            }).catch(err => {
              res.status(500).json({
                code: 300,
                message: err
              })
            })
          } else {
            res.status(400).json({
              code: 203,
              message: 'vous ne pouvez supprimer cette user'
            })
          }
        }).catch(err => {
          res.status(500).json({
            code: 400,
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

  DeleteEvent () {
    this.app.delete('/event/delete/:idevent/user/:iduser', (req, res) => {
      try {
        this.EventModel.findById(req.params.idevent).then(event => {
          if (event.administrators_ids[0] === req.params.iduser) {
            this.EventModel.findByIdAndRemove(req.params.idevent).then(eventDelete => {
              res.status(200).json(eventDelete || {})
            }).catch(err => {
              res.status(500).json({
                code: 500,
                message: err
              })
            })
          } else {
            res.status(500).json({
              code: 500,
              message: 'you don t have permission'
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

  showEvent () {
    this.app.get('/event/show/', (req, res) => {
      try {
        this.EventModel.find({ status: 'public' }).then(event => {
          if (!event.length) {
            res.status(404).json({
              code: 500,
              message: 'aucun event trouvés :'
            })
          } else {
            res.status(200).json(event || {})
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

  showEventById () {
    this.app.get('/event/show/:id', (req, res) => {
      try {
        this.EventModel.find({ _id: req.params.id, status: 'public' }).then(event => {
          if (!event.length) {
            res.status(404).json({
              code: 404,
              message: 'aucun event trouvés :'
            })
          } else {
            res.status(200).json(event)
          }
        }).catch(() => {
          res.status(404).json({
            code: 404,
            message: 'aucun event trouvés :'
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
  
  updateEvent () {
    this.app.put('/event/update/:id', (req, res) => {
      try {
        this.EventModel.findOneAndUpdate(req.params.id, req.body).then(user => {
          res.status(200).json(user || {})
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
}

module.exports = Event
