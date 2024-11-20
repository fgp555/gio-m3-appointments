import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const isLogin = useSelector((state) => state.user.login);

  return isLogin ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
