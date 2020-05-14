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

    this.updateSondage()
    this.updateSondageReponse()
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
              if (err) {
                res.status(400).json({
                  code: 400,
                  message: 'create sondage failed'
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
              message: 'parent of poll not found'
            })
          }
        })
      } catch (err) {
        if (err) {
          res.status(400).json({
            code: 400,
            message: 'bat request'
          })
        }
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
              if (err) {
                res.status(400).json({
                  code: 400,
                  message: 'add reponse of a sondage failed'
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
              message: 'sondage not found'
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
                      if (err) {
                        res.status(400).json({
                          code: 400,
                          message: 'add reponse user of a sondage failed'
                        })
                      }
                    })
                  }).catch(err => {
                    res.status(403).json({
                      code: 403,
                      err: err,
                      message: 'sondage reponse not-found'
                    })
                  })
                } else {
                  res.status(403).json({
                    code: 403,
                    message: 'You have already answered this survey'
                  })
                }
              }).catch(err => {
                if (err) {
                  res.status(400).json({
                    code: 400,
                    message: 'bad request'
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
                message: 'parent of poll not found'
              })
            }
          })
        }).catch(err => {
          if (err) {
            res.status(400).json({
              code: 400,
              message: 'parent of poll not found'
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
                    if (err) {
                      res.status(400).json({
                        code: 400,
                        message: 'Delete sondage failed'
                      })
                    }
                  })
                }).catch(err => {
                  if (err) {
                    res.status(400).json({
                      code: 400,
                      message: 'Delete sondage failed'
                    })
                  }
                })
              }).catch(err => {
                if (err) {
                  res.status(400).json({
                    code: 400,
                    message: 'Delete sondage failed'
                  })
                }
              })
            } else {
              res.status(403).json({
                code: 403,
                message: 'you dont have permission'
              })
            }
          }).catch(err => {
            if (err) {
              res.status(400).json({
                code: 400,
                message: 'parent of poll not found'
              })
            }
          })
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'sondage not found'
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
                    if (err) {
                      res.status(400).json({
                        code: 400,
                        message: 'Delete sondage reponse failed'
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
                    message: 'parent of poll not found'
                  })
                }
              })
            } else {
              this.SondageReponseModel.findByIdAndRemove(req.params.idreponse).then(sondage => {
                res.status(200).json({
                  code: 200,
                  message: 'delete reponse auto, beacause no poll find'
                })
              }).catch(err => {
                if (err) {
                  res.status(400).json({
                    code: 400,
                    message: 'parent of poll not found'
                  })
                }
              })
            }
          }).catch(err => {
            if (err) {
              res.status(400).json({
                code: 400,
                message: 'parent of poll not found'
              })
            }
          })
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'Reponse user not found'
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
                    if (err) {
                      res.status(400).json({
                        code: 400,
                        message: 'Delete sondage reponse failed'
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
                    message: 'parent of poll not found'
                  })
                }
              })
            } else {
              this.SondageUserReponseModel.findByIdAndRemove(req.params.idreponseUser).then(sondage => {
                res.status(200).json({
                  code: 200,
                  message: 'delete reponse auto, beacause no poll find'
                })
              }).catch(err => {
                if (err) {
                  res.status(400).json({
                    code: 400,
                    message: 'Delete failed'
                  })
                }
              })
            }
          }).catch(err => {
            if (err) {
              res.status(400).json({
                code: 400,
                message: 'parent of poll not found'
              })
            }
          })
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'Reponse user not found'
            })
          }
        })
      } catch (err) {
        if (err) {
          res.status(403).json({
            code: 403,
            message: 'bad request'
          })
        }
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
              if (err) {
                res.status(400).json({
                  code: 400,
                  message: 'show sondage failed'
                })
              }
            })
          } else {
            if (event.administrators_ids.some(o => req.params.idsend.includes(o)) || event.moderators_ids.some(o => req.params.idsend.includes(o)) || event.members_ids.some(o => req.params.idsend.includes(o))) {
              this.SondageModel.find({ id_event: req.params.idevent }).then(sondage => {
                res.status(200).json({
                  code: 200,
                  message: sondage
                })
              }).catch(err => {
                if (err) {
                  res.status(400).json({
                    code: 400,
                    message: 'show one sondage failed'
                  })
                }
              })
            } else {
              res.status(403).json({
                code: 403,
                message: 'you dont have permission'
              })
            }
          }
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'parent of poll not found'
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
                if (err) {
                  res.status(400).json({
                    code: 400,
                    message: 'show one sondage failed'
                  })
                }
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
                  if (err) {
                    res.status(400).json({
                      code: 400,
                      message: 'update sondage failed'
                    })
                  }
                })
              } else {
                res.status(403).json({
                  code: 403,
                  message: 'you dont have permission'
                })
              }
            }
          }).catch(err => {
            if (err) {
              res.status(403).json({
                code: 403,
                message: 'parent of poll not found'
              })
            }
          })
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'One search sondage not found'
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
   * Update one sondage
   */
  updateSondage () {
    this.app.put('/sondage/update/:idsondage/:idsend', (req, res) => {
      try {
        this.SondageModel.findById(req.params.idsondage).then(sondage => {
          this.EventModel.findById(sondage.id_event).then(event => {
            if (event.administrators_ids.some(o => req.params.idsend.includes(o)) || event.moderators_ids.some(o => req.params.idsend.includes(o)) || req.params.idsend === sondage.id_user_creator) {
              if (req.body.question) {
                const updateSondage = {
                  question: req.body.question
                }
                this.SondageModel.findOneAndUpdate(req.params.id, updateSondage).then(sondage => {
                  res.status(201).json({
                    code: 201,
                    message: 'sondage update'
                  })
                }).catch(err => {
                  if (err) {
                    res.status(400).json({
                      code: 400,
                      message: 'update sondage failed'
                    })
                  }
                })
              } else {
                res.status(400).json({
                  code: 400,
                  message: 'bad request'
                })
              }  
            } else {
              res.status(403).json({
                code: 403,
                message: 'you dont have permission'
              })
            }
          }).catch(err => {
            if (err) {
              res.status(403).json({
                code: 403,
                message: 'parent of poll not found'
              })
            }
          })
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'sondage not found'
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
   * Update reponse of a sondage
   */
  updateSondageReponse () {
    this.app.put('/sondage/update/reponse/:idreponse/:idsend', (req, res) => {
      try {
        this.SondageReponseModel.findById(req.params.idreponse).then(sondageReponse => {
          this.SondageModel.findById(sondageReponse.id_sondage).then(sondage => {
            this.EventModel.findById(sondage.id_event).then(event => {
              if (event.administrators_ids.some(o => req.params.idsend.includes(o)) || event.moderators_ids.some(o => req.params.idsend.includes(o)) || req.params.idsend === sondage.id_user_creator) {
                if (req.body.reponse) {
                  const updateSondageReponse = {
                    reponse: req.body.reponse
                  }
                  this.SondageReponseModel.findOneAndUpdate(req.params.id, updateSondageReponse).then(sondageRes => {
                    res.status(201).json({
                      code: 201,
                      message: 'reponse update'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(400).json({
                        code: 400,
                        message: 'update reponse failed'
                      })
                    }
                  })
                } else {
                  res.status(400).json({
                    code: 400,
                    message: 'bad request'
                  })
                }  
              } else {
                res.status(403).json({
                  code: 403,
                  message: 'you dont have permission'
                })
              }
            }).catch(err => {
              if (err) {
                res.status(403).json({
                  code: 403,
                  message: 'parent of poll not found'
                })
              }
            })
          }).catch(err => {
            if (err) {
              res.status(403).json({
                code: 403,
                message: 'parent of poll not found'
              })
            }
          })
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'sondage reponse not found'
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

module.exports = Sondage
