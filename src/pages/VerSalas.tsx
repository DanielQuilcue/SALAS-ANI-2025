import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/joy/Typography";

import Container from "@mui/material/Container";

import CardMedia from "@mui/material/CardMedia";
import CardMain from "../components/Card/CardMain";

function VerSalas() {
  const today = new Date();

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: 50 }}
              image="https://www.ani.gov.co/sites/all/themes/bootstrap_ani/images/logoani.svg"
              alt="Logo ANI"
            />

            <Typography level="h1">SALAS ANI {today.getFullYear()}</Typography>
          </Toolbar>
        </Container>
      </AppBar>

      <CardMain />
      {/* <Navigation /> */}
    </>
  );
}
export default VerSalas;
