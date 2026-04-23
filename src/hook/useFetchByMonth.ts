import { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

interface DataItem {
  id: string;
  start?: Timestamp;
  [key: string]: unknown;
}

export function useFetchByMonth(
  collectionName: string,
  year: number,
  month: number
) {
  const [data, setData] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (year === undefined || month === undefined) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const startDate = new Date(year, month, 1);
        const endDate = new Date(year, month + 1, 1);

        const q = query(
          collection(db, collectionName),
          where("start", ">=", Timestamp.fromDate(startDate)),
          where("start", "<", Timestamp.fromDate(endDate))
        );

        const snapshot = await getDocs(q);

        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(items);
      } catch (err) {
        setError("Error al traer datos por mes");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, year, month]);

  return { data, loading, error };
}