import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute({ allowedRoles }) {
  const { currentUser } = useSelector((state) => state.user);

  const hasPermission = currentUser && allowedRoles.includes(currentUser.role);

  return hasPermission ? <Outlet /> : <Navigate to='/' />;
}