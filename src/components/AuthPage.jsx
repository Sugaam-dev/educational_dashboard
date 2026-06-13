import React, { useState } from 'react';
import { Layers, Lock, Mail, Users, ArrowLeft } from 'lucide-react';

export default function AuthPage({ onNavigate, onLogin, redirectTarget }) {
  const [email, setEmail] = useState('stakeholder@domain.com');
  const [password, setPassword] = useState('password');
  const [role, setRole] = useState('PM'); // PM, Finance, Architect

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const initials = email.split('@')[0].slice(0, 2).toUpperCase() || 'ST';
      const userProfile = {
        name: email.split('@')[0].replace('.', ' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()),
        email: email,
        role: role,
        initials: initials,
        isDemo: false
      };
      onLogin(userProfile);
    }
  };

  const handleDemoLogin = () => {
    const demoProfile = {
      name: 'Demo User',
      email: 'demo@pmrg-gov.edu',
      role: 'PM',
      initials: 'DU',
      isDemo: true
    };
    onLogin(demoProfile);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background gradients */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Back button */}
      <div className="absolute top-6 left-6 z-20">
        <button
          onClick={() => onNavigate('landing')}
          className="inline-flex items-center space-x-2 text-sm text-slate-500 hover:text-slate-800 transition-colors font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Landing</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <img 
            src="/logo.png" 
            alt="PMRG Solution Logo" 
            className="h-12 w-auto object-contain" 
          />
        </div>
        <h2 className="mt-6 text-center text-3xl font-black text-slate-900 tracking-tight">
          Stakeholder SSO Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-400 font-bold uppercase tracking-wider">
          Decision Control Layer Authenticator
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white border border-slate-200 rounded-2xl px-6 py-8 shadow-lg backdrop-blur-md sm:px-10">
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Email Address
              </label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-sm transition-all font-semibold"
                  placeholder="stakeholder@domain.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Password
              </label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Lock className="h-4 w-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-sm transition-all font-semibold"
                  placeholder="password"
                />
              </div>
            </div>

            {/* Role Field */}
            <div>
              <label htmlFor="role" className="block text-xs font-bold text-slate-500 uppercase tracking-wider">
                Authorized Role
              </label>
              <div className="mt-1.5 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <Users className="h-4 w-4" />
                </div>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg bg-slate-50 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 focus:bg-white text-sm transition-all font-semibold"
                >
                  <option value="PM">Project Manager (PM)</option>
                  <option value="Finance">Finance Director</option>
                  <option value="Architect">Systems Architect</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-slate-200 rounded-lg text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Sign In
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100" />
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold text-slate-400 bg-white px-2">
                Or bypass credentials
              </div>
            </div>

            {/* Instant Demo Option */}
            <div className="mt-6">
              <button
                onClick={handleDemoLogin}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-lg shadow-blue-500/25 active:scale-95"
              >
                Instant Demo Login
              </button>
              <p className="mt-2.5 text-center text-xs text-slate-400 font-medium">
                Log in as "Demo User" (DU) with full system clearance.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
