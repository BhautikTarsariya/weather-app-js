import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { Suspense, useState } from "react";
import PrivateRoute from "./routes/PrivateRoutes";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [token, setToken] = useState<any>(localStorage.getItem("token") || "");
  return (
    <Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route
          path="/home"
          element={
            <PrivateRoute
              element={<Home setToken={setToken} />}
              token={token}
            />
          }
        />
      </Routes>
    </Suspense>
  );
};

export default App;
