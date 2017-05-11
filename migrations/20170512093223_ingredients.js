
exports.up = function(knex, Promise) {
  return knex.schema.createTable('ingredients', function (table) {
    table.increments('id').primary()
    table.string('name')
    table.boolean('gluten')
    table.boolean('dairy')
    table.boolean('meat')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('ingredients')
}
