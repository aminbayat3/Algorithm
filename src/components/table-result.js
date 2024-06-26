import * as React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { selectStartTime } from "../store/configuration/configuration.selector";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { StyledTableContainer } from "../styles";
import { getTimeDifference } from "../app.utils";


const ResultTable = ({ carsDataSnapshot }) => {
  const startTime = useSelector(selectStartTime);

  return (
    <StyledTableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Car's Name</TableCell>
            <TableCell align="center">Energy required&nbsp;(KWh)(need)</TableCell>
            <TableCell align="center">Max Ac Connection Load&nbsp;(KW)</TableCell>
            <TableCell align="center">Expected ready Time</TableCell>
            <TableCell align="center">Plug-In Times</TableCell>
            <TableCell align="center">Plug-Out Times</TableCell>
            <TableCell align="center">Actual ready time</TableCell>
            <TableCell align="center">Expected Charge level&nbsp;(%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carsDataSnapshot.map((car, idx) => {
            // const readyTimeDifference = getTimeDifference(car.expectedReadyTime, dayjs(carsDataSnapshot[idx]));
            // const expectedChargeLevel = readyTimeDifference > 0 ? 100 : ((getTimeDifference(car.expectedReadyTime, startTime) / getTimeDifference(dayjs(carsReadyTimes[idx]), startTime)) * 100);
            return(
              <TableRow
                key={car.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="center" component="th" scope="row">
                  {car.name}
                </TableCell>
                <TableCell align="center">{car.energyRequired}</TableCell>
                <TableCell align="center">{car.maxAcConnectionLoad}</TableCell>
                <TableCell align="center">{car.expectedReadyTime.format('YYYY.MM.DD HH:mm')}</TableCell>
                <TableCell align="center">{car.plugInTime.format('YYYY.MM.DD HH:mm')}</TableCell>
                <TableCell align="center">{car.plugOutTime.format('YYYY.MM.DD HH:mm')}</TableCell>
                <TableCell align="center">{car.fulfilledTime.format("YYYY.MM.DD HH:mm")}</TableCell>
                {/* <TableCell align="center" sx={{color: expectedChargeLevel < 100 ? 'red' : 'green', fontWeight: 'bold'}}>{expectedChargeLevel.toFixed(2)}</TableCell> */}
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </StyledTableContainer>
  );
}

export default ResultTable;
