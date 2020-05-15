const EventModel = require('../models/event.js')
const UserModel = require('../models/user.js')
const GroupeModel = require('../models/groupe.js')

const ConversationModel = require('../models/conversation.js')
const MessageModel = require('../models/message.js')
const CommentaireModel = require('../models/commentaire.js')

/**
 * Conversation
 * @class
 */
class Conversation {
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

    this.showConversation()
    this.showCommentaire()

    this.deleteMessage()
    this.deleteCommentaire()
  }
  
  /**
   * Create conversation of a event
   */
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
                    res.status(201).json({
                      code: 201,
                      message: 'success create conversation'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'save conversation failed'
                      })
                    }
                  })
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'save conversation failed'
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
                message: 'this groupe belongs to a group that already has a conversation'
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
                      res.status(201).json({
                        code: 201,
                        message: 'success create conversation'
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'save conversation failed'
                        })
                      }
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'save conversation failed'
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
                  message: 'this event belongs to a group that already has a conversation'
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
                        res.status(201).json({
                          code: 201,
                          message: 'success create conversation'
                        })
                      }).catch(err => {
                        if (err) {
                          res.status(403).json({
                            code: 403,
                            message: 'save conversation failed'
                          })
                        }
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'save conversation failed'
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
                    message: 'this event belongs to a group that already has a conversation'
                  })
                }
              }).catch(err => {
                if (err) {
                  res.status(403).json({
                    code: 403,
                    message: 'parent not found'
                  })
                }
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
        }
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
   * Add message in conversation
   */
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
                  res.status(201).json({
                    code: 201,
                    message: 'success add message'
                  })
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'add message failed'
                    })
                  }
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
                    res.status(201).json({
                      code: 201,
                      message: 'success add message'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'add message failed'
                      })
                    }
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
                      res.status(201).json({
                        code: 201,
                        message: 'success add message'
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'add message failed'
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
              }
            } else {
              res.status(403).json({
                code: 403,
                message: 'your group has no discussion, please create one'
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
                    res.status(201).json({
                      code: 201,
                      message: 'success add message'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'add message failed'
                      })
                    }
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
                      res.status(201).json({
                        code: 201,
                        message: 'success add message'
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'add message failed'
                        })
                      }
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
                        res.status(201).json({
                          code: 201,
                          message: 'success add message'
                        })
                      }).catch(err => {
                        if (err) {
                          res.status(403).json({
                            code: 403,
                            message: 'add message failed'
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
                }
              } else {
                res.status(403).json({
                  code: 403,
                  message: 'your group has no discussion, please create one'
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
                      res.status(201).json({
                        code: 201,
                        message: 'success add message'
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'add message failed'
                        })
                      }
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
                        res.status(201).json({
                          code: 201,
                          message: 'success add message'
                        })
                      }).catch(err => {
                        if (err) {
                          res.status(403).json({
                            code: 403,
                            message: 'add message failed'
                          })
                        }
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
                          res.status(201).json({
                            code: 201,
                            message: 'success add message'
                          })
                        }).catch(err => {
                          if (err) {
                            res.status(403).json({
                              code: 403,
                              message: 'add message failed'
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
                  }
                } else {
                  res.status(403).json({
                    code: 403,
                    message: 'your group has no discussion, please create one'
                  })
                }
              }).catch(err => {
                if (err) {
                  res.status(403).json({
                    code: 403,
                    message: 'parent not found'
                  })
                }
              })
            }
          }).catch(err => {
            if (err) {
              res.status(403).json({
                code: 403,
                message: 'parent not found'
              })
            }
          })
        } else {
          res.status(403).json({
            code: 403,
            message: 'status invalide'
          })
        }
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
   * Add commentaire of a message
   */
  addCommentaire () {
    this.app.post('/conversation/commentaire/:idmessage', (req, res) => {
      try {
        this.MessageModel.findById(req.params.idmessage).then(message => {
          this.ConversationModel.findById(message.id_conversation).then(conversation => {
            if (conversation.id_event) {
              this.EventModel.findById(conversation.id_event).then(event => {
                if (event.administrators_ids.some(o => req.body.idsend.includes(o))) {
                  const commentaire = {
                    id_message: req.params.idmessage,
                    id_sende: req.body.idsend,
                    commentaire: req.body.commentaire
                  }
                  const commentaireModel = this.CommentaireModel(commentaire)
                  commentaireModel.save().then(() => {
                    res.status(201).json({
                      code: 201,
                      message: 'success add commentaire'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'add commentaire failed'
                      })
                    }
                  })
                } else if (event.moderators_ids.some(o => req.body.idsend.includes(o))) {
                  const commentaire = {
                    id_message: req.params.idmessage,
                    id_sende: req.body.idsend,
                    commentaire: req.body.commentaire
                  }
                  const commentaireModel = this.CommentaireModel(commentaire)
                  commentaireModel.save().then(() => {
                    res.status(201).json({
                      code: 201,
                      message: 'success add commentaire'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'add commentaire failed'
                      })
                    }
                  })
                } else if (event.members_ids.some(o => req.body.idsend.includes(o))) {
                  const commentaire = {
                    id_message: req.params.idmessage,
                    id_sende: req.body.idsend,
                    commentaire: req.body.commentaire
                  }
                  const commentaireModel = this.CommentaireModel(commentaire)
                  commentaireModel.save().then(() => {
                    res.status(201).json({
                      code: 201,
                      message: 'success add commentaire'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'add commentaire failed'
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
                    message: 'parent not found'
                  })
                }
              })
            } else if (conversation.id_groupe) {
              this.GroupeModel.findById(conversation.id_groupe).then(groupe => {
                if (groupe.administrators_id.some(o => req.body.idsend.includes(o))) {
                  const commentaire = {
                    id_message: req.params.idmessage,
                    id_sende: req.body.idsend,
                    commentaire: req.body.commentaire
                  }
                  const commentaireModel = this.CommentaireModel(commentaire)
                  commentaireModel.save().then(() => {
                    res.status(201).json({
                      code: 201,
                      message: 'success add commentaire'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'add commentaire failed'
                      })
                    }
                  })
                } else if (groupe.moderators_ids.some(o => req.body.idsend.includes(o))) {
                  const commentaire = {
                    id_message: req.params.idmessage,
                    id_sende: req.body.idsend,
                    commentaire: req.body.commentaire
                  }
                  const commentaireModel = this.CommentaireModel(commentaire)
                  commentaireModel.save().then(() => {
                    res.status(201).json({
                      code: 201,
                      message: 'success add commentaire'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'add commentaire failed'
                      })
                    }
                  })
                } else if (groupe.members_ids.some(o => req.body.idsend.includes(o))) {
                  const commentaire = {
                    id_message: req.params.idmessage,
                    id_sende: req.body.idsend,
                    commentaire: req.body.commentaire
                  }
                  const commentaireModel = this.CommentaireModel(commentaire)
                  commentaireModel.save().then(() => {
                    res.status(201).json({
                      code: 201,
                      message: 'success add commentaire'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'add commentaire failed'
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
                    message: 'parent of poll not found'
                  })
                }
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
   * Show conversation
   */
  showConversation () {
    this.app.get('/conversation/:id/:idsend', (req, res) => {
      try {
        this.ConversationModel.findById(req.params.id).then(conversation => {
          if (conversation.id_event) {
            this.EventModel.findById(conversation.id_event).then(event => {
              if (event.administrators_ids.some(o => req.params.idsend.includes(o))) {
                this.MessageModel.find({ id_conversation: req.params.id }).then(message => {
                  res.status(200).json(message || {})
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'show commentaire failed'
                    })
                  }
                })
              } else {
                if (event.moderators_ids.some(o => req.params.idsend.includes(o))) {
                  this.MessageModel.find({ id_conversation: req.params.id }).then(message => {
                    res.status(200).json(message || {})
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'show commentaire failed'
                      })
                    }
                  })
                } else {
                  if (event.members_ids.some(o => req.params.idsend.includes(o))) {
                    this.MessageModel.find({ id_conversation: req.params.id }).then(message => {
                      res.status(200).json(message || {})
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'show commentaire failed'
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
              }
            }).catch(err => {
              if (err) {
                res.status(400).json({
                  code: 400,
                  message: 'parent of poll not found'
                })
              }
            })
          } else if (conversation.id_groupe) {
            this.GroupeModel.findById(conversation.id_groupe).then(groupe => {
              if (groupe.administrators_id.some(o => req.params.idsend.includes(o))) {
                this.MessageModel.find({ id_conversation: req.params.id }).then(message => {
                  res.status(200).json(message || {})
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'show commentaire failed'
                    })
                  }
                })
              } else {
                if (groupe.moderators_ids.some(o => req.params.idsend.includes(o))) {
                  this.MessageModel.find({ id_conversation: req.params.id }).then(message => {
                    res.status(200).json(message || {})
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'show commentaire failed'
                      })
                    }
                  })
                } else {
                  if (groupe.members_ids.some(o => req.params.idsend.includes(o))) {
                    this.MessageModel.find({ id_conversation: req.params.id }).then(message => {
                      res.status(200).json(message || {})
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'show conversation failed'
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
              }
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
            res.status(403).json({
              code: 403,
              message: 'conversation not found'
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
   * Show commentaire
   */
  showCommentaire () {
    this.app.get('/conversation/commentaire/:idmessage/:idsend', (req, res) => {
      try {
        this.MessageModel.findById(req.params.idmessage).then(message => {
          this.ConversationModel.findById(message.id_conversation).then(conversation => {
            if (conversation.id_event) {
              this.EventModel.findById(conversation.id_event).then(event => {
                if (event.administrators_ids.some(o => req.params.idsend.includes(o))) {
                  this.CommentaireModel.find({ id_message: req.params.idmessage }).then(commentaire => {
                    res.status(200).json(commentaire || {})
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'show commentaire failed'
                      })
                    }
                  })
                } else {
                  if (conversation.moderators_ids.some(o => req.params.idsend.includes(o))) {
                    this.CommentaireModel.find({ id_message: req.params.idmessage }).then(commentaire => {
                      res.status(200).json(commentaire || {})
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'show commentaire failed'
                        })
                      }
                    })
                  } else {
                    if (conversation.members_ids.some(o => req.params.idsend.includes(o))) {
                      this.CommentaireModel.find({ id_message: req.params.idmessage }).then(commentaire => {
                        res.status(200).json(commentaire || {})
                      }).catch(err => {
                        if (err) {
                          res.status(403).json({
                            code: 403,
                            message: 'show commentaire failed'
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
                }
              }).catch(err => {
                if (err) {
                  res.status(400).json({
                    code: 400,
                    message: 'parent of poll not found'
                  })
                }
              })
            } else if (conversation.id_groupe) {
              this.EventModel.findById(conversation.id_event).then(event => {
                if (conversation.administrators_ids.some(o => req.params.idsend.includes(o))) {
                  this.CommentaireModel.find({ id_message: req.params.idmessage }).then(commentaire => {
                    res.status(200).json(commentaire || {})
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'show commentaire failed'
                      })
                    }
                  })
                } else {
                  if (conversation.moderators_ids.some(o => req.params.idsend.includes(o))) {
                    this.CommentaireModel.find({ id_message: req.params.idmessage }).then(commentaire => {
                      res.status(200).json(commentaire || {})
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'show commentaire failed'
                        })
                      }
                    })
                  } else {
                    if (conversation.members_ids.some(o => req.params.idsend.includes(o))) {
                      this.CommentaireModel.find({ id_message: req.params.idmessage }).then(commentaire => {
                        res.status(200).json(commentaire || {})
                      }).catch(err => {
                        if (err) {
                          res.status(403).json({
                            code: 403,
                            message: 'show commentaire failed'
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
                }
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
              message: 'messgae not found'
            })
          }
        })
      } catch (err) {
        if (err) {
          res.status(500).json({
            code: 500,
            message: 'bad request'
          })
        }
      }
    })
  }

  /**
   * Delete message
   */
  deleteMessage () {
    this.app.delete('/conversation/message/:idmessage/:idsend', (req, res) => {
      try {
        this.MessageModel.findById(req.params.idmessage).then(message => {
          this.ConversationModel.findById(message.id_conversation).then(conversation => {
            if (conversation.id_event) {
              this.EventModel.findById(conversation.id_event).then(event => {
                if (event.administrators_ids.some(o => req.params.idsend.includes(o))) {
                  this.MessageModel.findByIdAndRemove(req.params.idmessage).then(deleteMessage => {
                    this.CommentaireModel.findAndRemove({id_message: req.params.idmessage}).then(deleteCommentaire => {
                      res.status(201).json({
                        code: 201,
                        message: 'message delete'
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'delete message failed'
                        })
                      }
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'delete message failed'
                      })
                    }
                  })
                } else {
                  if (event.moderators_ids.some(o => req.params.idsend.includes(o))) {
                    this.MessageModel.findByIdAndRemove(req.params.idmessage).then(deleteMessage => {
                      res.status(201).json({
                        code: 201,
                        message: 'success delete message'
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'delete message failed'
                        })
                      }
                    })
                  } else if (message.id_user === req.params.idsend) {
                    this.MessageModel.findByIdAndRemove(req.params.idmessage).then(deleteMessage => {
                      res.status(201).json({
                        code: 201,
                        message: 'success delete message'
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'delete message failed'
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
                  res.status(400).json({
                    code: 400,
                    message: 'parent of poll not found'
                  })
                }
              })
            } else if (conversation.id_groupe) {
              this.GroupeModel.findById(conversation.id_groupe).then(groupe => {
                if (groupe.administrators_id.some(o => req.params.idsend.includes(o))) {
                  this.MessageModel.findByIdAndRemove(req.params.idmessage).then(deleteMessage => {
                    res.status(201).json({
                      code: 201,
                      message: 'success delete message'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'delete message failed'
                      })
                    }
                  })
                } else {
                  if (groupe.moderators_ids.some(o => req.params.idsend.includes(o))) {
                    this.MessageModel.findByIdAndRemove(req.params.idmessage).then(deleteMessage => {
                      res.status(201).json({
                        code: 201,
                        message: 'success delete message'
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'delete message failed'
                        })
                      }
                    })
                  } else if (message.id_user === req.params.idsend) {
                    this.MessageModel.findByIdAndRemove(req.params.idmessage).then(deleteMessage => {
                      res.status(201).json({
                        code: 201,
                        message: 'success delete message'
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'delete message failed'
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
              message: 'message not found'
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
   * Delete commentaire
   */
  deleteCommentaire () {
    this.app.delete('/conversation/commentaire/:idcommentaire/:idsend', (req, res) => {
      try {
        this.CommentaireModel.findById(req.params.idcommentaire).then(commentaire => {
          this.MessageModel.findById(commentaire.id_message).then(message => {
            if (message === null) {
              this.CommentaireModel.findByIdAndRemove(req.params.idcommentaire).then(commentaires => {
                res.status(201).json({
                  code: 201,
                  message: 'success scommentaire delete'
                })
              }).catch(err => {
                if (err) {
                  res.status(403).json({
                    code: 403,
                    message: 'delete commentaire failed'
                  })
                }
              })
            } else {
              this.ConversationModel.findById(message.id_conversation).then(conversation => {
                if (conversation.id_event) {
                  this.EventModel.findById(conversation.id_event).then(event => {
                    if (event.administrators_ids.some(o => req.params.idsend.includes(o))) {
                      this.CommentaireModel.findByIdAndRemove(req.params.idcommentaire).then(commentaires => {
                        res.status(201).json({
                          code: 201,
                          message: 'success scommentaire delete'
                        })
                      }).catch(err => {
                        if (err) {
                          res.status(403).json({
                            code: 403,
                            message: 'delete commentaire failed'
                          })
                        }
                      })
                    } else {
                      if (event.moderators_ids.some(o => req.params.idsend.includes(o))) {
                        this.CommentaireModel.findByIdAndRemove(req.params.idcommentaire).then(commentaires => {
                          res.status(201).json({
                            code: 201,
                            message: 'success scommentaire delete'
                          })
                        }).catch(err => {
                          if (err) {
                            res.status(403).json({
                              code: 403,
                              message: 'delete commentaire failed'
                            })
                          }
                        })
                      } else if (commentaire.id_sende === req.params.idsend) {
                        this.CommentaireModel.findByIdAndRemove(req.params.idcommentaire).then(commentaires => {
                          res.status(201).json({
                            code: 201,
                            message: 'success scommentaire delete'
                          })
                        }).catch(err => {
                          if (err) {
                            res.status(403).json({
                              code: 403,
                              message: 'delete commentaire failed'
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
                      res.status(400).json({
                        code: 400,
                        message: 'parent not found'
                      })
                    }
                  })
                } else if (conversation.id_groupe) {
                  this.GroupeModel.findById(conversation.id_groupe).then(groupe => {
                    if (groupe.administrators_id.some(o => req.params.idsend.includes(o))) {
                      this.CommentaireModel.findByIdAndRemove(req.params.idcommentaire).then(commentaires => {
                        res.status(201).json({
                          code: 201,
                          message: 'success scommentaire delete'
                        })
                      }).catch(err => {
                        if (err) {
                          res.status(403).json({
                            code: 403,
                            message: 'delete commentaire failed'
                          })
                        }
                      })
                    } else {
                      if (groupe.moderators_ids.some(o => req.params.idsend.includes(o))) {
                        this.CommentaireModel.findByIdAndRemove(req.params.idcommentaire).then(commentaires => {
                          res.status(201).json({
                            code: 201,
                            message: 'success scommentaire delete'
                          })
                        }).catch(err => {
                          if (err) {
                            res.status(403).json({
                              code: 403,
                              message: 'delete commentaire failed'
                            })
                          }
                        })
                      } else if (commentaire.id_sende === req.params.idsend) {
                        this.CommentaireModel.findByIdAndRemove(req.params.idcommentaire).then(commentaires => {
                          res.status(201).json({
                            code: 201,
                            message: 'success scommentaire delete'
                          })
                        }).catch(err => {
                          if (err) {
                            res.status(403).json({
                              code: 403,
                              message: 'delete commentaire failed'
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
            res.status(500).json({
              code: 500,
              message: 'commentaire not found'
            })
          }
        })
      } catch (err) {
        if (err) {
          res.status(500).json({
            code: 500,
            message: 'bad request'
          })
        }
      }
    })
  }
}

module.exports = Conversation
