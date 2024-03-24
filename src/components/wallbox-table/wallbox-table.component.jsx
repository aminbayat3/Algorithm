import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import {
  StyledTableContainer,
  StyledTableRow,
  StyledTableCell,
} from "./wallbox-table.styles";

import { TABLE_ELEMENT_TYPES } from "../../constants/project-constant";
import { Box, Typography } from "@mui/material";

const WallBoxTable = ({ wallboxes }) => {
  return (
    <Box sx={{ margin: "45px" }}>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 550 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow type={TABLE_ELEMENT_TYPES.TITLE}>
              <StyledTableCell align="center">Wallbox</StyledTableCell>
              <StyledTableCell align="center">AC-Limit</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {wallboxes.length > 0 ? (
            <TableBody>
              {wallboxes.map((wallbox) => {
                return (
                  <StyledTableRow
                    key={wallbox.id}
                    type={TABLE_ELEMENT_TYPES.BODY}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {wallbox.name}
                    </TableCell>
                    <TableCell align="center">{wallbox.AcLimit}</TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          ) : (
            <TableBody>
              <StyledTableRow
                type={TABLE_ELEMENT_TYPES.BODY}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  There is no Wallbox
                </TableCell>
              </StyledTableRow>
            </TableBody>
          )}
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default WallBoxTable;
