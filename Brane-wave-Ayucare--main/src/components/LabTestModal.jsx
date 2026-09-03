import React, { useState } from 'react';
import { X, TestTube, CheckCircle2, ShieldCheck, Home } from 'lucide-react';

export default function LabTestModal({ isOpen, onClose }) {
  const [selectedPackage, setSelectedPackage] = useState('Full Body Checkup (₹499)');

  if (!isOpen) return null;

  const handleBooking = (e) => {
    e.preventDefault();
    const name = e.target.patientName.value;
    const phone = e.target.patientPhone.value;
    const address = e.target.address.value;

    const whatsappNumber = '919569141861';
    const msg =
      `🧪 *AYUCARE NABL LAB TEST & HOME SAMPLE COLLECTION*%0A%0A` +
      `*Package Selected:* ${selectedPackage}%0A` +
      `*Patient Name:* ${name}%0A` +
      `*Contact Phone:* ${phone}%0A` +
      `*Home Collection Address:* ${address}%0A%0A` +
      `*Collection Slot:* Tomorrow Morning (7:00 AM - 10:00 AM)`;

    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank');
    alert(`🧪 Home Sample Collection Request Sent for ${selectedPackage}! Details opened in WhatsApp.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
            <TestTube className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">NABL Certified Diagnostic Lab Tests</h3>
            <p className="text-xs text-slate-500 font-medium">Free Pan-India Home Sample Collection</p>
          </div>
        </div>

        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Diagnostic Package</label>
            <select
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-purple-600 font-bold"
            >
              <option value="Full Body Checkup (64 Parameters - ₹499)">Full Body Checkup (64 Parameters - ₹499)</option>
              <option value="Diabetes & Lipid Screening (₹299)">Diabetes & Lipid Screening (₹299)</option>
              <option value="Thyroid Profile T3 T4 TSH (₹199)">Thyroid Profile T3 T4 TSH (₹199)</option>
              <option value="Dengue & Typhoid Panel (₹399)">Dengue & Typhoid Panel (₹399)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name</label>
            <input type="text" name="patientName" required placeholder="Full Name" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-purple-600 font-medium" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Contact Mobile</label>
            <input type="tel" name="patientPhone" required placeholder="Mobile Number" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-purple-600 font-medium" />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Home Collection Address</label>
            <textarea name="address" rows="2" required placeholder="Full Street Address & Pincode..." className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-purple-600 font-medium"></textarea>
          </div>

          <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-xs shadow-md shadow-purple-600/30">
            Book Home Sample Collection via WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
