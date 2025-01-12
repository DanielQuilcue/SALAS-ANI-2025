import * as React from "react";
import Box from "@mui/material/Box";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from "@mui/icons-material/Edit";
import BedroomBabyIcon from "@mui/icons-material/BedroomBaby";
import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
import FoundationIcon from "@mui/icons-material/Foundation";
import { useLocation } from "wouter";

const actions = [
  { icon: <FoundationIcon />, name: "Sala 2-5", link: "/sala25" },
  { icon: <FoundationIcon />, name: "Sala 2-4", link: "/sala24" },
  { icon: <BedroomBabyIcon />, name: "Bienestar", link: "/bienestar" },
  { icon: <CameraOutdoorIcon />, name: "Auditorio", link: "/" },
];

export default function Navigation() {
  const [, setLocation] = useLocation(); // Obtén la función para cambiar la ubicación

  const handleActionClick = (link) => {
    setLocation(link); // Cambia la ubicación (navega a la nueva página)
  };

  return (
    <Box
      sx={{
        height: 320,
        transform: "translateZ(0px)",
        flexGrow: 1,
        zIndex: (theme) => theme.zIndex.drawer + 2,
        position: "fixed",
        bottom: 16,
        right: 16,
      }}
    >
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        sx={{ position: "absolute", bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => handleActionClick(action.link)} // Usa el onClick para navegar
          />
        ))}
      </SpeedDial>
    </Box>
  );
}
