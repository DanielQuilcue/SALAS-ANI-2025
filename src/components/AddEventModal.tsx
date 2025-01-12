import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from "react";
import {
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  Autocomplete,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { EventFormData, ITodo } from "./EventCalendar";

interface IProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  eventFormData: EventFormData;
  setEventFormData: Dispatch<SetStateAction<EventFormData>>;
  onAddEvent: (e: MouseEvent<HTMLButtonElement>) => void;
  todos: ITodo[];
}

const AddEventModal = ({
  open,
  handleClose,
  eventFormData,
  setEventFormData,
  onAddEvent,
  todos,
}: IProps) => {
  const { description } = eventFormData;

  const onClose = () => handleClose();

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEventFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTodoChange = (e: React.SyntheticEvent, value: ITodo | null) => {
    setEventFormData((prevState) => ({
      ...prevState,
      todoId: value?._id,
    }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Crear Reunión</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {/* To add a event, please fill in the information below. */}
          {/* Para agregar un evento, complete la siguiente información. */}
        </DialogContentText>
        <Box component="form">
          <TextField
            name="description"
            value={description}
            margin="dense"
            id="description"
            label="Nombre de la reunión"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onChange}
          />
          <TextField
            name="pleople"
            // value={description}
            margin="dense"
            id="pleople"
            label="Persona responsable"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onChange}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel id="demo-simple-select-autowidth-label">
              A qué Vicepresidencia u Oficina pertenece?
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              // value={age}
              // onChange={onChange}
              margin="dense"
              autoWidth
              label="A qué Vicepresidencia u Oficina perteneces
"
            >
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              <MenuItem value={20}>Presidencia</MenuItem>
              <MenuItem value={21}>Oficina de Control Interno</MenuItem>
              <MenuItem value={22}>Oficina de Comunicaciones</MenuItem>
              <MenuItem value={22}>
                Vp. de Planeación, Riesgos y Entorno
              </MenuItem>
              <MenuItem value={22}>Vp. Jurídica</MenuItem>
              <MenuItem value={22}>Vp. de Estructuración</MenuItem>
              <MenuItem value={22}>Vp. de Gestión Corporativa</MenuItem>
              <MenuItem value={22}>Vp. Ejecutiva</MenuItem>
              <MenuItem value={22}>Vp. de Gestión Contractual</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            onChange={handleTodoChange}
            disablePortal
            id="combo-box-demo"
            options={todos}
            sx={{ marginTop: 4 }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label="Tipo reunión" />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancelar
        </Button>
        {/* <Button
          disabled={description === ""}
          color="success"
          onClick={onAddEvent}
        >
          Agregar
        </Button> */}
        <Button
          disabled={description === ""}
          onClick={onAddEvent}
          variant="contained"
          color="success"
        >
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddEventModal;
