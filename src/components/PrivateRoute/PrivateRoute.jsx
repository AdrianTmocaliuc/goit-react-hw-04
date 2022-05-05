import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isView, children, ...props }) => {
  return <>{isView ? children : <Navigate to="/" />}</>;
};

export default PrivateRoute;
