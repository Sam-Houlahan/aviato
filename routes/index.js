var express = require('express')
var router = express.Router()

var db = require('../db')

// router.get('/', function (req, res) {
//   db.getUsers(req.app.get('connection'))
//     .then(function (users) {
//       res.render('index', { users: users })
//     })
//     .catch(function (err) {
//       res.status(500).send('DATABASE ERROR: ' + err.message)
//     })
// })

router.get('/', function (req, res) {
  res.render('home')
})




router.get('/searchresults', function (req, res) {
  db.getRecipes(req.query,req.app.get('connection')) //  use a function called getRecipes. function needs to return  an object containing recipes
    .then(function (recipes) {
      res.render('results', { recipes: recipes }) // render the results view with all the recipes
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/recipe/:id', function (req, res) {
  db.getRecipe(req.params.id, req.app.get('connection')) //the getRecipe function, we want to get back the recipe ID (i.e. {recipe: recipe})
  .then(function (recipeObj) {
    res.render('recipe', recipeObj)  // render the recipe view with the recipe object
  })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
  })
})


module.exports = router
