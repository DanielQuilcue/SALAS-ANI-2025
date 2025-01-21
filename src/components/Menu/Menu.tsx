import { useState, useEffect } from "react";
import { useLocation } from "wouter"; // Importar el hook de wouter

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BedroomBabyIcon from "@mui/icons-material/BedroomBaby";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import FoundationIcon from "@mui/icons-material/Foundation";
import WindowIcon from "@mui/icons-material/Window";
import { Link } from "wouter";
import { Box } from "@mui/material";
import Paper from "@mui/material/Paper";

export default function Menu() {
  const [location] = useLocation(); // Hook para obtener la ruta actual
  const [value, setValue] = useState(location); // Inicializar con la ruta actual

  // Sincronizar el estado del BottomNavigation con la ruta actual
  useEffect(() => {
    setValue(location);
  }, [location]);

  return (
    <Box
      sx={{
        position: "fixed",
        transform: "translateZ(0px)",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: (theme) => theme.zIndex.drawer + 2,
      }}
    >
      <Paper
        sx={{
          width: 500,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          // onChange={(event, newValue) => {
          //   setValue(newValue);
          // }}
        >
          <BottomNavigationAction
            label="Reservas"
            value="/"
            icon={<WindowIcon />}
            component={Link}
            to="/"
          />
          <BottomNavigationAction
            label="Auditorio"
            value="/auditorio"
            icon={<CameraOutdoorIcon />}
            component={Link}
            to="/auditorio"
          />
          <BottomNavigationAction
            label="Sala 2-4"
            value="/sala24"
            icon={<FoundationIcon />}
            component={Link}
            to="/sala24"
          />
          <BottomNavigationAction
            label="Sala 2-5"
            value="/sala25"
            icon={<FoundationIcon />}
            component={Link}
            to="/sala25"
          />
          <BottomNavigationAction
            label="Bienestar"
            value="/bienestar"
            icon={<BedroomBabyIcon />}
            component={Link}
            to="/bienestar"
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
