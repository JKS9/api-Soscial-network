const EventModel = require('../models/event.js')
const UserModel = require('../models/user.js')

const AlbumModel = require('../models/album.js')
const AlbumPhotoModel = require('../models/album_photo.js')
const CommentairePhotoModel = require('../models/photo_commentaire.js')

/**
 * Event
 * @class
 */
class Groupe {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', UserModel)
    this.EventModel = connect.model('Event', EventModel)
    this.AlbumModel = connect.model('Album', AlbumModel)
    this.AlbumPhotoModel = connect.model('AlbumPhoto', AlbumPhotoModel)
    this.CommentairePhotoModel = connect.model('CommentairePhoto', CommentairePhotoModel)

    this.addPicture()

    this.showAlbumEvent()
    this.showOnePhoto()

    this.AddCommentairePicture()

    this.DeleteCommentaire()
    this.DeletePhoto()
  }
  
  addPicture () {
    this.app.post('/album/addpicture/:idevent', (req, res) => {
      try {
        this.EventModel.findById(req.params.idevent).then(event => {
          if (event.album_id === null) {
            if (event.administrators_ids.some(o => req.body.idsend.includes(o))) {
              const newAlbum = {
                id_event: req.params.idevent
              }
              const albumModel = this.AlbumModel(newAlbum)
              albumModel.save().then(album => {
                const updateEventIdAlbum = {
                  album_id: album.id
                }
                this.EventModel.findByIdAndUpdate(req.params.idevent, updateEventIdAlbum).then(eventUpdate => {
                  const newPhoto = {
                    id_album: album.id,
                    id_user: req.body.idsend,
                    name_file: req.body.nameFile
                  }
                  const albumPhotoModel = this.AlbumPhotoModel(newPhoto)
                  albumPhotoModel.save().then(album => {
                    res.status(200).json({
                      code: 200,
                      message: 'photo ajouter à l album'
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 300,
                      message: err
                    })
                  })
                }).catch(err => {
                  res.status(500).json({
                    code: 300,
                    message: err
                  })
                })
              }).catch(err => {
                res.status(500).json({
                  code: 200,
                  message: err
                })
              })
            } else {
              if (event.moderators_ids.some(o => req.body.idsend.includes(o))) {
                const newAlbum = {
                  id_event: req.params.idevent
                }
                const albumModel = this.AlbumModel(newAlbum)
                albumModel.save().then(album => {
                  const updateEventIdAlbum = {
                    album_id: album.id
                  }
                  this.EventModel.findByIdAndUpdate(req.params.idevent, updateEventIdAlbum).then(eventUpdate => {
                    const newPhoto = {
                      id_album: album.id,
                      id_user: req.body.idsend,
                      name_file: req.body.nameFile
                    }
                    const albumPhotoModel = this.AlbumPhotoModel(newPhoto)
                    albumPhotoModel.save().then(album => {
                      res.status(200).json({
                        code: 200,
                        message: 'photo ajouter à l album'
                      })
                    }).catch(err => {
                      res.status(500).json({
                        code: 300,
                        message: err
                      })
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 300,
                      message: err
                    })
                  })
                }).catch(err => {
                  res.status(500).json({
                    code: 200,
                    message: err
                  })
                })
              } else {
                if (event.members_ids.some(o => req.body.idsend.includes(o))) {
                  const newAlbum = {
                    id_event: req.params.idevent
                  }
                  const albumModel = this.AlbumModel(newAlbum)
                  albumModel.save().then(album => {
                    const updateEventIdAlbum = {
                      album_id: album.id
                    }
                    this.EventModel.findByIdAndUpdate(req.params.idevent, updateEventIdAlbum).then(eventUpdate => {
                      const newPhoto = {
                        id_album: album.id,
                        id_user: req.body.idsend,
                        name_file: req.body.nameFile
                      }
                      const albumPhotoModel = this.AlbumPhotoModel(newPhoto)
                      albumPhotoModel.save().then(album => {
                        res.status(200).json({
                          code: 200,
                          message: 'photo ajouter à l album'
                        })
                      }).catch(err => {
                        res.status(500).json({
                          code: 300,
                          message: err
                        })
                      })
                    }).catch(err => {
                      res.status(500).json({
                        code: 300,
                        message: err
                      })
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 200,
                      message: err
                    })
                  })
                } else {
                  res.status(500).json({
                    code: 500,
                    message: 'vous ne pouvez pas ajouter de photo à cette event'
                  })
                }
              }
            }
          } else {
            if (event.administrators_ids.some(o => req.body.idsend.includes(o))) {
              this.AlbumModel.find({ id_event: req.params.idevent }).then(album => {
                const newPhoto = {
                  id_album: event.album_id,
                  id_user: req.body.idsend,
                  name_file: req.body.nameFile
                }
                const albumPhotoModel = this.AlbumPhotoModel(newPhoto)
                albumPhotoModel.save().then(album => {
                  res.status(200).json({
                    code: 200,
                    message: 'photo ajouter à l album'
                  })
                }).catch(err => {
                  res.status(500).json({
                    code: 300,
                    message: err
                  })
                })
              }).catch(err => {
                res.status(500).json({
                  code: 300,
                  message: err
                })
              })
            } else {
              if (event.moderators_ids.some(o => req.body.idsend.includes(o))) {
                this.AlbumModel.find({id_event: req.params.idevent}).then(album => {
                  const newPhoto = {
                    id_album: event.album_id,
                    id_user: req.body.idsend,
                    name_file: req.body.nameFile
                  }
                  const albumPhotoModel = this.AlbumPhotoModel(newPhoto)
                  albumPhotoModel.save().then(album => {
                    res.status(200).json({
                      code: 200,
                      message: 'photo ajouter à l album'
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 300,
                      message: err
                    })
                  })
                }).catch(err => {
                  res.status(500).json({
                    code: 300,
                    message: err
                  })
                })
              } else {
                if (event.members_ids.some(o => req.body.idsend.includes(o))) {
                  this.AlbumModel.find({id_event: req.params.idevent}).then(album => {
                    const newPhoto = {
                      id_album: event.album_id,
                      id_user: req.body.idsend,
                      name_file: req.body.nameFile
                    }
                    const albumPhotoModel = this.AlbumPhotoModel(newPhoto)
                    albumPhotoModel.save().then(album => {
                      res.status(200).json({
                        code: 200,
                        message: 'photo ajouter à l album'
                      })
                    }).catch(err => {
                      res.status(500).json({
                        code: 300,
                        message: err
                      })
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 300,
                      message: err
                    })
                  })
                } else {
                  res.status(500).json({
                    code: 500,
                    message: 'vous ne pouvez pas ajouter de photo à cette event'
                  })
                }
              }
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

  showAlbumEvent () {
    this.app.get('/album/:idevent/:idsend', (req, res) => {
      try {
        this.EventModel.findById(req.params.idevent).then(event => {
          if (event.status === 'public') {
            this.AlbumPhotoModel.find({id_album: event.album_id}).then(albumPhoto => {
              res.status(200).json({
                code: 200,
                message: albumPhoto
              })
            }).catch(err => {
              res.status(500).json({
                code: 500,
                message: err
              })
            }) 
          } else {
            if (event.administrators_ids.some(o => req.params.idsend.includes(o))) {
              this.AlbumPhotoModel.find({id_album: event.album_id}).then(albumPhoto => {
                res.status(200).json({
                  code: 200,
                  message: albumPhoto
                })
              }).catch(err => {
                res.status(500).json({
                  code: 500,
                  message: err
                })
              }) 
            } else {
              if (event.moderators_ids.some(o => req.params.idsend.includes(o))) {
                this.AlbumPhotoModel.find({id_album: event.album_id}).then(albumPhoto => {
                  res.status(200).json({
                    code: 200,
                    message: albumPhoto
                  })
                }).catch(err => {
                  res.status(500).json({
                    code: 500,
                    message: err
                  })
                }) 
              } else {
                if (event.members_ids.some(o => req.params.idsend.includes(o))) {
                  this.AlbumPhotoModel.find({id_album: event.album_id}).then(albumPhoto => {
                    res.status(200).json({
                      code: 200,
                      message: albumPhoto
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
                    message: 'vous ne pouvez voir les photo de cette event'
                  })
                }
              }
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

  showOnePhoto () {
    this.app.get('/album/photo/:idphoto/:idsend', (req, res) => {
      try {
        this.AlbumPhotoModel.findById(req.params.idphoto).then(albumPhoto => {
          this.AlbumModel.findById(albumPhoto.id_album).then(album => {
            console.log(album)
            this.EventModel.findById(album.id_event).then(event => {
              if (event.status === 'public') {
                this.AlbumPhotoModel.findById(req.params.idphoto).then(albumPhoto => {
                  res.status(200).json({
                    code: 200,
                    message: albumPhoto
                  })
                }).catch(err => {
                  res.status(500).json({
                    code: 500,
                    message: err
                  })
                }) 
              } else {
                if (event.administrators_ids.some(o => req.params.idsend.includes(o))) {
                  this.AlbumPhotoModel.findById(req.params.idphoto).then(albumPhoto => {
                    res.status(200).json({
                      code: 200,
                      message: albumPhoto
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 500,
                      message: err
                    })
                  }) 
                } else {
                  if (event.moderators_ids.some(o => req.params.idsend.includes(o))) {
                    this.AlbumPhotoModel.findById(req.params.idphoto).then(albumPhoto => {
                      res.status(200).json({
                        code: 200,
                        message: albumPhoto
                      })
                    }).catch(err => {
                      res.status(500).json({
                        code: 500,
                        message: err
                      })
                    }) 
                  } else {
                    if (event.members_ids.some(o => req.params.idsend.includes(o))) {
                      this.AlbumPhotoModel.findById(req.params.idphoto).then(albumPhoto => {
                        res.status(200).json({
                          code: 200,
                          message: albumPhoto
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
                        message: 'vous ne pouvez voir les photo de cette event'
                      })
                    }
                  }
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

  AddCommentairePicture () {
    this.app.post('/album/commentaire/:idphoto/', (req, res) => {
      try {
        this.AlbumPhotoModel.findById(req.params.idphoto).then(photo => {
          this.AlbumModel.findById(photo.id_album).then(album => {
            this.EventModel.findById(album.id_event).then(event => {
              if (event.administrators_ids.some(o => req.body.idsend.includes(o))) {
                const newPhotoCommentaire = {
                  id_photo: req.params.idphoto,
                  id_send: req.body.idsend,
                  commentaire: req.body.commentaire
                }
                const CommentairePhoto = this.CommentairePhotoModel(newPhotoCommentaire)
                CommentairePhoto.save().then(commentairePhoto => {
                  res.status(200).json({
                    code: 200,
                    message: 'commentaire ajouter'
                  })
                }).catch(err => {
                  res.status(500).json({
                    code: 300,
                    message: err
                  })
                })
              } else {
                if (event.moderators_ids.some(o => req.body.idsend.includes(o))) {
                  const newPhotoCommentaire = {
                    id_photo: req.params.idphoto,
                    id_send: req.body.idsend,
                    commentaire: req.body.commentaire
                  }
                  const CommentairePhoto = this.CommentairePhotoModel(newPhotoCommentaire)
                  CommentairePhoto.save().then(album => {
                    res.status(200).json({
                      code: 200,
                      message: 'commentaire ajouter'
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 300,
                      message: err
                    })
                  })
                } else {
                  if (event.members_ids.some(o => req.body.idsend.includes(o))) {
                    const newPhotoCommentaire = {
                      id_photo: req.params.idphoto,
                      id_send: req.body.idsend,
                      commentaire: req.body.commentaire
                    }
                    const CommentairePhoto = this.CommentairePhotoModel(newPhotoCommentaire)
                    CommentairePhoto.save().then(album => {
                      res.status(200).json({
                        code: 200,
                        message: 'commentaire ajouter'
                      })
                    }).catch(err => {
                      res.status(500).json({
                        code: 300,
                        message: err
                      })
                    })
                  } else {
                    res.status(500).json({
                      code: 500,
                      message: 'vous ne pouvez commenter cette photo'
                    })
                  }
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

  DeleteCommentaire () {
    this.app.delete('/album/commentaire/:idcommentaire/:idsend', (req, res) => {
      try {
        this.CommentairePhotoModel.findById(req.params.idcommentaire).then(commentairePhoto => {
          this.AlbumPhotoModel.findById(commentairePhoto.id_photo).then(photo => {
            this.AlbumModel.findById(photo.id_album).then(album => {
              this.EventModel.findById(album.id_event).then(event => {
                if (event.administrators_ids.some(o => req.params.idsend.includes(o))) {
                  this.CommentairePhotoModel.findByIdAndRemove(req.params.idcommentaire).then(remove => {
                    res.status(200).json({
                      code: 200,
                      message: 'commentaire delete'
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 500,
                      message: err
                    })
                  })
                } else {
                  if (event.moderators_ids.some(o => req.params.idsend.includes(o))) {
                    this.CommentairePhotoModel.findByIdAndRemove(req.params.idcommentaire).then(remove => {
                      res.status(200).json({
                        code: 200,
                        message: 'commentaire delete'
                      })
                    }).catch(err => {
                      res.status(500).json({
                        code: 500,
                        message: err
                      })
                    })
                  } else {
                    if (commentairePhoto.id_send === req.params.idsend) {
                      this.CommentairePhotoModel.findByIdAndRemove(req.params.idcommentaire).then(remove => {
                        res.status(200).json({
                          code: 200,
                          message: 'commentaire delete'
                        })
                      }).catch(err => {
                        res.status(500).json({
                          code: 500,
                          message: err
                        })
                      })
                    } else {
                      res.status(500).json({
                        code: 500,
                        message: 'vous ne pouvez pas delete ce commentaire'
                      })
                    }
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

  DeletePhoto () {
    this.app.delete('/album/photo/:idphoto/:idsend', (req, res) => {
      try {
        this.AlbumPhotoModel.findById(req.params.idphoto).then(photo => {
          this.AlbumModel.findById(photo.id_album).then(album => {
            this.EventModel.findById(album.id_event).then(event => {
              if (event.administrators_ids.some(o => req.params.idsend.includes(o))) {
                this.AlbumPhotoModel.findByIdAndRemove(req.params.idphoto).then(remove => {
                  res.status(200).json({
                    code: 200,
                    message: 'picture delete'
                  })
                }).catch(err => {
                  res.status(500).json({
                    code: 500,
                    message: err
                  })
                })
              } else {
                if (event.moderators_ids.some(o => req.params.idsend.includes(o))) {
                  this.AlbumPhotoModel.findByIdAndRemove(req.params.idphoto).then(remove => {
                    res.status(200).json({
                      code: 200,
                      message: 'picture delete'
                    })
                  }).catch(err => {
                    res.status(500).json({
                      code: 500,
                      message: err
                    })
                  })
                } else {
                  if (photo.id_user === req.params.idsend) {
                    this.AlbumPhotoModel.findByIdAndRemove(req.params.idphoto).then(remove => {
                      res.status(200).json({
                        code: 200,
                        message: 'picture delete'
                      })
                    }).catch(err => {
                      res.status(500).json({
                        code: 500,
                        message: err
                      })
                    })
                  } else {
                    res.status(500).json({
                      code: 500,
                      message: 'vous ne pouvez pas delete ce commentaire'
                    })
                  }
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
