import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';

function App() {
  return (
    <div style={{ backgroundColor: '#100C0B', minHeight: '100vh' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;