exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.project_recoverable_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.project_recoverable_option").insert([
        {
          value: "Fully",
          label: "Fully",
        },
        {
          value: "Partially",
          label: "Partially",
        },
        {
          value: "Non-Recoverable",
          label: "Non-Recoverable",
        },
      ]);
    });
};
