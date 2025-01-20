import { SetStateAction, MouseEvent, Dispatch } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  // DialogContentText,
  DialogTitle,
  Button,
  // Typography,
  // Chip,
  Divider,
  TextField,
  Box,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IEventInfo } from "./EventCalendar";

interface IProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  onDeleteEvent: (e: MouseEvent<HTMLButtonElement>) => void;
  currentEvent: IEventInfo | null;
}

const EventInfoModal = ({
  open,
  handleClose,
  onDeleteEvent,
  currentEvent,
}: IProps) => {
  const onClose = () => {
    handleClose();
  };

  console.log(currentEvent);
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>INFORMACION</DialogTitle>

      <DialogContent>
        {/* <DialogContentText> */}
        <Box component="form">
          <TextField
            sx={{ marginRight: 1 }}
            margin="dense"
            id="outlined-read-only-input"
            label="Nombre de la reunión"
            defaultValue={currentEvent?.meeting}
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            sx={{ marginRight: 1 }}
            margin="dense"
            id="outlined-read-only-input"
            label="Persona encargada"
            defaultValue={currentEvent?.people}
            InputProps={{
              readOnly: true,
            }}
          />
          <Divider>
            <AccessTimeIcon />
          </Divider>

          <TextField
            sx={{ marginRight: 1 }}
            margin="dense"
            id="outlined-read-only-input"
            label="Hora de inicio"
            color="success"
            focused
            defaultValue={currentEvent?.start?.toLocaleTimeString()}
            InputProps={{
              readOnly: true,
            }}
          />

          <TextField
            sx={{ marginRight: 1 }}
            margin="dense"
            id="outlined-read-only-input"
            label="Hora de fin"
            color="error"
            focused
            defaultValue={currentEvent?.end?.toLocaleTimeString()}
            InputProps={{
              readOnly: true,
            }}
          />
        </Box>
        <Divider></Divider>
        {/* <TextField
          sx={{ marginRight: 1, mx: "auto" }}
          margin="dense"
          id="outlined-read-only-input"
          label="Vicepresidencia"
          defaultValue={currentEvent?.vicepresidency}
          InputProps={{
            readOnly: true,
          }}
        /> */}
        {/* <Box component="form"></Box> */}
      </DialogContent>
      <DialogActions>
        <Button color="error" onClick={onClose}>
          Cancelar
        </Button>
        <Button color="info" onClick={onDeleteEvent}>
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventInfoModal;
