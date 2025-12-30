import { Routes, Route } from 'react-router-dom';
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

function App() {
  return (
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;