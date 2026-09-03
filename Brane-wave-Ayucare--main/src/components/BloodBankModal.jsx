import React, { useState } from 'react';
import { X, Droplets, PhoneCall, MapPin, Search } from 'lucide-react';

export default function BloodBankModal({ isOpen, onClose }) {
  const [selectedGroup, setSelectedGroup] = useState('All');

  if (!isOpen) return null;

  const bloodBanks = [
    { name: 'Central Red Cross Blood Bank', group: 'A+', location: 'City Center', phone: '108', status: 'Available (14 Units)' },
    { name: 'City Emergency Blood Registry', group: 'O+', location: 'Central Hub', phone: '108', status: 'Available (22 Units)' },
    { name: 'Apex Red Cross Center', group: 'B+', location: 'East District', phone: '108', status: 'Available (9 Units)' },
    { name: 'National Trauma Blood Center', group: 'O-', location: 'North District', phone: '108', status: 'Universal Donor Ready' },
    { name: 'LifeCare Donor Registry', group: 'AB+', location: 'South District', phone: '108', status: 'Available (6 Units)' }
  ];

  const filtered = bloodBanks.filter((b) => selectedGroup === 'All' || b.group === selectedGroup);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative max-h-[85vh] flex flex-col">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <Droplets className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">Blood Bank & Donor Matcher</h3>
            <p className="text-xs text-slate-500 font-medium">Pan-India Verified Donors & Emergency Stock</p>
          </div>
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 text-xs">
          {['All', 'A+', 'O+', 'B+', 'O-', 'AB+'].map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-3 py-1.5 rounded-xl font-extrabold transition-all whitespace-nowrap ${
                selectedGroup === group
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {group}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filtered.map((item, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-sm">
              <div>
                <span className="inline-block bg-rose-100 text-rose-800 text-xs font-extrabold px-2.5 py-0.5 rounded-full mb-1">
                  {item.group}
                </span>
                <h4 className="font-extrabold text-sm text-slate-900">{item.name}</h4>
                <p className="text-xs text-slate-500 font-medium">{item.status}</p>
              </div>

              <a
                href={`https://wa.me/919569141861?text=Urgent%20Blood%20Request%20for%20${item.group}%20at%20${item.name}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm flex items-center gap-1"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Request
              </a>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
