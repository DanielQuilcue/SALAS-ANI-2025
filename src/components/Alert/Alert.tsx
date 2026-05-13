import Box from "@mui/joy/Box";
import Alert from "@mui/joy/Alert";

export default function Alertita() {
  return (
    <Box sx={{ width: "100%" }}>
      <Alert color="neutral" size="lg" variant="solid">
        Aún no se ha programado ninguna reunión para hoy.
      </Alert>
    </Box>
  );
}
