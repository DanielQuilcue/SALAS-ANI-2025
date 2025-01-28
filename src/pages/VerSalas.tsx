// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/joy/Typography";

// import Container from "@mui/material/Container";

// import CardMain from "../components/Card/CardMain";
// import { CardMedia } from "@mui/material";
// // import Navigation from "../components/Navigation/Navigation";

// function VerSalas() {
//   const today = new Date();
//   const formattedDate = today.toLocaleDateString("es-ES", {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <>
//       <AppBar
//         position="static"
//         sx={{
//           backgroundColor: "#025dc3",
//         }}
//       >
//         <Container maxWidth="xl">
//           <Toolbar
//             disableGutters
//             sx={{
//               alignItems: "center",
//               alignContent: "space-between",
//             }}
//           >
//             <CardMedia
//               component="img"
//               sx={{ width: 50 }}
//               image="https://www.ani.gov.co/sites/all/themes/bootstrap_ani/images/logoani.svg"
//               alt="Logo ANI"
//             />

//             <Typography
//               level="h3"
//               sx={{
//                 color: "white",
//               }}
//             >
//               {/* Programación para el día de hoy {formattedDate} */}
//               SALAS ANI 2025
//             </Typography>
//           </Toolbar>
//         </Container>
//       </AppBar>

//       <CardMain />
//       {/* <Navigation /> */}
//     </>
//   );
// }

// export default VerSalas;

import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardMain from "../components/Card/CardMain";
import Typography from "@mui/joy/Typography";

export default function VerSalas() {
  return (
    <>
      <CssBaseline />
      <AppBar>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 16px",
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 50, marginRight: "16px" }}
            image="https://www.ani.gov.co/sites/all/themes/bootstrap_ani/images/logoani.svg"
            alt="Logo ANI"
          />
          <Typography
            level="h3"
            sx={{ flexGrow: 1, textAlign: "center", color: "white" }}
          >
            SALAS ANI 2025
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container>
        <Box sx={{ my: 2 }}>
          {/* <Reloj /> */}
          <CardMain />
        </Box>
      </Container>
    </>
  );
}
