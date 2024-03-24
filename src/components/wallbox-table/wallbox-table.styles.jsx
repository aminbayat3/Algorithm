import { styled } from "@mui/material/styles";

import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import Box from "@mui/material/Box";

import { TABLE_ELEMENT_TYPES } from "../../constants/project-constant";
import { center } from "../../styles/global.styles";

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  width: "80%",
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
