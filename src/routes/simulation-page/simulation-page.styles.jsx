import styled from "@emotion/styled";

import { center } from "../../styles/global.styles";
import Box from "@mui/material/Box";

export const StyledBox = styled(Box)(({ theme }) => ({
    width: "150px",
    height: "100px",
    margin: "30px auto",
    borderRadius: "20px",
    ...center,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
}));