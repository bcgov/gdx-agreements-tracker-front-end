import { Card, CardContent, CardHeader, Grid, ListItem, Paper, Typography } from "@mui/material";
import { List as MUIList } from "@mui/material";
import bcgovTheme from "bcgovTheme";

import { IList, IStandardRow } from "types";

export const List = ({ data, title }: IList) => {
  const headerTitleStyles = {
    color: bcgovTheme.palette.primary.main,
    fontWeight: "bold",
  };
  return (
    <Grid item xs={12} sm={12} md={12} lg={6} key={"s"}>
      <Card>
        <CardHeader
          avatar={<Typography sx={headerTitleStyles}>{title}</Typography>}
          sx={{ backgroundColor: "#ededed" }}
        />
        <CardContent>
          <Grid container>
            {data.map((row: IStandardRow, index: number) => {
              return (
                <Grid item xs key={index}>
                  <MUIList component="ul" aria-labelledby="category-a">
                    <Paper>
                      {Object.entries(row).map(([key, value]) => {
                        return (
                          <ListItem key={key}>
                            <Grid container>
                              <Grid zeroMinWidth item xs={6}>
                                <Typography variant="subtitle2" noWrap>
                                  {key}:
                                </Typography>
                              </Grid>
                              <Grid zeroMinWidth item xs={6}>
                                <Typography sx={{ fontWeight: "bold" }} variant="subtitle2" noWrap>
                                  {value as string}
                                </Typography>
                              </Grid>
                            </Grid>
                          </ListItem>
                        );
                      })}
                    </Paper>
                  </MUIList>
                </Grid>
              );
            })}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

<Grid container spacing={4}>
  <Grid item></Grid>
</Grid>;
