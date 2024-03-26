import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material";

export const Heading = styled(Typography)(({theme}) => ({
    fontSize: "21px",
    fontWeight: "bold",
}));


export const CustomTextField = styled(TextField)(({ theme }) => ({
    width: '120px',
    margin: "30px 30px 0 30px"
}));