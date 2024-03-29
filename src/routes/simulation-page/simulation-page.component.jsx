import { useEffect, useState } from "react";
import dayjs from "dayjs";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import { SimulationTableHeading } from "../infrastructure-page/infrastructure-page.styles";
import CommandWallboxTable from "../../components/command-wb-table/command-wb-table.component";
import NotificationTable from "../../components/notification-table/notification-table.component";

import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { StyledBox } from "./simulation-page.styles";
import commandImg from "../../assets/command.png";

const SimulationPage = () => {
  const [lastMessage, setLastMessage] = useState(null);
  const [webSocket, setWebSocket] = useState(null);

  useEffect(() => {
    console.log("messages", lastMessage);
  }, [lastMessage]);

  const handleStartSimulation = () => {
    // Prevent multiple connections
    if (webSocket !== null) {
      console.log("WebSocket connection already exists.");
      return;
    }

    // Initialize WebSocket connection
    const ws = new WebSocket("wss://localhost:7019/ws");

    ws.onopen = () => {
      console.log("WebSocket Connected");
      setWebSocket(ws);
    };

    ws.onmessage = (event) => {
      // Handle incoming messages
      const message = JSON.parse(event.data);
      setLastMessage(message);
    };

    ws.onerror = (error) => {
      console.log("WebSocket Error: ", error);
    };

    ws.onclose = () => {
      console.log("WebSocket Disconnected");
      setWebSocket(null); // Reset WebSocket state on disconnect
    };
  };

  // Function to close WebSocket connection
  const disconnectWebSocket = () => {
    if (webSocket) {
      webSocket.close();
      setWebSocket(null);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={4} columnSpacing={2}>
        <Grid item xs={12}>
          {webSocket ? (
            <Button
              sx={{
                width: "200px",
                height: "120px",
                display: "block",
                margin: "30px auto",
                borderRadius: "50%",
                fontSize: "14px",
                padding: "10px",
                fontWeight: "bold",
                boxShadow:
                  "4px 14px 18px rgba(0,0,0,0.1), 5px 4px 10px rgba(0,0,0,0.05)",
              }}
              type="button"
              variant="contained"
              color="secondary"
              onClick={disconnectWebSocket}
            >
              Stop Simulation
            </Button>
          ) : (
            <Button
              sx={{
                width: "200px",
                height: "120px",
                display: "block",
                margin: "30px auto",
                borderRadius: "50%",
                fontSize: "14px",
                padding: "10px",
                fontWeight: "bold",
                boxShadow:
                  "4px 14px 18px rgba(0,0,0,0.1), 5px 4px 10px rgba(0,0,0,0.05)",
              }}
              type="button"
              variant="contained"
              color="secondary"
              onClick={handleStartSimulation}
            >
              Start Simulation
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <StyledBox>
            {lastMessage
              ? dayjs(lastMessage.LegEndTime).format("D HH:mm")
              : dayjs(Date.now()).format("D HH:mm")}
          </StyledBox>
        </Grid>
        <Grid item xs={4}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                margin: "10px",
                justifyContent: "center",
              }}
            >
              <SimulationTableHeading component="h2">
                Command To Wallboxes
              </SimulationTableHeading>
              <Box
                component="img"
                sx={{ width: "20px", height: "30px", margin: "0 10px" }}
                src={commandImg}
                alt="command img"
              />
            </Box>
            <CommandWallboxTable
              wallboxCommands={lastMessage?.CommandToWallBoxes}
            />
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                display: "flex",
                margin: "10px",
                justifyContent: "center",
              }}
            >
              <SimulationTableHeading component="h2">
                Notification To User
              </SimulationTableHeading>
              <NotificationsActiveIcon sx={{ marginLeft: "15px" }} />
            </Box>
            <NotificationTable
              notificationData={lastMessage?.NotificationToTheUser}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SimulationPage;
