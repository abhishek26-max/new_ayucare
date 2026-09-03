import React, { useState } from 'react';
import { X, Watch, HeartPulse, Activity, Moon, Flame, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function SmartWearableModal({ isOpen, onClose }) {
  const [isSyncing, setIsSyncing] = useState(false);
  const [vitals, setVitals] = useState({
    heartRate: 72,
    spo2: 98,
    bp: '120/80',
    steps: 6420,
    sleep: '7.5 hrs',
    calories: '420 kcal'
  });

  if (!isOpen) return null;

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setVitals({
        heartRate: Math.floor(68 + Math.random() * 10),
        spo2: Math.floor(97 + Math.random() * 3),
        bp: `${Math.floor(118 + Math.random() * 6)}/${Math.floor(78 + Math.random() * 4)}`,
        steps: Math.floor(6500 + Math.random() * 500),
        sleep: '7.8 hrs',
        calories: `${Math.floor(430 + Math.random() * 40)} kcal`
      });
      setIsSyncing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <Watch className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">Smart Wearable Vitals</h3>
            <p className="text-xs text-slate-500 font-medium">Real-time Bluetooth Wearable Sync</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-rose-600 font-bold text-xs">
              <HeartPulse className="w-4 h-4 animate-pulse" /> Heart Rate
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{vitals.heartRate} <span className="text-xs font-normal text-slate-500">BPM</span></div>
            <span className="text-[10px] bg-rose-100 text-rose-800 font-extrabold px-2 py-0.5 rounded-full inline-block">Normal</span>
          </div>

          <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-blue-600 font-bold text-xs">
              <Activity className="w-4 h-4" /> SpO2 Oxygen
            </div>
            <div className="text-2xl font-extrabold text-slate-900">{vitals.spo2}%</div>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded-full inline-block">Optimal</span>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 border border-teal-200 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-teal-700 font-bold text-xs">
              <Activity className="w-4 h-4" /> Blood Pressure
            </div>
            <div className="text-xl font-extrabold text-slate-900">{vitals.bp} <span className="text-[10px] text-slate-500 font-normal">mmHg</span></div>
            <span className="text-[10px] bg-teal-100 text-teal-800 font-extrabold px-2 py-0.5 rounded-full inline-block">Healthy</span>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-center space-y-1">
            <div className="flex items-center justify-center gap-1.5 text-indigo-600 font-bold text-xs">
              <Moon className="w-4 h-4" /> Sleep Duration
            </div>
            <div className="text-xl font-extrabold text-slate-900">{vitals.sleep}</div>
            <span className="text-[10px] bg-indigo-100 text-indigo-800 font-extrabold px-2 py-0.5 rounded-full inline-block">Restful</span>
          </div>

        </div>

        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/25 flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
          <span>{isSyncing ? 'Syncing Smartwatch...' : 'Sync Live Device Vitals'}</span>
        </button>

      </div>
    </div>
  );
}
