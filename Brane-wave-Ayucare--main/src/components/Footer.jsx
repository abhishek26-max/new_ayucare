import React from 'react';
import { Heart, PhoneCall, Mail, MapPin, ShieldCheck, Award, Clock, Target, Users } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const teamMembers = [
    {
      name: 'Abhishek Tiwari',
      role: 'Team Leader',
      image: '/images/team_abhishek.jpg'
    },
    {
      name: 'Deepali',
      role: 'Frontend Developer',
      image: '/images/team_deepali.jpg'
    },
    {
      name: 'Saurabh Pandey',
      role: 'Backend Developer',
      image: '/images/team_saurabh.jpg'
    },
    {
      name: 'Kashish',
      role: 'UI/UX Designer',
      image: '/images/team_kashish.jpg'
    }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/20">
                <Heart className="w-6 h-6 text-slate-950 fill-slate-950" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">Ayucare</span>
            </div>
            
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Your trusted 24/7 digital healthcare partner across India. Connecting patients with certified doctors, GPS emergency ambulances, online pharmacy, and Sarvam AI medical assistance.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                <span>100% Verified Care</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800 border border-slate-700/80 rounded-xl px-3 py-2 text-xs font-semibold text-slate-200">
                <Award className="w-4 h-4 text-teal-400" />
                <span>WHO Aligned</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Services */}
          <div>
            <h4 className="font-extrabold text-white text-sm mb-4 uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5 text-sm">
              <li><button onClick={() => setActiveTab('doctors')} className="hover:text-teal-400 transition-colors">Book Verified Doctor</button></li>
              <li><button onClick={() => setActiveTab('ambulance')} className="hover:text-teal-400 transition-colors">GPS Ambulance Dispatch</button></li>
              <li><button onClick={() => setActiveTab('pharmacy')} className="hover:text-teal-400 transition-colors">Online Pharmacy Delivery</button></li>
              <li><button onClick={() => setActiveTab('video')} className="hover:text-teal-400 transition-colors">WebRTC Video Consult</button></li>
              <li><button onClick={() => setActiveTab('ai')} className="hover:text-teal-400 transition-colors">Multilingual AI Assistant</button></li>
            </ul>
          </div>

          {/* Column 3: Emergency Helplines */}
          <div>
            <h4 className="font-extrabold text-white text-sm mb-4 uppercase tracking-wider">Emergency Helplines</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="tel:108" className="text-teal-400 font-extrabold hover:underline flex items-center gap-2"><PhoneCall className="w-4 h-4" /> 108 Emergency Helpline</a></li>
              <li><a href="tel:108" className="hover:text-red-400 transition-colors font-semibold">108 - National Ambulance</a></li>
              <li><a href="tel:112" className="hover:text-red-400 transition-colors font-semibold">112 - National Emergency</a></li>
              <li><a href="tel:100" className="hover:text-slate-200 transition-colors font-semibold">100 - Police Department</a></li>
              <li><a href="tel:181" className="hover:text-purple-400 transition-colors font-semibold">181 - Women Helpline</a></li>
            </ul>
          </div>

          {/* Column 4: Contact & Location */}
          <div>
            <h4 className="font-extrabold text-white text-sm mb-4 uppercase tracking-wider">Headquarters</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-teal-400 flex-shrink-0 mt-1" />
                <span>New Delhi & Pan-India Network</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>support@ayucare.in</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-teal-400 flex-shrink-0" />
                <span>24 hours / 7 days active</span>
              </div>
            </div>
          </div>

        </div>

        {/* OUR MISSION & MEET TEAM BRAIN_WAVE SECTION */}
        <div className="my-12 py-10 px-6 sm:px-10 rounded-3xl bg-slate-950 border border-slate-800 space-y-12 shadow-2xl">
          
          {/* Our Mission */}
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-teal-400 tracking-tight flex items-center justify-center gap-2">
              Our Mission
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium">
              Our mission is to make healthcare simple, fast and accessible by connecting patients with trusted doctors through technology.
            </p>
          </div>

          {/* Meet Team Brain_Wave */}
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight flex items-center justify-center gap-2">
                Meet Team Brain_Wave
              </h3>
            </div>

            {/* 4 Team Member Cards Grid - ORIGINAL PHOTOS FITTED 100% INSIDE CIRCLE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {teamMembers.map((m, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-md hover:shadow-xl hover:border-teal-500 transition-all group">
                  <div className="w-28 h-28 mx-auto rounded-full overflow-hidden border-4 border-teal-500 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center bg-white">
                    <img
                      src={m.image}
                      alt={m.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-700 transition-colors">{m.name}</h4>
                    <p className="text-xs text-slate-600 font-bold">{m.role}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-slate-400 font-medium max-w-2xl mx-auto pt-2">
              We are four passionate BCA 3rd Year students who developed <strong className="text-white">AyuCare</strong> to simplify healthcare services through modern web technologies.
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Ayucare Healthcare Pvt. Ltd. • Team Brain_Wave • All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-teal-400 transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:text-teal-400 transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:text-teal-400 transition-colors">WHO Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
