import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";


import { StyledCommandTableContainer, StyledTableRow, StyledTableCell } from "../table-style/table-styles";

import { TABLE_ELEMENT_TYPES } from "../../constants/project-constant";
import { Box } from "@mui/material";

const CommandWallboxTable = ({ wallboxCommands }) => {

  return (
    <Box sx={{ margin: "45px", flexGrow: "1" }}>
      <StyledCommandTableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 70 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow type={TABLE_ELEMENT_TYPES.TITLE}>
              <StyledTableCell align="center">WB</StyledTableCell>
              <StyledTableCell align="center">CL</StyledTableCell>
            </StyledTableRow>
          </TableHead>
            <TableBody>
              {wallboxCommands?.length > 0 && wallboxCommands.map((command, idx) => {
                return (
                  <StyledTableRow
                    key={`command-${idx}`}
                    type={TABLE_ELEMENT_TYPES.BODY}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell sx={{ paddingBottom: '4px', paddingTop: '4px' }} align="center" component="th" scope="row">
                      {command.WallboxId}
                    </TableCell>
                    <TableCell sx={{ paddingBottom: '4px', paddingTop: '4px' }} align="center">
                      {command.CurrentChargeLoad}
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
        </Table>
      </StyledCommandTableContainer>
    </Box>
  );
};

export default CommandWallboxTable;