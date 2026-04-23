import { useState } from "react";
import Swal from "sweetalert2";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useFetchByMonth } from "../hook/useFetchByMonth";
import { exportToExcel } from "../utils/exportCSV";

const MESES = [
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

const AÑOS = [2025, 2026];

export default function AdminPage() {
  const [year, setYear] = useState<number>(2025);
  const [month, setMonth] = useState<number>(0);

  const { data, loading } = useFetchByMonth("salas", year, month);

  const handleDownload = () => {
    if (!data || data.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Sin datos",
        text: "No hay información para ese mes",
      });
      return;
    }

    exportToExcel(data, `reporte_${year}_${month + 1}`);

    Swal.fire({
      icon: "success",
      title: "Descarga exitosa",
      text: "El archivo Excel fue generado",
    });
  };

  const sinDatos = !data || data.length === 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        mb={3}
        sx={{ color: "#1e3a5f" }}
      >
        ANI REPORTS{" "}
      </Typography>

      <Card elevation={3} sx={{ maxWidth: 380, borderRadius: 3 }}>
        <CardContent sx={{ p: 3 }}>
          {/* Header */}
          <Typography
            variant="h6"
            fontWeight={700}
            color="text.primary"
            mb={0.5}
          >
            Descargar Reporte
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Seleccione el periodo para descargar el archivo.
          </Typography>

          {/* Selects */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Mes</InputLabel>
              <Select
                value={month}
                label="Mes"
                onChange={(e) => setMonth(Number(e.target.value))}
              >
                {MESES.map((m, i) => (
                  <MenuItem key={i} value={i}>
                    {m}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small" fullWidth>
              <InputLabel>Año</InputLabel>
              <Select
                value={year}
                label="Año"
                onChange={(e) => setYear(Number(e.target.value))}
              >
                {AÑOS.map((a) => (
                  <MenuItem key={a} value={a}>
                    {a}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Contador */}
          <Typography
            variant="caption"
            color="text.secondary"
            display="block"
            mb={2}
          >
            {loading
              ? "Cargando datos..."
              : `${data?.length ?? 0} registro${data?.length !== 1 ? "s" : ""} encontrado${data?.length !== 1 ? "s" : ""}`}
          </Typography>

          {/* Botón */}
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleDownload}
            disabled={sinDatos || loading}
            startIcon={
              loading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <DownloadIcon />
              )
            }
            sx={{
              backgroundColor: "#1e3a5f",
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
              "&:hover": { backgroundColor: "#162d4a" },
              "&.Mui-disabled": {
                backgroundColor: "#e0e0e0",
                color: "#9e9e9e",
              },
            }}
          >
            {loading ? "Cargando..." : "Descargar Archivo"}
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
