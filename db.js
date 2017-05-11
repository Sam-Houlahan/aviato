module.exports = {
  getRecipe: getRecipe,
  getRecipes: getRecipes
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
          console.log(ingredients)
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
