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

    this.create()
  }

  create () {
    this.app.post('/event/create/', (req, res) => {
      try {
        const eventModel = this.EventModel(req.body)

        const mergeArray = req.body.administrators_ids.concat(req.body.moderators_ids, req.body.members_ids)
        const mergeArrayEnd = [...new Set(mergeArray)]

        this.UserModel.find(
          {_id: {
            $in: mergeArrayEnd
          }}
        ).then(user => {
          if (user.length === mergeArrayEnd.length) {
            eventModel.save().then(user => {
              res.status(200).json(user || {})
            }).catch(err => {
              res.status(500).json({
                code: 500,
                message: err
              })
            })
          } else {
            res.status(404).json({
              code: 404,
              message: 'User not exist'
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
}

module.exports = Event
