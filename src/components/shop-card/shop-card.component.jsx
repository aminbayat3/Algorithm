import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@mui/material";

import badge from "../../assets/badge.png";

const cardVariants = {
  hover: { scale: 1.1 },
  tap: { scale: 0.9 },
};

const ShopCard = ({data}) => {
    const {badgesRequired, title, value} = data;
    const theme = useTheme();

  return (
    <motion.div
      className="card"
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      style={{
        cursor:"pointer",
        backgroundColor: `${theme.palette.secondary.light}`,
        borderRadius: "15px",
        overflow: "hidden",
        boxShadow: `0 0.5rem 0.5rem ${theme.palette.primary.light}`,
      }}
    >
      <img
        src={badge}
        alt="Card"
        style={{ width: "60px" }}
      />
      <div style={{ padding: "16px" }}>
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
    </motion.div>
  );
};

export default ShopCard;
