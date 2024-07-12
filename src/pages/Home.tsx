import BGImage from "../components/BGImage";
import WeatherData from "../components/WeatherData";

const Home = ({ setToken }: any) => {
  return (
    <BGImage>
      <WeatherData setToken={setToken} />
    </BGImage>
  );
};

export default Home;
