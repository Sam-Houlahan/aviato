module.exports = {
  getRecipe,
  getRecipes,
  getAllIngredients,
  addRecipe
}

function getRecipes (query, connection) {
  return getEverything(connection)
    .then(table => {
      if (query.keyword) {
        table = filterByKeyword(table, query.keyword)
      }
      if (query.meatfree) {
        table = filterByMeat(table)
      }
      if (query.dairyfree) {
        table = filterByDairy(table)
      }
      if (query.glutenfree) {
        table = filterByGluten(table)
      }
      table = filterDuplicates(table)
      return table
    })
}

function filterByKeyword (table, keyword) {
  return table.filter(x => {
    if (x.title) {
      if (x.title.includes(keyword)) {
        return true
      }
    }
    if (x.description) {
      if (x.description.includes(keyword)) {
        return true
      }
    }
    if (x.ingredientName) {
      if (x.ingredientName.includes(keyword)) {
        return true
      }
    }
  })
}

function filterByGluten (table) {
  let arr = table.filter(x => x.gluten)
  for (var i = 0; i < arr.length; i++) {
    table = table.filter(x => x.id !== arr[i].id)
  }
  return table
}

function filterByMeat (table) {
  let arr = table.filter(x => x.meat)
  for (var i = 0; i < arr.length; i++) {
    table = table.filter(x => x.id !== arr[i].id)
  }
  return table
}

function filterByDairy (table) {
  let arr = table.filter(x => x.dairy)
  for (var i = 0; i < arr.length; i++) {
    table = table.filter(x => x.id !== arr[i].id)
  }
  return table
}

function filterDuplicates (table) {
  let results = []
  for (var i = 0; i < table.length; i++) {
    if (results.find(x => x.id === table[i].id)) {
    } else {
      results.push(table[i])
    }
  }
  return results
}

function getRecipe (id, connection) {
  id = Number(id)
  return getRecipeDetails(id, connection)
    .then(recipe => {
      recipe = recipe[0]
      return getIngredients(id, connection)
        .then(ingredients => {
          recipe.ingredients = ingredients
          return recipe
        })
    })
}

function getIngredients (id, connection) {
  return connection('recipe_ingredient')
    .join('ingredients', 'recipe_ingredient.ingredient_id', 'ingredients.id')
    .join('recipes', 'recipe_ingredient.recipe_id', 'recipes.id')
    .where('recipes.id', id)
    .select('ingredients.name', 'ingredients.gluten', 'ingredients.dairy', 'ingredients.meat', 'recipe_ingredient.quantity', 'recipe_ingredient.description')
}

function getRecipeDetails (id, connection) {
  return connection('recipes')
    .where('id', id)
    .select()
}

function getAllRecipes (connection) {
  return connection('recipes')
    .select()
}

function getAllIngredients (connection) {
  return connection('ingredients')
    .select()
    .then(ingredients => {
      return ingredients.sort((a, b) => {
        if (a.name > b.name) {
          return 1
        } else {
          return -1
        }
      })
    })
}

function addRecipe (form, connection) {
  let recipeObj = {}

  recipeObj.title = form.title
  recipeObj.time = form.time
  recipeObj.description = form.description2
  recipeObj.instructions = form.content
  recipeObj.photo = form.photo
  addToRecipesTable(recipeObj, connection)
    .then(id => {
      id = id[0]
      getAllIngredients(connection)
        .then(table => {
          table = table.map(x => x.id)
          for (let i = 0; i < form.ingredients.length; i++) {
            let ingredientId = form.ingredients[i]
            if (table.includes(Number(ingredientId))) {
              ingredientId = Number(ingredientId)
              let ingredientObj = {}
              ingredientObj.recipe_id = id
              ingredientObj.ingredient_id = ingredientId
              ingredientObj.quantity = form['quantity' + ingredientId]
              ingredientObj.description = form['description' + ingredientId]
              addToJoinTable(ingredientObj, connection)
                .then()
            } else {
              addToIngredientsTable({name: ingredientId, gluten: form['item' + ingredientId].includes('gluten'), meat: form['item' + ingredientId].includes('meat'), dairy: form['item' + ingredientId].includes('dairy')}, connection)
                .then(id2 => {
                  id2 = id2[0]
                  addToJoinTable({recipe_id: id, ingredient_id: id2, quantity: form['quantity' + ingredientId], description: form['description' + ingredientId]}, connection)
                    .then()
                })
            }
          }
        })
    })
}

function addToRecipesTable (obj, connection) {
  return connection('recipes')
    .insert(obj)
}

function addToIngredientsTable (obj, connection) {
  return connection('ingredients')
    .insert(obj)
}

function addToJoinTable (obj, connection) {
  return connection('recipe_ingredient')
    .insert(obj)
}

function getEverything (connection) {
  return connection('recipe_ingredient')
  .join('ingredients', 'recipe_ingredient.ingredient_id', 'ingredients.id')
  .join('recipes', 'recipe_ingredient.recipe_id', 'recipes.id')
  .select('recipes.*', 'ingredients.name as ingredientName', 'ingredients.meat', 'ingredients.gluten', 'ingredients.dairy')
}
