const EventModel = require('../models/event.js')
const UserModel = require('../models/user.js')
const GroupeModel = require('../models/groupe.js')

const ConversationModel = require('../models/conversation.js')
const MessageModel = require('../models/message.js')
const CommentaireModel = require('../models/commentaire.js')

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

    this.ConversationModel = connect.model('Conversation', ConversationModel)
    this.MessageModel = connect.model('Message', MessageModel)
    this.CommentaireModel = connect.model('Commentaire', CommentaireModel)

    this.CreateConversation()
    this.addMessage()
    this.addCommentaire()
  }
  
  CreateConversation () {
    this.app.post('/conversation/create/', (req, res) => {
      try {
        if (req.body.status === 'groupe') {
          this.GroupeModel.findById(req.body.id).then(groupe => {
            if (groupe.conversation_id === null) {
              if (groupe.administrators_id[0] === req.body.idsend) {
                const bodys = {
                  id_groupe: groupe.id
                }
                const conversationModel = this.ConversationModel(bodys)
                conversationModel.save().then(conversation => {
                  const idconversation = {
                    conversation_id: conversation.id
                  }
                  this.GroupeModel.findByIdAndUpdate(conversation.id_groupe, idconversation).then(groupeUpdate => {
                    res.status(200).json({
                      code: 200,
                      message: 'conversation creer avec succès'
                    })
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
              } else {
                res.status(200).json({
                  code: 200,
                  message: 'vous avez pas la permission de creer une discution'
                })
              }
            } else {
              res.status(200).json({
                code: 200,
                message: 'ce groupe apartient déja une conversation'
              })
            }
          }).catch(err => {
            res.status(500).json({
              code: 500,
              message: err
            })
          })
        } else if (req.body.status === 'event') {
          this.EventModel.findById(req.body.id).then(event => {
            if (event.groupe_ids === null) {
              if (event.conversation_id === null) { 
                if (event.administrators_ids[0] === req.body.idsend) {
                  const bodys = {
                    id_event: event.id
                  }
                  const conversationModel = this.ConversationModel(bodys)
                  conversationModel.save().then(conversation => {
                    const idconversation = {
                      conversation_id: conversation.id
                    }

                    this.EventModel.findByIdAndUpdate(conversation.id_event, idconversation).then(eventid => {
                      res.status(200).json({
                        code: 200,
                        message: 'conversation creer avec succès'
                      })
                    }).catch(err => {
                      res.status(500).json({
                        code: 500,
                        message: err
                      })
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 222,
                      message: err
                    })
                  })
                } else {
                  res.status(200).json({
                    code: 200,
                    message: 'vous avez pas la permission de creer une discution'
                  })
                }
              } else {
                res.status(200).json({
                  code: 200,
                  message: 'cette evenement apartient déja une conversation'
                })
              }
            } else {
              this.GroupeModel.findById(event.groupe_ids).then(groupe => {
                if (groupe.conversation_id === null) {
                  if (groupe.administrators_id[0] === req.body.idsend) {
                    const bodys = {
                      id_groupe: groupe.id
                    }
                    const conversationModel = this.ConversationModel(bodys)
                    conversationModel.save().then(conversation => {
                      const idconversation = {
                        conversation_id: conversation.id
                      }

                      this.GroupeModel.findOneAndUpdate(groupe.id, idconversation).then(groupeUpdate => {
                        res.status(200).json({
                          code: 200,
                          message: 'conversation creer avec succès'
                        })
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
                  } else {
                    res.status(200).json({
                      code: 200,
                      message: 'vous avez pas la permission de creer une discution'
                    })
                  }
                } else {
                  res.status(200).json({
                    code: 200,
                    message: 'cette evenement apartient à un groupe qui posséde déja une conversation'
                  })
                }
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
        }
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  addMessage () {
    this.app.post('/conversation/messagerie/', (req, res) => {
      try {
        if (req.body.status === 'groupe') {
          this.GroupeModel.findById(req.body.id).then(groupe => {
            if (groupe.conversation_id != null) {
              if (groupe.administrators_id.some(o => req.body.idsend.includes(o))) {
                const message = {
                  id_conversation: groupe.conversation_id,
                  id_user: req.body.idsend,
                  message: req.body.message
                }
                const messageModel = this.MessageModel(message)
                messageModel.save().then(() => {
                  res.status(200).json({
                    code: 200,
                    message: 'message envoyer avec succés'
                  })
                }).catch(err => {
                  res.status(500).json({
                    code: 300,
                    message: err
                  })
                })
              } else {
                if (groupe.moderators_ids.some(o => req.body.idsend.includes(o))) {
                  const message = {
                    id_conversation: groupe.conversation_id,
                    id_user: req.body.idsend,
                    message: req.body.message
                  }
                  const messageModel = this.MessageModel(message)
                  messageModel.save().then(() => {
                    res.status(200).json({
                      code: 200,
                      message: 'message envoyer avec succés'
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 300,
                      message: err
                    })
                  })
                } else {
                  if (groupe.members_ids.some(o => req.body.idsend.includes(o))) {
                    const message = {
                      id_conversation: groupe.conversation_id,
                      id_user: req.body.idsend,
                      message: req.body.message
                    }
                    const messageModel = this.MessageModel(message)
                    messageModel.save().then(() => {
                      res.status(200).json({
                        code: 200,
                        message: 'message envoyer avec succés'
                      })
                    }).catch(err => {
                      res.status(500).json({
                        code: 300,
                        message: err
                      })
                    })
                  } else {
                    res.status(200).json({
                      code: 200,
                      message: 'vous ne faite pas partie du groupe'
                    })
                  }
                }
              }
            } else {
              res.status(200).json({
                code: 200,
                message: 'votre groupe na pas de discution, veuillez en créer une'
              })
            }
          }).catch(err => {
            res.status(500).json({
              code: 500,
              message: err
            })
          })
        } else if (req.body.status === 'event') {
          this.EventModel.findById(req.body.id).then(event => {
            if (event.groupe_ids === null) {
              if (event.conversation_id != null) {
                if (event.administrators_ids.some(o => req.body.idsend.includes(o))) {
                  const message = {
                    id_conversation: event.conversation_id,
                    id_user: req.body.idsend,
                    message: req.body.message
                  }
                  const messageModel = this.MessageModel(message)
                  messageModel.save().then(() => {
                    res.status(200).json({
                      code: 200,
                      message: 'message envoyer avec succés'
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 300,
                      message: err
                    })
                  })
                } else {
                  if (event.moderators_ids.some(o => req.body.idsend.includes(o))) {
                    const message = {
                      id_conversation: event.conversation_id,
                      id_user: req.body.idsend,
                      message: req.body.message
                    }
                    const messageModel = this.MessageModel(message)
                    messageModel.save().then(() => {
                      res.status(200).json({
                        code: 200,
                        message: 'message envoyer avec succés'
                      })
                    }).catch(err => {
                      res.status(500).json({
                        code: 300,
                        message: err
                      })
                    })
                  } else {
                    if (event.members_ids.some(o => req.body.idsend.includes(o))) {
                      const message = {
                        id_conversation: event.conversation_id,
                        id_user: req.body.idsend,
                        message: req.body.message
                      }
                      const messageModel = this.MessageModel(message)
                      messageModel.save().then(() => {
                        res.status(200).json({
                          code: 200,
                          message: 'message envoyer avec succés'
                        })
                      }).catch(err => {
                        res.status(500).json({
                          code: 300,
                          message: err
                        })
                      })
                    } else {
                      res.status(200).json({
                        code: 200,
                        message: 'vous ne faite pas partie de l event'
                      })
                    }
                  }
                }
              } else {
                res.status(200).json({
                  code: 200,
                  message: 'votre event na pas de discution, veuillez en créer une'
                })
              }
            } else {
              this.GroupeModel.findById(event.groupe_ids).then(groupe => {
                if (groupe.conversation_id != null) {
                  if (groupe.administrators_id.some(o => req.body.idsend.includes(o))) {
                    const message = {
                      id_conversation: groupe.conversation_id,
                      id_user: req.body.idsend,
                      message: req.body.message
                    }
                    const messageModel = this.MessageModel(message)
                    messageModel.save().then(() => {
                      res.status(200).json({
                        code: 200,
                        message: 'message envoyer avec succés'
                      })
                    }).catch(err => {
                      res.status(500).json({
                        code: 300,
                        message: err
                      })
                    })
                  } else {
                    if (groupe.moderators_ids.some(o => req.body.idsend.includes(o))) {
                      const message = {
                        id_conversation: groupe.conversation_id,
                        id_user: req.body.idsend,
                        message: req.body.message
                      }
                      const messageModel = this.MessageModel(message)
                      messageModel.save().then(() => {
                        res.status(200).json({
                          code: 200,
                          message: 'message envoyer avec succés'
                        })
                      }).catch(err => {
                        res.status(500).json({
                          code: 300,
                          message: err
                        })
                      })
                    } else {
                      if (groupe.members_ids.some(o => req.body.idsend.includes(o))) {
                        const message = {
                          id_conversation: groupe.conversation_id,
                          id_user: req.body.idsend,
                          message: req.body.message
                        }
                        const messageModel = this.MessageModel(message)
                        messageModel.save().then(() => {
                          res.status(200).json({
                            code: 200,
                            message: 'message envoyer avec succés'
                          })
                        }).catch(err => {
                          res.status(500).json({
                            code: 300,
                            message: err
                          })
                        })
                      } else {
                        res.status(200).json({
                          code: 200,
                          message: 'vous ne faite pas partie du groupe'
                        })
                      }
                    }
                  }
                } else {
                  res.status(200).json({
                    code: 200,
                    message: 'votre groupe na pas de discution, veuillez en créer une'
                  })
                }
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
        } else {
          res.status(200).json({
            code: 200,
            message: 'statu incorrecte'
          })
        }
      } catch (err) {
        res.status(500).json({
          code: 500,
          message: err
        })
      }
    })
  }

  addCommentaire () {
    this.app.post('/conversation/commentaire/:idmessage', (req, res) => {
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

module.exports = Groupe
