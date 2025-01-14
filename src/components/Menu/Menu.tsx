import { useState } from "react";

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
  const [value, setValue] = useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        // display: "flex",
        // justifyContent: "center",
        // alignItems: "center",
        // height: "10vh",
        // Por ejemplo, ocupa toda la altura de la ventana
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
      {/* <BottomNavigation
        sx={{ width: 500 }}
        value={value}
        onChange={handleChange}
      >
        <BottomNavigationAction
          label="Auditorio"
          value="recents"
          icon={<CameraOutdoorIcon />}
          component={Link}
          to="/auditorio"
        />
        <BottomNavigationAction
          label="Sala 2-4"
          value="favorites"
          icon={<FoundationIcon />}
          component={Link}
          to="/sala24"
        />
        <BottomNavigationAction
          label="Sala 2-5"
          value="nearby"
          icon={<FoundationIcon />}
          component={Link}
          to="/sala25"
        />
        <BottomNavigationAction
          label="Bienestar"
          value="folder"
          icon={<BedroomBabyIcon />}
          component={Link}
          to="/bienestar"
        />
      </BottomNavigation> */}

      <Paper
        sx={{
          width: 500,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Reservas"
            value="reservas"
            icon={<WindowIcon />}
            component={Link}
            to="/"
          />
          <BottomNavigationAction
            label="Auditorio"
            value="recents"
            icon={<CameraOutdoorIcon />}
            component={Link}
            to="/auditorio"
          />
          <BottomNavigationAction
            label="Sala 2-4"
            value="favorites"
            icon={<FoundationIcon />}
            component={Link}
            to="/sala24"
          />
          <BottomNavigationAction
            label="Sala 2-5"
            value="nearby"
            icon={<FoundationIcon />}
            component={Link}
            to="/sala25"
          />
          <BottomNavigationAction
            label="Bienestar"
            value="folder"
            icon={<BedroomBabyIcon />}
            component={Link}
            to="/bienestar"
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
