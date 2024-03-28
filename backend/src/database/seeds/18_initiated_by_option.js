exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.initiated_by_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.initiated_by_option").insert([
        {
          value: "GDX",
          label: "GDX",
        },
        {
          value: "Client",
          label: "Client",
        },
      ]);
    });
};
