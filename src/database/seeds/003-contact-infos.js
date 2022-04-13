exports.seed = function (knex) {
  return knex('contact_infos')
    .del()
    .then(function () {
      return knex('contact_infos').insert([
        {
          fk_user_id: 'd130509d-6663-4181-a449-90ab9b1d3cf9',
          street: 'Plotze',
          street_number: '14',
          city: 'Limburg an der Lahn',
          zip: '65549',
          county: 'Hesse',
          country: 'Germany',
        },
        {
          fk_user_id: 'c7a77397-fd17-4b68-9f51-b97ef05d5b9b',
          street: 'Hauptstrasse',
          street_number: '51',
          city: 'Seligenstadt',
          zip: '63500',
          county: 'Hesse',
          country: 'Germany',
        },
        {
          fk_user_id: 'c7a77397-fd17-4b68-9f51-b97ef05d5b9c',
          street: 'Lorsbacher Strasse',
          street_number: '41',
          city: 'Kelkheim (Taunus)',
          zip: '65779',
          county: 'Hesse',
          country: 'Germany',
        },
      ]);
    });
};
