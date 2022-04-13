exports.seed = function (knex) {
  return knex('categories')
    .del()
    .then(function () {
      return knex('categories').insert([
        {
          category_id: 'd130509d-6663-4181-a449-90ab9b1d3c11',
          name: 'Elektronik',
        },
        {
          category_id: 'c7a77397-fd17-4b68-9f51-b97ef05d5b22',
          name: 'Deko',
        },
        {
          category_id: 'c7a77397-fd17-4b68-9f51-b97ef05d5b33',
          name: 'Holzspielzeug',
        },
      ]);
    });
};
