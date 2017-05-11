exports.up = function(knex, Promise) {
  return knex.schema.table('recipes', function (table) {
  table.string('description')
  })
}
exports.down = function(knex, Promise) {
  return knex.schema.table('recipes', function (table) {
     table.dropColumn('description')
   })
}
