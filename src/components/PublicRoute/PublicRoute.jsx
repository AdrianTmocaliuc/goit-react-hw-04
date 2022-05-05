import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isView, children, restricted = false }) => {
  // console.log('isView', isView);
  return <>{isView ? <Navigate to="/" /> : children}</>;
};

export default PublicRoute;
