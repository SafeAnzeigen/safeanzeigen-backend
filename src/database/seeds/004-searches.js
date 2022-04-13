exports.seed = function (knex) {
  return knex('searches')
    .del()
    .then(function () {
      return knex('searches').insert([
        {
          fk_user_id: 'd130509d-6663-4181-a449-90ab9b1d3cf9',
          search_term: 'Playstation 5',
        },
        {
          fk_user_id: 'c7a77397-fd17-4b68-9f51-b97ef05d5b9b',
          search_term: 'Nintendo Switch',
        },
        {
          fk_user_id: 'c7a77397-fd17-4b68-9f51-b97ef05d5b9c',
          search_term: 'Grafikkarte',
        },
      ]);
    });
};
