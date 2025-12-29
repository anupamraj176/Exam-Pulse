import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Dashboard from './pages/Dashboard';
import PYQ from './pages/PYQ';

function App() {
  return (
    <div style={{ backgroundColor: '#100C0B', minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pyq" element={<PYQ />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;