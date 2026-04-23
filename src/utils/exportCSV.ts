
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function formatDate(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

type ExportItem = {
  people?: string;
  vicepresidency?: string;
  room?: string;
  meeting?: string;
  title?: string;
  start?: { toDate(): Date };
  end?: { toDate(): Date };
};

export function exportToExcel(data: ExportItem[], fileName: string) {
  if (!data.length) return;

  const formattedData = data.map((item) => ({
    "PERSONA ENCARGADA": item.people || "",
    "VICEPRESIDENCIA": item.vicepresidency || "",
    "SALA": item.room || "",
    "ACTIVIDAD": item.meeting || item.title || "",
    "HORA DE INICIO": item.start?.toDate
      ? formatDate(item.start.toDate())
      : "",
    "HORA DE FIN": item.end?.toDate
      ? formatDate(item.end.toDate())
      : "",
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedData);

  worksheet["!cols"] = [
    { wch: 25 },
    { wch: 30 },
    { wch: 20 },
    { wch: 40 },
    { wch: 20 },
    { wch: 20 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const blob = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  saveAs(blob, `${fileName}.xlsx`);
}