// src/components/Profile.jsx

import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();

  return (
    <div>
      <h1>👤 User Profile Area</h1>

      {/* Navigation for Nested Routes */}
      <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
        <Link 
          to="details" 
          style={{ marginRight: '15px', fontWeight: location.pathname.includes('details') ? 'bold' : 'normal' }}
        >
          Details
        </Link>
        <Link 
          to="settings" 
          style={{ fontWeight: location.pathname.includes('settings') ? 'bold' : 'normal' }}
        >
          Settings
        </Link>
      </nav>

      {/* Renders the matching nested child route (ProfileDetails or ProfileSettings) */}
      <Outlet />
      
      {/* Fallback content for the index route of /profile */}
      {location.pathname === '/profile' && <p>Select a profile sub-section above.</p>}
    </div>
  );
};

export default Profile;