import { useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";


import {
  StyledTableContainer,
  StyledTableRow,
  StyledTableCell,
} from "./wallbox-table.styles";

import { TABLE_ELEMENT_TYPES } from "../../constants/project-constant";
import { Box, Typography } from "@mui/material";

const WallBoxTable = ({ infrastructureData, setTableInputValues }) => {

  const handleInputChange = (wallboxId, newValue) => {
    setTableInputValues(prev => ({ ...prev, [wallboxId]: newValue }));
  };
  return (
    <Box sx={{ margin: "45px" }}>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow type={TABLE_ELEMENT_TYPES.TITLE}>
              <StyledTableCell align="center">Wallbox</StyledTableCell>
              <StyledTableCell align="center">AC-Limit</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {infrastructureData.wallboxes.length > 0 ? (
            <TableBody>
              {infrastructureData.wallboxes.map((wallbox, idx) => {
                return (
                  <StyledTableRow
                    key={wallbox.id}
                    type={TABLE_ELEMENT_TYPES.BODY}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {wallbox.name}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        name="AcLimit"
                        sx={{width: "40px", margin: "5px"}}
                        id={`standard-basic-${wallbox.id}`}
                        onChange={(e) => handleInputChange(wallbox.id, e.target.value)}
                        type="number"
                        defaultValue={wallbox.AcLimit}
                        variant="standard"
                      />
                    </TableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          ) : (
            <Typography
              sx={{ textAlign: "center" }}
              variant="body2"
              component="p"
            >
              There is no Wallboxes
            </Typography>
          )}
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default WallBoxTable;