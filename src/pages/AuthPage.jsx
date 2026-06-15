import { useState } from 'react';
import { navigateHash } from '../utils/routing';

export default function AuthPage({ route, onLogin }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('stakeholder@university.edu');
  const [name, setName] = useState('Aisha Morgan');
  const [role, setRole] = useState('Project Manager');

  function submit(event) {
    event.preventDefault();
    onLogin({
      name: mode === 'register' ? name : email.split('@')[0].replace('.', ' '),
      email,
      role,
      initials: (mode === 'register' ? name : email).slice(0, 2).toUpperCase()
    }, route.params.redirect || 'dashboard');
  }

  return (
    <main className="auth-page">
      <section className="auth-card">
        <button className="brand auth-brand" onClick={() => navigateHash('landing')}>
          <img src="/logo.png" alt="PMRG Solution logo" />
          <span>UniGov Control</span>
        </button>
        <h1>{mode === 'login' ? 'Login to dashboard' : 'Create stakeholder access'}</h1>
        <p>Use demo login to skip details, or fill the static form to make the prototype feel like a real app.</p>
        <div className="auth-tabs">
          <button className={mode === 'login' ? 'active-filter' : ''} onClick={() => setMode('login')}>Login</button>
          <button className={mode === 'register' ? 'active-filter' : ''} onClick={() => setMode('register')}>Register</button>
        </div>
        <form onSubmit={submit}>
          {mode === 'register' && (
            <label>
              Full name
              <input value={name} onChange={(event) => setName(event.target.value)} />
            </label>
          )}
          <label>
            Email
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label>
            Password
            <input type="password" value="password" readOnly />
          </label>
          <label>
            Role
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              <option>Project Manager</option>
              <option>Finance Director</option>
              <option>Registrar</option>
              <option>Admissions Lead</option>
            </select>
          </label>
          <button className="primary">{mode === 'login' ? 'Login' : 'Register and login'}</button>
          <button type="button" onClick={() => onLogin(null, route.params.redirect || 'dashboard')}>Demo login - skip details</button>
        </form>
      </section>
    </main>
  );
}
