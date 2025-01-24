import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";

const Alertita = (alertType: string) => {
  // const [alertType, setAlertType] = useState<
  //   "success" | "info" | "warning" | "error" | null
  // >(null);

  const renderAlert = () => {
    switch (alertType) {
      case "success":
        return (
          <Alert severity="success">
            <AlertTitle>Success</AlertTitle>
            Reunión eliminada exitosamente
          </Alert>
        );
      case "info":
        return (
          <Alert severity="info">
            <AlertTitle>Info</AlertTitle>
            ¿Está seguro de que desea eliminar la reunión?
          </Alert>
        );
      case "warning":
        return (
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            Este es un alerta de advertencia con un título cauteloso.
          </Alert>
        );
      case "error":
        return (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Este es un alerta de error con un título aterrador.
          </Alert>
        );
      default:
        return null;
    }
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {renderAlert()}
    </Stack>
  );
};

export default Alertita;
