var path = require('path')

var express = require('express')
var bodyParser = require('body-parser')
var hbs = require('express-handlebars')

var index = require('./routes/index')

var app = express()

// Middleware

app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'main',
  helpers: {
    escapeLine: function (message) {
      return message.replace(/\n/g, '<br />')
    }
  }
}))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// Routes

app.use('/', index)

module.exports = (connection) => {
  app.set('connection', connection)
  return app
}
