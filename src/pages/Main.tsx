import { useState, useEffect } from "react";

import CardMain from "../components/Card/CardMain";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import { Box } from "@mui/material";

export default function Main() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Actualiza cada 1 segundo

    return () => clearInterval(interval); // Limpia el intervalo al desmontar el componente
  }, []);

  return (
    <>
      <Box sx={{ mx: "auto", mt: 1 }}>
        <Card variant="outlined" sx={{}}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography level="h2" sx={{ fontSize: "xl", mb: 0.5 }}>
              La hora es: {currentTime.toLocaleTimeString()}
            </Typography>
            <Typography level="h2" sx={{ fontSize: "xl", mb: 0.5 }}>
              Del día: {currentTime.toLocaleDateString()}
            </Typography>
          </Box>
        </Card>
      </Box>
      <CardMain />
    </>
  );
}
