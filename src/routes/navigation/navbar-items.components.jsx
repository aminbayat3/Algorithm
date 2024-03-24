import { useTheme } from "@mui/material/styles";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { v4 as uuidv4 } from 'uuid';

import { NavbarLink } from "./navigation.styles";

import { NAV_ITEMS } from "./navigation.utils";


const NavbarItems = () => {
  const {palette: { primary }} = useTheme();

    return (
        <List>
          {NAV_ITEMS.map(({ title, icon: NavIcon, route }) => (
            <NavbarLink to={route} key={uuidv4()}>
            <ListItem key={title} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <NavIcon sx={{ color: primary.light }} />
                </ListItemIcon>
                <ListItemText primary={title} />
              </ListItemButton>
            </ListItem>
            </NavbarLink>
          ))}
        </List>
    )
}

export default NavbarItems;