import React from 'react';
import { X, Calendar, CheckCircle2, ShoppingBag } from 'lucide-react';

export default function MyBookingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const appointments = JSON.parse(localStorage.getItem('ayucare_appointments') || '[]');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative max-h-[85vh] flex flex-col">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-900">My Saved Bookings</h3>
              <p className="text-xs text-slate-500 font-medium">Appointments & Services Tracker</p>
            </div>
          </div>

          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3">
          {appointments.length === 0 ? (
            <div className="text-center py-10 text-slate-500">
              <p className="text-sm font-semibold">No saved appointments found yet.</p>
              <p className="text-xs text-slate-400 mt-1">Book a doctor slot to track requests here.</p>
            </div>
          ) : (
            appointments.map((apt, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1 shadow-sm">
                <div className="flex items-center justify-between text-sm font-extrabold text-slate-900">
                  <span>{apt.doctorName}</span>
                  <span className="text-teal-700 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Confirmed
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-medium">Specialty: {apt.specialty} • Fee: {apt.fee}</div>
                <div className="text-xs text-slate-500">Patient: {apt.patientName} ({apt.patientPhone})</div>
                <div className="text-[11px] text-slate-400 pt-1">Booked on: {apt.date}</div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
