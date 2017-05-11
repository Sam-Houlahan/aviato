
exports.up = function(knex, Promise) {
  return knex.schema.createTable('recipes', function (table){
    table.increments('id').primary()
    table.string('title')
    table.string('instructions')
    table.string('photo')
    table.string('time')
    table.integer('time_minutes')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('recipes')

};
