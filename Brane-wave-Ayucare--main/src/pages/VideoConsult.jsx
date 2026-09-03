import React, { useState, useEffect, useRef } from 'react';
import { Video, PhoneCall, Clock, CheckCircle2, RefreshCw } from 'lucide-react';

export default function VideoConsult() {
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Rahul Sharma (Physician)');
  const [isCallActive, setIsCallActive] = useState(false);
  const [appointmentId, setAppointmentId] = useState('Not Started');
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isCallActive) {
      timerRef.current = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isCallActive]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const startCall = () => {
    const newId = 'APT-VID-' + Math.floor(1000 + Math.random() * 9000);
    setAppointmentId(newId);
    setIsCallActive(true);
    setSeconds(0);

    const domain = 'meet.jit.si';
    const roomName = 'Ayucare_Consult_' + Math.random().toString(36).substring(2, 9);
    const options = {
      roomName,
      width: '100%',
      height: '100%',
      parentNode: document.querySelector('#jitsi-container'),
      userInfo: { displayName: 'Patient (Ayucare Client)' }
    };

    if (window.JitsiMeetExternalAPI) {
      new window.JitsiMeetExternalAPI(domain, options);
    }
  };

  const endCall = () => {
    setIsCallActive(false);
    const container = document.querySelector('#jitsi-container');
    if (container) container.innerHTML = '';
  };

  return (
    <div className="space-y-8 py-8 max-w-5xl mx-auto">
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Live Telehealth Video Consultation</h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">WebRTC Encrypted 1-on-1 consultation with verified top specialists across India.</p>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-xl flex flex-col min-h-[580px]">
        
        {/* Controls Header */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">Ayucare Tele-Consultation</h3>
              <p className="text-xs text-slate-500 font-medium">Code: <span className="text-teal-700 font-bold">{appointmentId}</span></p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-teal-800 bg-teal-50 px-3 py-1.5 rounded-xl border border-teal-200 font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>Duration: {formatTime(seconds)}</span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDoctor}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              disabled={isCallActive}
              className="bg-white border border-slate-300 text-slate-900 text-xs px-3 py-2 rounded-xl focus:outline-none font-bold"
            >
              <option value="Dr. Rahul Sharma (Physician)">Dr. Rahul Sharma (Physician)</option>
              <option value="Dr. Neha Verma (Gynecologist)">Dr. Neha Verma (Gynecologist)</option>
              <option value="Dr. Amit Singh (Orthopedic)">Dr. Amit Singh (Orthopedic)</option>
              <option value="Dr. Vikram Patel (Cardiologist)">Dr. Vikram Patel (Cardiologist)</option>
            </select>

            {!isCallActive ? (
              <button
                onClick={startCall}
                className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/20 flex items-center gap-1.5"
              >
                <Video className="w-4 h-4" />
                <span>Start Video Call</span>
              </button>
            ) : (
              <button
                onClick={endCall}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-xs shadow-md shadow-red-600/20"
              >
                End Call
              </button>
            )}

            <a
              href="tel:108"
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-1.5"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call 108 Emergency</span>
            </a>
          </div>
        </div>

        {/* Video Frame Area */}
        <div id="jitsi-container" className="flex-1 bg-slate-900 flex items-center justify-center min-h-[460px]">
          {!isCallActive && (
            <div className="text-center p-8 space-y-4 max-w-md">
              <div className="w-20 h-20 rounded-3xl bg-teal-500/20 border border-teal-500/40 flex items-center justify-center text-teal-400 mx-auto">
                <Video className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-extrabold text-white">Ready for Consultation</h3>
              <p className="text-xs text-slate-300 font-medium">Select doctor above and click "Start Video Call" for instant WebRTC video session.</p>
              <a
                href="tel:108"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 border border-teal-500/40 text-teal-300 text-xs font-extrabold hover:bg-slate-700"
              >
                <PhoneCall className="w-4 h-4" /> 108 Emergency Hotline
              </a>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
