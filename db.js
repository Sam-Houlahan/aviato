module.exports = {
  getRecipe,
  getRecipes,
  getAllIngredients,
  addRecipe
}

function getRecipes (query, connection) {
  return getAllRecipes(connection)
    .then()
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
}

function addRecipe (form, connection) {
  let recipeObj = {}
  let ingredientsArr = []
  let joinArr = []

  recipeObj.title = form.title
  recipeObj.time = form.time
  recipeObj.description = form.description
  addToRecipesTable(recipeObj)
    .then(id => {
      id = id[0]
      getAllIngredients(connection)
        .then(table => {
          table = table.map(x => x.id)
          for (let i = 0; i < form.ingredients.length; i++) {
            let ingredientId = form.ingredients[i]
            if (table.includes(Number(ingredientId))) {
              ingredientId = Number(ingredientId)
              addToJoinTable({recipe_id: id, ingredient_id: ingredientId, quantity: form['quantity' + ingredientId], description: form['description' + ingredientId]})
                .then()
            } else {
              addToIngredientsTable({name: ingredientId, gluten: false, meat: false, dairy: false}, connection)
                .then(id2 => {
                  id2 = id2[0]
                  addToJoinTable({recipe_id: id, ingredient_id: id2, quantity: form['quantity' + ingredientId], description: form['description' + ingredientId]})
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
