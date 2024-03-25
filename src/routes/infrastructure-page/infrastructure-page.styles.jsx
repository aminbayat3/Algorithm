import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { styled } from "@mui/material";

export const Heading = styled(Typography)(({theme}) => ({
    fontSize: "21px",
    fontWeight: "bold",
}));

// export const StyledWallboxImg = styled.img(({ theme }) => ({
//     margin: "0 10px",
//     cursor: "pointer",
//     color: `${theme.palette.primary.light}`,
//     fontSize: "27px",
// }));

export const CustomTextField = styled(TextField)(({ theme }) => ({
    width: '150px',
    marginRight: "30px"
}));