const dbConnection = require("@database/databaseConnection");
const { knex } = dbConnection();
const { fiscalYearTable } = require("@models/useDbTables");

/**
 * Retrieves the data for various financial metrics based on the fiscal year.
 *
 * @param   {number | string | Array} fiscal - The fiscal year(s) to retrieve totals for.
 * @returns {Promise}                        - A promise that resolves to the query result containing the totals for recoveries, expenses, net recoveries, and quarterly gross and net amounts.
 */
const queries = {
  fiscalYear: (fiscal) => {
    return knex.select("fiscal_year").from(fiscalYearTable).where("fiscal_year.id", fiscal);
  },

  portAbbrev: (fiscal) => {
    return knex('data.portfolio')
      .distinct('portfolio_abbrev', 'portfolio_name')
      .orderBy('portfolio_abbrev', 'asc')
      .then(rows => {
        // Map the rows and add "(Inactive)" where necessary
        let mappedRows = rows.map(row => {
          let str = row.portfolio_abbrev;
  
          if (str === "EDS") str += " (Inactive)";
          if (str === "DIV") str += " (Inactive)";
          if (str === "MA") str += " (Inactive)";
  
          return str;
        });
  
        // Sort the mapped rows so that "Inactive" ones come at the end
        mappedRows.sort((a, b) => {
          if (a.includes("(Inactive)") && !b.includes("(Inactive)")) {
            return 1;
          } else if (!a.includes("(Inactive)") && b.includes("(Inactive)")) {
            return -1;
          } else {
            return a.localeCompare(b);
          }
        });
  
        // Join the sorted array into a single string
        return mappedRows.join(', ');
      });
  },
  

  report: (fiscal) => {
    return knex
      .select("*")
      .fromRaw(
        `
        (WITH stob_base as (
          SELECT fy.Fiscal_Year,
            pd.Fiscal,
            po.ID as Portfolio_ID,
            po.Portfolio_Name,
            po.Portfolio_Abbrev,
            Sum(Q1_Amount) AS Q1_Amount,
            Sum(Q2_Amount) AS Q2_Amount,
            Sum(Q3_Amount) AS Q3_Amount,
            Sum(Q4_Amount) AS Q4_Amount,
            Sum(
              case
                when Left(stob, 2) In ('57', '65', '63', '60') then Q1_Amount
                else cast(0 as money)
              end
            ) AS Q1_Expenses,
            Sum(
              case
                when Left(stob, 2) In ('57', '65', '63', '60') then Q2_Amount
                else cast(0 as money)
              end
            ) AS Q2_Expenses,
            Sum(
              case
                when Left(stob, 2) In ('57', '65', '63', '60') then Q3_Amount
                else cast(0 as money)
              end
            ) AS Q3_Expenses,
            Sum(
              case
                when Left(stob, 2) In ('57', '65', '63', '60') then Q4_Amount
                else cast(0 as money)
              end
            ) AS Q4_Expenses
          FROM data.Project_Budget pb
            left join data.Project_Deliverable pd on pb.Project_Deliverable_Id = pd.ID
            left join data.Project p on pd.Project_ID = p.ID
            left join data.Fiscal_Year fy on pd.Fiscal = fy.ID
            left join data.Portfolio po on pb.Recovery_Area = po.ID
          GROUP BY fy.Fiscal_Year,
            pd.Fiscal,
            po.ID,
            po.Portfolio_Name,
            po.Portfolio_Abbrev
          order by portfolio_name asc
        ) --end stob_base

      -- select columns from stob_base
      SELECT Portfolio_Name,
        Q1_Amount + Q2_Amount + Q3_Amount + Q4_Amount as total_recoveries,
        Q1_Expenses + Q2_Expenses + Q3_Expenses + Q4_Expenses as less_all_project_expenses,
        (Q1_Amount + Q2_Amount + Q3_Amount + Q4_Amount) - (Q1_Expenses + Q2_Expenses + Q3_Expenses + Q4_Expenses) as net_recoveries,
        Q1_Amount as q1_gross,
        (Q1_Amount - Q1_Expenses) as q1_net,
        Q2_Amount as q2_gross,
        (Q2_Amount - Q2_Expenses) as q2_net,
        Q3_Amount as q3_gross,
        (Q3_Amount - Q3_Expenses) as q3_net,
        Q4_Amount as q4_gross,
        (Q4_Amount - Q4_Expenses) as q4_net,
        fiscal
      from stob_base
      order by Portfolio_Abbrev,
        fiscal
      ) as q`
      )
      .where("q.fiscal", fiscal);
  },

  totals: (fiscal) => {
    return knex
      .select("*")
      .fromRaw(
        `
    (WITH stob_base as (
      SELECT fy.Fiscal_Year,
        pd.Fiscal,
        po.ID as Portfolio_ID,
        po.Portfolio_Name,
        po.Portfolio_Abbrev,
        Sum(Q1_Amount) AS Q1_Amount,
        Sum(Q2_Amount) AS Q2_Amount,
        Sum(Q3_Amount) AS Q3_Amount,
        Sum(Q4_Amount) AS Q4_Amount,
        Sum(
          case
            when Left(stob, 2) In ('57', '65', '63', '60') then Q1_Amount
            else cast(0 as money)
          end
        ) AS Q1_Expenses,
        Sum(
          case
            when Left(stob, 2) In ('57', '65', '63', '60') then Q2_Amount
            else cast(0 as money)
          end
        ) AS Q2_Expenses,
        Sum(
          case
            when Left(stob, 2) In ('57', '65', '63', '60') then Q3_Amount
            else cast(0 as money)
          end
        ) AS Q3_Expenses,
        Sum(
          case
            when Left(stob, 2) In ('57', '65', '63', '60') then Q4_Amount
            else cast(0 as money)
          end
        ) AS Q4_Expenses
      FROM data.Project_Budget pb
        left join data.Project_Deliverable pd on pb.Project_Deliverable_Id = pd.ID
        left join data.Project p on pd.Project_ID = p.ID
        left join data.Fiscal_Year fy on pd.Fiscal = fy.ID
        left join data.Portfolio po on pb.Recovery_Area = po.ID
      GROUP BY fy.Fiscal_Year,
        pd.Fiscal,
        po.ID,
        po.Portfolio_Name,
        po.Portfolio_Abbrev
      order by portfolio_name asc
    ) --end stob_base

  -- select columns from stob_base
  SELECT sum(Q1_Amount + Q2_Amount + Q3_Amount + Q4_Amount) as totals_recoveries,
    sum(Q1_Expenses + Q2_Expenses + Q3_Expenses + Q4_Expenses) as totals_less_all_project_expenses,
    sum((Q1_Amount + Q2_Amount + Q3_Amount + Q4_Amount) - (Q1_Expenses + Q2_Expenses + Q3_Expenses + Q4_Expenses)) as totals_net_recoveries,
    sum(Q1_Amount) as totals_q1_gross,
    sum(Q1_Amount - Q1_Expenses) as totals_q1_net,
    sum(Q2_Amount) as totals_q2_gross,
    sum(Q2_Amount - Q2_Expenses) as totals_q2_net,
    sum(Q3_Amount) as totals_q3_gross,
    sum(Q3_Amount - Q3_Expenses) as totals_q3_net,
    sum(Q4_Amount) as totals_q4_gross,
    sum(Q4_Amount - Q4_Expenses) as totals_q4_net,
    fiscal
  FROM stob_base
  GROUP BY fiscal
  ) as q`
      )
      .where("q.fiscal", fiscal);
  },
};

module.exports = {
  required: ["fiscal"],
  getAll: async (query) => {
    try {
      const { fiscal } = query;
      const [[{ fiscal_year }],  portAbbrev, report, report_totals] = await Promise.all([
        queries.fiscalYear(fiscal),
        queries.portAbbrev(fiscal),
        queries.report(fiscal),
        queries.totals(fiscal),
      ]);

      return {
        fiscal: fiscal_year,
        portAbbrev,
        report,
        report_totals,
      };
    } catch (error) {
      console.error(`
        Model error!:
        query parameter received: ${JSON.stringify(query)}
        **** ${error} ****
        returning NULL!.
      `);

      return null;
    }
  },
};
