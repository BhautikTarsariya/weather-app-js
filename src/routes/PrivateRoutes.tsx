import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element, token }: any) => {
  return token ? element : <Navigate to="/" />;
};

export default PrivateRoute;
