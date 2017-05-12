exports.seed = function(knex, promise) {
  return knex('recipes').del().then(() => {
    return Promise.all([
      knex('recipes').insert({
        id: 1,
        title: 'Shrimp Scampi',
        instructions: '1.In a 10-in. ovenproof skillet,saute garlic in butter and oil until fragrant.<br />Add the shrimp, lemon juice, pepper and oregano,cook and stir until shrimp turn pink. Sprinkle with cheese, bread crumbs and parsley.<br />2. Broil 6 in. from the heat for 2-3 minutes or until topping is golden brown.Serve with pasta.',
        photo: 'images/shrimpscampi.jpg',
        time: '20 min',
        time_minutes: '20',
        description: 'This is a description of the Shrimp Scampi'
      })])
  })
}
