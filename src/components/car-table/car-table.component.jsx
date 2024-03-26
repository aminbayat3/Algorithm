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
} from "./car-table.styles";

import { TABLE_ELEMENT_TYPES } from "../../constants/project-constant";
import { Box, Typography } from "@mui/material";

const CarTable = ({ infrastructureData, setTableInputValues }) => {
  const handleInputChange = (carId, newValue) => {
    setTableInputValues((prev) => ({ ...prev, [carId]: newValue }));
  };

  return (
    <Box sx={{ margin: "45px" }}>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow type={TABLE_ELEMENT_TYPES.TITLE}>
              <StyledTableCell align="center">Cars</StyledTableCell>
              <StyledTableCell align="center">Tanksize</StyledTableCell>
              <StyledTableCell align="center">AC-Limit</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {infrastructureData.cars.length > 0 ? (
            <TableBody>
              {infrastructureData.cars.map((car) => {
                return (
                  <StyledTableRow
                    key={car.id}
                    type={TABLE_ELEMENT_TYPES.BODY}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {car.name}
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        name="tankSize"
                        sx={{ width: "40px", margin: "5px" }}
                        id={`standard-basic-${car.id}`}
                        onChange={(e) => handleInputChange(car.id, e.target.value)}
                        type="number"
                        defaultValue={car.tankSize}
                        variant="standard"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <TextField
                        name="AcLimit"
                        sx={{ width: "40px", margin: "5px" }}
                        id={`standard-basic-${car.id}`}
                        onChange={(e) => handleInputChange(car.id, e.target.value)}
                        type="number"
                        defaultValue={car.maxAcConnectionLoad}
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
              There is no Car
            </Typography>
          )}
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default CarTable;
