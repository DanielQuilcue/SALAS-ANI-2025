import { ITodo } from "../components/EventCalendar";
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
