import React, { useState } from 'react';
import { X, Heart, Calendar, Sparkles, Stethoscope, PhoneCall } from 'lucide-react';

export default function WomensHealthModal({ isOpen, onClose }) {
  const [lastPeriod, setLastPeriod] = useState('2026-08-20');
  const [cycleLength, setCycleLength] = useState(28);
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const calculateCycle = (e) => {
    e.preventDefault();
    const date = new Date(lastPeriod);
    
    // Next period date
    const nextPeriod = new Date(date);
    nextPeriod.setDate(nextPeriod.getDate() + parseInt(cycleLength));

    // Ovulation date (approx 14 days before next period)
    const ovulationDate = new Date(nextPeriod);
    ovulationDate.setDate(ovulationDate.getDate() - 14);

    // Fertile window (3 days before to 1 day after ovulation)
    const fertileStart = new Date(ovulationDate);
    fertileStart.setDate(fertileStart.getDate() - 3);

    const fertileEnd = new Date(ovulationDate);
    fertileEnd.setDate(fertileEnd.getDate() + 1);

    setResult({
      nextPeriod: nextPeriod.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      ovulation: ovulationDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      fertileWindow: `${fertileStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${fertileEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-pink-50 border border-pink-200 flex items-center justify-center text-pink-600">
            <Heart className="w-6 h-6 fill-pink-500 text-pink-500" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">Women's Health & Ovulation Tracker</h3>
            <p className="text-xs text-slate-500 font-medium">Cycle Calculator & Gynecologist Consultation</p>
          </div>
        </div>

        <form onSubmit={calculateCycle} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">First Day of Last Period</label>
            <input
              type="date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-pink-600 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Average Cycle Length (Days)</label>
            <select
              value={cycleLength}
              onChange={(e) => setCycleLength(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-pink-600 font-bold"
            >
              <option value="25">25 Days</option>
              <option value="28">28 Days (Standard)</option>
              <option value="30">30 Days</option>
              <option value="32">32 Days</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 text-white font-extrabold text-xs shadow-md shadow-pink-600/30"
          >
            Calculate Fertile Window & Next Period
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 rounded-2xl bg-pink-50/80 border border-pink-200 space-y-2">
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5 text-pink-700">
              <Sparkles className="w-4 h-4 text-pink-600" /> Cycle Estimation Results
            </h4>
            <div className="text-xs space-y-1 text-slate-700 font-medium">
              <p><strong>Next Period:</strong> {result.nextPeriod}</p>
              <p><strong>Estimated Ovulation:</strong> {result.ovulation}</p>
              <p><strong>Fertile Window:</strong> {result.fertileWindow}</p>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-slate-100">
          <a
            href="https://wa.me/919569141861?text=Consultation%20Request%20for%20Gynecologist%20Dr.%20Neha%20Verma"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm"
          >
            <Stethoscope className="w-4 h-4 text-pink-400" />
            <span>Consult Top Gynecologist Specialist (Dr. Neha Verma)</span>
          </a>
        </div>

      </div>
    </div>
  );
}
