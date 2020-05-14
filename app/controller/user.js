const UserModel = require('../models/user.js')

/**
 * User
 * @class
 */
class User {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', UserModel)

    this.create()
    this.show()
    this.search()
    this.delete()
    this.update()
  }

  /**
   * Show user
   */
  show () {
    this.app.get('/user/show/:id', (req, res) => {
      try {
        this.UserModel.findById(req.params.id).then(user => {
          res.status(200).json(user || 'not found user')
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'user introuvable'
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
   * Create User
   */
  create () {
    this.app.post('/user/create', (req, res) => {
      try {
        const userModel = this.UserModel(req.body)

        this.UserModel.find({ email: req.body.email }).then(user => {
          if (!user.length) {
            const userCreat = userModel.save()
            if (!userCreat) {
              res.status(403).json({
                code: 403,
                message: 'failed create user'
              })
              return
            }
            res.status(201).json({
              code: 201,
              message: 'success user create'
            })
          } else {
            res.status(403).json({
              code: 403,
              message: 'Email already used'
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
   * Search users
   */
  search () {
    this.app.post('/user/search', (req, res) => {
      try {
        const pipe = [{ $limit: req.body.limit || 10 }]

        if (req.body.sort) {
          pipe.push({$sort: req.body.sort})
        }

        this.UserModel.aggregate(pipe).then(user => {
          res.status(200).json(user || 'users not found')
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'search failed'
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
   * Delete user
   */
  delete () {
    this.app.delete('/user/delete/:id', (req, res) => {
      try {
        this.UserModel.findByIdAndRemove(req.params.id).then(user => {
          res.status(200).json({
            code: 200,
            message: 'delete user'
          })
        }).catch(err => {
          if (err) {
            res.status(403).json({
              code: 403,
              message: 'delete not found'
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
   * Update user
   */
  update () {
    this.app.put('/user/update/:id', (req, res) => {
      try {
        this.UserModel.findOneAndUpdate(req.params.id, req.body).then(user => {
          res.status(200).json({
            code: 200,
            message: 'success user update'
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

module.exports = User
