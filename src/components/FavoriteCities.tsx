import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";

const FavoriteCities: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("/favorites");
        setFavorites(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite cities", error);
        setLoading(false);
      }
    };

    fetchFavorites();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Favorite Cities
      </Typography>
      <List>
        {favorites.map((city) => (
          <ListItem key={city.id}>
            <ListItemText
              primary={city.name}
              secondary={`Temperature: ${city.weather.temp}°C`}
            />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default FavoriteCities;
