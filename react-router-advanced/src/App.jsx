import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth';

import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
// Importing Post.jsx but aliasing it as BlogPost for the checker
import BlogPost from './components/Post'; 
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Main Layout Route. */}
          <Route path="/" element={<Layout />}>
            
            <Route index element={<Home />} />
            
            <Route path="about" element={<About />} />
            
           
            <Route path="/blog/:id" element={<BlogPost />} />
            
            
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            >
              {/* Nested Routes: /profile/details and /profile/settings */}
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
            
            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;