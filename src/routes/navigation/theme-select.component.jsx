import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, Typography } from "@mui/material";

import { selectThemeKey } from "../../store/theme/theme.selector";

import { setTheme } from "../../store/theme/theme.action";

import { THEME_DATA } from "../../constants/theme-names.constant";
import { ThemeIconContainerBox, SelectTheme } from "./navigation.styles";

const ThemeSelectBox = () => {
  const dispatch = useDispatch();
  const themeKey = useSelector(selectThemeKey);
  const { palette, spacing } = useTheme();

  const handleChange = (event) => {
    dispatch(setTheme(event.target.value));
  };

  return (
    <Box sx={{ margin: "0 20px" }}>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <SelectTheme
          value={themeKey}
          onChange={handleChange}
          displayEmpty
          inputProps={{ "aria-label": "Without label" }}
        >
          {Object.keys(THEME_DATA).map((key, idx) => {
            const ThemeIcon = THEME_DATA[key].icon;
            return (
              <MenuItem key={`theme-${idx}`} value={THEME_DATA[key].key}>
                <ThemeIconContainerBox>
                  <ThemeIcon sx={{ color: palette.primary.light, mr: spacing(2) }} />
                  <Typography variant="subtitle2">
                    {THEME_DATA[key].label}
                  </Typography>
                </ThemeIconContainerBox>
              </MenuItem>
            );
          })}
        </SelectTheme>
      </FormControl>
    </Box>
  );
};

export default ThemeSelectBox;
