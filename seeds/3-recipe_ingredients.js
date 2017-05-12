exports.seed = function (knex, Promise)  {
  return knex('recipe_ingredient').del()
    .then(() => {
    return Promise.all([
    knex('recipe_ingredient').insert({recipe_id:1, ingredient_id:1, quantity:'3-4', description:'minced'}),
    knex('recipe_ingredient').insert({recipe_id:1, ingredient_id:2, quantity:'1/4 cup', description:'cubed'}),
    knex('recipe_ingredient').insert({recipe_id:1, ingredient_id:3, quantity:'1/4 cup', description:'oil'}),
    knex('recipe_ingredient').insert({recipe_id:1, ingredient_id:4, quantity:'1 pound', description:'uncooked,peeled and deveined'}),
    knex('recipe_ingredient').insert({recipe_id:1, ingredient_id:5, quantity:'1/4 cup', description:'juice'}),
    knex('recipe_ingredient').insert({recipe_id:1, ingredient_id:6, quantity:'1/2 teaspoon', description:'ground'}),
    knex('recipe_ingredient').insert({recipe_id:1, ingredient_id:7, quantity:'1/4 teaspoon', description:'dried'}),
    knex('recipe_ingredient').insert({recipe_id:1, ingredient_id:8, quantity:'1/2 cup', description:'grated cheese'}),
    knex('recipe_ingredient').insert({recipe_id:1, ingredient_id:9, quantity:'1/4 cup', description:'dry crumbs'}),
    knex('recipe_ingredient').insert({recipe_id:1, ingredient_id:10, quantity:'1/4 cup', description:'freshly minced'}),
    knex('recipe_ingredient').insert({recipe_id:1, ingredient_id:11, quantity:'300 grams', description:'hot cooked angel hair'}),
    knex('recipe_ingredient').insert({recipe_id:2, ingredient_id:1, quantity:'3-4', description:'minced'}),
    knex('recipe_ingredient').insert({recipe_id:2, ingredient_id:1, quantity:'1/4 cup', description:'cubed'}),
    knex('recipe_ingredient').insert({recipe_id:2, ingredient_id:1, quantity:'1/4 cup', description:'oil'}),
    knex('recipe_ingredient').insert({recipe_id:2, ingredient_id:1, quantity:'1 pound', description:'uncooked,peeled and deveined'}),
    knex('recipe_ingredient').insert({recipe_id:2, ingredient_id:1, quantity:'1/4 cup', description:'juice'}),
    knex('recipe_ingredient').insert({recipe_id:2, ingredient_id:1, quantity:'1/2 teaspoon', description:'ground'}),
    knex('recipe_ingredient').insert({recipe_id:2, ingredient_id:1, quantity:'1/4 teaspoon', description:'dried'}),
    knex('recipe_ingredient').insert({recipe_id:2, ingredient_id:1, quantity:'1/2 cup', description:'grated cheese'}),
    knex('recipe_ingredient').insert({recipe_id:2, ingredient_id:1, quantity:'1/4 cup', description:'dry crumbs'}),
    knex('recipe_ingredient').insert({recipe_id:2, ingredient_id:1, quantity:'1/4 cup', description:'freshly minced'}),
    knex('recipe_ingredient').insert({recipe_id:2, ingredient_id:1, quantity:'300 grams', description:'hot cooked angel hair'})
      ])
    })
}
