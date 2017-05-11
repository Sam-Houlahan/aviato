exports.seed = function (knex, Promise){
  return knex('ingredients').del()
    .then(() => {
    return Promise.all([
    knex('ingredients').insert({ id: 1, name:'garlic cloves', gluten:false, dairy:false, meat:false}),
    knex('ingredients').insert({ id: 2, name:'butter', gluten:false, dairy:true, meat:false}),
    knex('ingredients').insert({ id: 3, name:'olive', gluten:false, dairy:false, meat:false}),
    knex('ingredients').insert({ id: 4, name:'shrimp', gluten:false, dairy:false, meat:true}),
    knex('ingredients').insert({ id: 5, name:'lemon', gluten:false, dairy:false, meat:false}),
    knex('ingredients').insert({ id: 6, name:'pepper', gluten:false, dairy:false, meat:false}),
    knex('ingredients').insert({ id: 7, name:'parmesan', gluten:false, dairy:true, meat:false}),
    knex('ingredients').insert({ id: 8, name:'oregano', gluten:false, dairy:false, meat:false}),
    knex('ingredients').insert({ id: 9, name:'bread', gluten:true, dairy:false, meat:false}),
    knex('ingredients').insert({ id: 10, name:'parsley', gluten:false, dairy:false, meat:false}),
    knex('ingredients').insert({ id: 11, name:'pasta', gluten:true, dairy:false, meat:false}),


    ])


    })


}
