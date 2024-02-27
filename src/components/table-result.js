import * as React from "react";
import { useSelector } from "react-redux";

import { selectPlugInTime } from "../store/configuration/configuration.selector";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableContainer } from "../styles";
import { getTimeDifference } from "../app.utils";


const ResultTable = ({ carsData, carsReadyTimes }) => {
  const plugInTime = useSelector(selectPlugInTime);

  return (
    <StyledTableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Car's Name</TableCell>
            <TableCell align="center">Energy required&nbsp;(KWh)</TableCell>
            <TableCell align="center">Expected ready Time</TableCell>
            <TableCell align="center">Actual ready time</TableCell>
            <TableCell align="center">Expected Charge level&nbsp;(%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carsData.map((car, idx) => {
            const actualReadyTime = plugInTime.add(carsReadyTimes[idx], "hour"); 
            const readyTimeDifference = getTimeDifference(car.expectedReadyTime, actualReadyTime);
            const expectedChargeLevel = readyTimeDifference > 0 ? 100 : ((getTimeDifference(car.expectedReadyTime, plugInTime) / getTimeDifference(actualReadyTime, plugInTime)) * 100);
            return(
              <TableRow
                key={car.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {car.name}
                </TableCell>
                <TableCell align="center">{car.energyRequired}</TableCell>
                <TableCell align="center">{car.expectedReadyTime.format('YYYY.MM.DD HH:mm')}</TableCell>
                <TableCell align="center">{actualReadyTime.format("YYYY.MM.DD HH:mm")}</TableCell>
                <TableCell align="center" sx={{color: expectedChargeLevel < 100 ? 'red' : 'green', fontWeight: 'bold'}}>{expectedChargeLevel.toFixed(2)}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default ResultTable;
