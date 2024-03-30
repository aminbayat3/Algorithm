import { useEffect } from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Heading } from "../infrastructure-page/infrastructure-page.styles";
import ChargePlanTable from "../../components/charge-plan-table/charge-plan-table.component";

import { selectSimulationData } from "../../store/simulation/simulation.selector";

import DescriptionIcon from "@mui/icons-material/Description";

const ChargePlanPage = () => {
  const simulationData = useSelector(selectSimulationData);

  useEffect(() => {
    console.log("simulation Data", simulationData);
  }, [simulationData]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={4} columnSpacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                margin: "45px 10px 5px 10px",
                justifyContent: "center",
              }}
            >
              <Heading component="h1">Charge Plan</Heading>

              <DescriptionIcon sx={{ marginLeft: "15px" }} />
            </Box>

            <ChargePlanTable
              simulationData={simulationData}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChargePlanPage;
