import { useState, Dispatch, SetStateAction, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import { HexColorPicker } from "react-colorful";
import { ITodo } from "./EventCalendar";
import { generateId } from "../utils/inde";

interface IProps {
  open: boolean;
  handleClose: Dispatch<SetStateAction<void>>;
  todos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

// Define las categorías predeterminadas
const defaultTodos: ITodo[] = [
  { _id: generateId(), color: "#ee3731", title: "Audiencia" },
  { _id: generateId(), color: "#4caf50", title: "Capacitación, taller, curso" },
  { _id: generateId(), color: "#2196f3", title: "Charla" },
  { _id: generateId(), color: "#fbff6f", title: "Reunión sencilla" },
  { _id: generateId(), color: "#9876fa", title: "Mesa técnica" },
  { _id: generateId(), color: "#f89944", title: "Socialización" },
  { _id: generateId(), color: "#f361c6", title: "Otros" },
];

export const AddTodoModal = ({
  open,
  handleClose,
  todos,
  setTodos,
}: IProps) => {
  const [color, setColor] = useState("#b32aa9");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (todos.length === 0) {
      // Inicializa las categorías automáticamente después de 2 segundos
      const timer = setTimeout(() => {
        setTodos(defaultTodos);
      }, 2000);

      // Limpia el temporizador al desmontar el componente
      return () => clearTimeout(timer);
    }
  }, [todos, setTodos]);

  const onAddTodo = () => {
    setTitle("");
    setTodos([
      ...todos,
      {
        _id: generateId(),
        color,
        title,
      },
    ]);
  };

  const onDeletetodo = (_id: string) =>
    setTodos(todos.filter((todo) => todo._id !== _id));

  const onClose = () => handleClose();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Agregar Categoría</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Crea las categorías para agregarlo a tu Calendario.{" "}
        </DialogContentText>
        <Box>
          <TextField
            name="title"
            autoFocus
            margin="dense"
            id="title"
            label="Titulo"
            type="text"
            fullWidth
            sx={{ mb: 6 }}
            required
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <HexColorPicker color={color} onChange={setColor} />
            <Box
              sx={{ height: 80, width: 80, borderRadius: 1 }}
              className="value"
              style={{ backgroundColor: color }}
            ></Box>
          </Box>
          <Box>
            <List sx={{ marginTop: 3 }}>
              {todos.map((todo) => (
                <ListItem
                  key={todo._id}
                  secondaryAction={
                    <IconButton
                      onClick={() => onDeletetodo(todo._id)}
                      color="error"
                      edge="end"
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <Box
                    sx={{
                      height: 40,
                      width: 40,
                      borderRadius: 1,
                      marginRight: 1,
                    }}
                    className="value"
                    style={{ backgroundColor: todo.color }}
                  ></Box>
                  <ListItemText primary={todo.title} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions sx={{ marginTop: 2 }}>
        <Button
          sx={{ marginRight: 2 }}
          variant="contained"
          color="error"
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onAddTodo()}
          disabled={title === "" || color === ""}
          sx={{ marginRight: 2 }}
          variant="contained"
          color="success"
        >
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
