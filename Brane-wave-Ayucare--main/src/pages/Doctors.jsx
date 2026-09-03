import React, { useState } from 'react';
import { Search, Star, Calendar, MapPin, Award, CheckCircle2, X, AlertTriangle } from 'lucide-react';

export default function Doctors({ currentUser }) {
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [bookingError, setBookingError] = useState('');

  const doctorsList = [
    {
      id: 1,
      name: 'Dr. Rahul Sharma',
      specialty: 'Physician',
      hospital: 'City Care Hospital, Kanpur',
      experience: '8 Years',
      fee: '₹300',
      rating: '4.9',
      image: '/images/doctor1.jpg'
    },
    {
      id: 2,
      name: 'Dr. Neha Verma',
      specialty: 'Gynecologist',
      hospital: 'Regency Super Specialty Hospital',
      experience: '10 Years',
      fee: '₹500',
      rating: '4.8',
      image: '/images/doctor2.jpg'
    },
    {
      id: 3,
      name: 'Dr. Amit Singh',
      specialty: 'Orthopedic',
      hospital: 'Apex Ortho Center, Kanpur',
      experience: '12 Years',
      fee: '₹400',
      rating: '4.9',
      image: '/images/doctor3.jpg'
    },
    {
      id: 4,
      name: 'Dr. Pooja Gupta',
      specialty: 'Dermatologist',
      hospital: 'National Derma Institute',
      experience: '6 Years',
      fee: '₹350',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 5,
      name: 'Dr. Ankit Mishra',
      specialty: 'Pediatrician',
      hospital: 'Sunshine Children Hospital',
      experience: '15 Years',
      fee: '₹300',
      rating: '5.0',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 6,
      name: 'Dr. Sunita Rao',
      specialty: 'ENT Specialist',
      hospital: 'Galaxy ENT Clinic, Kanpur',
      experience: '9 Years',
      fee: '₹350',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 7,
      name: 'Dr. Vikram Patel',
      specialty: 'Cardiologist',
      hospital: 'National Heart Institute',
      experience: '18 Years',
      fee: '₹600',
      rating: '5.0',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 8,
      name: 'Dr. Ritu Malhotra',
      specialty: 'Psychologist',
      hospital: 'Mind Care Wellness Institute',
      experience: '7 Years',
      fee: '₹500',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 9,
      name: 'Dr. Rajesh Nambiar',
      specialty: 'Neurologist',
      hospital: 'Max Super Specialty Hospital',
      experience: '14 Years',
      fee: '₹700',
      rating: '4.9',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 10,
      name: 'Dr. Kavita Deshmukh',
      specialty: 'Ophthalmologist',
      hospital: 'Vision Care Eye Hospital',
      experience: '11 Years',
      fee: '₹450',
      rating: '4.8',
      image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 11,
      name: 'Dr. Arvind Saxena',
      specialty: 'Pulmonologist',
      hospital: 'Apollo Chest & Lungs Center',
      experience: '16 Years',
      fee: '₹550',
      rating: '5.0',
      image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=400&auto=format&fit=crop&q=80'
    },
    {
      id: 12,
      name: 'Dr. Meera Agarwal',
      specialty: 'Dentist',
      hospital: 'Smile Craft Dental Clinic',
      experience: '8 Years',
      fee: '₹300',
      rating: '4.7',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80'
    }
  ];

  const specialties = ['All', 'Physician', 'Gynecologist', 'Orthopedic', 'Dermatologist', 'Pediatrician', 'ENT Specialist', 'Cardiologist', 'Psychologist', 'Neurologist', 'Ophthalmologist', 'Pulmonologist', 'Dentist'];

  const filteredDoctors = doctorsList.filter((doc) => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
                          doc.hospital.toLowerCase().includes(search.toLowerCase());
    const matchesSpec = selectedSpecialty === 'All' || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpec;
  });

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setBookingError('');

    const name = e.target.patientName.value.trim();
    const phone = e.target.patientPhone.value.trim();
    const email = e.target.patientEmail.value.trim();
    const symptoms = e.target.symptoms.value.trim();

    // Check Duplicate Booking Rule: 1 user can book 1 doctor only once
    const history = JSON.parse(localStorage.getItem('ayucare_appointments') || '[]');
    const isDuplicate = history.some(apt => {
      const isSameDoctor = apt.doctorName === selectedDoctor.name;
      const isSamePhone = phone && apt.patientPhone === phone;
      const isSameEmail = email && apt.patientEmail?.toLowerCase() === email.toLowerCase();
      return isSameDoctor && (isSamePhone || isSameEmail);
    });

    if (isDuplicate) {
      setBookingError(`Aapne ${selectedDoctor.name} ke saath pehle se appointment book kar rakha hai! Ek user ek doctor se ek hi baar appointment le sakta hai.`);
      return;
    }

    const booking = {
      id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
      doctorName: selectedDoctor.name,
      specialty: selectedDoctor.specialty,
      fee: selectedDoctor.fee,
      patientName: name,
      patientPhone: phone,
      patientEmail: email,
      symptoms,
      date: new Date().toLocaleDateString()
    };

    history.push(booking);
    localStorage.setItem('ayucare_appointments', JSON.stringify(history));

    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
    } catch (err) {}

    // Target WhatsApp destination number for receiving clinic notifications
    const whatsappNumber = '919569141861';
    const rawMessage = 
      `🩺 *Ayucare Doctor Appointment Booking*\n\n` +
      `*Doctor:* ${selectedDoctor.name} (${selectedDoctor.specialty})\n` +
      `*Fee:* ${selectedDoctor.fee}\n\n` +
      `*Patient Name:* ${name}\n` +
      `*Phone:* ${phone}\n` +
      `*Email:* ${email}\n` +
      `*Symptoms:* ${symptoms}\n\n` +
      `*Date:* ${new Date().toLocaleDateString()}`;

    const encodedMsg = encodeURIComponent(rawMessage);
    const waUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMsg}`;
    
    window.open(waUrl, '_blank');
    alert(`Appointment Request Sent for ${selectedDoctor.name}! Opening WhatsApp to send message to ${whatsappNumber}.`);
    setSelectedDoctor(null);
  };

  return (
    <div className="space-y-10 py-8">
      
      {/* Banner */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">Book Certified Specialist Doctors</h1>
        <p className="text-xs sm:text-sm text-slate-600 font-medium">Select top doctors across India for in-clinic or online consultation. Instant WhatsApp confirmation.</p>

        {/* Search Bar */}
        <div className="relative max-w-md mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search doctor, specialty, or hospital..."
            className="w-full bg-white border border-slate-300 rounded-2xl pl-12 pr-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-600 shadow-md font-medium"
          />
        </div>
      </div>

      {/* Specialties Pill Bar */}
      <div className="flex gap-2 overflow-x-auto pb-2 justify-start sm:justify-center text-xs">
        {specialties.map((spec) => (
          <button
            key={spec}
            onClick={() => setSelectedSpecialty(spec)}
            className={`px-4 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${
              selectedSpecialty === spec
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                : 'bg-white border border-slate-200 text-slate-700 hover:text-teal-700 shadow-sm'
            }`}
          >
            {spec}
          </button>
        ))}
      </div>

      {/* Doctors Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDoctors.map((doc) => (
          <div key={doc.id} className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 transition-all duration-300 flex flex-col justify-between space-y-4 group shadow-sm hover:shadow-xl">
            <div className="text-center space-y-3">
              <div className="relative inline-block">
                <img
                  src={doc.image}
                  onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(doc.name)}&background=0d9488&color=fff&size=200`; }}
                  alt={doc.name}
                  className="w-24 h-24 rounded-full object-cover border-2 border-teal-600 mx-auto shadow-md"
                />
                <span className="absolute bottom-0 right-0 bg-amber-50 text-amber-900 border border-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {doc.rating}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-lg text-slate-900 group-hover:text-teal-700 transition-colors">{doc.name}</h3>
                <p className="text-xs font-extrabold text-teal-700">{doc.specialty}</p>
              </div>

              <div className="text-xs text-slate-600 space-y-1 pt-1 font-medium">
                <p className="flex items-center justify-center gap-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> {doc.hospital}</p>
                <p className="flex items-center justify-center gap-1"><Award className="w-3.5 h-3.5 text-slate-400" /> Exp: {doc.experience}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="block text-[10px] text-slate-500 uppercase font-bold">Consultation Fee</span>
                <span className="text-base font-extrabold text-slate-900">{doc.fee}</span>
              </div>

              <button
                onClick={() => { setSelectedDoctor(doc); setBookingError(''); }}
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs shadow-md shadow-teal-600/20 transition-all"
              >
                Book Appointment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedDoctor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
            <button onClick={() => { setSelectedDoctor(null); setBookingError(''); }} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-extrabold text-slate-900 mb-1">Book Appointment Slot</h3>
            <p className="text-xs text-teal-700 mb-4 font-bold">{selectedDoctor.name} • {selectedDoctor.specialty} ({selectedDoctor.fee})</p>

            {bookingError && (
              <div className="p-3 mb-4 rounded-xl bg-red-50 border border-red-200 text-xs font-bold text-red-700 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{bookingError}</span>
              </div>
            )}

            <form onSubmit={handleBookingSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Patient Name</label>
                <input
                  type="text"
                  name="patientName"
                  required
                  defaultValue={currentUser?.name || ''}
                  placeholder="Enter your full name"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  name="patientPhone"
                  required
                  defaultValue={currentUser?.phone || ''}
                  placeholder="Enter mobile number"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  name="patientEmail"
                  required
                  defaultValue={currentUser?.email || ''}
                  placeholder="Enter email address"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Describe Symptoms</label>
                <textarea name="symptoms" rows="3" required placeholder="Describe health issue..." className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600 font-medium"></textarea>
              </div>

              <button type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-sm shadow-md shadow-teal-600/25 hover:from-teal-700 hover:to-emerald-700 transition-all">
                Send WhatsApp Confirmation Request
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
