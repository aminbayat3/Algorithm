import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";

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

const ChargePlanTable = ({ simulationData }) => {
  const wallboxes = useSelector(selectWallboxes);
  const reservations = useSelector(selectReservations);

  return (
    <Box sx={{ margin: "45px", flexGrow: "1" }}>
      <StyledTableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow type={TABLE_ELEMENT_TYPES.TITLE}>
              <StyledTableCell colSpan={4} align="center">
                Leg Data
              </StyledTableCell>
              {wallboxes?.map((wb) => {
                const correspondingReservation = reservations.find(
                  (reservation) =>
                    getNumericPart(reservation.carId) === getNumericPart(wb.id)
                );
                return (
                  <StyledTableCell
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
              {wallboxes?.map((_) => (
                <>
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
                </>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {simulationData?.length > 0 &&
              simulationData.map((data, idx) => {
                return (
                  <StyledTableRow
                    key={`command-${idx}`}
                    type={TABLE_ELEMENT_TYPES.BODY}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center" component="th" scope="row">
                      {data.LegNumber}
                    </TableCell>
                    <TableCell
                      sx={{ paddingBottom: "4px", paddingTop: "4px" }}
                      align="center"
                    >
                      {dayjs(data.LegStartTime).format("D HH:mm")}
                    </TableCell>
                    <TableCell
                      sx={{ paddingBottom: "4px", paddingTop: "4px" }}
                      align="center"
                    >
                      {dayjs(data.LegEndTime).format("D HH:mm")}
                    </TableCell>
                    <TableCell
                      sx={{ paddingBottom: "4px", paddingTop: "4px" }}
                      align="center"
                    >
                      {data.PowerSchedule.ConnectionLoad}
                    </TableCell>
                    {wallboxes?.map((wb) => {
                      data.PowerSchedule.WbData.map((wallboxData) => {
                        if (wallboxData.WallboxId === wb.id) {
                          console.log("CurrentChargeLoad", wallboxData.CurrentChargeLoad);
                          console.log("Soc", wallboxData.Soc)
                          console.log("&&&&&&&&&&&&&&&&&&&&&&&&")
                          return (
                            <>
                              <TableCell
                                sx={{ paddingBottom: "4px", paddingTop: "4px" }}
                                align="center"
                              >
                                {wallboxData.CurrentChargeLoad}
                              </TableCell>
                              <TableCell
                                sx={{ paddingBottom: "4px", paddingTop: "4px" }}
                                align="center"
                              >
                                {wallboxData.Soc}
                              </TableCell>
                            </>
                          );
                        }
                      });
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
