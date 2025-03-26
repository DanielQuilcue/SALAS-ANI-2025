export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};

export const generateColor = [
  {
    Sala25: "#ff6600",
    sala24: "#0070c0",
    bienestar: "#00b050",
    auditorio: "7f7f7f",
  },
];

const today = new Date();
export const formattedDate = today.toLocaleDateString("es-ES", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
});
