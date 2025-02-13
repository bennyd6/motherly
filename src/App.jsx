import './App.css';
import Header from './components/header';
import Navbar from './components/navbar';
import Home from './pages/home';
import Chat from './pages/chat';
import Analyze from './pages/analyze';
import Checkup from './pages/checkup';
import Login from './pages/login';
import Signup from './pages/signup';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

function MainApp() {
  const token = localStorage.getItem('authToken');
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  console.log("Token:", token); // Debugging token
  console.log("Current Location:", location.pathname); // Debugging location

  return (
    <div className="main">
      {/* Only show header and navbar if not on the auth pages */}
      {!isAuthPage && (
        <>
          <Header />
          <Navbar />
        </>
      )}

      <Routes>
        <Route path="/" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="/chat" element={token ? <Chat /> : <Navigate to="/login" />} />
        <Route path="/analyze" element={token ? <Analyze /> : <Navigate to="/login" />} />
        <Route path="/checkup" element={token ? <Checkup /> : <Navigate to="/login" />} />
        <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup />} />
        {/* Optional fallback route */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
