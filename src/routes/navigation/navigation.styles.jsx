import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";

import { center } from "../../styles/global.styles";

export const DRAWER_WIDTH = 240;

export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${DRAWER_WIDTH}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));


export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: theme.palette.primary.dark,
  ...(open && {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    marginLeft: `${DRAWER_WIDTH}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export const LogoImage = styled("img")(({ theme }) => ({
  width: theme.spacing(7),
  margin: theme.spacing(1),
}));

export const BadgeImage = styled("img")(({ theme }) => ({
  width: "22px",
  margin: theme.spacing(1),
}));

export const ModeIconGrid = styled(Grid)(center);

export const NavbarLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: theme.palette.text.secondary,
}));

export const LogoContainerBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  margin: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
  boxShadow: `0 0 0.6rem ${theme.palette.primary.light} inset, 0 0 1rem 0.5rem ${theme.palette.primary.light}`,
}));

export const ThemeIconContainerBox = styled(Box)({
  display: 'flex',
});

export const SelectTheme = styled(Select)(({ theme }) => ({
  color: 'white',
  border: `1px solid ${theme.palette.primary.light}`,
  '& .MuiSvgIcon-root': {
    color: 'white',
  }
}));
