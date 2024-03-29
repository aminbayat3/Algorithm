import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material";


//later we can define a configurable Heading so we can have different headings 
export const Heading = styled(Typography)(({theme}) => ({
    fontSize: "21px",
    fontWeight: "bold",
}));

export const SimulationTableHeading = styled(Typography)(( { theme }) => ({
    fontSize: "19px",
    fontWeight: "bold"
}));


export const CustomTextField = styled(TextField)(({ theme }) => ({
    width: '128px',
    margin: "0 20px"
}));