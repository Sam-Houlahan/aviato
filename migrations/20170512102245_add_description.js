exports.up = function(knex, Promise) {
  return knex.schema.table('recipe_ingredient', function (table) {
  table.string('description')
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.table('recipe_ingredients', function (table) {
     table.dropColumn('description')
   })
}
