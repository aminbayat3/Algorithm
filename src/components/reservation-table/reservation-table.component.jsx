import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

import {
  StyledTableRow,
  StyledTableCell,
  StyledReservationTableContainer,
} from "../table-style/table-styles";
import { DateTimePicker as ExpiTime } from "../date-time-picker/date-time-picker.component";
import { DateTimePicker as ExpoTime } from "../date-time-picker/date-time-picker.component";

import { TABLE_ELEMENT_TYPES } from "../../constants/project-constant";
import { Box, Typography } from "@mui/material";

const ReservationTable = ({ reservations, setTableReservationInputValues, children }) => {
  console.log('reservation', reservations);
  
    const handleInputChange = (reservationId, target) => {
    const { name, value } = target;

    setTableReservationInputValues((prev) => ({
      ...prev,
      [reservationId]: {
        ...prev[reservationId],
        [name]: value,
      },
    }));
  };

  const handleDateTimeChange = (reservationId, value, name) => {
    setTableReservationInputValues((prev) => ({
      ...prev,
      [reservationId]: {
        ...prev[reservationId],
        [name]: value,
      },
    }));
  } 

  return (
    <Box sx={{ margin: "45px", flexGrow: "1", position: "relative" }}>
      <StyledReservationTableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 250 }} aria-label="simple table">
          <TableHead>
            <StyledTableRow type={TABLE_ELEMENT_TYPES.TITLE}>
              <StyledTableCell align="center">Reservations</StyledTableCell>
              <StyledTableCell align="center">EPI</StyledTableCell>
              <StyledTableCell align="center">EPO</StyledTableCell>
              <StyledTableCell align="center">Need&nbsp;(KWh)</StyledTableCell>
              <StyledTableCell align="center">
                Priority&nbsp;(0 or 1)
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          {reservations.length > 0 ? (
            <TableBody>
              {reservations.map((reservation) => {
                return (
                  <StyledTableRow
                    key={reservation.id}
                    type={TABLE_ELEMENT_TYPES.BODY}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      sx={{ paddingBottom: "4px", paddingTop: "4px" }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      {reservation.carId}
                    </TableCell>
                    <TableCell
                      sx={{ paddingBottom: "4px", paddingTop: "4px" }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      <ExpiTime
                        onHandleDateTimeChange={(value) =>
                          handleDateTimeChange(reservation.id, value, "expi")
                        }
                        name="expi"
                        label=""
                        defaultValue={reservation.expi}
                      />
                    </TableCell>

                    <TableCell
                      sx={{ paddingBottom: "4px", paddingTop: "4px" }}
                      align="center"
                      component="th"
                      scope="row"
                    >
                      <ExpoTime
                        onHandleDateTimeChange={(value) =>
                          handleDateTimeChange(reservation.id, value, "expo")
                        }
                        name="expo"
                        label=""
                        defaultValue={reservation.expo}
                      />
                    </TableCell>

                    <TableCell
                      sx={{ paddingBottom: "4px", paddingTop: "4px" }}
                      align="center"
                    >
                      <TextField
                        name="neededEnergy"
                        sx={{ width: "40px", margin: "5px" }}
                        id={`standard-basic-${reservation.id}`}
                        onChange={(e) =>
                          handleInputChange(reservation.id, e.target)
                        }
                        type="number"
                        defaultValue={reservation.neededEnergy}
                        variant="standard"
                      />
                    </TableCell>
                    <TableCell
                      sx={{ paddingBottom: "4px", paddingTop: "4px" }}
                      align="center"
                    >
                        <Select
                          labelId="priority-select-label"
                          id="priority-select"
                          name="priority"
                          defaultValue={reservation.priority}
                          label="Priority"
                          onChange={(e) => handleInputChange(reservation.id, e.target)}
                        >
                          <MenuItem value={0}>Low</MenuItem>
                          <MenuItem value={1}>High</MenuItem>
                        </Select>
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
              There is no Reservation
            </Typography>
          )}
        </Table>
      </StyledReservationTableContainer>
      
      {children}
    </Box>
  );
};

export default ReservationTable;
