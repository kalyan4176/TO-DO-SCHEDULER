import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Schedule from './pages/Schedule';
import Important from './pages/Important';
import Progress from './pages/Progress';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import About from './pages/About';

// Component to redirect authenticated users away from login/signup
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return user ? <Navigate to="/" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />

            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="schedule" element={<Schedule />} />
                <Route path="important" element={<Important />} />
                <Route path="progress" element={<Progress />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<Settings />} />
                <Route path="about" element={<About />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
