var express = require('express')
var router = express.Router()

var db = require('../db')

router.get('/', function (req, res) {
  res.render('home')
})

router.get('/add', (req, res) => {
  db.getAllIngredients(req.app.get('connection'))
  .then((result) => {
    const ingredient = result
    res.render('add', {ingredients: ingredient})
  })
})

router.get('/searchresults', function (req, res) {

  db.getRecipes(req.query, req.app.get('connection')) //  Use a function called getRecipes. function needs to return  an object containing recipes
    .then(function (recipes) {
      res.render('results', { recipes: recipes }) // render the results view with all the recipes
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.get('/recipe/:id', function (req, res) {
  db.getRecipe(req.params.id, req.app.get('connection')) // the getRecipe function, we want to get back the recipe ID (i.e. {recipe: recipe})
  .then(function (recipeObj) {
    res.render('recipe', recipeObj)  // render the recipe view with the recipe object
  })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
})

router.post('/search', function (req, res) {

// save the details of what was entered in search
  let str = '?'
  if (req.body.keyword) {
    str += 'keyword=' + req.body.keyword + '&'
  }
  if (req.body.time) {
    str += 'time=' + req.body.time + '&'
  }
  if (req.body.meatfree) {
    str += 'meatfree' + req.body.meatfree + '&'
  }
  if (req.body.glutenfree) {
    str += 'glutenfree' + req.body.glutenfree + '&'
  }
  if (req.body.dairyfree) {
    str += 'dairyfree' + req.body.dairyfree + '&'
  }
  str = str.substr(0, str.length - 1)  // Removes the last & or ?

  res.redirect('/searchresults' + str)
})

router.post('/add', function (req, res) {
  db.addRecipe(req.body, req.app.get('connection'))
  res.redirect('/')
})

module.exports = router
