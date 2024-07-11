import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get("/weather/current?city=your_city");
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching weather data", error);
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Weather Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Render weather data here */}
        {weatherData && (
          <Card>
            <CardContent>
              <Typography variant="h5">Current Weather</Typography>
              <Typography>Temperature: {weatherData.temp}°C</Typography>
              <Typography>Humidity: {weatherData.humidity}%</Typography>
              <Typography>Wind Speed: {weatherData.wind_speed} m/s</Typography>
            </CardContent>
          </Card>
        )}
      </Grid>
    </Container>
  );
};

export default WeatherDashboard;
