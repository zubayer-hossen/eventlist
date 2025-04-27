function Footer() {
  // Inline styles
  const styles = {
    footer: {
      backgroundColor: '#2d3748', // Dark gray background
      color: '#e2e8f0', // Light gray text color
      padding: '1rem 0',
      marginTop: '2rem',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      textAlign: 'center',
    },
    copyright: {
      fontSize: '0.875rem', // Smaller font size
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <p style={styles.copyright}>
          © {new Date().getFullYear()} EventFinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
