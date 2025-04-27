import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function PrivateRoute() {
  const { user } = useAuthStore();

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
