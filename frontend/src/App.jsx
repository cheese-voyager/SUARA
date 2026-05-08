import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Clock, FileText } from 'lucide-react';
import Home from './pages/Home';
import Antrian from './pages/Antrian';
import Surat from './pages/Surat';
import Chatbot from './components/Chatbot';
import './index.css';

const Navigation = () => {
  const location = useLocation();
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span style={{ fontSize: '2rem' }}>🌿</span>
        SUARA
      </div>
      <div className="navbar-links">
        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
          <HomeIcon size={18} style={{ display: 'inline', marginRight: '5px' }} />
          Beranda
        </Link>
        <Link to="/antrian" className={`nav-link ${location.pathname === '/antrian' ? 'active' : ''}`}>
          <Clock size={18} style={{ display: 'inline', marginRight: '5px' }} />
          Antrian
        </Link>
        <Link to="/surat" className={`nav-link ${location.pathname === '/surat' ? 'active' : ''}`}>
          <FileText size={18} style={{ display: 'inline', marginRight: '5px' }} />
          Berkas & Surat
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/antrian" element={<Antrian />} />
            <Route path="/surat" element={<Surat />} />
          </Routes>
        </main>
        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
