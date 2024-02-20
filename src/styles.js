import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import TableContainer from "@mui/material/TableContainer";

export const CustomTextField = styled(TextField)(({ theme }) => ({
    width: '150px',
    marginRight: "30px"
  }));

export const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    width: '65%',
}));