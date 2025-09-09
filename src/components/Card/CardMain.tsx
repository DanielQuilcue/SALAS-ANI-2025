import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import Calendar from "../../assets/calendar.svg";
import Avatar from "@mui/joy/Avatar";
import { Grid } from "@mui/joy";
import { UseFetchData } from "../../hook/UseFetchData.tsx";
import { Box, Container, IconButton } from "@mui/material";
import { useState } from "react";
import { PacmanLoader } from "react-spinners";
import Navigation from "../Navigation/Navigation.tsx";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Today,
  Home,
} from "@mui/icons-material";

export default function CardMain() {
  const { data, loading, error } = UseFetchData("salas");
  const [filter, setFilter] = useState<string>("Todos");
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date());

  const handleTabChange = (value: string) => {
    setFilter(value);
  };

  const handleDiaAnterior = () => {
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setDate(nuevaFecha.getDate() - 1);
    setFechaSeleccionada(nuevaFecha);
  };

  const handleDiaSiguiente = () => {
    const nuevaFecha = new Date(fechaSeleccionada);
    nuevaFecha.setDate(nuevaFecha.getDate() + 1);
    setFechaSeleccionada(nuevaFecha);
  };

  const handleHoy = () => {
    setFechaSeleccionada(new Date());
  };

  const handleVolverTodos = () => {
    setFilter("Todos");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <PacmanLoader color="#d7723f" size={30} />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const getCardColor = (room: string) => {
    switch (room) {
      case "Auditorio":
        return "#7f7f7f";
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

  // Formatear fecha seleccionada
  const fechaFormateada = fechaSeleccionada.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Filtrar datos por sala y fecha (aquí puedes agregar lógica de filtrado por fecha si es necesario)
  const filteredData =
    filter === "Todos" ? data : data.filter((item) => item.room === filter);

  // Componente de navegación personalizada con colores diferentes
  const NavigationPersonalizada = () => (
    <Card variant="solid" color="primary" invertedColors sx={{ mb: 2 }}>
      <CardContent orientation="horizontal">
        <CardContent
          sx={{
            flex: 1,
            alignItems: "center",
            textAlign: "center",
          }}
        >
          {/* <Typography level="h4" sx={{ color: "white", mb: 2 }}>
            Reservas para: {fechaFormateada}
          </Typography> */}

          {/* Navegación de días */}
          {/* <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <IconButton
              onClick={handleDiaAnterior}
              sx={{
                backgroundColor: "#FF6B6B",
                color: "white",
                "&:hover": { backgroundColor: "#FF5252" },
              }}
            >
              <ArrowBackIos />
            </IconButton>

            <Button
              variant="solid"
              onClick={handleHoy}
              startDecorator={<Today />}
              sx={{
                backgroundColor: "#4ECDC4",
                color: "white",
                "&:hover": { backgroundColor: "#26A69A" },
                minWidth: "120px",
              }}
            >
              Hoy
            </Button>

            <IconButton
              onClick={handleDiaSiguiente}
              sx={{
                backgroundColor: "#45B7D1",
                color: "white",
                "&:hover": { backgroundColor: "#2196F3" },
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box> */}
        </CardContent>
      </CardContent>

      <CardActions>
        <Button
          variant="solid"
          size="md"
          onClick={handleVolverTodos}
          sx={{
            backgroundColor: "#FFA726",
            color: "white",
            "&:hover": { backgroundColor: "#FF9800" },
          }}
        >
          Ver todas las Salas
        </Button>
      </CardActions>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        <Button
          variant="soft"
          size="sm"
          onClick={() => setFilter("Auditorio")}
          sx={{
            backgroundColor: "#7f7f7f",
            color: "white",
            "&:hover": { backgroundColor: "#666" },
          }}
        >
          Auditorio
        </Button>
        <Button
          variant="solid"
          size="sm"
          onClick={() => setFilter("Sala 2-4")}
          sx={{
            backgroundColor: "#0070c0",
            color: "white",
            "&:hover": { backgroundColor: "#005a9e" },
          }}
        >
          Sala 1
        </Button>
        <Button
          variant="solid"
          size="sm"
          onClick={() => setFilter("Sala 2-5")}
          sx={{
            backgroundColor: "#ff6600",
            color: "white",
            "&:hover": { backgroundColor: "#e55a00" },
          }}
        >
          Sala 2
        </Button>
        <Button
          variant="solid"
          size="sm"
          onClick={() => setFilter("Bienestar")}
          sx={{
            backgroundColor: "#00b050",
            color: "white",
            "&:hover": { backgroundColor: "#009640" },
          }}
        >
          Bienestar
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Box
      sx={{
        pb: 15, // Aumentado el padding inferior para evitar que el navegador tape las tarjetas
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Siempre mostrar la navegación personalizada */}
      <NavigationPersonalizada />

      <Grid
        container
        spacing={{ xs: 2, sm: 8, md: 12 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 1,
          // Removido maxHeight y overflowY para quitar el scroll
        }}
      >
        {filteredData.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              textAlign: "center",
              gap: 3,
            }}
          >
            <Typography
              level="h3"
              sx={{
                color: "#666",
                mb: 2,
              }}
            >
              📅 No hay reuniones programadas
            </Typography>

            <Typography
              level="body-lg"
              sx={{
                color: "#888",
                mb: 3,
                maxWidth: "400px",
              }}
            >
              {filter === "Todos"
                ? `No se encontraron reuniones para el ${fechaFormateada}`
                : `No hay reuniones programadas en ${filter} para esta fecha`}
            </Typography>

            <Box
              sx={{
                display: "flex",
                gap: 2,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              {filter !== "Todos" && (
                <Button
                  variant="solid"
                  onClick={handleVolverTodos}
                  startDecorator={<Home />}
                  sx={{
                    backgroundColor: "#4ECDC4",
                    color: "white",
                    "&:hover": { backgroundColor: "#26A69A" },
                  }}
                >
                  Ver Todas las Salas
                </Button>
              )}

              <Button
                variant="outlined"
                onClick={handleHoy}
                startDecorator={<Today />}
                sx={{
                  borderColor: "#d7723f",
                  color: "#d7723f",
                  "&:hover": {
                    backgroundColor: "#d7723f",
                    color: "white",
                  },
                }}
              >
                Ir a Hoy
              </Button>
            </Box>
          </Box>
        ) : (
          filteredData.map((item) => {
            const startTime = item.start
              ? new Date(item.start.seconds * 1000).toLocaleTimeString(
                  "es-ES",
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )
              : "Hora no disponible";
            const endTime = item.end
              ? new Date(item.end.seconds * 1000).toLocaleTimeString("es-ES", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "Hora no disponible";

            return (
              <Card
                key={item.id}
                variant="solid"
                invertedColors
                sx={{
                  mx: 3,
                  mt: 3,
                  width: { xs: "90%", sm: 350 },
                  backgroundColor: getCardColor(item.room),
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 12px 35px rgba(0,0,0,0.25)",
                  },
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
                        alignItems: "center",
                        mb: 1,
                      }}
                    >
                      <Typography level="body-md" sx={{ fontWeight: "bold" }}>
                        {/* 👤 {item.people} */}
                        {item.people}
                      </Typography>
                      <Button
                        variant="soft"
                        size="sm"
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.2)",
                          color: "white",
                        }}
                      >
                        {/* 📍 {item.room} */}
                        {item.room}
                      </Button>
                    </Box>

                    <Typography
                      level="h3"
                      sx={{
                        mb: 0.5,
                        fontSize: "1.1rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.meeting}
                    </Typography>
                    <Typography level="body-sm" sx={{ opacity: 0.9 }}>
                      🏢 {item.vicepresidency}
                    </Typography>
                  </CardContent>
                </CardContent>
                <CardActions
                  sx={{
                    mx: "auto",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="soft"
                    size="sm"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.2)",
                      color: "white",
                    }}
                  >
                    ⏰ {startTime}
                  </Button>
                  <Button
                    variant="solid"
                    size="sm"
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.3)",
                      color: "white",
                    }}
                  >
                    ⏳ {endTime}
                  </Button>
                </CardActions>
              </Card>
            );
          })
        )}
      </Grid>
    </Box>
  );
}
