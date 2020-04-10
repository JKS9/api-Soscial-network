const EventModel = require('../models/event.js')
const UserModel = require('../models/user.js')

/**
 * Event
 * @class
 */
class Event {
  constructor (app, connect) {
    this.app = app
    this.UserModel = connect.model('User', UserModel)
    this.EventModel = connect.model('Event', EventModel)

    this.createEvent()
    this.showEvent()
    this.showEventById()
    this.DeleteEvent()
    this.updateEvent()
  }

  createEvent () {
    this.app.post('/event/create/', (req, res) => {
      try {
        const eventModel = this.EventModel(req.body)
        const administrators = req.body.administrators_ids

        this.UserModel.find({_id: {$in: administrators}}).then(user => {
          if (user.length === administrators.length) {
            eventModel.save().then(event => {
              res.status(200).json(event || {})
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

  showEvent () {
    this.app.get('/event/show/', (req, res) => {
      try {
        this.EventModel.find({ status: 'public' }).then(event => {
          if (!event.length) {
            res.status(404).json({
              code: 500,
              message: 'aucun event trouvés :'
            })
          } else {
            res.status(200).json(event || {})
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

  showEventById () {
    this.app.get('/event/show/:id', (req, res) => {
      try {
        this.EventModel.find({ _id: req.params.id, status: 'public' }).then(event => {
          if (!event.length) {
            res.status(404).json({
              code: 404,
              message: 'aucun event trouvés :'
            })
          } else {
            res.status(200).json(event)
          }
        }).catch(() => {
          res.status(404).json({
            code: 404,
            message: 'aucun event trouvés :'
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

  DeleteEvent () {
    this.app.delete('/event/delete/:idevent/user/:iduser', (req, res) => {
      try {
        this.EventModel.findById(req.params.idevent).then(event => {
          if (event.administrators_ids[0] === req.params.iduser) {
            this.EventModel.findByIdAndRemove(req.params.idevent).then(eventDelete => {
              res.status(200).json(eventDelete || {})
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

  updateEvent () {
    this.app.put('/event/update/:id', (req, res) => {
      try {
        this.EventModel.findOneAndUpdate(req.params.id, req.body).then(user => {
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

module.exports = Event
