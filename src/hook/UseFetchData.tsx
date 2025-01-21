import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Timestamp } from "firebase/firestore";

interface DataItem {
  id: string;
  start?: Timestamp; // Fecha almacenada como Timestamp en Firebase
  [key: string]: any;
}

export function UseFetchData(collectionName: string) {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Obtenemos la fecha de hoy, normalizada al inicio del día
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const querySnapshot = await getDocs(collection(db, collectionName));
        const items = querySnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter((item) => {
            if (!item.start) return false; // Excluir elementos sin campo `start`

            // Convertir `start` de Firebase (Timestamp) a objeto Date
            const startDate = (item.start as Timestamp).toDate();

            // Normalizar `startDate` al inicio del día
            const normalizedStart = new Date(startDate);
            normalizedStart.setHours(0, 0, 0, 0);

            // Comparar si la fecha es exactamente igual a hoy
            return normalizedStart.getTime() === today.getTime();
          });

        setData(items as DataItem[]);
      } catch (err) {
        setError("Error al recuperar datos");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, loading, error };
}

// mostrar todos
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/firebaseConfig";

// interface DataItem {
//   id: string;
//   [key: string]: any; // Cambia esto según la estructura específica de tus datos
// }

// export function UseFetchData(collectionName: string) {
//   const [data, setData] = useState<DataItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       setLoading(true);
//       try {
//         const querySnapshot = await getDocs(collection(db, collectionName));
//         const items = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setData(items);
//       } catch (err) {
//         setError("Error al recuperar datos");
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [collectionName]);

//   return { data, loading, error };
// }
