import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableContainer } from "../styles";


const ResultTable = ({ carsData, tripReadyTimes }) => {
  return (
    <StyledTableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Car's Name</TableCell>
            <TableCell align="right">Energy required</TableCell>
            <TableCell align="right">Required ready Time</TableCell>
            <TableCell align="right">Trip ready time</TableCell>
            <TableCell align="right">Charge level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carsData.map((car, idx) => (
            <TableRow
              key={car.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {car.name}
              </TableCell>
              <TableCell align="right">{car.energyRequired}</TableCell>
              <TableCell align="right">{car.requiredReadyTime}</TableCell>
              {/* <TableCell align="right">{tripReadyTime[idx]}</TableCell>
              <TableCell align="right">{chargeLevel[idx]}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default ResultTable;
