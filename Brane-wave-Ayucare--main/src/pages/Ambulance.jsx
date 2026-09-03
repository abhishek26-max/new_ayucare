import React, { useState } from 'react';
import { Truck, MapPin, PhoneCall, AlertTriangle, ShieldCheck, X, Navigation } from 'lucide-react';

export default function Ambulance() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAmbulanceSubmit = (e) => {
    e.preventDefault();
    const name = e.target.patientName.value;
    const phone = e.target.patientPhone.value;
    const email = e.target.patientEmail.value;
    const details = e.target.emergencyDetails.value;

    const dispatchWithCoords = (lat, lon) => {
      const mapUrl = lat && lon ? `https://www.google.com/maps?q=${lat},${lon}` : 'Location permission not granted';
      const whatsappNumber = '919569141861';

      const rawMsg =
        `🚑 *AYUCARE EMERGENCY AMBULANCE DISPATCH*\n\n` +
        `*Patient Name:* ${name}\n` +
        `*Phone:* ${phone}\n` +
        `*Email:* ${email}\n\n` +
        `*Emergency Situation:* ${details}\n\n` +
        `*Live GPS Coordinates Map:*\n${mapUrl}`;

      const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(rawMsg)}`;
      window.open(waUrl, '_blank');
      alert(`🚨 Emergency Alert Transmitted to WhatsApp (+${whatsappNumber})! Response vehicle dispatched.`);
      setIsModalOpen(false);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => dispatchWithCoords(pos.coords.latitude, pos.coords.longitude),
        () => dispatchWithCoords(null, null),
        { timeout: 6000 }
      );
    } else {
      dispatchWithCoords(null, null);
    }
  };

  const handleNearbyHospitals = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          window.open(`https://www.google.com/maps/search/nearby+hospitals/@${pos.coords.latitude},${pos.coords.longitude},14z`, '_blank');
        },
        () => {
          window.open(`https://www.google.com/maps/search/hospitals+near+me`, '_blank');
        }
      );
    } else {
      window.open(`https://www.google.com/maps/search/hospitals+near+me`, '_blank');
    }
  };

  return (
    <div className="space-y-12 py-8">
      
      {/* HERO */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-red-600 via-rose-600 to-orange-600 text-white p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-extrabold">
            <AlertTriangle className="w-4 h-4 animate-bounce" /> 24x7 Live GPS Dispatch
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">Emergency Ambulance Services</h1>
          <p className="text-red-100 text-sm sm:text-base leading-relaxed font-medium">
            GPS-tracked ambulances with trained paramedics and life-saving equipment. Reaching your live location in under 10 minutes.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-4 rounded-2xl bg-white text-red-600 font-extrabold text-sm shadow-xl hover:bg-red-50 transition-all flex items-center gap-2 transform hover:scale-105"
            >
              <Truck className="w-5 h-5" />
              <span>Dispatch Ambulance Now</span>
            </button>

            <a
              href="tel:108"
              className="px-6 py-4 rounded-2xl bg-slate-900 text-white font-extrabold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md"
            >
              <PhoneCall className="w-5 h-5" />
              <span>Call 108 Emergency</span>
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES DUAL GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-red-500 transition-all duration-300 space-y-4 shadow-sm hover:shadow-xl border-l-8 border-l-red-600">
          <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600">
            <Truck className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">GPS Ambulance Dispatch</h2>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Book an ambulance instantly. Your browser GPS location is transmitted directly to our nearest response vehicle for minimal delay.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-600/30"
          >
            Dispatch Ambulance Instantly
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 transition-all duration-300 space-y-4 shadow-sm hover:shadow-xl border-l-8 border-l-teal-600">
          <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <Navigation className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900">Nearby Hospitals Finder</h2>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Locate nearest hospitals and trauma centers around your position using real-time Google Maps integration.
          </p>
          <button
            onClick={handleNearbyHospitals}
            className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/30"
          >
            View Nearby Hospitals Live
          </button>
        </div>
      </div>

      {/* GOVERNMENT HELPLINE GRID */}
      <div className="p-8 rounded-3xl bg-white border border-slate-200 space-y-6 shadow-md">
        <h3 className="text-xl font-extrabold text-slate-900 text-center">Government Life-Saving Helpline Numbers</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <a href="tel:112" className="p-4 rounded-2xl bg-red-50 border border-red-200 text-center hover:bg-red-100 transition-all shadow-sm">
            <strong className="block text-2xl font-extrabold text-red-600">112</strong>
            <span className="text-xs text-slate-700 font-bold">National Emergency</span>
          </a>
          <a href="tel:108" className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-center hover:bg-orange-100 transition-all shadow-sm">
            <strong className="block text-2xl font-extrabold text-orange-600">108</strong>
            <span className="text-xs text-slate-700 font-bold">Ambulance Service</span>
          </a>
          <a href="tel:100" className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center hover:bg-blue-100 transition-all shadow-sm">
            <strong className="block text-2xl font-extrabold text-blue-600">100</strong>
            <span className="text-xs text-slate-700 font-bold">Police Department</span>
          </a>
          <a href="tel:101" className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center hover:bg-amber-100 transition-all shadow-sm">
            <strong className="block text-2xl font-extrabold text-amber-600">101</strong>
            <span className="text-xs text-slate-700 font-bold">Fire Brigade</span>
          </a>
          <a href="tel:181" className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center hover:bg-purple-100 transition-all shadow-sm">
            <strong className="block text-2xl font-extrabold text-purple-600">181</strong>
            <span className="text-xs text-slate-700 font-bold">Women Helpline</span>
          </a>
          <a href="tel:1098" className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center hover:bg-emerald-100 transition-all shadow-sm">
            <strong className="block text-2xl font-extrabold text-emerald-600">1098</strong>
            <span className="text-xs text-slate-700 font-bold">Child Helpline</span>
          </a>
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-extrabold text-red-600 mb-1 flex items-center gap-2">
              <Truck className="w-5 h-5" /> Emergency Dispatch Alert
            </h3>
            <p className="text-xs text-slate-600 mb-4 font-medium">Browser GPS location will be transmitted for rapid vehicle response.</p>

            <form onSubmit={handleAmbulanceSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Patient Name</label>
                <input type="text" name="patientName" required placeholder="Full Patient Name" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-600 font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                <input type="tel" name="patientPhone" required placeholder="Mobile Number" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-600 font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input type="email" name="patientEmail" required placeholder="Email Address" className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-600 font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Medical Condition</label>
                <textarea name="emergencyDetails" rows="3" required placeholder="Describe emergency..." className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-red-600 font-medium"></textarea>
              </div>

              <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-extrabold text-sm shadow-md shadow-red-600/30">
                🚨 Transmit Emergency Alert via WhatsApp
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
