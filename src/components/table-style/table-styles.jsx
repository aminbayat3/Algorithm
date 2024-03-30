import { styled } from "@mui/material/styles";

import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";

import { TABLE_ELEMENT_TYPES } from "../../constants/project-constant";


// later we can have only one component with dynamic width
export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "100%",
}));

export const StyledReservationTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "100%",
}));

export const StyledCommandTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "90%",
}));

export const StyledTableRow = styled(TableRow, {
  shouldForwardProp: (prop) => prop !== "type",
})(({ theme, type }) => ({
  ...(type === TABLE_ELEMENT_TYPES.TITLE
    ? {
        backgroundColor: `${theme.palette.secondary.dark}`,
        color: `${theme.palette.secondary.contrastText}`,
      }
    : {
        backgroundColor: `${theme.palette.secondary.light}`,
        color: `${theme.palette.secondary.contrastText}`,
        height: "20px"
      }),
}));

export const StyledTableCell = styled(TableCell, {
  shouldForwardProp: (prop) => prop !== "type",
})(({ theme, type }) => ({
  fontWeight: "bold",
  ...(type === TABLE_ELEMENT_TYPES.BODY && {
    backgroundColor: `${theme.palette.secondary.light}`,
    color: `${theme.palette.secondary.contrastText}`,
  }),
}));
