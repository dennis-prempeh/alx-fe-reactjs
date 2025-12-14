import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../auth'; 

const Layout = () => {
  
  const { isAuthenticated, login, logout } = useAuth();

  return (
    <>
      <nav style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
        <ul style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '20px', margin: 0 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/profile">Profile (Protected)</Link></li>
          {/* Updated link to match the dynamic route path: /blog/:id */}
          <li><Link to="/blog/42">Dynamic Post Example</Link></li>
          {/* Removed the hardcoded nested link for cleaner main navigation */}
        </ul>
        
        {/* ADDED: Authentication Status and Buttons */}
        <div style={{ float: 'right', paddingRight: '20px' }}>
          {isAuthenticated ? (
            <>
              <span>**Logged In** </span>
              <button onClick={logout}>Log Out</button>
            </>
          ) : (
            <>
              <span>**Logged Out** </span>
              <button onClick={login}>Log In</button>
            </>
          )}
        </div>
      </nav>
      
      {/* Removed <hr /> for cleaner look, but you can add it back */}
      
      <div style={{ padding: '20px' }}>
        {/* CRITICAL: Outlet renders the current route's component */}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;