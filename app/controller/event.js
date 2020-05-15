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
    this.deleteModerators()
    this.deleteAdmin()
    this.DeleteEvent()

    this.showEvent()

    this.updateEvent()
  }

  /**
   * Create event
   */
  createEvent () {
    this.app.post('/event/create/', (req, res) => {
      try {
        const eventModel = this.EventModel(req.body)
        const administrators = req.body.administrators_ids

        this.UserModel.find({_id: {$in: administrators}}).then(user => {
          if (user.length === administrators.length) {
            eventModel.save().then(event => {
              res.status(201).json({
                code: 201,
                message: 'success event create'
              })
            }).catch(err => {
              if (err) {
                res.status(403).json({
                  code: 403,
                  message: 'add user failed'
                })
              }
            })
          } else {
            res.status(403).json({
              code: 403,
              message: 'user not found'
            })
          }
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'user not found'
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
   * Add menbers in event
   */
  addMenbers () {
    this.app.post('/event/addMembers/:idevent', (req, res) => {
      try {   
        this.EventModel.findById(req.params.idevent, 'members_ids moderators_ids administrators_ids status').then(eventUser => {
          switch (eventUser.status) {
            case 'public':
              if (eventUser.members_ids.some(o => req.body.members_ids.includes(o))) {
                res.status(403).json({
                  code: 403,
                  message: 'user already exist in event' 
                })
                return
              }
              eventUser.members_ids.push(...req.body.members_ids)
    
              eventUser.save().then(() => {
                res.status(201).json({
                  code: 201,
                  message: 'success add menbers'
                })
              }).catch(err => {
                if (err) {
                  res.status(403).json({
                    code: 403,
                    message: 'add menbers failed'
                  })
                }
              })
              break
            case 'Privé':
              if (eventUser.moderators_ids.some(o => req.body.idsend.includes(o)) || eventUser.administrators_ids.some(o => req.body.idsend.includes(o))) {
                if (eventUser.members_ids.some(o => req.body.members_ids.includes(o))) {
                  res.status(403).json({
                    code: 403,
                    message: 'user already exist in event' 
                  })
                  return
                }
                eventUser.members_ids.push(...req.body.members_ids)
      
                eventUser.save().then(() => {
                  res.status(201).json({
                    code: 201,
                    message: 'success add menbers'
                  })
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'add menbers failed'
                    })
                  }
                })
              } else {
                res.status(403).json({
                  code: 403,
                  message: 'you dont have a permission'
                })
              }
              break
            case 'secret':
              if (eventUser.administrators_ids.some(o => req.body.idsend.includes(o))) {
                if (eventUser.members_ids.some(o => req.body.members_ids.includes(o))) {
                  res.status(403).json({
                    code: 403,
                    message: 'user already exist in event' 
                  })
                  return
                }
                eventUser.members_ids.push(...req.body.members_ids)
      
                eventUser.save().then(() => {
                  res.status(201).json({
                    code: 201,
                    message: 'success add menbers'
                  })
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'add menbers failed'
                    })
                  }
                })
              } else {
                res.status(403).json({
                  code: 403,
                  message: 'you dont have a permission'
                })
              }
              break
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
   * Add moderators in event
   */
  addModerators () {
    this.app.post('/event/addModo/:idevent', (req, res) => {
      try {        
        this.EventModel.findById(req.params.idevent, 'moderators_ids administrators_ids').then(eventModo => {
          if (eventModo.administrators_ids.some(o => req.body.idsend.includes(o))) {
            if (eventModo.moderators_ids.some(o => req.body.moderators_ids.includes(o))) {
              res.status(403).json({
                code: 403,
                message: 'user already exist in event' 
              })
              return
            }
            eventModo.moderators_ids.push(...req.body.moderators_ids)
  
            eventModo.save().then(() => {
              res.status(201).json({
                code: 201,
                message: 'success add mederator'
              })
            }).catch(err => {
              if (err) {
                res.status(403).json({
                  code: 403,
                  message: 'add moderator failed'
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

  /**
   * Add Admin in event
   */
  addAdministrateur () {
    this.app.post('/event/addAdmin/:idevent', (req, res) => {
      try {        
        this.EventModel.findById(req.params.idevent, 'administrators_ids').then(eventAdmin => {
          if (eventAdmin.administrators_ids[0] === req.body.idsend) {
            if (eventAdmin.administrators_ids.some(o => req.body.administrators_ids.includes(o))) {
              res.status(400).json({
                code: 203,
                message: 'user already exist in event' 
              })
              return
            }
            eventAdmin.administrators_ids.push(...req.body.administrators_ids)
  
            eventAdmin.save().then(() => {
              res.status(201).json({
                code: 201,
                message: 'success add admin'
              })
            }).catch(err => {
              if (err) {
                res.status(403).json({
                  code: 403,
                  message: 'add admin failed'
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

  /**
   * Delete menbers in event
   */
  deleteMenbers () {
    this.app.delete('/event/deleteMenbers/:idevent', (req, res) => {
      try {        
        this.EventModel.findById(req.params.idevent, 'members_ids moderators_ids administrators_ids').then(eventUser => {
          if (eventUser.moderators_ids.some(o => req.body.idsend.includes(o)) || eventUser.administrators_ids.some(o => req.body.idsend.includes(o))) {
            if (!eventUser.members_ids.some(o => req.body.members_ids.includes(o))) {
              res.status(403).json({
                code: 403,
                message: 'user not found'
              })
              return
            }
            eventUser.members_ids = eventUser.members_ids.filter(function (item) {
              return !req.body.members_ids.includes(item)
            })
            eventUser.save().then(() => {
              res.status(201).json({
                code: 201,
                message: 'success delete'
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
   * Delete moderator in event
   */
  deleteModerators () {
    this.app.delete('/event/deleteModerators/:idevent', (req, res) => {
      try {        
        this.EventModel.findById(req.params.idevent, 'moderators_ids administrators_ids').then(eventModo => {
          if (eventModo.administrators_ids.some(o => req.body.idsend.includes(o))) {
            if (!eventModo.moderators_ids.some(o => req.body.moderators_ids.includes(o))) {
              res.status(403).json({
                code: 403,
                message: 'user not found'
              })
              return
            }
            eventModo.moderators_ids = eventModo.moderators_ids.filter(function (item) {
              return !req.body.moderators_ids.includes(item)
            })
            eventModo.save().then(() => {
              res.status(201).json({
                code: 201,
                message: 'success delete'
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
   * Delete admin in event
   */
  deleteAdmin () {
    this.app.delete('/event/deleteAdmin/:idevent', (req, res) => {
      try {        
        this.EventModel.findById(req.params.idevent, 'administrators_ids').then(eventAdmin => {
          if (eventAdmin.administrators_ids[0] === req.body.idsend) {
            if (eventAdmin.administrators_ids[0] === req.body.administrators_ids) {
              res.status(403).json({
                code: 403,
                message: 'you dont have a permission'
              })
              return
            }
            if (!eventAdmin.administrators_ids.some(o => req.body.administrators_ids.includes(o))) {
              res.status(403).json({
                code: 403,
                message: 'user not found'
              })
              return
            }
            eventAdmin.administrators_ids = eventAdmin.administrators_ids.filter(function (item) {
              return !req.body.administrators_ids.includes(item)
            })
            eventAdmin.save().then(() => {
              res.status(201).json({
                code: 201,
                message: 'sucess delete'
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
   * Delete event
   */
  DeleteEvent () {
    this.app.delete('/event/delete/:idevent/user/:iduser', (req, res) => {
      try {
        this.EventModel.findById(req.params.idevent).then(event => {
          if (event.administrators_ids[0] === req.params.iduser) {
            this.EventModel.findByIdAndRemove(req.params.idevent).then(eventDelete => {
              res.status(201).json({
                code: 201,
                message: 'success delete'
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
   * Show event public
   */
  showEvent () {
    this.app.get('/event/show/', (req, res) => {
      try {
        this.EventModel.find({ status: 'public' }).then(event => {
          if (!event.length) {
            res.status(403).json({
              code: 403,
              message: 'event not found :'
            })
          } else {
            res.status(200).json({
              code: 200,
              message: event
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

  /**
   * Update one event
   */
  updateEvent () {
    this.app.put('/event/update/:id', (req, res) => {
      try {
        this.EventModel.findOneAndUpdate(req.params.id, req.body).then(user => {
          res.status(201).json({
            code: 201,
            message: 'success update'
          })
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'update failed'
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

module.exports = Event
