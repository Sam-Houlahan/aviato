
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipe_ingredient', function (table) {
    table.increments('id').primary()
    table.integer('recipe_id').references('recipe.id')
    table.integer('ingredient_id').references('ingredients.id')
    table.string('quantity')
  })

}

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('recipe_ingredient')

};
