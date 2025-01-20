import { useState, MouseEvent } from "react";
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
import { db } from "../firebase/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
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
  meeting: string;
  todoId?: string;
  people: string;
  start?: Date;
  end?: Date;
  room: string;
}

export interface EventFormData {
  todoId?: string;
  meeting: string;
  people: string;
  vicepresidency: string;
  room: string;
  start?: Date;
  end?: Date;
}

export interface DatePickerEventFormData {
  meeting: string;
  people: string;
  vicepresidency: string;
  room: string;
  todoId?: string;
  allDay: boolean;
  start?: Date;
  end?: Date;
}

export const generateId = () =>
  (Math.floor(Math.random() * 10000) + 1).toString();

const initialEventFormState: EventFormData = {
  meeting: "",
  todoId: undefined,
  people: "",
  vicepresidency: "",
  room: "",
  start: undefined,
  end: undefined,
};

const initialDatePickerEventFormData: DatePickerEventFormData = {
  meeting: "",
  people: "",
  vicepresidency: "",
  room: "",
  todoId: undefined,
  allDay: false,
  start: undefined,
  end: undefined,
};

const Bienestar = () => {
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
      room: "Bienestar",
    };

    // const newEvents = [...events, data];
    // console.log(data);
    try {
      // Crear el objeto de evento para enviar a Firebase
      // const newEvent = [...events, data];

      // Agregar el nuevo evento a Firestore
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

  const onDeleteEvent = () => {
    setEvents(() =>
      [...events].filter((e) => e._id !== (currentEvent as IEventInfo)._id!)
    );
    setEventInfoModal(false);
  };

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
          <CardHeader title="Bienestar" />
          {/* <Menu /> */}
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
                  backgroundColor:
                    todos.find((todo) => todo._id === event.todoId)?.color ||
                    "#00b050",
                  borderColor:
                    todos.find((todo) => todo._id === event.todoId)?.color ||
                    "#00b050",
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

export default Bienestar;
