import axios from "axios";
import moment from "moment";

const REACT_APP_WEATHER_VISUAL_API_KEY = "DRPEATA6ECA9VJXNZ442MLMWM";
const REACT_APP_WEATHER_VISUAL_API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

const authApi = axios.create({
  baseURL: "http://localhost:5000/auth",
});

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const register = async (input: any) => {
  return await authApi.post("/register", input);
};

export const login = async (input: any) => {
  return await authApi.post("/login", input);
};

export const getCurrentWeather = async (city: any, token: any) => {
  return await api.get(`/weather/current?city=${city}`, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const getForecastWeather = async (city: any, token: any) => {
  return await api.get(`/weather/forecast?city=${city}`, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const getHistoricalWeather = async (city: any, token: any) => {
  return await api.get(`/weather/historical?city=${city}`, {
    headers: {
      "x-access-token": token,
    },
  });
};

export const getFavorites = async (token: any) => {
  return await api.get("/favorites", {
    headers: {
      "x-access-token": token,
    },
  });
};

export const addFavorite = async (city: any, token: any) => {
  return await api.post(
    "/favorites",
    { city },
    {
      headers: {
        "x-access-token": token,
      },
    }
  );
};

export const getWeatherCurrentData = async (userInput: string) => {
  const apiUrl = `${
    import.meta.env.VITE_APP_WEATHER_VISUAL_API_URL
  }/${userInput}/${moment()
    .subtract(7, "days")
    .format("YYYY-MM-DD")}/${moment().format("YYYY-MM-DD")}`;
  const apiKey = import.meta.env.VITE_APP_WEATHER_VISUAL_API_KEY;

  return await axios.get(`${apiUrl}?key=${apiKey}&unitGroup=metric`);
};

export const getWeatherPastData = async (
  userInput: string,
  past7thDate: string,
  presentDate: string
) => {
  const apiUrl = `${
    import.meta.env.VITE_APP_WEATHER_VISUAL_API_URL
  }/${userInput}/${past7thDate}/${presentDate}`;
  const apiKey = import.meta.env.VITE_APP_WEATHER_VISUAL_API_KEY;

  return await axios.get(`${apiUrl}?key=${apiKey}`);
};
