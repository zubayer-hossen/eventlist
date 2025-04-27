import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

function Header() {
  const { user, logout } = useAuthStore();

  // Inline styles
  const styles = {
    header: {
      background: 'linear-gradient(to right, #4F46E5, #9333EA)', // Gradient background
      color: 'white',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      padding: '1rem',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '2rem',
      fontWeight: '700',
      textDecoration: 'none',
      color: 'white',
    },
    nav: {
      display: 'flex',
      gap: '1.5rem',
    },
    navLink: {
      textDecoration: 'none',
      color: 'white',
      fontSize: '1rem',
      fontWeight: '500',
      transition: 'color 0.3s ease',
    },
    navLinkHover: {
      color: '#E5E7EB', // Light color for hover effect
    },
    button: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'color 0.3s ease',
    },
    buttonHover: {
      color: '#E5E7EB', // Light color on hover
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          EventFinder
        </Link>
        <nav style={styles.nav}>
          <Link to="/events" style={styles.navLink} onMouseEnter={(e) => (e.target.style.color = styles.navLinkHover.color)} onMouseLeave={(e) => (e.target.style.color = 'white')}>
            Events
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" style={styles.navLink} onMouseEnter={(e) => (e.target.style.color = styles.navLinkHover.color)} onMouseLeave={(e) => (e.target.style.color = 'white')}>
                Dashboard
              </Link>
              <button
                onClick={logout}
                style={styles.button}
                onMouseEnter={(e) => (e.target.style.color = styles.buttonHover.color)}
                onMouseLeave={(e) => (e.target.style.color = 'white')}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.navLink} onMouseEnter={(e) => (e.target.style.color = styles.navLinkHover.color)} onMouseLeave={(e) => (e.target.style.color = 'white')}>
                Login
              </Link>
              <Link to="/register" style={styles.navLink} onMouseEnter={(e) => (e.target.style.color = styles.navLinkHover.color)} onMouseLeave={(e) => (e.target.style.color = 'white')}>
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
