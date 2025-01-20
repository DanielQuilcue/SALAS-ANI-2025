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

import EventInfo from "./EventInfo";
import AddEventModal from "./AddEventModal";
import EventInfoModal from "./EventInfoModal";
import { AddTodoModal } from "./AddTodoModal";
import AddDatePickerEventModal from "./AddDatePickerEventModal";
import moment from "moment";
// import { Today } from "@mui/icons-material";

import "moment-timezone"; // or 'moment-timezone/builds/moment-timezone-with-data[-datarange].js'. See their docs

import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// import { useLocation } from "wouter";
import { generateId } from "../utils/inde";

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
  todo?: string;
  people: string;
  start?: Date;
  end?: Date;
  room: string;
  vicepresidency: string;
}

export interface EventFormData {
  // description: string;
  todoId?: string;
  todo?: string;
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
  todo?: string;
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

const EventCalendar = () => {
  const [openSlot, setOpenSlot] = useState(false);
  const [openDatepickerModal, setOpenDatepickerModal] = useState(false);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(
    null
  );

  // const location = useLocation();

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
      room: "Auditorio",
      color: eventFormData.todo?.color || "", // Obtener el color del todo seleccionado
    };

    console.log(data);
    try {
      await addDoc(collection(db, "salas"), data);

      alert("Evento agregado exitosamente");
    } catch (error) {
      console.error("Error al agregar evento a Firebase: ", error);
    }

    setEvents([...events, data]);
    handleClose();
  };

  const onAddEventFromDatePicker = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const addHours = (date: Date | undefined, hours: number) => {
      return date ? date.setHours(date.getHours() + hours) : undefined;
    };

    const setMinToZero = (date: any) => {
      date.setSeconds(0);

      return date;
    };

    const data: IEventInfo = {
      ...datePickerEventFormData,
      _id: generateId(),
      start: setMinToZero(datePickerEventFormData.start),
      end: datePickerEventFormData.allDay
        ? addHours(datePickerEventFormData.start, 12)
        : setMinToZero(datePickerEventFormData.end),
    };

    const newEvents = [...events, data];

    setEvents(newEvents);
    setDatePickerEventFormData(initialDatePickerEventFormData);
  };

  const onDeleteEvent = async () => {
    setEvents((prevEvents) =>
      prevEvents.filter(
        (e) => e.todoId !== (currentEvent as IEventInfo).todoId!
      )
    );

    // const docRef = doc(db, "salas", (currentEvent as IEventInfo).todoId!);
    // console.log("Documento a eliminar:", docRef);

    // try {
    //   // Asegúrate de que la llamada a deleteDoc esté ejecutándose
    //   await deleteDoc(docRef);

    //   console.log(docRef, "Documento eliminado correctamente!");
    // } catch (error) {
    //   console.error("Error al eliminar documento:", error);
    // }

    setEventInfoModal(false);
  };

  // const onDeleteEvent = async (documentId: string) => {
  //   try {
  //     const docRef = doc(db, "salas", documentId); // Replace "yourCollectionName" with your actual collection name
  //     await deleteDoc(docRef);
  //     console.log("Document deleted successfully!");
  //   } catch (error) {
  //     console.error("Error deleting document:", error);
  //   }
  // };

  // Dentro de tu componente
  // const onDeleteEvent = async () => {
  //   // Asegúrate de que currentEvent tenga la propiedad _id
  //   if (currentEvent && (currentEvent as IEventInfo)._id!) {
  //     const eventId = (currentEvent as IEventInfo)._id; // Usar el _id del evento

  //     try {
  //       // Obtén la referencia al documento de Firestore usando el _id
  //       const eventRef = doc(db, "salas", eventId); // Aquí se usa el _id del evento

  //       console.log(eventRef);
  //       // Elimina el documento de Firestore
  //       await deleteDoc(eventRef);
  //       console.log("Evento eliminado correctamente");

  //       // Elimina el evento de la lista local de eventos
  //       setEvents((prevEvents) => prevEvents.filter((e) => e._id !== eventId));

  //       // Cierra el modal de información del evento
  //       setEventInfoModal(false);
  //     } catch (error) {
  //       console.error("Error al eliminar evento: ", error);
  //     }
  //   }
  // };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "salas"));
        const fetchedEvents: IEventInfo[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.room === "Auditorio") {
            fetchedEvents.push({
              ...data,
              start: data.start.toDate(), // Convertir timestamps a Date
              end: data.end.toDate(), // Convertir timestamps a Date
              color: data.color, // Incluye el color del evento
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
          {/* <CardHeader title="AUDITORIO" subheader="Texto motivacional" /> */}
          <CardHeader title="AUDITORIO" />

          {/* <Divider /> */}

          {/* <Divider /> */}
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
            {/* <Divider style={{ margin: 10 }} /> */}
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
              // color de mostrar
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

export default EventCalendar;
