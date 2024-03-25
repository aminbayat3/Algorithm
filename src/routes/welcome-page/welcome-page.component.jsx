import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PROJECT_INFO } from "../../constants/project-constant";

import Box from "@mui/material/Box";

import { center } from "../../styles/global.styles";

function WelcomePage() {
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      navigate("/app");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  if (!isVisible) {
    return null;
  }

  return (
    <Box sx={{ ...center, height: "100vh" }}>
      <Box sx={{display: 'flex', flexDirection: "column"}}>
        <h1>Welcome to {PROJECT_INFO.name}</h1>
        <h4 sx={{textAlign: 'center'}}>Version: {PROJECT_INFO.version}</h4>
        <h4>Release Date: {PROJECT_INFO.releaseDate}</h4>
      </Box>
    </Box>
  );
}

export default WelcomePage;
