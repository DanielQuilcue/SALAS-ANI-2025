import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/joy/Typography";

import Container from "@mui/material/Container";

import CardMain from "../components/Card/CardMain";
// import Navigation from "../components/Navigation/Navigation";

function VerSalas() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#025dc3",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {/* <CardMedia
              component="img"
              sx={{ width: 50 }}
              image="https://www.ani.gov.co/sites/all/themes/bootstrap_ani/images/logoani.svg"
              alt="Logo ANI"
            /> */}

            <Typography
              level="h3"
              sx={{
                color: "white",
              }}
            >
              Programación para el día de hoy {formattedDate}
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <CardMain />
      {/* <Navigation /> */}
    </>
  );
}

export default VerSalas;
