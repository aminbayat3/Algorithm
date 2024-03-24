import { useState } from "react";
import { useSelector } from "react-redux";

import WallBoxTable from "../../components/wallbox-table/wallbox-table.component";

import { selectWallboxes } from "../../store/wallbox/wallbox.selector";

import { Box } from "@mui/material";
import { AddWallboxIcon, Heading } from "./infrastructure-page.styles";

const InfrastructurePage = () => {
  const wallboxes = useSelector(selectWallboxes);

  return (
    <Box sx={{ padding: "25px" }}>
      <Box sx={{ display: "flex", margin: "10px" }}>
        <Heading variant="h4" component="h1">
          Add WallBox
        </Heading>
        <AddWallboxIcon />
      </Box>
      <WallBoxTable wallboxes={wallboxes} />

      <Box sx={{ display: "flex", margin: "100px 10px" }}>
        <Heading variant="h4" component="h1">
          Add Car
        </Heading>
        <AddWallboxIcon  />
      </Box>

      {/* <CustomTextField
        value={numberOfCars}
        onChange={handleNumOfCarsChange}
        id="outlined-number"
        label="Number of Cars"
        type="number" 
        /> */}
    </Box>
  );
};

export default InfrastructurePage;
