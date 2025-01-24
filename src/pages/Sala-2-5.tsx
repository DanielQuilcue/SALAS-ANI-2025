import { useState, MouseEvent, useEffect } from "react";
import { Box, Card, CardContent, CardHeader, Container } from "@mui/material";

import {
  Calendar,
  type Event,
  dateFnsLocalizer,
  momentLocalizer,
} from "react-big-calendar";

import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
// import { es } from "date-fns/locale";
// import enUS from "date-fns/locale/en-US";

import "react-big-calendar/lib/css/react-big-calendar.css";

import EventInfo from "../components/EventInfo";
import AddEventModal from "../components/AddEventModal";
import EventInfoModal from "../components/EventInfoModal";
import { AddTodoModal } from "../components/AddTodoModal";
import AddDatePickerEventModal from "../components/AddDatePickerEventModal";
import moment from "moment";
// import { Today } from "@mui/icons-material";

import "moment-timezone"; // or 'moment-timezone/builds/moment-timezone-with-data[-datarange].js'. See their docs
import { generateId } from "../utils/inde";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import Swal from "sweetalert2";

moment.tz.setDefault("America/New_York");

const locales = momentLocalizer(moment); // or globalizeLocalizer

// const locales = {
//   // "en-US": enUS,
//   "es-CO": es,
// };

// const locales = moment.locale();

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export interface ITodo {
  _id: string;
  title: string;
  color?: string;
}

export interface IEventInfo extends Event {
  _id: string;
  // description: string;
  meeting: string;
  color?: string;
  todoId?: string;
  todo?: ITodo; // Cambié aquí, ahora es un objeto de tipo ITodo

  // todo?: string;
  people: string;
  start?: Date;
  end?: Date;
  room: string;
  vicepresidency: string;
}

export interface EventFormData {
  // description: string;
  todoId?: string;
  todo?: ITodo;
  meeting: string;
  people: string;
  vicepresidency: string;
  room: string;
  color: string;
  start?: Date;
  end?: Date;
}

export interface DatePickerEventFormData {
  // description: string;
  meeting: string;
  people: string;
  vicepresidency: string;
  room: string;
  color: string;
  todo?: ITodo;
  todoId?: string;
  allDay: boolean;
  start?: Date;
  end?: Date;
}

const initialEventFormState: EventFormData = {
  // description: "",
  meeting: "",
  todoId: undefined,
  todo: undefined,
  people: "",
  vicepresidency: "",
  room: "",
  color: "",
  start: undefined,
  end: undefined,
};

