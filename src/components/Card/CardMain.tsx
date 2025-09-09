import { useState } from "react";
import { Box, Container, IconButton } from "@mui/material";
import { Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import {
  Menu as MenuIcon,
  NotificationsOutlined,
  KeyboardArrowDown,
  LocationOn,
  CalendarToday,
  AccessTime,
  Add,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";

interface Evento {
  id: string;
  titulo: string;
  sala: string;
  fecha: string;
  horaInicio: string;
  horaFin: string;
  color: string;
}

interface CalendarioTimelineProps {
  onMenuToggle?: () => void;
  eventos?: Evento[];
}

export default function CalendarioTimeline({
  onMenuToggle,
  eventos = [],
}: CalendarioTimelineProps) {
  const [mesSeleccionado, setMesSeleccionado] = useState("Agosto");
  // const [diaSeleccionado, setDiaSeleccionado] = useState(2);

  // Datos de ejemplo para los días
  const diasSemana = [
    { dia: "Sábado", fecha: 31, activo: false },
    { dia: "Domingo", fecha: 1, activo: false },
    { dia: "Lunes", fecha: 2, activo: true },
    { dia: "Martes", fecha: 3, activo: false },
  ];

  // Eventos de ejemplo
  const eventosEjemplo: Evento[] = [
    {
      id: "1",
      titulo: "Reunion 1",
      sala: "Auditorio",
      fecha: "Agosto 2, 2025",
      horaInicio: "08:00 AM",
      horaFin: "09:00 AM",
      color: "#FF7F50",
    },
    {
      id: "2",
      titulo: "Reunion 2",
      sala: "Auditorio",
      fecha: "Agosto 2, 2025",
      horaInicio: "08:00 AM",
      horaFin: "09:00 AM",
      color: "#8A7FFF",
    },
    {
      id: "3",
      titulo: "Reunion 3",
      sala: "Auditorio",
      fecha: "Agosto 2, 2025",
      horaInicio: "08:00 AM",
      horaFin: "09:00 AM",
      color: "#4CAF50",
    },
    {
      id: "4",
      titulo: "Reunion 4",
      sala: "Auditorio",
      fecha: "Agosto 2, 2025",
      horaInicio: "08:00 AM",
      horaFin: "09:00 AM",
      color: "#FFB6C1",
    },
  ];

  const eventosFinales = eventos.length > 0 ? eventos : eventosEjemplo;

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f5f5f5 0%, #e8e3ff 50%, #d4c5ff 100%)",
        position: "relative",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
          pt: 3,
        }}
      >
        <IconButton
          onClick={onMenuToggle}
          sx={{
            color: "#FF7F50",
            "& .MuiSvgIcon-root": {
              fontSize: "1.5rem",
            },
          }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            sx={{
              color: "#FF7F50",
              "& .MuiSvgIcon-root": {
                fontSize: "1.5rem",
              },
            }}
          >
            <NotificationsOutlined />
          </IconButton>

          <Dropdown>
            <MenuButton
              variant="solid"
              sx={{
                backgroundColor: "#8A7FFF",
                borderRadius: "20px",
                px: 3,
                py: 1,
                fontSize: "1rem",
                fontWeight: "bold",
                color: "white",
                border: "none",
                "&:hover": {
                  backgroundColor: "#7B68EE",
                },
              }}
              endDecorator={<KeyboardArrowDown />}
            >
              {mesSeleccionado}
            </MenuButton>
            <Menu>
              {meses.map((mes) => (
                <MenuItem key={mes} onClick={() => setMesSeleccionado(mes)}>
                  {mes}
                </MenuItem>
              ))}
            </Menu>
          </Dropdown>
        </Box>
      </Box>

      {/* Calendario de días */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 3,
          gap: 1,
        }}
      >
        <IconButton size="small" sx={{ color: "#FF7F50" }}>
          <ArrowBackIos />
        </IconButton>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flex: 1,
            justifyContent: "center",
            maxWidth: "400px",
          }}
        >
          {diasSemana.map((dia, index) => (
            <Box
              key={index}
              // onClick={() => setDiaSeleccionado(dia.fecha)}
              sx={{
                backgroundColor: dia.activo ? "#FF7F50" : "#2D2D2D",
                color: dia.activo ? "#000" : "#FFF",
                borderRadius: "20px",
                p: 2,
                minWidth: "80px",
                textAlign: "center",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Box
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: "bold",
                  mb: 0.5,
                }}
              >
                {dia.dia}
              </Box>
              <Box
                sx={{
                  fontSize: "2rem",
                  fontWeight: "bold",
                  lineHeight: 1,
                }}
              >
                {dia.fecha.toString().padStart(2, "0")}
              </Box>
            </Box>
          ))}
        </Box>

        <IconButton size="small" sx={{ color: "#FF7F50" }}>
          <ArrowForwardIos />
        </IconButton>
      </Box>

      {/* Timeline de eventos */}
      <Container
        maxWidth="sm"
        sx={{
          px: 3,
          pb: 10,
        }}
      >
        <Box sx={{ position: "relative" }}>
          {/* Línea vertical del timeline */}
          <Box
            sx={{
              position: "absolute",
              left: "60px",
              top: 0,
              bottom: 0,
              width: "3px",
              backgroundColor: "#ddd",
              zIndex: 0,
            }}
          />

          {eventosFinales.map((evento, index) => {
            const horas = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM"];
            const hora = horas[index] || "12:00 PM";

            return (
              <Box
                key={evento.id}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  mb: 4,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {/* Hora */}
                <Box
                  sx={{
                    minWidth: "80px",
                    fontSize: "0.9rem",
                    fontWeight: "bold",
                    color: "#666",
                    pt: 1,
                  }}
                >
                  {hora}
                </Box>

                {/* Punto del timeline */}
                <Box
                  sx={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: evento.color,
                    border: "3px solid white",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    mr: 3,
                    mt: 1,
                    zIndex: 2,
                    position: "relative",
                  }}
                />

                {/* Contenido del evento */}
                <Box
                  sx={{
                    flex: 1,
                    backgroundColor: "white",
                    borderRadius: "16px",
                    p: 3,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    border: `2px solid ${evento.color}20`,
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#333",
                      mb: 2,
                    }}
                  >
                    {evento.titulo}
                  </Box>

                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 1 }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocationOn sx={{ fontSize: "1rem", color: "#666" }} />
                      <Box sx={{ fontSize: "0.9rem", color: "#666" }}>
                        {evento.sala}
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarToday sx={{ fontSize: "1rem", color: "#666" }} />
                      <Box sx={{ fontSize: "0.9rem", color: "#666" }}>
                        {evento.fecha}
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTime sx={{ fontSize: "1rem", color: "#666" }} />
                      <Box sx={{ fontSize: "0.9rem", color: "#666" }}>
                        {evento.horaInicio} - {evento.horaFin}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>

      {/* Botón flotante */}
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "50%",
          transform: "translateX(50%)",
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8A7FFF 0%, #6B5FFF 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 25px rgba(138, 127, 255, 0.4)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            border: "4px solid #FF7F50",
            "&:hover": {
              transform: "translateX(50%) translateY(-5px) scale(1.1)",
              boxShadow: "0 12px 35px rgba(138, 127, 255, 0.6)",
            },
          }}
        >
          <Add sx={{ fontSize: "2rem", color: "white", fontWeight: "bold" }} />
        </Box>
      </Box>
    </Box>
  );
}
