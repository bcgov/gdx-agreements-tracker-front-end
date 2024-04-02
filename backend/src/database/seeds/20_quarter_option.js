exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.quarter_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.quarter_option").insert([
        {
          value: 1,
          label: 1,
        },
        {
          value: 2,
          label: 2,
        },
        {
          value: 3,
          label: 3,
        },
        {
          value: 4,
          label: 4,
        },
      ]);
    });
};
