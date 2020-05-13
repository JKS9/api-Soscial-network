const EventModel = require('../models/event.js')
const UserModel = require('../models/user.js')

const SondageModel = require('../models/sondage.js')
const SondageReponseModel = require('../models/sondage_reponse.js')
const SondageUserReponseModel = require('../models/sondage_user_reponse.js')
/**
 * Sondage
 * @class
 */
class Sondage {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', UserModel)
    this.EventModel = connect.model('Event', EventModel)

    this.SondageModel = connect.model('Sondage', SondageModel)
    this.SondageReponseModel = connect.model('Sondage_reponse', SondageReponseModel)
    this.SondageUserReponseModel = connect.model('Sondage_user_reponse', SondageUserReponseModel)

    this.createSondage()
    this.ceateReponseSondage()
    this.addReponseUser()

    this.DeleteSondage()
    this.DeleteSondageReponse()
    this.DeleteSondageReponseUser()

    this.showSondage()
    this.showOneSondage()
  }

  /**
   * Create sondage
   */
  createSondage () {
    this.app.post('/sondage/create/:idevent', (req, res) => {
      try {
        this.EventModel.findById(req.params.idevent).then(event => {
          if (event.administrators_ids.some(o => req.body.idsend.includes(o)) || event.moderators_ids.some(o => req.body.idsend.includes(o)) || event.members_ids.some(o => req.body.idsend.includes(o))) {
            const newSondage = {
              id_event: req.params.idevent,
              question: req.body.question,
              id_user_creator: req.body.idsend
            }
            const sondageModel = this.SondageModel(newSondage)
            sondageModel.save().then(Sondage => {
              res.status(201).json({
                code: 201,
                message: 'success create Sondage',
                sondage: Sondage
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
              message: 'vous ne faite pas partie des membres'
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
   * Create reponse sondage of a sondage
   */
  ceateReponseSondage () {
    this.app.post('/sondage/create/reponse/:idsondage', (req, res) => {
      try {
        this.SondageModel.findById(req.params.idsondage).then(sondage => {
          if (sondage.id_user_creator === req.body.idsend) {
            const newReponse = {
              id_sondage: req.params.idsondage,
              reponse: req.body.reponse
            }
            const sondageReponseModel = this.SondageReponseModel(newReponse)
            sondageReponseModel.save().then(SondageReponse => {
              res.status(201).json({
                code: 201,
                message: 'success create new reponse in sondage',
                sondage: SondageReponse
              })
            }).catch(err => {
              res.status(500).json({
                code: 500,
                message: err
              })
            })
          } else {
            res.status(200).json({
              code: 200,
              message: 'tu n est pas l auteur du sondage'
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
   * Add reponse user of a sondage
   */
  addReponseUser () {
    this.app.post('/sondage/reponse/user/:idsondage', (req, res) => {
      try {
        this.SondageModel.findById(req.params.idsondage).then(sondage => {
          this.EventModel.findById(sondage.id_event).then(event => {
            if (event.administrators_ids.some(o => req.body.idsend.includes(o)) || event.moderators_ids.some(o => req.body.idsend.includes(o)) || event.members_ids.some(o => req.body.idsend.includes(o))) {
              this.SondageUserReponseModel.find({ id_sondage: req.params.idsondage, id_user: req.body.idsend }).then(sondageReponseUser => {
                if (sondageReponseUser.length === 0) {
                  this.SondageReponseModel.findById(req.body.idreponse).then(sondageReponse => {
                    const newReponseUser = {
                      id_sondage: req.params.idsondage,
                      id_reponse: req.body.idreponse,
                      id_user: req.body.idsend
                    }
                    const sondageUserReponseModel = this.SondageUserReponseModel(newReponseUser)
                    sondageUserReponseModel.save().then(SondageUserReponse => {
                      res.status(201).json({
                        code: 201,
                        message: 'success add new reponse in sondage',
                        sondage: SondageUserReponse
                      })
                    }).catch(err => {
                      res.status(500).json({
                        code: 500,
                        message: err
                      })
                    })
                  }).catch(err => {
                    res.status(403).json({
                      code: 403,
                      err: err,
                      message: 'reponse not-found'
                    })
                  })
                } else {
                  res.status(403).json({
                    code: 403,
                    message: 'Vous avez déjà repondu à ce sondage, vous ne pouvez modifier votre reponse'
                  })
                }
              }).catch(err => {
                res.status(500).json({
                  code: 500,
                  message: err
                })
              })
            } else {
              res.status(403).json({
                code: 403,
                message: 'vous ne faite pas partie des membres'
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
   * Delete sondage
   */
  DeleteSondage () {
    this.app.delete('/sondage/delete/:idsondage/:idsend', (req, res) => {
      try {
        this.SondageModel.findById(req.params.idsondage).then(sondage => {
          this.EventModel.findById(sondage.id_event).then(event => {
            if (event.administrators_ids.some(o => req.params.idsend.includes(o)) || event.moderators_ids.some(o => req.params.idsend.includes(o)) || sondage.id_user_creator === req.params.idsend) {
              this.SondageModel.findByIdAndRemove(req.params.idsondage).then(deleteSondage => {
                this.SondageReponseModel.deleteMany({id_sondage: req.params.idsondage}).then(deleteSondageReponse => {
                  this.SondageUserReponseModel.deleteMany({id_sondage: req.params.idsondage}).then(deleteSondageReponseUser => {
                    res.status(200).json({
                      code: 200,
                      message: 'success sondage delete'
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 500,
                      message: err
                    })
                  })
                }).catch(err => {
                  res.status(500).json({
                    code: 450,
                    message: err
                  })
                })
              }).catch(err => {
                res.status(500).json({
                  code: 400,
                  message: err
                })
              })
            } else {
              res.status(403).json({
                code: 403,
                message: 'vous ne pouvez delete ce sondage'
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
   * Delete reponse of a sondage
   */
  DeleteSondageReponse () {
    this.app.delete('/sondage/delete/reponse/:idreponse/:idsend', (req, res) => {
      try {
        this.SondageReponseModel.findById(req.params.idreponse).then(sondageReponse => {
          this.SondageModel.findById(sondageReponse.id_sondage).then(sondage => {
            if (sondage) {
              this.EventModel.findById(sondage.id_event).then(event => {
                if (event.administrators_ids.some(o => req.params.idsend.includes(o)) || event.moderators_ids.some(o => req.params.idsend.includes(o)) || sondage.id_user_creator === req.params.idsend) {
                  this.SondageReponseModel.findByIdAndRemove(req.params.idreponse).then(sondage => {
                    res.status(200).json({
                      code: 200,
                      message: 'success delete reponse'
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
                    message: 'vous ne pouvez delete cette reponse de sondage'
                  })
                }
              }).catch(err => {
                res.status(500).json({
                  code: 500,
                  message: err
                })
              })
            } else {
              this.SondageReponseModel.findByIdAndRemove(req.params.idreponse).then(sondage => {
                res.status(200).json({
                  code: 200,
                  message: 'delete reponse auto, beacause no poll find'
                })
              }).catch(err => {
                res.status(500).json({
                  code: 500,
                  message: err
                })
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
   * Delete reponse user of a sondage
   */
  DeleteSondageReponseUser () {
    this.app.delete('/sondage/delete/reponseUser/:idreponseUser/:idsend', (req, res) => {
      try {
        this.SondageUserReponseModel.findById(req.params.idreponseUser).then(sondageReponse => {
          this.SondageModel.findById(sondageReponse.id_sondage).then(sondage => {
            if (sondage) {
              this.EventModel.findById(sondage.id_event).then(event => {
                if (event.administrators_ids.some(o => req.params.idsend.includes(o)) || event.moderators_ids.some(o => req.params.idsend.includes(o)) || sondage.id_user_creator === req.params.idsend || sondageReponse.id_user === req.params.idsend) {
                  this.SondageUserReponseModel.findByIdAndRemove(req.params.idreponseUser).then(sondage => {
                    res.status(200).json({
                      code: 200,
                      message: 'success delete reponse user'
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
                    message: 'vous ne pouvez delete cette reponse de sondage'
                  })
                }
              }).catch(err => {
                res.status(500).json({
                  code: 500,
                  message: err
                })
              })
            } else {
              this.SondageUserReponseModel.findByIdAndRemove(req.params.idreponseUser).then(sondage => {
                res.status(200).json({
                  code: 200,
                  message: 'delete reponse auto, beacause no poll find'
                })
              }).catch(err => {
                res.status(500).json({
                  code: 500,
                  message: err
                })
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
   *  Show sondage of a event
   */
  showSondage () {
    this.app.get('/sondage/:idevent/:idsend', (req, res) => {
      try {
        this.EventModel.findById(req.params.idevent).then(event => {
          if (event.status === 'public') {
            this.SondageModel.find({ id_event: req.params.idevent }).then(sondage => {
              res.status(200).json({
                code: 200,
                message: sondage
              })
            }).catch(err => {
              res.status(500).json({
                code: 500,
                message: err
              })
            })
          } else {
            if (event.administrators_ids.some(o => req.params.idsend.includes(o)) || event.moderators_ids.some(o => req.params.idsend.includes(o)) || event.members_ids.some(o => req.params.idsend.includes(o))) {
              this.SondageModel.find({ id_event: req.params.idevent }).then(sondage => {
                res.status(200).json({
                  code: 200,
                  message: sondage
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
                message: 'vous avez pas la permission'
              })
            }
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
   * Show one sondage
   */
  showOneSondage () {
    this.app.get('/sondage/one/:idsondage/:idsend', (req, res) => {
      try {
        this.SondageModel.findById(req.params.idsondage).then(sondage => {
          this.EventModel.findById(sondage.id_event).then(event => {
            if (event.status === 'public') {
              this.SondageReponseModel.find({ id_sondage: req.params.idsondage }, 'reponse').then(sondageReponse => {
                res.status(200).json({
                  code: 200,
                  sondage: sondage,
                  reponse: sondageReponse
                })
              }).catch(err => {
                res.status(500).json({
                  code: 500,
                  message: err
                })
              })
            } else {
              if (event.administrators_ids.some(o => req.params.idsend.includes(o)) || event.moderators_ids.some(o => req.params.idsend.includes(o)) || event.members_ids.some(o => req.params.idsend.includes(o))) {
                this.SondageReponseModel.find({ id_sondage: req.params.idsondage }, 'reponse').then(sondageReponse => {
                  res.status(200).json({
                    code: 200,
                    sondage: sondage,
                    reponse: sondageReponse
                  })
                }).catch(err => {
                  res.status(500).json({
                    code: 500,
                    message: err
                  })
                })
                res.status(200).json({
                  code: 200,
                  message: sondage
                })
              } else {
                res.status(403).json({
                  code: 403,
                  message: 'vous avez pas la permission'
                })
              }
            }
          }).catch(err => {
            res.status(500).json({
              code: 500,
              message: err
            })
          })
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

module.exports = Sondage
