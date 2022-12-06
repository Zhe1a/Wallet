import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuthIsLoggedIn } from 'redux/AuthRedux/selectors';
// import { getIsLoggedIn } from 'redux/store';
export default function PrivateRoute({ children, redirectTo = '/login' }) {
  const isLoggedIn = useSelector(getAuthIsLoggedIn);
  return isLoggedIn ? children : <Navigate to={redirectTo} />;
}
