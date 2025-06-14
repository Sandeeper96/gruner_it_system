'use client';
import './login.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://192.168.1.88:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      } else {
        localStorage.setItem('token', data.token);
        router.push('/');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-container">
      <h2>Gruner Login</h2>
      {error && <p>{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    <p style={{ textAlign: 'center', marginTop: '15px' }}>
  Don't have an account? <a href="/signup" style={{ color: '#007bff', textDecoration: 'none' }}>Sign up here</a>
</p>
    </form>
  );
}
