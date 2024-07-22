import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { StyledTableRow, StyledTableCell, StyledTableContainer } from "../table-style/table-styles";

import { TABLE_ELEMENT_TYPES } from "../../constants/project-constant";
import { Box, Typography } from "@mui/material";

const CarTable = ({ infrastructureData, setTableCarInputValues, children, idCar, idTank }) => {
  
  const handleInputChange = (carId, target) => {
    const {name, value} = target;

    setTableCarInputValues(prev => ({
      ...prev,
      [carId]: {
        ...prev[carId],
        [name]: value
      }
    }));
  };

  return (
    <Box sx={{ margin: "45px", flexGrow: "1", position: "relative" }}>
      <StyledTableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 20 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow type={TABLE_ELEMENT_TYPES.TITLE}>
              <StyledTableCell align="center">Cars</StyledTableCell>
              <StyledTableCell id={idTank} align="center">Tanksize</StyledTableCell>
              <StyledTableCell id={idCar} align="center">AC-Limit</StyledTableCell>
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
                    <TableCell sx={{ paddingBottom: '4px', paddingTop: '4px' }} align="center" component="th" scope="row">
                      {car.name}
                    </TableCell>
                    <TableCell sx={{ paddingBottom: '4px', paddingTop: '4px' }} align="center">
                      <TextField
                        name="tankSize"
                        sx={{ width: "40px", margin: "5px" }}
                        id={`standard-basic-${car.id}`}
                        onChange={(e) => handleInputChange(car.id, e.target)}
                        type="number"
                        defaultValue={car.tankSize}
                        variant="standard"
                      />
                    </TableCell>
                    <TableCell sx={{ paddingBottom: '4px', paddingTop: '4px' }} align="center">
                      <TextField
                        name="maxAcConnectionLoad"
                        sx={{ width: "40px", margin: "5px" }}
                        id={`standard-basic-${car.id}`}
                        onChange={(e) => handleInputChange(car.id, e.target)}
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

      {children}
    </Box>
  );
};

export default CarTable;
