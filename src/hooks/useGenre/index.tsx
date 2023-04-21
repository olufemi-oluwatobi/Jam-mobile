import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASE_URL } from "../../constants";

const GENRE_STORAGE_KEY = "genre_data";
const GENRE_EXPIRATION_KEY = "genre_expiration";

export interface Genre {
  created_at: string;
  id: number;
  name: string;
  updated_at: string;
}

function useGenres() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGenres() {
      try {
        setLoading(true);
        const storedData = await retrieveGenresFromStorage();
        const shouldUpdate = await shouldUpdateGenres(storedData);
        if (shouldUpdate || !storedData.length) {
          const response = await fetch(`${BASE_URL}/genres`);
          const data = await response.json();
          const newGenres = data?.data || [];

          // Save new data to storage
          await storeGenresToStorage(newGenres);

          // Save expiration time to storage
          const expirationDate = new Date();
          expirationDate.setDate(expirationDate.getDate() + 30);
          const expirationTime = expirationDate.getTime();
          await storeGenresExpirationToStorage(expirationTime);

          setGenres(newGenres);
        } else {
          setGenres(storedData);
        }
      } catch (error) {
        console.error("ERROR", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGenres();
  }, []);

  const retrieveGenresFromStorage = async (): Promise<Genre[]> => {
    const storedData = await AsyncStorage.getItem(GENRE_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : [];
  };

  const storeGenresToStorage = async (genresData: Genre[]) => {
    const jsonData = JSON.stringify(genresData);
    await AsyncStorage.setItem(GENRE_STORAGE_KEY, jsonData);
  };

  const storeGenresExpirationToStorage = async (expirationTime: number) => {
    await AsyncStorage.setItem(GENRE_EXPIRATION_KEY, String(expirationTime));
  };

  const shouldUpdateGenres = async (storedData: Genre[]): Promise<boolean> => {
    const expirationTime = await AsyncStorage.getItem(GENRE_EXPIRATION_KEY);
    return (
      !storedData ||
      storedData.length === 0 ||
      !expirationTime ||
      new Date().getTime() >= Number(expirationTime)
    );
  };

  return { genres, loading };
}

export default useGenres;
