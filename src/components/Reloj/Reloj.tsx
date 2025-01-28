import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";

export default function Reloj() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <Card variant="solid" color="primary" invertedColors>
      <CardContent orientation="horizontal">
        <CardContent>
          <Typography level="h3">Reservas para: {formattedDate}</Typography>
        </CardContent>
      </CardContent>
      <CardActions>
        <Button
          variant="soft"
          size="sm"
          sx={{ backgroundColor: "#7f7f7f", color: "white" }}
        >
          Auditorio
        </Button>
        <Button
          variant="solid"
          size="sm"
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
          sx={{
            backgroundColor: "#00b050",
            color: "white",
          }}
        >
          Bienestar
        </Button>
      </CardActions>
    </Card>
  );
}
