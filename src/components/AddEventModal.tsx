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
  SelectChangeEvent,
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
  const { meeting, people, vicepresidency } = eventFormData;
  const onClose = () => handleClose();

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setEventFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const onChangeSelect = (event: SelectChangeEvent<string>) => {
    setEventFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTodoChange = (value: ITodo | null) => {
    setEventFormData((prevState) => ({
      ...prevState,
      todo: value ?? undefined, // Usar undefined en lugar de null
      todoId: value?._id || "", // Puedes seguir guardando el todoId si lo necesitas
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
            name="meeting"
            value={meeting}
            margin="dense"
            id="meeting"
            label="Nombre de la reunión"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onChangeInput}
          />
          <TextField
            name="people"
            value={people}
            margin="dense"
            id="people"
            label="Persona responsable"
            type="text"
            fullWidth
            variant="outlined"
            onChange={onChangeInput}
          />

          <FormControl fullWidth margin="dense">
            <InputLabel id="demo-simple-select-autowidth-label">
              A qué Vicepresidencia u Oficina pertenece?
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={vicepresidency}
              onChange={onChangeSelect}
              margin="dense"
              autoWidth
              label="Vicepresidencia u Oficina perteneces"
              name="vicepresidency"
            >
              <MenuItem value="Presidencia">Presidencia</MenuItem>
              <MenuItem value="Oficina de Control Interno">
                Oficina de Control Interno
              </MenuItem>
              <MenuItem value="Oficina de Comunicaciones">
                Oficina de Comunicaciones
              </MenuItem>
              <MenuItem value="Vp. de Planeación, Riesgos y Entorno">
                Vp. de Planeación, Riesgos y Entorno
              </MenuItem>
              <MenuItem value="Vp. Jurídica">Vp. Jurídica</MenuItem>
              <MenuItem value="Vp. de Estructuración">
                Vp. de Estructuración
              </MenuItem>
              <MenuItem value="Vp. de Gestión Corporativa">
                Vp. de Gestión Corporativa
              </MenuItem>
              <MenuItem value="Vp. Ejecutiva">Vp. Ejecutiva</MenuItem>
              <MenuItem value="Vp. de Gestión Contractual">
                Vp. de Gestión Contractual
              </MenuItem>
              <MenuItem value="Sindicato - SÉANI">Sindicato (SÉANI)</MenuItem>
            </Select>
          </FormControl>
          <Autocomplete
            onChange={(_event, value) => handleTodoChange(value)}
            disablePortal
            id="combo-box-demo"
            options={todos}
            sx={{ marginTop: 4 }}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label="Tipo reunión" />
            )}
          />

          {/* <Autocomplete
            onChange={handleTodoChange}
            options={defaultTodos}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} label="Tipo reunión" />
            )}
          /> */}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>
          Cancelar
        </Button>

        <Button
          disabled={meeting === ""}
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
