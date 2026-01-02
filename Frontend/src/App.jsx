import { Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Dashboard from './pages/Dashboard';
import PYQ from './pages/PYQ';
import StudyRooms from './pages/StudyRoom';
import ExamDetail from './pages/ExamDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Notifications from './pages/Notifications';
import Admin from './pages/Admin';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Bookmarks from './pages/Bookmarks';

function App() {
  return (
    <ErrorBoundary>
      <div style={{ backgroundColor: '#100C0B', minHeight: '100vh' }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pyq" element={<PYQ />} />
          <Route path="/study-rooms" element={<StudyRooms />} />
          <Route path="/exams/:examId" element={<ExamDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
        <Footer />
      </div>
    </ErrorBoundary>
  );
}

export default App;