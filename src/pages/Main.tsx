import * as React from "react";
// import BottomNavigation from "@mui/material/BottomNavigation";
// import BottomNavigationAction from "@mui/material/BottomNavigationAction";
// import BedroomBabyIcon from "@mui/icons-material/BedroomBaby";
// import CameraOutdoorIcon from "@mui/icons-material/CameraOutdoor";
// import FoundationIcon from "@mui/icons-material/Foundation";

import CardMain from "../components/Card/CardMain";
// import { Box } from "@mui/material";

export default function Main() {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "10vh", // Por ejemplo, ocupa toda la altura de la ventana
        }}
      >
        <BottomNavigation
          sx={{ width: 500 }}
          value={value}
          onChange={handleChange}
        >
          <BottomNavigationAction
            label="Auditorio"
            value="recents"
            icon={<CameraOutdoorIcon />}
          />
          <BottomNavigationAction
            label="Sala 2-4"
            value="favorites"
            icon={<FoundationIcon />}
          />
          <BottomNavigationAction
            label="Sala 2-5"
            value="nearby"
            icon={<FoundationIcon />}
          />
          <BottomNavigationAction
            label="Bienestar"
            value="folder"
            icon={<BedroomBabyIcon />}
          />
        </BottomNavigation>
      </Box> */}
      <CardMain />
    </>
  );
}
