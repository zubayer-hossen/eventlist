import { Link } from 'react-router-dom';
import useEventStore from '../store/eventStore';
import { useEffect } from 'react';
import EventCard from '../components/EventCard';

function Home() {
  const { events, fetchEvents } = useEventStore();

  useEffect(() => {
    fetchEvents();
  }, []);

  // Inline styles
  const styles = {
    container: {
      margin: '0 auto',
      padding: '2rem 1rem',
      maxWidth: '1200px',
    },
    banner: {
      background: 'linear-gradient(to right, #4F46E5, #9333EA)',
      borderRadius: '1rem',
      padding: '2rem',
      color: 'white',
      textAlign: 'center',
      marginBottom: '2.5rem',
    },
    bannerTitle: {
      fontSize: '2.5rem',
      fontWeight: '700',
      marginBottom: '1rem',
    },
    bannerSubtitle: {
      fontSize: '1.25rem',
      marginBottom: '1.5rem',
    },
    browseButton: {
      backgroundColor: 'white',
      color: '#4F46E5',
      padding: '0.75rem 2rem',
      borderRadius: '50px',
      textDecoration: 'none',
      fontWeight: '600',
      transition: 'background-color 0.3s ease',
    },
    browseButtonHover: {
      backgroundColor: '#E5E7EB',
    },
    eventsSection: {
      marginBottom: '3rem',
    },
    sectionTitle: {
      fontSize: '2rem',
      fontWeight: '600',
      marginBottom: '2rem',
    },
    eventsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '2rem',
    },
    categoriesSection: {
      marginTop: '2rem',
    },
    categoriesContainer: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      justifyContent: 'flex-start',
    },
    categoryItem: {
      backgroundColor: '#F3F4F6',
      padding: '1rem 2rem',
      borderRadius: '50px',
      fontSize: '1rem',
      color: '#4B5563',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    categoryItemHover: {
      backgroundColor: '#E5E7EB',
    },
  };

  return (
    <div style={styles.container}>
      {/* Banner */}
      <div style={styles.banner}>
        <h1 style={styles.bannerTitle}>Find Exciting Events Near You!</h1>
        <p style={styles.bannerSubtitle}>Discover, Save, and Attend Local Events</p>
        <Link
          to="/events"
          style={styles.browseButton}
          onMouseEnter={(e) => (e.target.style.backgroundColor = styles.browseButtonHover.backgroundColor)}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'white')}
        >
          Browse Events
        </Link>
      </div>

      {/* Upcoming Events */}
      <section style={styles.eventsSection}>
        <h2 style={styles.sectionTitle}>Upcoming Events</h2>
        <div style={styles.eventsGrid}>
          {events.slice(0, 6).map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section style={styles.categoriesSection}>
        <h2 style={styles.sectionTitle}>Categories</h2>
        <div style={styles.categoriesContainer}>
          {['Music', 'Sports', 'Art', 'Tech', 'Food', 'Business'].map((cat) => (
            <div
              key={cat}
              style={styles.categoryItem}
              onMouseEnter={(e) => (e.target.style.backgroundColor = styles.categoryItemHover.backgroundColor)}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#F3F4F6')}
            >
              {cat}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
