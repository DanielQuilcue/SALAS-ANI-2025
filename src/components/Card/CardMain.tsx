import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import Calendar from "../../assets/calendar.svg";
import Avatar from "@mui/joy/Avatar";
import { Grid } from "@mui/joy";
import { UseFetchData } from "../../hook/UseFetchData.tsx";
import { Box } from "@mui/material";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";

export default function CardMain() {
  const { data, loading, error } = UseFetchData("salas");
  const [filter, setFilter] = useState<string>("Todos");

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
          width: "90vw",
        }}
      >
        <PacmanLoader color="#d7723f" size={30} />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Función para determinar el color según el valor de room
  const getCardColor = (room: string) => {
    switch (room) {
      case "Auditorio":
        return "#7f7f7f"; // Cambia según los colores que quieras usar
      case "Sala 2-4":
        return "#0070c0";
      case "Sala 2-5":
        return "#ff6600";
      case "Bienestar":
        return "#00b050";
      default:
        return "#0b6bcb";
    }
  };

  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  // Filtrar datos según el filtro seleccionado
  const filteredData =
    filter === "Todos" ? data : data.filter((item) => item.room === filter);

  return (
    <Box
      sx={{
        pb: 10, // Aumenta el espacio en la parte inferior según sea necesario
        minHeight: "100vh",
      }}
    >
      <Card variant="solid" color="primary" invertedColors>
        <CardContent orientation="horizontal">
          <CardContent
            sx={{
              flex: "flex",
              alignItems: "center",
            }}
          >
            <Typography level="h3">Reservas para: {formattedDate}</Typography>
          </CardContent>
        </CardContent>
        <CardActions>
          <Button variant="solid" size="md" onClick={() => setFilter("Todos")}>
            Ver todas las Salas
          </Button>
        </CardActions>
        <CardActions
          sx={{
            flex: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="soft"
            size="sm"
            onClick={() => setFilter("Auditorio")}
            sx={{ backgroundColor: "#7f7f7f", color: "white" }}
          >
            Auditorio
          </Button>
          <Button
            variant="solid"
            size="sm"
            onClick={() => setFilter("Sala 2-4")}
            sx={{
              backgroundColor: "blue",
              color: "white",
            }}
          >
            Sala 2-4
          </Button>
          <Button
            variant="solid"
            size="sm"
            onClick={() => setFilter("Sala 2-5")}
            sx={{
              backgroundColor: "#ff6600",
              color: "white",
            }}
          >
            Sala 2-5
          </Button>
          <Button
            variant="solid"
            size="sm"
            onClick={() => setFilter("Bienestar")}
            sx={{
              backgroundColor: "#00b050",
              color: "white",
            }}
          >
            Bienestar
          </Button>
        </CardActions>
      </Card>
      {/* </Grid> */}

      <Grid
        container
        spacing={{ xs: 2, sm: 8, md: 12 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 1,
          maxHeight: "100vh",
          overflowY: "auto",
        }}
      >
        {filteredData.map((item) => {
          // Validar si start y end están definidos antes de usarlos
          const startTime = item.start
            ? new Date(item.start.seconds * 1000).toLocaleTimeString()
            : "Hora no disponible";
          const endTime = item.end
            ? new Date(item.end.seconds * 1000).toLocaleTimeString()
            : "Hora no disponible";

          return (
            <Card
              key={item.id}
              variant="solid"
              invertedColors
              sx={{
                mx: 3,
                mt: 3,
                width: { xs: "80%", sm: 350 },
                backgroundColor: getCardColor(item.room),
              }}
            >
              <CardContent
                orientation="horizontal"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Avatar
                  alt="Calendar Icon"
                  src={Calendar}
                  sx={{
                    "--Avatar-size": "66px",
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography level="body-md">{item.people}</Typography>
                    <Button variant="soft" size="sm">
                      {item.room}
                    </Button>
                  </Box>

                  <Typography level="h3">{item.meeting}</Typography>
                  <Typography level="h4">{item.vicepresidency}</Typography>
                </CardContent>
              </CardContent>
              <CardActions
                sx={{
                  mx: "auto",
                  justifyContent: "space-between",
                }}
              >
                <Button variant="soft" size="sm">
                  {startTime}
                </Button>
                <Button variant="solid" size="sm">
                  {endTime}
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </Grid>
    </Box>
  );
}
