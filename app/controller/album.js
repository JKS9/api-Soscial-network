const EventModel = require('../models/event.js')
const UserModel = require('../models/user.js')

const AlbumModel = require('../models/album.js')
const AlbumPhotoModel = require('../models/album_photo.js')
const CommentairePhotoModel = require('../models/photo_commentaire.js')

/**
 * Album
 * @class
 */
class Album {
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

  /**
   * Create album and add picture in a album
   */
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
                    res.status(201).json({
                      code: 201,
                      message: 'success add picture in album'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'add picture failed'
                      })
                    }
                  })
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'add picture failed'
                    })
                  }
                })
              }).catch(err => {
                if (err) {
                  res.status(403).json({
                    code: 403,
                    message: 'add album failed'
                  })
                }
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
                      res.status(201).json({
                        code: 201,
                        message: 'success add picture in album'
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'add picture failed'
                        })
                      }
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'add album failed'
                      })
                    }
                  })
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'add album failed'
                    })
                  }
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
                        res.status(201).json({
                          code: 201,
                          message: 'success add picture in album'
                        })
                      }).catch(err => {
                        if (err) {
                          res.status(403).json({
                            code: 403,
                            message: 'add picture failed'
                          })
                        }
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'add picture failed'
                        })
                      }
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'add album failed'
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
            if (event.administrators_ids.some(o => req.body.idsend.includes(o))) {
              this.AlbumModel.find({ id_event: req.params.idevent }).then(album => {
                const newPhoto = {
                  id_album: event.album_id,
                  id_user: req.body.idsend,
                  name_file: req.body.nameFile
                }
                const albumPhotoModel = this.AlbumPhotoModel(newPhoto)
                albumPhotoModel.save().then(album => {
                  res.status(201).json({
                    code: 201,
                    message: 'success add picture in album'
                  })
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'add picture failed'
                    })
                  }
                })
              }).catch(err => {
                if (err) {
                  res.status(403).json({
                    code: 403,
                    message: 'album not found'
                  })
                }
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
                    res.status(201).json({
                      code: 201,
                      message: 'success add picture in album'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'add picture failed'
                      })
                    }
                  })
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'album not found'
                    })
                  }
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
                      res.status(201).json({
                        code: 201,
                        message: 'success add picture in album'
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'add picture failed'
                        })
                      }
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'album not found'
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
   * Show album of a event
   */
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
              if (err) {
                res.status(403).json({
                  code: 403,
                  message: 'show album picture failed'
                })
              }
            }) 
          } else {
            if (event.administrators_ids.some(o => req.params.idsend.includes(o))) {
              this.AlbumPhotoModel.find({id_album: event.album_id}).then(albumPhoto => {
                res.status(200).json({
                  code: 200,
                  message: albumPhoto
                })
              }).catch(err => {
                if (err) {
                  res.status(403).json({
                    code: 403,
                    message: 'show album picture failed'
                  })
                }
              }) 
            } else {
              if (event.moderators_ids.some(o => req.params.idsend.includes(o))) {
                this.AlbumPhotoModel.find({id_album: event.album_id}).then(albumPhoto => {
                  res.status(200).json({
                    code: 200,
                    message: albumPhoto
                  })
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'show album picture failed'
                    })
                  }
                }) 
              } else {
                if (event.members_ids.some(o => req.params.idsend.includes(o))) {
                  this.AlbumPhotoModel.find({id_album: event.album_id}).then(albumPhoto => {
                    res.status(200).json({
                      code: 200,
                      message: albumPhoto
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'show album picture failed'
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
   * Show one picture of a album
   */
  showOnePhoto () {
    this.app.get('/album/photo/:idphoto/:idsend', (req, res) => {
      try {
        this.AlbumPhotoModel.findById(req.params.idphoto).then(albumPhoto => {
          this.AlbumModel.findById(albumPhoto.id_album).then(album => {
            this.EventModel.findById(album.id_event).then(event => {
              if (event.status === 'public') {
                this.AlbumPhotoModel.findById(req.params.idphoto).then(albumPhoto => {
                  res.status(200).json({
                    code: 200,
                    message: albumPhoto
                  })
                }).catch(err => {
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'show album picture failed'
                    })
                  }
                }) 
              } else {
                if (event.administrators_ids.some(o => req.params.idsend.includes(o))) {
                  this.AlbumPhotoModel.findById(req.params.idphoto).then(albumPhoto => {
                    res.status(200).json({
                      code: 200,
                      message: albumPhoto
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'show album picture failed'
                      })
                    }
                  }) 
                } else {
                  if (event.moderators_ids.some(o => req.params.idsend.includes(o))) {
                    this.AlbumPhotoModel.findById(req.params.idphoto).then(albumPhoto => {
                      res.status(200).json({
                        code: 200,
                        message: albumPhoto
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'show album picture failed'
                        })
                      }
                    }) 
                  } else {
                    if (event.members_ids.some(o => req.params.idsend.includes(o))) {
                      this.AlbumPhotoModel.findById(req.params.idphoto).then(albumPhoto => {
                        res.status(200).json({
                          code: 200,
                          message: albumPhoto
                        })
                      }).catch(err => {
                        if (err) {
                          res.status(403).json({
                            code: 403,
                            message: 'show album picture failed'
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
              }
            }).catch(err => {
              if (err) {
                res.status(400).json({
                  code: 400,
                  message: 'parent not found'
                })
              }
            })
          }).catch(err => {
            if (err) {
              res.status(400).json({
                code: 400,
                message: 'parent not found'
              })
            }
          })
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'album photo not found'
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
   * add commentaire in a picture
   */
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
                if (event.moderators_ids.some(o => req.body.idsend.includes(o))) {
                  const newPhotoCommentaire = {
                    id_photo: req.params.idphoto,
                    id_send: req.body.idsend,
                    commentaire: req.body.commentaire
                  }
                  const CommentairePhoto = this.CommentairePhotoModel(newPhotoCommentaire)
                  CommentairePhoto.save().then(album => {
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
                  if (event.members_ids.some(o => req.body.idsend.includes(o))) {
                    const newPhotoCommentaire = {
                      id_photo: req.params.idphoto,
                      id_send: req.body.idsend,
                      commentaire: req.body.commentaire
                    }
                    const CommentairePhoto = this.CommentairePhotoModel(newPhotoCommentaire)
                    CommentairePhoto.save().then(album => {
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
          }).catch(err => {
            if (err) {
              res.status(400).json({
                code: 400,
                message: 'parent not found'
              })
            }
          })
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'album photo not found'
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
   * Delete commentaire in a picture
   */
  DeleteCommentaire () {
    this.app.delete('/album/commentaire/:idcommentaire/:idsend', (req, res) => {
      try {
        this.CommentairePhotoModel.findById(req.params.idcommentaire).then(commentairePhoto => {
          this.AlbumPhotoModel.findById(commentairePhoto.id_photo).then(photo => {
            this.AlbumModel.findById(photo.id_album).then(album => {
              this.EventModel.findById(album.id_event).then(event => {
                if (event.administrators_ids.some(o => req.params.idsend.includes(o))) {
                  this.CommentairePhotoModel.findByIdAndRemove(req.params.idcommentaire).then(remove => {
                    res.status(201).json({
                      code: 201,
                      message: 'success commentaire delete'
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
                    this.CommentairePhotoModel.findByIdAndRemove(req.params.idcommentaire).then(remove => {
                      res.status(200).json({
                        code: 200,
                        message: 'commentaire delete'
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
                    if (commentairePhoto.id_send === req.params.idsend) {
                      this.CommentairePhotoModel.findByIdAndRemove(req.params.idcommentaire).then(remove => {
                        res.status(200).json({
                          code: 200,
                          message: 'commentaire delete'
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
                }
              }).catch(err => {
                if (err) {
                  res.status(400).json({
                    code: 400,
                    message: 'parent not found'
                  })
                }
              })
            }).catch(err => {
              if (err) {
                res.status(400).json({
                  code: 400,
                  message: 'parent not found'
                })
              }
            })
          }).catch(err => {
            if (err) {
              res.status(400).json({
                code: 400,
                message: 'parent not found'
              })
            }
          })
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'commentaire in picture not found'
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
   * add picture
   */
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
                  if (err) {
                    res.status(403).json({
                      code: 403,
                      message: 'delete pictuer failed'
                    })
                  }
                })
              } else {
                if (event.moderators_ids.some(o => req.params.idsend.includes(o))) {
                  this.AlbumPhotoModel.findByIdAndRemove(req.params.idphoto).then(remove => {
                    res.status(200).json({
                      code: 200,
                      message: 'picture delete'
                    })
                  }).catch(err => {
                    if (err) {
                      res.status(403).json({
                        code: 403,
                        message: 'delete pictuer failed'
                      })
                    }
                  })
                } else {
                  if (photo.id_user === req.params.idsend) {
                    this.AlbumPhotoModel.findByIdAndRemove(req.params.idphoto).then(remove => {
                      res.status(201).json({
                        code: 201,
                        message: 'success picture delete'
                      })
                    }).catch(err => {
                      if (err) {
                        res.status(403).json({
                          code: 403,
                          message: 'delete pictuer failed'
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
              }
            }).catch(err => {
              if (err) {
                res.status(400).json({
                  code: 400,
                  message: 'parent not found'
                })
              }
            })
          }).catch(err => {
            if (err) {
              res.status(400).json({
                code: 400,
                message: 'parent not found'
              })
            }
          })
        }).catch(err => {
          if (err) {
            res.status(400).json({
              code: 400,
              message: 'bad request'
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

module.exports = Album
