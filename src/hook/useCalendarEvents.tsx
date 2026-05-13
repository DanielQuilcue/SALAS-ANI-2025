import { useState, useEffect, MouseEvent } from "react";
import { type Event } from "react-big-calendar";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { generateId } from "../utils/inde";
import Swal from "sweetalert2";
import type { IEventInfo, EventFormData, DatePickerEventFormData, ITodo } from "../types";
import {
  initialEventFormState,
  initialDatePickerEventFormData,
} from "../utils/calendarUtils";

export function useCalendarEvents(roomName: string) {
  const [openSlot, setOpenSlot] = useState(false);
  const [openDatepickerModal, setOpenDatepickerModal] = useState(false);
  const [openTodoModal, setOpenTodoModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(null);
  const [eventInfoModal, setEventInfoModal] = useState(false);
  const [events, setEvents] = useState<IEventInfo[]>([]);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [eventFormData, setEventFormData] = useState<EventFormData>(initialEventFormState);
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
      todoId: eventFormData.todoId || "",
      room: roomName,
      todo: eventFormData.todo,
    };

    try {
      await addDoc(collection(db, "salas"), data);
      Swal.fire({
        title: "Evento creado",
        text: "La reunión se creó exitosamente.",
        icon: "success",
        confirmButtonText: "OK",
      });
      setEvents((prev) => [...prev, data]);

      if (eventFormData.isDoubleMeeting) {
        const secondData: IEventInfo = {
          ...data,
          _id: generateId(),
          room: "Sala 2-5",
        };
        await addDoc(collection(db, "salas"), secondData);
        setEvents((prev) => [...prev, secondData]);
      }

      handleClose();
    } catch (error) {
      console.error("Error al agregar evento a Firebase: ", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al crear la reunión.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const onAddEventFromDatePicker = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const addHours = (date: Date | undefined, hours: number): Date | undefined => {
      if (!date) return undefined;
      const newDate = new Date(date);
      newDate.setHours(newDate.getHours() + hours);
      return newDate;
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

    setEvents((prev) => [...prev, data]);
    setDatePickerEventFormData(initialDatePickerEventFormData);
  };

  const onDeleteEvent = async () => {
    const eventToDelete = currentEvent as IEventInfo;

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
          await deleteDoc(doc(db, "salas", eventToDelete._id));
          setEvents((prev) => prev.filter((e) => e._id !== eventToDelete._id));
          Swal.fire({
            title: "¡Eliminado!",
            text: "Reunión eliminada exitosamente.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (error) {
          console.error("Error al eliminar evento en Firebase: ", error);
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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "salas"),
      (querySnapshot) => {
        const fetchedEvents: IEventInfo[] = [];
        querySnapshot.forEach((docSnap) => {
          const data = docSnap.data();
          if (data.room === roomName) {
            fetchedEvents.push({
              _id: docSnap.id,
              meeting: data.meeting || "Sin título",
              people: data.people || "Desconocido",
              room: data.room,
              vicepresidency: data.vicepresidency || "Sin vicepresidencia",
              start: data.start?.toDate() || new Date(),
              end: data.end?.toDate() || new Date(),
              color: data.todo?.color || "#1976d2",
              todo: data.todo || undefined,
              todoId: data.todoId || "",
            });
          }
        });
        setEvents(fetchedEvents);
      },
      (error) => {
        console.error("Error al obtener eventos en tiempo real: ", error);
      }
    );
    return () => unsubscribe();
  }, [roomName]);

  return {
    openSlot,
    setOpenSlot,
    openDatepickerModal,
    setOpenDatepickerModal,
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
  };
}
