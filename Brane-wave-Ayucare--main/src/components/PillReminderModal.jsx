import React, { useState } from 'react';
import { X, BellRing, Pill, CheckCircle2, Plus, Clock, Droplets } from 'lucide-react';

export default function PillReminderModal({ isOpen, onClose }) {
  const [reminders, setReminders] = useState([
    { id: 1, name: 'Paracetamol 650mg', time: '08:00 AM (Morning)', dose: '1 Tablet after breakfast', taken: true },
    { id: 2, name: 'Amoxicillin 500mg', time: '02:00 PM (Afternoon)', dose: '1 Capsule after lunch', taken: false },
    { id: 3, name: 'Multivitamin Complex', time: '09:00 PM (Night)', dose: '1 Tablet before sleep', taken: false }
  ]);

  const [waterGlasses, setWaterGlasses] = useState(5);
  const targetGlasses = 8;

  if (!isOpen) return null;

  const toggleReminder = (id) => {
    setReminders(prev => prev.map(r => r.id === id ? { ...r, taken: !r.taken } : r));
  };

  const handleAddMedicine = (e) => {
    e.preventDefault();
    const medName = e.target.medName.value;
    const medTime = e.target.medTime.value;
    const medDose = e.target.medDose.value;

    const newMed = {
      id: Date.now(),
      name: medName,
      time: medTime,
      dose: medDose,
      taken: false
    };

    setReminders([...reminders, newMed]);
    e.target.reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative max-h-[85vh] flex flex-col">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
            <BellRing className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">Daily Pill & Water Tracker</h3>
            <p className="text-xs text-slate-500 font-medium">Timely Medicine & Hydration Notifications</p>
          </div>
        </div>

        {/* Water Hydration Card */}
        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 mb-6 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-blue-700 font-extrabold text-xs">
              <Droplets className="w-4 h-4" /> Water Hydration
            </div>
            <p className="text-sm font-extrabold text-slate-900">{waterGlasses} / {targetGlasses} Glasses Drank</p>
          </div>
          <button
            onClick={() => setWaterGlasses(prev => Math.min(targetGlasses, prev + 1))}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md"
          >
            + 1 Glass
          </button>
        </div>

        {/* Reminders List */}
        <div className="flex-1 overflow-y-auto space-y-3 mb-6 pr-1">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Today's Schedule ({reminders.length})</h4>

          {reminders.map((item) => (
            <div
              key={item.id}
              onClick={() => toggleReminder(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                item.taken
                  ? 'bg-emerald-50/70 border-emerald-300 opacity-80'
                  : 'bg-slate-50 border-slate-200 hover:border-amber-400'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900">{item.name}</span>
                  {item.taken && <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2 py-0.5 rounded-full">Taken</span>}
                </div>
                <p className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" /> {item.time} • {item.dose}
                </p>
              </div>

              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                item.taken ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300'
              }`}>
                {item.taken && <CheckCircle2 className="w-4 h-4" />}
              </div>
            </div>
          ))}
        </div>

        {/* Add New Reminder */}
        <form onSubmit={handleAddMedicine} className="pt-3 border-t border-slate-100 space-y-2">
          <input type="text" name="medName" required placeholder="Medicine Name (e.g. Paracetamol)" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium" />
          <div className="flex gap-2">
            <input type="text" name="medTime" required placeholder="Time (e.g. 08:00 AM)" className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium" />
            <input type="text" name="medDose" required placeholder="Dose (1 tablet)" className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-medium" />
          </div>
          <button type="submit" className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-md">
            + Add Medicine Schedule
          </button>
        </form>

      </div>
    </div>
  );
}
