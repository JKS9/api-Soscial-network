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
   * Show
   */
  show () {
    this.app.get('/user/show/:id', (req, res) => {
      try {
        this.UserModel.findById(req.params.id).then(user => {
          res.status(200).json(user || {})
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
   * Create
   */
  create () {
    this.app.post('/user/create', (req, res) => {
      try {
        const userModel = this.UserModel(req.body)

        this.UserModel.find({ email: req.body.email }).then(user => {
          if (!user.length) {
            const userCreat = userModel.save()
            if (!userCreat) {
              res.status(500).json({
                code: 500,
                message: ''
              })
              return
            }
            res.status(200).json(userCreat || {})
          } else {
            res.status(500).json({
              code: 500,
              message: 'Email already used'
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
   * List
   */
  search () {
    this.app.post('/user/search', (req, res) => {
      try {
        const pipe = [{ $limit: req.body.limit || 10 }]

        if (req.body.sort) {
          pipe.push({$sort: req.body.sort})
        }

        this.UserModel.aggregate(pipe).then(user => {
          res.status(200).json(user || {})
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

  delete () {
    this.app.delete('/user/delete/:id', (req, res) => {
      try {
        this.UserModel.findByIdAndRemove(req.params.id).then(user => {
          res.status(200).json(user || {})
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

  update () {
    this.app.put('/user/update/:id', (req, res) => {
      try {
        this.UserModel.findOneAndUpdate(req.params.id, req.body).then(user => {
          res.status(200).json(user || {})
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

module.exports = User