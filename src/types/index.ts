import { type Event } from "react-big-calendar";

export interface ITodo {
  _id: string;
  title: string;
  color?: string;
}

export interface IEventInfo extends Event {
  _id: string;
  meeting: string;
  color?: string;
  todoId?: string;
  todo?: ITodo;
  people: string;
  start?: Date;
  end?: Date;
  room: string;
  vicepresidency: string;
  isDoubleMeeting?: string;
}

export interface EventFormData {
  todoId?: string;
  todo?: ITodo;
  meeting: string;
  people: string;
  vicepresidency: string;
  room: string;
  isDoubleMeeting?: string;
  color: string;
  start?: Date;
  end?: Date;
}

export interface DatePickerEventFormData {
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
  isDoubleMeeting?: string;
}
