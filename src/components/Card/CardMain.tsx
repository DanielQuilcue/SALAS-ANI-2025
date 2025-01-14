import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardActions from "@mui/joy/CardActions";
import Typography from "@mui/joy/Typography";
import Calendar from "../../assets/calendar.svg";
import Avatar from "@mui/joy/Avatar";
import { Grid } from "@mui/joy";
import { UseFetchData } from "../../hook/useFetchData";
import { Box } from "@mui/material";

export default function CardMain() {
  const { data, loading, error } = UseFetchData("salas");

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{ display: "flex", justifyContent: "center", mt: 3 }}
    >
      {data.map((item) => (
        <Card
          key={item.id}
          variant="solid"
          color="primary"
          invertedColors
          sx={{ mx: 2, mt: 2, width: 400 }}
        >
          <CardContent orientation="horizontal">
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
                <Typography level="body-md">Reunion</Typography>
              </Box>

              <Typography level="h2">{item.meeting}</Typography>
              <Typography level="h4">{item.vicepresidency}</Typography>
            </CardContent>
          </CardContent>
          <CardActions
            sx={{
              mx: "auto",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button variant="soft" size="sm">
              {new Date(item.start.seconds * 1000).toLocaleTimeString()}
            </Button>
            <Button variant="solid" size="sm">
              {new Date(item.end.seconds * 1000).toLocaleTimeString()}
            </Button>
          </CardActions>
        </Card>
      ))}
    </Grid>
  );
}
