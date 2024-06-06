const projects_json = `
CREATE VIEW data.tab_14_project_budget_contract_info as
SELECT
p.id AS project_id,
c.co_number,
c.co_version,
s.supplier_name,
sc_text.subcontractors,
COALESCE(fy.fiscal_year, fy_d.fiscal_year)                                                                                              AS fiscal_year,
COALESCE(t.total_fee_amount, c.total_fee_amount) + COALESCE(t.total_expense_amount, c.total_fee_amount)                                 AS total_contract_amount,
Sum(id.unit_amount * id.rate)                                                                                                           AS invoiced_to_date,
COALESCE(t.total_fee_amount, c.total_fee_amount) + COALESCE(t.total_expense_amount, c.total_fee_amount) - Sum(id.unit_amount * id.rate) AS balance_remaining_for_calc,
c.end_date,
p.id,
c.status,
CASE
          WHEN c.status::text = ANY (array['Complete'::character varying, 'Cancelled'::character varying]::text[]) THEN '$0.00'::money
          WHEN (
                              COALESCE(t.total_fee_amount, c.total_fee_amount) + COALESCE(t.total_expense_amount, c.total_fee_amount) - sum(id.unit_amount * id.rate)) IS NOT NULL THEN COALESCE(t.total_fee_amount, c.total_fee_amount) + COALESCE(t.total_expense_amount, c.total_fee_amount) - sum(id.unit_amount * id.rate)
          ELSE COALESCE(t.total_fee_amount, c.total_fee_amount) + COALESCE(t.total_expense_amount, c.total_fee_amount)
END AS balance_remaining,
CASE
          WHEN c.status::text = ANY (array['Complete'::character varying, 'Cancelled'::character varying]::text[]) THEN
                    CASE
                              WHEN (
                                                  COALESCE(t.total_fee_amount, c.total_fee_amount) + COALESCE(t.total_expense_amount, c.total_fee_amount) - sum(id.unit_amount * id.rate)) IS NOT NULL THEN COALESCE(t.total_fee_amount, c.total_fee_amount) + COALESCE(t.total_expense_amount, c.total_fee_amount) - sum(id.unit_amount * id.rate)
                              ELSE COALESCE(t.total_fee_amount, c.total_fee_amount) + COALESCE(t.total_expense_amount, c.total_fee_amount)
                    END
          ELSE '$0.00'::money
END AS descoped
FROM      data.project p
LEFT JOIN data.contract c
ON        p.id = c.project_id
LEFT JOIN data.fiscal_year fy_d
ON        c.fiscal = fy_d.id
LEFT JOIN data.supplier s
ON        c.supplier_id = s.id
LEFT JOIN
(
         SELECT   t_sub.contract_id,
                  t_sub.fiscal,
                  sum(t_sub.total_fee_amount)     AS total_fee_amount,
                  sum(t_sub.total_expense_amount) AS total_expense_amount
         FROM     (
                           SELECT   contract_resource.contract_id,
                                    contract_resource.fiscal,
                                    sum(contract_resource.hours * contract_resource.assignment_rate) AS total_fee_amount,
                                    '$0.00'::money                                                   AS total_expense_amount
                           FROM     data.contract_resource
                           GROUP BY contract_resource.contract_id,
                                    contract_resource.fiscal
                           UNION
                           SELECT   contract_deliverable.contract_id,
                                    contract_deliverable.fiscal,
                                    sum(
                                    CASE
                                             WHEN contract_deliverable.is_expense = false THEN contract_deliverable.deliverable_amount
                                             ELSE '$0.00'::money
                                    END) AS total_fee_amount,
                                    sum(
                                    CASE
                                             WHEN contract_deliverable.is_expense = true THEN contract_deliverable.deliverable_amount
                                             ELSE '$0.00'::money
                                    END) AS total_expense_amount
                           FROM     data.contract_deliverable
                           GROUP BY contract_deliverable.contract_id,
                                    contract_deliverable.fiscal) t_sub
         GROUP BY t_sub.contract_id,
                  t_sub.fiscal) t
ON        c.id = t.contract_id
LEFT JOIN data.fiscal_year fy
ON        t.fiscal = fy.id
LEFT JOIN data.invoice i
ON        t.contract_id = i.contract_id
AND       t.fiscal = i.fiscal
LEFT JOIN data.invoice_detail id
ON        i.id = id.invoice_id
LEFT JOIN lateral
(
       SELECT string_agg(sc.subcontractor_name::text, ', '::text) AS subcontractors
       FROM   data.contract_subcontractor csc
       JOIN   data.subcontractor sc
       ON     csc.subcontractor_id = sc.id
       WHERE  csc.contract_id = c.id) sc_text
ON        1 = 1
GROUP BY  p.id,
c.co_number,
c.co_version,
s.supplier_name,
sc_text.subcontractors,
(COALESCE(fy.fiscal_year, fy_d.fiscal_year)),
c.total_fee_amount,
c.total_expense_amount,
(COALESCE(t.total_fee_amount, c.total_fee_amount)),
(COALESCE(t.total_expense_amount, c.total_fee_amount)),
c.end_date,
c.status;`;

exports.up = function (knex) {
  return knex.raw(projects_json);
};

exports.down = function (knex) {
  return knex.raw(`DROP VIEW tab_14_project_budget_contract_info;`);
};
