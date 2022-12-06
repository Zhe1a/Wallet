import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getAuthIsLoggedIn } from 'redux/AuthRedux/selectors';
// import { getIsLoggedIn } from 'redux/store';
export default function PublicRoute({
  children,
  restricted = false,
  redirectTo = '/'
}) {
  const isLoggedIn = useSelector(getAuthIsLoggedIn);
  const shouldNavigate = isLoggedIn && restricted;
  return shouldNavigate ? <Navigate to={redirectTo} /> : children;
  
}
