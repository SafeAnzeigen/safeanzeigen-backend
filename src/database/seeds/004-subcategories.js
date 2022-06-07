exports.seed = function (knex) {
  return knex('subcategories')
    .del()
    .then(function () {
      return knex('subcategories').insert([
        {
          fk_category_id: 'd130509d-6663-4181-a449-90ab9b1d3c11',
          name: 'Notebooks',
        },
        {
          fk_category_id: 'c7a77397-fd17-4b68-9f51-b97ef05d5b22',
          name: 'Stoffe',
        },
        {
          fk_category_id: 'c7a77397-fd17-4b68-9f51-b97ef05d5b33',
          name: 'Kinderspielzeug',
        },
      ]);
    });
};
