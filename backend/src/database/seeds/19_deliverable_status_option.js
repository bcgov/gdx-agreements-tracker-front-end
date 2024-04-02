exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.deliverable_status_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.deliverable_status_option").insert([
        {
          value: "Active",
          label: "Active",
        },
        {
          value: "Complete",
          label: "Complete",
        },
      ]);
    });
};
