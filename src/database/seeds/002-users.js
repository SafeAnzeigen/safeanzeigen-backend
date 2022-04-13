exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(function () {
      return knex('users').insert([
        {
          user_id: 'd130509d-6663-4181-a449-90ab9b1d3cf9',
          email: 'test@seed.com',
          phone_number: '+49123456789',
          firstname: 'Tester',
          lastname: 'Test',
          gender: 'male',
        },
        {
          user_id: 'c7a77397-fd17-4b68-9f51-b97ef05d5b9b',
          email: 'test2@seed.com',
          phone_number: '+491234567892',
          firstname: 'Tester2',
          lastname: 'Test2',
          gender: 'female',
        },
        {
          user_id: 'c7a77397-fd17-4b68-9f51-b97ef05d5b9c',
          email: 'test3@seed.com',
          phone_number: '+491234567893',
          firstname: 'Tester3',
          lastname: 'Test3',
          gender: 'diverse',
        },
      ]);
    });
};
