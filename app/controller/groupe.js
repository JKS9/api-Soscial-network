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
              res.status(200).json(group || {})
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
                res.status(500).json({
                  code: 500,
                  message: err
                })
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
                res.status(500).json({
                  code: 500,
                  message: err
                })
              })
            }
          }
        }).catch(err => {
          res.status(500).json({
            code: 300,
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
   * Add members in groupe
   */
  addMenbers () {
    this.app.post('/groupe/addMembers/:idgroup', (req, res) => {
      try {   
        this.GroupeModel.findById(req.params.idgroup, 'members_ids moderators_ids administrators_id status').then(groupUser => {
          console.log(groupUser)

          switch (groupUser.status) {
            case 'Public':
              if (groupUser.members_ids.some(o => req.body.members_ids.includes(o))) {
                res.status(400).json({
                  code: 203,
                  message: 'un utilisateur déja présent dans cette evenement'
                })
                return
              }
              groupUser.members_ids.push(...req.body.members_ids)
    
              groupUser.save().then(() => {
                res.status(200).json(groupUser || {})
              }).catch(err => {
                res.status(500).json({
                  code: 300,
                  message: err
                })
              })
              break
            case 'Privé':
              if (groupUser.moderators_ids.some(o => req.body.idsend.includes(o)) || groupUser.administrators_id.some(o => req.body.idsend.includes(o))) {
                if (groupUser.members_ids.some(o => req.body.members_ids.includes(o))) {
                  res.status(400).json({
                    code: 203,
                    message: 'un utilisateur déja présent dans cette evenement'
                  })
                  return
                }
                groupUser.members_ids.push(...req.body.members_ids)
      
                groupUser.save().then(() => {
                  res.status(200).json(groupUser || {})
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
              if (groupUser.administrators_id.some(o => req.body.idsend.includes(o))) {
                if (groupUser.members_ids.some(o => req.body.members_ids.includes(o))) {
                  res.status(400).json({
                    code: 203,
                    message: 'utilisateur déja présent dans cette evenement' 
                  })
                  return
                }
                groupUser.members_ids.push(...req.body.members_ids)
      
                groupUser.save().then(() => {
                  res.status(200).json(groupUser || {})
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

  /**
   * Add moderator in groupe
   */
  addModerators () {
    this.app.post('/groupe/addModo/:idgroup', (req, res) => {
      try {        
        this.GroupeModel.findById(req.params.idgroup, 'moderators_ids administrators_id').then(GroupModo => {
          console.log(GroupModo)

          if (GroupModo.administrators_id.some(o => req.body.idsend.includes(o))) {
            if (GroupModo.moderators_ids.some(o => req.body.moderators_ids.includes(o))) {
              res.status(400).json({
                code: 203,
                message: 'utilisateur déja modérateur' 
              })
              return
            }
            GroupModo.moderators_ids.push(...req.body.moderators_ids)
  
            GroupModo.save().then(() => {
              res.status(200).json(GroupModo || {})
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

  /**
   * Add Admin in groupe
   */
  addAdministrateur () {
    this.app.post('/groupe/addAdmin/:idgroup', (req, res) => {
      try {        
        this.GroupeModel.findById(req.params.idgroup, 'administrators_id').then(groupAdmin => {
          console.log(groupAdmin)

          if (groupAdmin.administrators_id[0] === req.body.idsend) {
            if (groupAdmin.administrators_id.some(o => req.body.administrators_id.includes(o))) {
              res.status(400).json({
                code: 203,
                message: 'utilisateur déja admin' 
              })
              return
            }
            groupAdmin.administrators_id.push(...req.body.administrators_id)
  
            groupAdmin.save().then(() => {
              res.status(200).json(groupAdmin || {})
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

  /**
   * Delete members in groupe
   */
  deleteMenbers () {
    this.app.delete('/groupe/deleteMenbers/:idgroup', (req, res) => {
      try {        
        this.GroupeModel.findById(req.params.idgroup, 'members_ids moderators_ids administrators_id').then(deleteMembers => {
          console.log(deleteMembers)
          if (deleteMembers.moderators_ids.some(o => req.body.idsend.includes(o)) || deleteMembers.administrators_id.some(o => req.body.idsend.includes(o))) {
            if (!deleteMembers.members_ids.some(o => req.body.members_ids.includes(o))) {
              res.status(400).json({
                code: 203,
                message: ' utilisateur introuvable'
              })
              return
            }
            deleteMembers.members_ids = deleteMembers.members_ids.filter(function (item) {
              return !req.body.members_ids.includes(item)
            })
            deleteMembers.save().then(() => {
              res.status(200).json(deleteMembers || {})
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

  /**
   * Delete moderator in groupe
   */
  deleteModerators () {
    this.app.delete('/groupe/deleteModerators/:idgroup', (req, res) => {
      try {        
        this.GroupeModel.findById(req.params.idgroup, 'moderators_ids administrators_id').then(DeleteModo => {
          console.log(DeleteModo)
          if (DeleteModo.administrators_id.some(o => req.body.idsend.includes(o))) {
            if (!DeleteModo.moderators_ids.some(o => req.body.moderators_ids.includes(o))) {
              res.status(400).json({
                code: 203,
                message: ' utilisateur introuvable'
              })
              return
            }
            DeleteModo.moderators_ids = DeleteModo.moderators_ids.filter(function (item) {
              return !req.body.moderators_ids.includes(item)
            })
            DeleteModo.save().then(() => {
              res.status(200).json(DeleteModo || {})
            }).catch(err => {
              res.status(500).json({
                code: 300,
                message: err
              })
            })
          } else {
            res.status(400).json({
              code: 203,
              message: 'vous ne pouvez supprimer ce modérateur'
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

  /**
   * Delete admin in groupe
   */
  deleteAdmin () {
    this.app.delete('/groupe/deleteAdmin/:idgroup', (req, res) => {
      try {        
        this.GroupeModel.findById(req.params.idgroup, 'administrators_id').then(deleteAdmin => {
          console.log(deleteAdmin)
          if (deleteAdmin.administrators_id[0] === req.body.idsend) {
            if (deleteAdmin.administrators_id[0] === req.body.administrators_id) {
              res.status(400).json({
                code: 203,
                message: 'vous ne pouvez pas supprimer un super admin'
              })
              return
            }
            if (!deleteAdmin.administrators_id.some(o => req.body.administrators_id.includes(o))) {
              res.status(400).json({
                code: 203,
                message: ' utilisateur introuvable'
              })
              return
            }
            deleteAdmin.administrators_id = deleteAdmin.administrators_id.filter(function (item) {
              return !req.body.administrators_id.includes(item)
            })
            deleteAdmin.save().then(() => {
              res.status(200).json(deleteAdmin || {})
            }).catch(err => {
              res.status(500).json({
                code: 300,
                message: err
              })
            })
          } else {
            res.status(400).json({
              code: 203,
              message: 'vous ne pouvez supprimer cette admin'
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

  /**
   * Delete groupe
   */
  deleteGroupe () {
    this.app.delete('/groupe/delete/:idgroup/user/:iduser', (req, res) => {
      try {
        this.GroupeModel.findById(req.params.idgroup).then(group => {
          if (group.administrators_id[0] === req.params.iduser) {
            this.GroupeModel.findByIdAndRemove(req.params.idgroup).then(groupDelete => {
              res.status(200).json(groupDelete || {})
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

  /**
   * Show groupe public
   */
  showGroup () {
    this.app.get('/groupe/show/', (req, res) => {
      try {
        this.GroupeModel.find({ status: 'Public' }).then(group => {
          if (!group.length) {
            res.status(404).json({
              code: 500,
              message: 'aucun groupe trouvés :'
            })
          } else {
            res.status(200).json(group || {})
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
   * Show event in groupe
   */
  showGroupEvent () {
    this.app.get('/groupe/show/:idgroupe/event', (req, res) => {
      try {
        this.EventModel.find({ groupe_ids: req.params.idgroupe }).then(eventGroup => {
          if (!eventGroup.length) {
            res.status(404).json({
              code: 500,
              message: 'aucun groupe trouvés :'
            })
          } else {
            res.status(200).json(eventGroup || {})
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
   * update statu of a groupe
   */
  updateSatus () {
    this.app.put('/groupe/updateStatus/:idgroup', (req, res) => {
      try {
        this.GroupeModel.findById(req.params.idgroup, 'administrators_id status').then(group => {
          const groupModel = this.GroupeModel(req.body.status)
          if (!req.body.status) {
            res.status(404).json({
              code: 404,
              message: 'mauvais champ'
            })
            return
          }
          if (req.body.status === 'Public' || req.body.status === 'Privé' || req.body.status === 'Secret') {
            if (group.administrators_id[0] === req.body.idsend) {
              groupModel.save().then(() => {
                res.status(200).json(groupModel || {})
              }).catch(err => {
                res.status(500).json({
                  code: 300,
                  message: err
                })
              })
            } else {
              res.status(404).json({
                code: 404,
                message: 'vous n avez pas la permission'
              })
            }
          } else {
            res.status(404).json({
              code: 404,
              message: 'champ invalide'
            })
          }
        }).catch(err => {
          res.status(500).json({
            code: 444,
            message: err
          })
        })
      } catch (err) {
        res.status(500).json({
          code: 333,
          message: err
        })
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
          res.status(200).json(group || {})
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
   * update autorisation of a groupe
   */
  updateGroupePermission () {
    this.app.put('/groupe/updatePermission/:id', (req, res) => {
      try {
        this.GroupeModel.findById(req.params.id, 'administrators_id autorisation_members').then(group => {
          if (!req.body.permission.autorisation_members) {
            res.status(404).json({
              code: 404,
              message: 'mauvais champ'
            })
            return
          }
          if (req.body.permission.autorisation_members === '1' || req.body.permission.autorisation_members === '2') {
            if (group.administrators_id[0] === req.body.idsend) {
              const groupModel = this.GroupeModel(req.body.permission)
              groupModel.save().then(() => {
                res.status(200).json(groupModel || {})
              }).catch(err => {
                res.status(500).json({
                  code: 300,
                  message: err
                })
              })
            } else {
              res.status(404).json({
                code: 404,
                message: 'vous n avez pas la permission'
              })
            }
          } else {
            res.status(404).json({
              code: 404,
              message: 'champ invalide'
            })
          }
          res.status(200).json(group || {})
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

module.exports = Groupe
