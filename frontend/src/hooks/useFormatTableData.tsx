import { useQuery } from "@tanstack/react-query";
import { ITableData } from "../types";
import { Checkbox } from "@mui/material";
import { useAxios } from "./useAxios";
import { TableHealthChip } from "components/Table/TableHealthChip";

/**
 * Formats data from a database table in a way that is usable for material ui datagrid (table).
 *
 * @param {Array<object>} tableData data from a database table.
 * @example tableData.data = [ {id:1,name:"sara"} , {id:2,name:"jim"} ]
 */

// Export this function for unit testing.
export const formatTableColumns = (
  tableData: ITableData,
  columnWidths?: { [key: string]: number }
) => {
  return new Promise((resolve) => {
    const formattedColumns: Array<Object> = [];
    Object.entries(tableData.data.data[0]).forEach((value, index) => {
      let columnFlex = 1;
      if (columnWidths && columnWidths[value[0]]) {
        columnFlex = columnWidths[value[0]];
      }

      const fColumn = {
        hide: "id" === value[0] && true,
        field: value[0],
        headerName: value[0]
          .split("_")
          .join(" ")
          .replace(/(?:^|\s)\S/g, (a: string) => a.toUpperCase()),
        flex: columnFlex,
        id: index,
        renderCell: (params: {
          value: { red: number; green: number; blue: number; health_name: string };
        }) => {
          if (
            params.value &&
            params.value.red !== undefined &&
            params.value.green !== undefined &&
            params.value.blue !== undefined
          ) {
            return <TableHealthChip color={params.value} />;
          }
          if ("boolean" === typeof params.value) {
            return <Checkbox disabled checked={params.value} />;
          }
        },
      };

      formattedColumns.push(fColumn);
    });

    resolve({ columns: formattedColumns, rows: tableData.data.data, user: tableData.data?.user });
  });
};

export const useFormatTableData = ({
  tableName,
  apiEndPoint,
  handleClick,
  columnWidths,
}: {
  tableName: string;
  apiEndPoint: string;
  handleClick?: Function;
  columnWidths?: { [key: string]: number };
}) => {
  const { axiosAll } = useAxios();
  const getTableData = async () => {
    const allProjects = (await axiosAll())
      .get(apiEndPoint)
      .then((tableData: ITableData) => {
        switch (tableData.data.data.length) {
          case 0:
            return { columns: [], rows: [], user: tableData.data?.user };

          default:
            return formatTableColumns(tableData, columnWidths);
        }
      })
      .catch((error) => {
        switch (error.status) {
          case 404:
            console.error(error);
            return { columns: [], rows: [] };

          case 500:
            console.error(error);
            return { columns: [], rows: [] };
        }
      });
    return allProjects;
  };

  // Queries
  //Destructure the keycloak functionality
  /* eslint "no-warning-comments": [1, { "terms": ["todo", "fixme"] }] */
  // todo: Define a good type. "Any" type temporarily permitted.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, isLoading } = useQuery<any>([apiEndPoint], getTableData, {
    refetchOnMount: "always",
  });
  return { data, isLoading };
};
