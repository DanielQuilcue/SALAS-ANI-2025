import { Box, Card, CardContent, CardHeader, Container } from "@mui/material";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventInfo from "./EventInfo";
import AddEventModal from "./AddEventModal";
import EventInfoModal from "./EventInfoModal";
import { AddTodoModal } from "./AddTodoModal";
import AddDatePickerEventModal from "./AddDatePickerEventModal";
import type { IEventInfo } from "../types";
import { localizer } from "../utils/calendarUtils";
import { useCalendarEvents } from "../hook/useCalendarEvents";

const EventCalendar = () => {
  const {
    openSlot,
    openDatepickerModal,
    openTodoModal,
    setOpenTodoModal,
    currentEvent,
    eventInfoModal,
    setEventInfoModal,
    events,
    todos,
    setTodos,
    eventFormData,
    setEventFormData,
    datePickerEventFormData,
    setDatePickerEventFormData,
    handleSelectSlot,
    handleSelectEvent,
    handleClose,
    handleDatePickerClose,
    onAddEvent,
    onAddEventFromDatePicker,
    onDeleteEvent,
  } = useCalendarEvents("Auditorio");

  return (
    <Box mt={2} mb={2} component="main" sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth={false}>
        <Card>
          <CardHeader title="AUDITORIO" />
          <CardContent>
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
                  backgroundColor: event.todo?.color || "#1976d2",
                  borderColor: event.todo?.color || "#1976d2",
                },
              })}
              style={{ height: 900 }}
              min={new Date(2025, 0, 1, 7, 0, 0)}
              max={new Date(2025, 0, 1, 20, 0, 0)}
            />
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default EventCalendar;
