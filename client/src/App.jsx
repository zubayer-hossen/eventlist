// src/App.js
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Events from './pages/Events';
import EventDetail from './pages/EventDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Footer from './components/Footer';
import CreateEvent from './components/CreateEvent'; // Import CreateEvent page
import useAuthStore from './store/authStore';

function App() {
  const { user } = useAuthStore();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetail />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/create-event" element={user ? <CreateEvent /> : <Navigate to="/login" />} /> {/* Add route for CreateEvent */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
