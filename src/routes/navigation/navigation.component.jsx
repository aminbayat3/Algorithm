import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

import NavbarItems from "./navbar-items.components";
import ThemeSelectBox from "./theme-select.component";

import { useOpenClose } from "../../hooks/useModalToggle";

import { useNavigate, useLocation } from "react-router-dom";

import { selectNumOfBadges } from "../../store/infrastructure/infrastructure.selector";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { BadgeImage } from "./navigation.styles";

import badge from "../../assets/badge.png";
import qualityCharging from "../../assets/qualityCharging.png";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

import {
  DRAWER_WIDTH,
  Main,
  AppBar,
  DrawerHeader,
  LogoImage,
  ModeIconGrid,
  LogoContainerBox,
} from "./navigation.styles";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const numOfBadges = useSelector(selectNumOfBadges);

  const {
    palette: { primary },
    spacing,
  } = useTheme();

  const {
    isOpen: isDrawerOpen,
    open: openDrawer,
    close: closeDrawer,
  } = useOpenClose();

  const navigateToProfilePage = () => {
    const currentPath = location.pathname;

    navigate(`${currentPath}/profile`);
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={isDrawerOpen}>
        <Toolbar id="drawer">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ p: spacing(1), margin: "auto 0", display: "flex" }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={openDrawer}
                edge="start"
                sx={{
                  mt: spacing(1),
                  ...(isDrawerOpen && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>

              <LogoContainerBox>
                <LogoImage src={qualityCharging} alt="logo" />
              </LogoContainerBox>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ display: "flex", alignItems: "center" }}
              >
                Quality Charging
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: 'center' }}>
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="subtitle2"
                  noWrap
                  component="div"
                  sx={{ marginTop: "2px", display: "flex", alignItems: "center" }}
                >
                  {numOfBadges}
                </Typography>
                <BadgeImage src={badge} alt="badge" />
              </Box>

              <ThemeSelectBox />

              <ManageAccountsIcon onClick={navigateToProfilePage} sx={{ margin: "0 20px", cursor: "pointer" }} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <DrawerHeader>
          <IconButton onClick={closeDrawer}>
            <ChevronLeftIcon sx={{ color: primary.main }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NavbarItems />
      </Drawer>
      <Main open={isDrawerOpen}>
        <DrawerHeader />
        <Outlet />
      </Main>
    </Box>
  );
};

export default Navigation;
