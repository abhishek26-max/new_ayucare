import React, { useState } from 'react';
import { X, ShieldCheck, Lock, Mail, AlertCircle } from 'lucide-react';

export default function AdminAuthModal({ isOpen, onClose, onAdminLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Strict Admin Credentials Check
    const isValidEmail = email.trim().toLowerCase() === 'admin@ayucare.in' || email.trim().toLowerCase() === 'admin';
    const isValidPass = password === 'admin123' || password === 'admin';

    if (isValidEmail && isValidPass) {
      const adminUser = {
        id: 'ADMIN-01',
        name: 'Ayucare Administrator',
        email: 'admin@ayucare.in',
        role: 'admin'
      };
      onAdminLoginSuccess(adminUser);
      setEmail('');
      setPassword('');
      onClose();
    } else {
      setError('Access Denied! Only system Administrator can log in with valid admin credentials.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shadow-sm">
            <ShieldCheck className="w-7 h-7 text-teal-600" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">Admin Portal Login</h3>
            <p className="text-xs text-slate-500 font-medium">Restricted Access • Authorized System Admin Only</p>
          </div>
        </div>

        {error && (
          <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Admin Email / Username</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ayucare.in or admin"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Admin Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600 font-medium"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-xs shadow-md shadow-teal-600/30 hover:from-teal-700 hover:to-emerald-700 transition-all mt-2"
          >
            Authenticate & Access Admin Dashboard
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-slate-100 text-center">
          <p className="text-[11px] text-slate-400 font-medium">
            Protected by Ayucare Security System. Normal patients do not need to log in to book appointments.
          </p>
        </div>

      </div>
    </div>
  );
}