const initialDatePickerEventFormData: DatePickerEventFormData = {
  // description: "",
  meeting: "",
  people: "",
  vicepresidency: "",
  room: "",
  todoId: undefined,
  todo: undefined,
  allDay: false,
  start: undefined,
  end: undefined,
  color: "",
};
const Sala25 = () => {
  const [openSlot, setOpenSlot] = useState(false);
  const [openDatepickerModal, setOpenDatepickerModal] = useState(false);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(
    null
  );

  const [eventInfoModal, setEventInfoModal] = useState(false);

  const [events, setEvents] = useState<IEventInfo[]>([]);
  const [todos, setTodos] = useState<ITodo[]>([]);

  const [eventFormData, setEventFormData] = useState<EventFormData>(
    initialEventFormState
  );

  const [datePickerEventFormData, setDatePickerEventFormData] =
    useState<DatePickerEventFormData>(initialDatePickerEventFormData);

  const handleSelectSlot = (event: Event) => {
    setOpenSlot(true);
    setCurrentEvent(event);
  };

  const handleSelectEvent = (event: IEventInfo) => {
    setCurrentEvent(event);
    setEventInfoModal(true);
  };

  const handleClose = () => {
    setEventFormData(initialEventFormState);
    setOpenSlot(false);
  };

  const handleDatePickerClose = () => {
    setDatePickerEventFormData(initialDatePickerEventFormData);
    setOpenDatepickerModal(false);
  };

  const onAddEvent = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data: IEventInfo = {
      ...eventFormData,
      _id: generateId(),
      start: currentEvent?.start,
      end: currentEvent?.end,
      todoId: eventFormData.todoId || "", // Si todoId es undefined, asignamos null
      room: "Salas 2-5",
      todo: eventFormData.todo,
    };

    try {
      // Agregar el nuevo evento a Firestore
      await addDoc(collection(db, "salas"), data);

      // Mostrar alerta de éxito usando SweetAlert2
      Swal.fire({
        title: "Evento creado",
        text: "La reunión se creó exitosamente.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Actualizar el estado local con el nuevo evento
      setEvents([...events, data]);
      handleClose();
    } catch (error) {
      console.error("Error al agregar evento a Firebase: ", error);

      // Mostrar alerta de error usando SweetAlert2
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al crear la reunión.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };
  const onDeleteEvent = async () => {
    const eventToDelete = currentEvent as IEventInfo;

    // Mostrar alerta de confirmación
    Swal.fire({
      title: "¿Está seguro de que desea eliminar la reunión?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminarla",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const eventDocRef = doc(db, "salas", eventToDelete._id);
          await deleteDoc(eventDocRef);

          setEvents((prevEvents) =>
            prevEvents.filter((e) => e._id !== eventToDelete._id)
          );

          console.log("Evento eliminado exitosamente");

          // Mostrar alerta de éxito
          Swal.fire({
            title: "¡Eliminado!",
            text: "Reunión eliminada exitosamente.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // Recarga la página después de que se cierre la alerta
            window.location.reload();
          });
        } catch (error) {
          console.error("Error al eliminar evento en Firebase: ", error);

          // Mostrar alerta de error
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al eliminar la reunión.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    });

    setEventInfoModal(false);
  };

  const onAddEventFromDatePicker = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const addHours = (
      date: Date | undefined,
      hours: number
    ): Date | undefined => {
      if (date) {
        const newDate = new Date(date); // Crear una nueva instancia de Date
        newDate.setHours(newDate.getHours() + hours);
        return newDate; // Retornar el nuevo objeto Date
      }
      return undefined;
    };

    const setMinToZero = (date: Date): Date => {
      date.setSeconds(0);
      return date;
    };

    const data: IEventInfo = {
      ...datePickerEventFormData,
      _id: generateId(),
      start: datePickerEventFormData.start
        ? setMinToZero(datePickerEventFormData.start)
        : undefined,
      end: datePickerEventFormData.allDay
        ? addHours(datePickerEventFormData.start, 12)
        : datePickerEventFormData.end
          ? setMinToZero(datePickerEventFormData.end)
          : undefined,
    };

    const newEvents = [...events, data];

    setEvents(newEvents);
    setDatePickerEventFormData(initialDatePickerEventFormData);
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "salas"));
        const fetchedEvents: IEventInfo[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.room === "Sala 2-5") {
            fetchedEvents.push({
              _id: doc.id || "",
              meeting: data.meeting || "Sin título", // Valor predeterminado para `meeting`
              people: data.people || "Desconocido", // Valor predeterminado para `people`
              room: data.room, // Campo `room` ya validado
              vicepresidency: data.vicepresidency || "Sin vicepresidencia", // Valor predeterminado
              start: data.start?.toDate() || new Date(), // Convierte a Date o usa la fecha actual
              end: data.end?.toDate() || new Date(), // Convierte a Date o usa la fecha actual
              color: data.color || "#1976d2", // Valor predeterminado para color
              todo: data.todo || "Sin tarea", // Valor predeterminado para `todo`
              todoId: data.todoId || "", // Valor predeterminado para `todoId`
            });
          }
        });
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error al obtener eventos: ", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Box
      mt={2}
      mb={2}
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Card>
          <CardHeader title="Sala 2-5" />

          {/* <Divider />
          <Menu /> */}
          <CardContent>
            {/* <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <ButtonGroup
                size="large"
                variant="contained"
                aria-label="outlined primary button group"
              >
                <Button
                  onClick={() => setOpenDatepickerModal(true)}
                  size="small"
                  variant="contained"
                  sx={{ marginRight: 1 }} // Agrega espacio entre botones
                >
                  Reunion Rapida
                </Button>
                <Button
                  onClick={() => setOpenTodoModal(true)}
                  size="small"
                  variant="contained"
                >
                  Crear Categoria{" "}
                </Button>
              </ButtonGroup>
            </Box> */}
            <AddEventModal
              open={openSlot}
              handleClose={handleClose}
              eventFormData={eventFormData}
              setEventFormData={setEventFormData}
              onAddEvent={onAddEvent}
              todos={todos}
            />

            <AddDatePickerEventModal
              open={openDatepickerModal}
              handleClose={handleDatePickerClose}
              datePickerEventFormData={datePickerEventFormData}
              setDatePickerEventFormData={setDatePickerEventFormData}
              onAddEvent={onAddEventFromDatePicker}
              todos={todos}
            />
            <EventInfoModal
              open={eventInfoModal}
              handleClose={() => setEventInfoModal(false)}
              onDeleteEvent={onDeleteEvent}
              currentEvent={currentEvent as IEventInfo}
            />
            <AddTodoModal
              open={openTodoModal}
              handleClose={() => setOpenTodoModal(false)}
              todos={todos}
              setTodos={setTodos}
            />

            <Calendar
              localizer={localizer}
              events={events}
              onSelectEvent={handleSelectEvent}
              onSelectSlot={handleSelectSlot}
              selectable
              startAccessor="start"
              endAccessor="end"
              defaultView="week"
              components={{ event: EventInfo }}
              eventPropGetter={(event) => ({
                style: {
                  backgroundColor: event.color || "#1976d2",
                  borderColor: event.color || "#1976d2",
                },
              })}
              style={{ height: 900 }}
              min={new Date(2025, 0, 1, 7, 0, 0)} // 7:00 AM
              max={new Date(2025, 0, 1, 20, 0, 0)} // 7:00 PM
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Sala25;
