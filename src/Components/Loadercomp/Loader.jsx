import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

const Loader = ({ loading }) => {
  if (!loading) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.6)", 
        zIndex: 9999,
        flexDirection: "column",
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <CircularProgress 
          size={90} 
          sx={{ 
            color: "#4caf50",  // ✅ Soft green color
            filter: "drop-shadow(0px 0px 8px rgba(7, 153, 237, 0.8))", // ✅ Glowing Effect
          }} 
        />
      </Box>

      {/* Loading Text */}
      <Typography
        variant="h6"
        sx={{
          color: "#ffffff",
          mt: 2,
          fontWeight: "500",
          textTransform: "uppercase",
          letterSpacing: "1px",
          textShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
          animation: "pulse 1.5s infinite",
        }}
      >
        Please wait...
      </Typography>

      {/* Keyframe Animations */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.6; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </Box>
  );
};

export default Loader;
