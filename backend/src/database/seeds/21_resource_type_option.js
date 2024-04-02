exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("config.project_budget_resource_type_option")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("config.project_budget_resource_type_option").insert([
        {
          value: "Staff",
          label: "Staff",
        },
        {
          value: "Contract",
          label: "Contract",
        },
      ]);
    });
};
