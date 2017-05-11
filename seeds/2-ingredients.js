exports.seed = function (knex, Promise){
  return knex('ingredients').del()
    .then(() => {
    return Promise.all([
    knex('ingredients').insert({ name:'garlic cloves', gluten:false, dairy:false, meat:false}),
    knex('ingredients').insert({ name:'butter', gluten:false, dairy:true, meat:false}),
    knex('ingredients').insert({ name:'olive', gluten:false, dairy:false, meat:false}),
    knex('ingredients').insert({ name:'shrimp', gluten:false, dairy:false, meat:true}),
    knex('ingredients').insert({ name:'lemon', gluten:false, dairy:false, meat:false}),
    knex('ingredients').insert({ name:'pepper', gluten:false, dairy:false, meat:false}),
    knex('ingredients').insert({ name:'parmesan', gluten:false, dairy:true, meat:false}),
    knex('ingredients').insert({ name:'oregano', gluten:false, dairy:false, meat:false}),
    knex('ingredients').insert({ name:'bread', gluten:true, dairy:false, meat:false}),
    knex('ingredients').insert({ name:'parsley', gluten:false, dairy:false, meat:false}),
    knex('ingredients').insert({ name:'pasta', gluten:true, dairy:false, meat:false}),


    ])


    })


}
