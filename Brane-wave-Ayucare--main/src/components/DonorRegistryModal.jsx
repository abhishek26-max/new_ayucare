import React, { useState } from 'react';
import { X, Award, CheckCircle2, ShieldCheck, HeartHandshake, Download } from 'lucide-react';

export default function DonorRegistryModal({ isOpen, onClose }) {
  const [donorPass, setDonorPass] = useState(null);

  if (!isOpen) return null;

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.donorName.value;
    const bloodGroup = e.target.bloodGroup.value;
    const phone = e.target.phone.value;
    const organDonation = e.target.organDonation.checked;

    const passData = {
      id: 'DONOR-' + Math.floor(10000 + Math.random() * 90000),
      name,
      bloodGroup,
      phone,
      organDonation: organDonation ? 'Voluntary Eye & Organ Donor' : 'Blood Donor Only',
      issueDate: new Date().toLocaleDateString()
    };

    setDonorPass(passData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative max-h-[85vh] flex flex-col">
        
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">Ayucare Voluntary Donor Registry</h3>
            <p className="text-xs text-slate-500 font-medium">Digital Blood & Organ Donor Pledge Pass</p>
          </div>
        </div>

        {!donorPass ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Donor Name</label>
              <input type="text" name="donorName" required placeholder="Full Name" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
              <select name="bloodGroup" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold">
                <option value="O+">O Positive (Universal Receiver)</option>
                <option value="O-">O Negative (Universal Donor)</option>
                <option value="A+">A Positive</option>
                <option value="B+">B Positive</option>
                <option value="AB+">AB Positive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact Mobile</label>
              <input type="tel" name="phone" required placeholder="Mobile Number" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-medium" />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input type="checkbox" id="organDonation" name="organDonation" className="w-4 h-4 text-rose-600 rounded" />
              <label htmlFor="organDonation" className="text-xs font-extrabold text-slate-800">Pledge Eye & Organ Donation after life</label>
            </div>

            <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-extrabold text-xs shadow-md shadow-rose-600/30">
              Register Pledge & Issue Digital Donor Pass
            </button>
          </form>
        ) : (
          <div className="space-y-4 text-center">
            {/* Digital Donor Pass Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-rose-600 to-red-700 text-white text-left space-y-4 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-rose-400/50 pb-3">
                <span className="font-extrabold text-base tracking-tight">AYUCARE DONOR PASS</span>
                <span className="text-[10px] bg-white/20 font-bold px-2 py-0.5 rounded-full">{donorPass.id}</span>
              </div>

              <div className="space-y-1">
                <span className="block text-[10px] uppercase font-bold text-rose-200">Donor Name</span>
                <h4 className="text-xl font-extrabold">{donorPass.name}</h4>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                <div>
                  <span className="block text-[10px] uppercase font-bold text-rose-200">Blood Group</span>
                  <span className="font-extrabold text-sm text-yellow-300">{donorPass.bloodGroup}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase font-bold text-rose-200">Pledge Type</span>
                  <span className="font-extrabold text-xs">{donorPass.organDonation}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                alert(`📥 Digital Ayucare Donor Pass Card (${donorPass.id}) downloaded to your device!`);
                onClose();
              }}
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> Download Donor Pass PDF
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
