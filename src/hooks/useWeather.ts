import { useEffect, useState } from "react";

const APIkey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;

// default coordinates-- Bundang-Gu, Seongnam City
const FALLBACK_LAT = 37.3827531654052;
const FALLBACK_LON = 127.118829944284;

export default function useWeather() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (lat: number, lon: number) => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric&lang=en`
      );
      if (!res.ok) throw new Error("Failed to fetch weather.");
      const json = await res.json();
      setData(json);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeather(latitude, longitude);
      },
      async (err) => {
        if (err.code === 1) {
          console.warn("Geolocation denied, using default coordinates.");
          await fetchWeather(FALLBACK_LAT, FALLBACK_LON);
        } else {
          setError(err.message);
          setLoading(false);
        }
      }
    );
  }, []);

  return { data, loading, error };
}
