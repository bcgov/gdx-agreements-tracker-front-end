const projects_json = `
    CREATE VIEW data.tab_14_project_budget_deliverables_view as
    SELECT fy.fiscal_year,
    pd.deliverable_name,
    pd.deliverable_amount AS current_budget,
    pd.recoverable_amount AS recovery_amount,
    p.id AS project_id,
    sum(
        CASE
            WHEN pb.q1_recovered THEN pb.q1_amount
            ELSE '$0.00'::money
        END +
        CASE
            WHEN pb.q2_recovered THEN pb.q2_amount
            ELSE '$0.00'::money
        END +
        CASE
            WHEN pb.q3_recovered THEN pb.q3_amount
            ELSE '$0.00'::money
        END +
        CASE
            WHEN pb.q4_recovered THEN pb.q4_amount
            ELSE '$0.00'::money
        END) AS recovered_to_date,
    pd.recoverable_amount - sum(
        CASE
            WHEN pb.q1_recovered THEN pb.q1_amount
            ELSE '$0.00'::money
        END +
        CASE
            WHEN pb.q2_recovered THEN pb.q2_amount
            ELSE '$0.00'::money
        END +
        CASE
            WHEN pb.q3_recovered THEN pb.q3_amount
            ELSE '$0.00'::money
        END +
        CASE
            WHEN pb.q4_recovered THEN pb.q4_amount
            ELSE '$0.00'::money
        END) AS balance_remaining
   FROM data.project p
     JOIN data.contact c ON p.project_manager = c.id
     JOIN data.project_deliverable pd ON p.id = pd.project_id
     LEFT JOIN data.project_budget pb ON pd.id = pb.project_deliverable_id
     JOIN data.fiscal_year fy ON pd.fiscal = fy.id
  GROUP BY fy.fiscal_year, pd.deliverable_name, pd.deliverable_amount, pd.recoverable_amount, p.id;`;

exports.up = function (knex) {
  return knex.raw(projects_json);
};

exports.down = function (knex) {
  return knex.raw(`DROP VIEW tab_14_project_budget_deliverables_view;`);
};
