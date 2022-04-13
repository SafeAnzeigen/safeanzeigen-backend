exports.seed = function (knex) {
  return knex('favorites')
    .del()
    .then(function () {
      return knex('favorites').insert([
        {
          fk_advertisement_id: 'd130509d-6663-4181-a449-90ab9b1d3c77',
          fk_user_id: 'c7a77397-fd17-4b68-9f51-b97ef05d5b9b',
        },
        {
          fk_advertisement_id: 'd130509d-6663-4181-a449-90ab9b1d3c88',
          fk_user_id: 'c7a77397-fd17-4b68-9f51-b97ef05d5b9c',
        },
        {
          fk_advertisement_id: 'd130509d-6663-4181-a449-90ab9b1d3c99',
          fk_user_id: 'd130509d-6663-4181-a449-90ab9b1d3cf9',
        },
      ]);
    });
};
