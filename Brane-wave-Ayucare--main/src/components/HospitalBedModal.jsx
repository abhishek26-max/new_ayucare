import React, { useState } from 'react';
import { X, Building2, PhoneCall, Activity, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function HospitalBedModal({ isOpen, onClose }) {
  const [hospitals] = useState([
    {
      name: 'Apollo Super Specialty Hospital',
      address: 'Central Medical District',
      phone: '108',
      generalBeds: 14,
      icuBeds: 4,
      ventilators: 2,
      status: 'High Demand'
    },
    {
      name: 'City Trauma & Emergency Center',
      address: 'North City Hub',
      phone: '108',
      generalBeds: 28,
      icuBeds: 8,
      ventilators: 5,
      status: 'Available'
    },
    {
      name: 'Regency Healthcare Center',
      address: 'South Medical Complex',
      phone: '108',
      generalBeds: 9,
      icuBeds: 2,
      ventilators: 1,
      status: 'Limited Beds'
    },
    {
      name: 'Apex Multi-Specialty Institute',
      address: 'East Zone Health Campus',
      phone: '108',
      generalBeds: 19,
      icuBeds: 6,
      ventilators: 3,
      status: 'Available'
    }
  ]);

  if (!isOpen) return null;

  const handleBookBed = (hospital) => {
    const msg = `🚨 *AYUCARE EMERGENCY HOSPITAL BED RESERVATION*%0A%0A*Hospital:* ${hospital.name}%0A*Location:* ${hospital.address}%0A*Requested:* Emergency ICU / Oxygen Bed Reservation%0A%0APlease process immediate booking request.`;
    window.open(`https://wa.me/919569141861?text=${msg}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full shadow-2xl relative max-h-[85vh] flex flex-col">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">Real-time ICU & Hospital Bed Tracker</h3>
            <p className="text-xs text-slate-500 font-medium">Pan-India Live General, Oxygen & Ventilator Bed Availability</p>
          </div>
        </div>

        {/* Hospital List */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {hospitals.map((h, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm hover:border-rose-400 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-extrabold text-base text-slate-900">{h.name}</h4>
                  <p className="text-xs text-slate-500 font-medium">{h.address}</p>
                </div>
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                  h.status === 'Available' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}>
                  {h.status}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs pt-1">
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase">General Beds</span>
                  <span className="text-sm font-extrabold text-slate-900">{h.generalBeds}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="block text-[10px] text-rose-600 font-bold uppercase">ICU Beds</span>
                  <span className="text-sm font-extrabold text-rose-600">{h.icuBeds}</span>
                </div>
                <div className="p-2 rounded-xl bg-white border border-slate-200">
                  <span className="block text-[10px] text-teal-700 font-bold uppercase">Ventilators</span>
                  <span className="text-sm font-extrabold text-teal-700">{h.ventilators}</span>
                </div>
              </div>

              <button
                onClick={() => handleBookBed(h)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Reserve Emergency Bed via WhatsApp</span>
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
