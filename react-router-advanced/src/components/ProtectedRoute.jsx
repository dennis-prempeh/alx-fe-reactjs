import { Navigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  

  if (!isAuthenticated) {
    alert("Access Denied: You must log in to view this page.");
    return <Navigate to="/" replace />;
  }

  
  return children;
};
export default ProtectedRoute;