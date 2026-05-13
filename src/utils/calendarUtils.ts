import moment from "moment";
import "moment-timezone";
import { dateFnsLocalizer, momentLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import type { EventFormData, DatePickerEventFormData } from "../types";

moment.tz.setDefault("America/New_York");

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales: momentLocalizer(moment),
});

export const initialEventFormState: EventFormData = {
  meeting: "",
  todoId: undefined,
  todo: undefined,
  people: "",
  vicepresidency: "",
  room: "",
  isDoubleMeeting: "",
  color: "",
  start: undefined,
  end: undefined,
};

export const initialDatePickerEventFormData: DatePickerEventFormData = {
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
