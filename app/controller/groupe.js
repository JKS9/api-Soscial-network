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
    this.createEventInGroupe()

    this.addMenbers()
    this.addModerators()
    this.addAdministrateur()

    this.deleteGroupe()
    this.deleteAdmin()
    this.deleteModerators()
    this.deleteMenbers()

    this.showGroup()
    this.showGroupEvent()

    this.updateSatus()
    this.updateGroupe()
    this.updateGroupePermission()
  }

  /**
   * Create groupe
   */
  createGroup () {
    this.app.post('/groupe/create/', (req, res) => {
      try {
        const groupModel = this.GroupeModel(req.body)
        const administrators = req.body.administrators_id

        this.UserModel.find({_id: {$in: administrators}}).then(user => {
          if (user.length === administrators.length) {
            groupModel.save().then(group => {
              res.status(201).json({
                code: 201,
                message: 'success create groupe'
              })
            }).catch(err => {
              if (err) {
                res.status(403).json({
                  code: 403,
                  message: 'failed create new groupe'
                })
              }
            })
          } else {
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
   * Create event in groupe
   */
  createEventInGroupe () {
    this.app.post('/groupe/create/event/:idgroupe', (req, res) => {
      try {
        this.GroupeModel.findById(req.params.idgroupe).then(groupe => {
          if (groupe.autorisation_members === '1') {
            if (groupe.moderators_ids.some(o => req.body.idsend.includes(o)) || groupe.administrators_id.some(o => req.body.idsend.includes(o)) || groupe.members_ids.some(o => req.body.idsend.includes(o))) {
              const newEventGroupe = {
                name: req.body.name,
                description: req.body.description,
                date_start: req.body.date_start,
                date_end: req.body.date_end,
                location: req.body.location,
                status: 'public',
                administrators_ids: req.body.administrators_ids,
                groupe_ids: req.params.idgroupe
              }
              const eventModel = this.EventModel(newEventGroupe)
              eventModel.save().then(newEventInGroupe => {
                res.status(201).json({
                  code: 201,
                  message: 'success add new event in this groupe',
                  sondage: newEventInGroupe
                })
              }).catch(err => {
                if (err) {
                  res.status(403).json({
                    code: 403,
                    message: 'failed create new event'
                  })
                }
              })
            }
          } else {
            if (groupe.administrators_id.some(o => req.body.idsend.includes(o))) {
              const newEventGroupe = {
                name: req.body.name,
                description: req.body.description,
                date_start: req.body.date_start,
                date_end: req.body.date_end,
                location: req.body.location,
                status: 'public',
                administrators_ids: req.body.administrators_ids,
                groupe_ids: req.params.idgroupe
              }
              const eventModel = this.EventModel(newEventGroupe)
              eventModel.save().then(newEventInGroupe => {
                res.status(201).json({
                  code: 201,
                  message: 'success add new event in this groupe',
                  sondage: newEventInGroupe
                })
              }).catch(err => {
                if (err) {
                  res.status(403).json({
                    code: 403,
                    message: 'failed create new event'
                  })
                }
              })
            }
          }
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'groupe not found'
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
   * Add members in groupe
   */
  addMenbers () {
    this.app.post('/groupe/addMembers/:idgroup', (req, res) => {
      try {   
        this.GroupeModel.findById(req.params.idgroup, 'members_ids moderators_ids administrators_id status').then(groupUser => {
          switch (groupUser.status) {
            case 'Public':
              if (groupUser.members_ids.some(o => req.body.members_ids.includes(o))) {
                res.status(403).json({
                  code: 403,
                  message: 'user already exist in groupe'
                })
                return
              }
              groupUser.members_ids.push(...req.body.members_ids)
    
              groupUser.save().then(() => {
                res.status(201).json({
                  code: 201,
                  message: 'success add members'
                })
              }).catch(err => {
                if (err) {
                  res.status(403).json({
                    code: 403,
                    message: 'add members failed'
                  })
                }
              })
              break
            case 'Privé':
              if (groupUser.moderators_ids.some(o => req.body.idsend.includes(o)) || groupUser.administrators_id.some(o => req.body.idsend.includes(o))) {
                if (groupUser.members_ids.some(o => req.body.members_ids.includes(o))) {
                  res.status(403).json({
                    code: 403,
                    message: 'user already exist in groupe'
                  })
                  return
                }
                groupUser.members_ids.push(...req.body.members_ids)
      
                groupUser.save().then(() => {
                  res.status(201).json({
                    code: 201,
                    message: 'success add members'
                  })
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'add members failed'
                    })
                  }
                })
              } else {
                res.status(403).json({
                  code: 403,
                  message: 'you dont have permssion'
                })
              }
              break
            case 'secret':
              if (groupUser.administrators_id.some(o => req.body.idsend.includes(o))) {
                if (groupUser.members_ids.some(o => req.body.members_ids.includes(o))) {
                  res.status(403).json({
                    code: 403,
                    message: 'user already exist in groupe' 
                  })
                  return
                }
                groupUser.members_ids.push(...req.body.members_ids)
      
                groupUser.save().then(() => {
                  res.status(201).json({
                    code: 201,
                    message: 'success add members'
                  })
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'update members failed'
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
            res.status(402).json({
              code: 402,
              message: 'groupe not found'
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
   * Add moderator in groupe
   */
  addModerators () {
    this.app.post('/groupe/addModo/:idgroup', (req, res) => {
      try {        
        this.GroupeModel.findById(req.params.idgroup, 'moderators_ids administrators_id').then(GroupModo => {
          if (GroupModo.administrators_id.some(o => req.body.idsend.includes(o))) {
            if (GroupModo.moderators_ids.some(o => req.body.moderators_ids.includes(o))) {
              res.status(403).json({
                code: 403,
                message: 'user already moderator' 
              })
              return
            }
            GroupModo.moderators_ids.push(...req.body.moderators_ids)
  
            GroupModo.save().then(() => {
              res.status(201).json({
                code: 201,
                message: 'success add moderator'
              })
            }).catch(err => {
              if (err) {
                res.status(403).json({
                  code: 403,
                  message: 'update failed'
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
              message: 'groupe not found'
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
   * Add Admin in groupe
   */
  addAdministrateur () {
    this.app.post('/groupe/addAdmin/:idgroup', (req, res) => {
      try {        
        this.GroupeModel.findById(req.params.idgroup, 'administrators_id').then(groupAdmin => {
          if (groupAdmin.administrators_id[0] === req.body.idsend) {
            if (groupAdmin.administrators_id.some(o => req.body.administrators_id.includes(o))) {
              res.status(403).json({
                code: 403,
                message: 'user already admin' 
              })
              return
            }
            groupAdmin.administrators_id.push(...req.body.administrators_id)
  
            groupAdmin.save().then(() => {
              res.status(201).json({
                code: 201,
                message: 'success admin add'
              })
            }).catch(err => {
              if (err) {
                res.status(403).json({
                  code: 403,
                  message: 'update failed'
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
              message: 'groupe not found'
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
   * Delete members in groupe
   */
  deleteMenbers () {
    this.app.delete('/groupe/deleteMenbers/:idgroup', (req, res) => {
      try {        
        this.GroupeModel.findById(req.params.idgroup, 'members_ids moderators_ids administrators_id').then(deleteMembers => {
          if (deleteMembers.moderators_ids.some(o => req.body.idsend.includes(o)) || deleteMembers.administrators_id.some(o => req.body.idsend.includes(o))) {
            if (!deleteMembers.members_ids.some(o => req.body.members_ids.includes(o))) {
              res.status(403).json({
                code: 403,
                message: 'user not found'
              })
              return
            }
            deleteMembers.members_ids = deleteMembers.members_ids.filter(function (item) {
              return !req.body.members_ids.includes(item)
            })
            deleteMembers.save().then(() => {
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
              message: 'you dont have permission'
            })
          }
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'groupe not found'
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
   * Delete moderator in groupe
   */
  deleteModerators () {
    this.app.delete('/groupe/deleteModerators/:idgroup', (req, res) => {
      try {        
        this.GroupeModel.findById(req.params.idgroup, 'moderators_ids administrators_id').then(DeleteModo => {
          if (DeleteModo.administrators_id.some(o => req.body.idsend.includes(o))) {
            if (!DeleteModo.moderators_ids.some(o => req.body.moderators_ids.includes(o))) {
              res.status(403).json({
                code: 403,
                message: 'user not found'
              })
              return
            }
            DeleteModo.moderators_ids = DeleteModo.moderators_ids.filter(function (item) {
              return !req.body.moderators_ids.includes(item)
            })
            DeleteModo.save().then(() => {
              res.status(200).json({
                code: 200,
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
              message: 'groupe not found'
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
   * Delete admin in groupe
   */
  deleteAdmin () {
    this.app.delete('/groupe/deleteAdmin/:idgroup', (req, res) => {
      try {        
        this.GroupeModel.findById(req.params.idgroup, 'administrators_id').then(deleteAdmin => {
          if (deleteAdmin.administrators_id[0] === req.body.idsend) {
            if (deleteAdmin.administrators_id[0] === req.body.administrators_id) {
              res.status(403).json({
                code: 403,
                message: 'you dont have a permission'
              })
              return
            }
            if (!deleteAdmin.administrators_id.some(o => req.body.administrators_id.includes(o))) {
              res.status(403).json({
                code: 403,
                message: 'you dont have a permission'
              })
              return
            }
            deleteAdmin.administrators_id = deleteAdmin.administrators_id.filter(function (item) {
              return !req.body.administrators_id.includes(item)
            })
            deleteAdmin.save().then(() => {
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
              message: 'groupe not found'
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
   * Delete groupe
   */
  deleteGroupe () {
    this.app.delete('/groupe/delete/:idgroup/user/:iduser', (req, res) => {
      try {
        this.GroupeModel.findById(req.params.idgroup).then(group => {
          if (group.administrators_id[0] === req.params.iduser) {
            this.GroupeModel.findByIdAndRemove(req.params.idgroup).then(groupDelete => {
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
              message: 'you don t have permission'
            })
          }
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'groupe not found'
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
   * Show groupe public
   */
  showGroup () {
    this.app.get('/groupe/show/', (req, res) => {
      try {
        this.GroupeModel.find({ status: 'Public' }).then(group => {
          if (!group.length) {
            res.status(403).json({
              code: 403,
              message: 'groupe not found'
            })
          } else {
            res.status(200).json({
              code: 200,
              message: group
            })
          }
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'groupe not found'
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
   * Show event in groupe
   */
  showGroupEvent () {
    this.app.get('/groupe/show/:idgroupe/event', (req, res) => {
      try {
        this.EventModel.find({ groupe_ids: req.params.idgroupe }).then(eventGroup => {
          if (!eventGroup.length) {
            res.status(403).json({
              code: 403,
              message: 'event not found'
            })
          } else {
            res.status(200).json({
              code: 200,
              message: eventGroup
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
   * update statu of a groupe
   */
  updateSatus () {
    this.app.put('/groupe/updateStatus/:idgroup', (req, res) => {
      try {
        this.GroupeModel.findById(req.params.idgroup, 'administrators_id status').then(group => {
          const groupModel = this.GroupeModel(req.body.status)
          if (!req.body.status) {
            res.status(403).json({
              code: 403,
              message: 'invalide tex'
            })
            return
          }
          if (req.body.status === 'Public' || req.body.status === 'Privé' || req.body.status === 'Secret') {
            if (group.administrators_id[0] === req.body.idsend) {
              groupModel.save().then(() => {
                res.status(201).json({
                  code: 201,
                  message: 'success update'
                })
              }).catch(err => {
                if (err) {
                  res.status(201).json({
                    code: 201,
                    message: 'update failed'
                  })
                }
              })
            } else {
              res.status(403).json({
                code: 403,
                message: 'you dont have a permission'
              })
            }
          } else {
            res.status(403).json({
              code: 403,
              message: 'invalide text'
            })
          }
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'groupe not found'
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
   * update one groupe
   */
  updateGroupe () {
    this.app.put('/groupe/update/:id', (req, res) => {
      try {
        this.GroupeModel.findOneAndUpdate(req.params.id, req.body).then(group => {
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
          res.status(403).json({
            code: 403,
            message: 'bad request'
          })
        }
      }
    })
  }

  /**
   * update autorisation of a groupe
   */
  updateGroupePermission () {
    this.app.put('/groupe/updatePermission/:id', (req, res) => {
      try {
        this.GroupeModel.findById(req.params.id, 'administrators_id autorisation_members').then(group => {
          if (!req.body.permission.autorisation_members) {
            res.status(403).json({
              code: 403,
              message: 'permission denied'
            })
            return
          }
          if (req.body.permission.autorisation_members === '1' || req.body.permission.autorisation_members === '2') {
            if (group.administrators_id[0] === req.body.idsend) {
              const groupModel = this.GroupeModel(req.body.permission)
              groupModel.save().then(() => {
                res.status(201).json({
                  code: 201,
                  message: 'success update permission'
                })
              }).catch(err => {
                if (err) {
                  res.status(403).json({
                    code: 403,
                    message: 'update failed'
                  })
                }
              })
            } else {
              res.status(403).json({
                code: 403,
                message: 'you dont have a permission'
              })
            }
          } else {
            res.status(403).json({
              code: 403,
              message: 'invalide text'
            })
          }
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'groupe not found'
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

module.exports = Groupe
