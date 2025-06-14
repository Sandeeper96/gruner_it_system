'use client';
import './signup.css'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    email: '',
    dob: '',
    password: '',
    confirm: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res = await fetch('http://192.168.1.88:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          mobile: form.mobile,
          email: form.email,
          dob: form.dob,
          password: form.password
        })
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message);
      } else {
        alert('Signup successful ✅');
        router.push('/login');
      }
    } catch {
      setError('Server error');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-container">
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}

      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="dob" type="date" value={form.dob} onChange={handleChange} required />
      <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
      <input name="confirm" type="password" value={form.confirm} onChange={handleChange} placeholder="Confirm Password" required />
      <button type="submit">Sign Up</button>
    </form>
  );
}
