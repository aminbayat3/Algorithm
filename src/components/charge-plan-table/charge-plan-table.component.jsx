import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

import { tabelCell } from "../../styles/global.styles";
import { useTheme } from '@mui/material/styles';

import {
  StyledTableContainer,
  StyledTableRow,
  StyledTableCell,
} from "../table-style/table-styles";

import { selectWallboxes } from "../../store/infrastructure/infrastructure.selector";
import { selectReservations } from "../../store/reservation/reservation.selector";

import { getNumericPart } from "../../utils/utils";
import { TABLE_ELEMENT_TYPES } from "../../constants/project-constant";
import { Box } from "@mui/material";
import { Fragment } from "react";

const ChargePlanTable = ({ simulationData }) => {
  const wallboxes = useSelector(selectWallboxes);
  const reservations = useSelector(selectReservations);
  const theme = useTheme();

  return (
    <Box sx={{ margin: "45px", flexGrow: "1" }}>
      <StyledTableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow type={TABLE_ELEMENT_TYPES.TITLE}>
              <StyledTableCell colSpan={4} align="center">
                Leg Data
              </StyledTableCell>
              {wallboxes?.map((wb, idx) => {
                const correspondingReservation = reservations.find(
                  (reservation) =>
                    getNumericPart(reservation.carId) === getNumericPart(wb.id)
                );
                return (
                  <StyledTableCell
                    key={`wallbox-need-${idx}`}
                    sx={{ maxWidth: "80px", border: "solid 1px brown" }}
                    colSpan={2}
                    align="center"
                  >
                    {`${wb.name}(Need: ${correspondingReservation?.neededEnergy})`}
                  </StyledTableCell>
                );
              })}
            </StyledTableRow>
            <StyledTableRow>
              <StyledTableCell sx={{ maxWidth: "40px" }} align="center">
                Number
              </StyledTableCell>
              <StyledTableCell align="center">Start</StyledTableCell>
              <StyledTableCell align="center">End</StyledTableCell>
              <StyledTableCell align="center">CL</StyledTableCell>
              {wallboxes?.map((_, idx) => (
                <Fragment key={`wallbox-data-${idx}`}>
                  <StyledTableCell
                    sx={{ maxWidth: "40px", border: "solid 1px brown" }}
                    align="center"
                  >
                    CL
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{ maxWidth: "40px", border: "solid 1px brown" }}
                    align="center"
                  >
                    Soc
                  </StyledTableCell>
                </Fragment>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {reservations && simulationData?.length > 0 &&
              simulationData.map((data, idx) => {
                console.log(`simulation-${idx}`, data);
                return (
                  <StyledTableRow
                    key={`charge-plan-command-${idx}`}
                    type={TABLE_ELEMENT_TYPES.BODY}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {data.LegNumber}
                    </TableCell>
                    <TableCell
                      sx={{ ...tabelCell }}
                      align="center"
                    >
                      {dayjs(data.LegStartTime).format("D HH:mm")}
                    </TableCell>
                    <TableCell
                      sx={{ ...tabelCell }}
                      align="center"
                    >
                      {dayjs(data.LegEndTime).format("D HH:mm")}
                    </TableCell>
                    <TableCell
                      sx={{ ...tabelCell }}
                      align="center"
                    >
                      {data.PowerSchedule.ConnectionLoad}
                    </TableCell>
                    {reservations && wallboxes?.map((wb, index) => {
                      if(data.PowerSchedule.WbData.length > 0) {
                        return data.PowerSchedule.WbData.map(({ WallboxId, IsNeed, IsFull, CurrentChargeLoad, Soc }, wbIndex) => {
                          if (WallboxId === wb.id) { 
                            return (
                              <Fragment key={`charge-plan-wb-data-${index}-${idx}-${wbIndex}`}>
                                <TableCell
                                  sx={(IsNeed && !IsFull) ? ({ ...tabelCell, backgroundColor: theme.palette.info.main, color: theme.palette.info.contrastText  }) : IsFull ? {...tabelCell, backgroundColor: theme.palette.error.main, color: theme.palette.error.contrastText} : {...tabelCell}}
                                  align="center"
                                >
                                  {(IsNeed && !IsFull) ? `s:${CurrentChargeLoad.toFixed(1)}` : IsFull ? `f:${CurrentChargeLoad.toFixed(1)}` : CurrentChargeLoad.toFixed(1) }
                                </TableCell>
                                <TableCell
                                  sx={{ ...tabelCell }}
                                  align="center"
                                >
                                  {Soc.toFixed(1)}
                                </TableCell>
                              </Fragment>
                            );
                          }
                        });
                      }
                        return (
                          <Fragment key={`charge-plan-wb-data-${index}-${idx}}`}>
                          <TableCell
                            sx={{ ...tabelCell }}
                            align="center"
                          >
                            {0}
                          </TableCell>
                          <TableCell
                            sx={{ ...tabelCell }}
                            align="center"
                          >
                            {0}
                          </TableCell>
                        </Fragment>
                        )
                      
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </Box>
  );
};

export default ChargePlanTable;
