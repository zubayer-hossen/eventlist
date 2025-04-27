import { useState, useEffect } from 'react';
import useAuthStore from '../store/authStore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuthStore();
  const [myEvents, setMyEvents] = useState([]);
  const [form, setForm] = useState({ name: '', date: '', time: '', location: '', description: '' });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchMyEvents();
    }
  }, [user]);

  const fetchMyEvents = async () => {
    const res = await axios.get('http://localhost:5000/api/events/user', {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    setMyEvents(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/events', form, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setForm({ name: '', date: '', time: '', location: '', description: '' });
      fetchMyEvents();
    } catch (error) {
      alert('Failed to create event!');
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/events/${id}`, {
      headers: { Authorization: `Bearer ${user.token}` },
    });
    fetchMyEvents();
  };

  // Internal CSS styles
  const styles = {
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      color: '#4A90E2',
    },
    formContainer: {
      backgroundColor: '#F9FAFB',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      marginBottom: '2rem',
    },
    input: {
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #ddd',
      marginBottom: '1rem',
      width: '100%',
      fontSize: '1rem',
    },
    textarea: {
      padding: '0.75rem',
      borderRadius: '6px',
      border: '1px solid #ddd',
      width: '100%',
      fontSize: '1rem',
      marginBottom: '1rem',
    },
    button: {
      backgroundColor: '#4A90E2',
      color: 'white',
      padding: '1rem',
      borderRadius: '6px',
      width: '100%',
      fontSize: '1.25rem',
      cursor: 'pointer',
      border: 'none',
    },
    eventCard: {
      backgroundColor: '#ffffff',
      padding: '1.5rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      position: 'relative',
    },
    eventTitle: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#333',
    },
    eventInfo: {
      fontSize: '1.1rem',
      color: '#555',
      marginBottom: '1rem',
    },
    eventButton: {
      position: 'absolute',
      top: '1rem',
      right: '1rem',
      color: '#F44336',
      fontSize: '1.5rem',
      cursor: 'pointer',
    },
    noEventsText: {
      textAlign: 'center',
      color: '#888',
      fontSize: '1.2rem',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Events</h2>

      {/* Create Event */}
      <form onSubmit={handleCreate} style={styles.formContainer}>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Create New Event</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Event Name"
            style={styles.input}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="date"
            style={styles.input}
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <input
            type="time"
            style={styles.input}
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Location"
            style={styles.input}
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          />
        </div>
        <textarea
          placeholder="Description"
          style={styles.textarea}
          rows="4"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <button type="submit" style={styles.button}>
          Create Event
        </button>
      </form>

      {/* List My Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myEvents.length > 0 ? (
          myEvents.map((event) => (
            <div key={event._id} style={styles.eventCard}>
              <h4 style={styles.eventTitle}>{event.name}</h4>
              <p style={styles.eventInfo}>
                {event.date} at {event.time}
              </p>
              <p style={styles.eventInfo}>{event.location}</p>
              <button
                onClick={() => handleDelete(event._id)}
                style={styles.eventButton}
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <p style={styles.noEventsText}>No events created yet!</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
