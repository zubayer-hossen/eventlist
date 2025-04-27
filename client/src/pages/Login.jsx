import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      login(res.data);
      navigate('/');
    } catch (error) {
      alert('Invalid credentials!');
    }
  };

  // Internal CSS styles
  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f3f4f6',
    },
    form: {
      backgroundColor: '#fff',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
      transition: 'all 0.3s ease',
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      textAlign: 'center',
      color: '#4F46E5',
    },
    input: {
      padding: '1rem',
      borderRadius: '8px',
      border: '1px solid #d1d5db',
      width: '100%',
      marginBottom: '1rem',
      fontSize: '1rem',
    },
    button: {
      backgroundColor: '#4F46E5',
      color: '#fff',
      padding: '1rem',
      borderRadius: '8px',
      width: '100%',
      fontSize: '1.2rem',
      cursor: 'pointer',
      border: 'none',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#4338ca',
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
