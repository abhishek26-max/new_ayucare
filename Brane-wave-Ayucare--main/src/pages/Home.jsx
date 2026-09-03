import React from 'react';
import { 
  Stethoscope, 
  Truck, 
  ShoppingBag, 
  Video, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  PhoneCall, 
  Sparkles,
  ArrowRight,
  HeartPulse,
  Activity,
  Globe,
  AlertTriangle,
  Watch,
  TestTube,
  Droplets,
  Leaf,
  Bot,
  FolderHeart,
  BellRing,
  Building2,
  HeartHandshake
} from 'lucide-react';

export default function Home({ 
  setActiveTab, 
  onOpenBmi, 
  onOpenWearable, 
  onOpenLabTest, 
  onOpenBloodBank, 
  onOpenAyurveda,
  onOpenLocker,
  onOpenPills,
  onOpenBeds,
  onOpenDonor
}) {
  const featureCards = [
    {
      id: 'bmi',
      title: 'BMI Calculator',
      desc: 'Enter your height and weight to instantly check your Body Mass Index (BMI). See which category you fall into — underweight, healthy, overweight, or obese — and get simple guidance on what it means for your health.',
      icon: Activity,
      iconBg: 'bg-amber-50 border-amber-200 text-amber-600',
      actionLabel: 'Open',
      onClick: () => { window.location.href = 'https://sweet-trifle-eec51b.netlify.app/'; }
    },
    {
      id: 'doctors',
      title: 'Doctor Appointment',
      desc: 'Browse verified doctors by specialty and availability across India, then book a slot that fits your schedule. Get instant WhatsApp confirmation and reminders so you never miss a visit.',
      icon: Stethoscope,
      iconBg: 'bg-teal-50 border-teal-200 text-teal-700',
      actionLabel: 'Open',
      onClick: () => { window.location.href = 'https://doctor-appointment111.onrender.com/'; }
    },
    {
      id: 'pharmacy',
      title: 'Medicine Order',
      desc: 'Search for your prescribed medicines, add them to your cart, and place an order in a few taps. Track your delivery and get your genuine medicines at your doorstep on time.',
      icon: ShoppingBag,
      iconBg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      actionLabel: 'Open',
      onClick: () => { window.location.href = 'https://ayucare-medicine-3.onrender.com/'; }
    },
    {
      id: 'wearable',
      title: 'Smart Healthcare Device',
      desc: 'Pair your smartwatch or wearable with Ayucare to monitor heart rate, oxygen level (SpO2), blood pressure, and sleep score in real time. Keep a running history of your vitals.',
      icon: Watch,
      iconBg: 'bg-blue-50 border-blue-200 text-blue-700',
      actionLabel: 'Open',
      onClick: onOpenWearable
    },
    {
      id: 'labtest',
      title: 'Lab Test & Pathology',
      desc: 'Book certified NABL lab packages and blood tests with free home sample collection. Receive digital lab report PDFs directly on your dashboard within 24 hours.',
      icon: TestTube,
      iconBg: 'bg-purple-50 border-purple-200 text-purple-700',
      actionLabel: 'Open',
      onClick: onOpenLabTest
    },
    {
      id: 'locker',
      title: 'Digital Health Locker',
      desc: 'Store and manage encrypted prescription PDFs, pathology lab reports, and medical history. ABDM compliant 256-bit secure cloud storage with instant download.',
      icon: FolderHeart,
      iconBg: 'bg-cyan-50 border-cyan-200 text-cyan-700',
      actionLabel: 'Open',
      onClick: onOpenLocker
    },
    {
      id: 'pills',
      title: 'Daily Pill & Water Tracker',
      desc: 'Set morning, afternoon, and night medicine reminders with audio alerts. Track daily water hydration goals and mark tablets as taken in real-time.',
      icon: BellRing,
      iconBg: 'bg-amber-50 border-amber-200 text-amber-700',
      actionLabel: 'Open',
      onClick: onOpenPills
    },
    {
      id: 'beds',
      title: 'Hospital Bed & ICU Finder',
      desc: 'Real-time bed availability tracker across top super-specialty hospitals. Reserve General, Oxygen, and Ventilator ICU beds immediately.',
      icon: Building2,
      iconBg: 'bg-rose-50 border-rose-200 text-rose-600',
      actionLabel: 'Open',
      onClick: onOpenBeds
    },
    {
      id: 'donor',
      title: 'Organ & Blood Donor Registry',
      desc: 'Register as a voluntary blood or organ donor pledge member. Issue and download your verified digital Ayucare Donor Pass Card instantly.',
      icon: HeartHandshake,
      iconBg: 'bg-red-50 border-red-200 text-red-600',
      actionLabel: 'Open',
      onClick: onOpenDonor
    },
    {
      id: 'ai',
      title: 'Ayucare Chatbot',
      desc: 'Get 24/7 symptom guidance in Hindi, Hinglish, English, Marathi, Bengali & 5+ Indian languages. Speak via voice mic or type for instant empathetic medical advice.',
      icon: Bot,
      iconBg: 'bg-indigo-50 border-indigo-200 text-indigo-700',
      actionLabel: 'Open',
      onClick: () => setActiveTab('ai')
    }
  ];

  return (
    <div className="space-y-14 py-8">
      
      {/* ORIGINAL HERO SECTION - LIGHT MINT BACKDROP MATCHING DEPLOYED SCREENSHOT */}
      <section className="relative overflow-hidden rounded-3xl bg-teal-50/70 border border-teal-100/90 p-8 sm:p-12 lg:p-14 shadow-sm">
        
        <div className="relative z-10 grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100/90 border border-teal-200 text-teal-800 text-xs font-extrabold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
              <span>24/7 DIGITAL HEALTHCARE PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Healthcare Made <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-500">
                Simple, Fast & Reliable
              </span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              Book certified specialist doctors, dispatch GPS-tracked ambulances, order genuine medicines, and monitor vitals with Ayucare Chatbot assistance.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => { window.location.href = 'https://doctor-appointment111.onrender.com/'; }}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-sm shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
              >
                <Stethoscope className="w-5 h-5" />
                <span>Book Doctor Slot →</span>
              </button>

              <button
                onClick={() => setActiveTab('ambulance')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-extrabold text-sm shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-5 h-5 text-red-600" />
                <span>Emergency Ambulance</span>
              </button>
            </div>

            {/* Quick Badges */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-2 text-xs font-extrabold text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>500+ Verified Doctors</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                <span>Under 10-Min Response</span>
              </div>
            </div>

          </div>

          {/* Right Card Widget */}
          <div className="lg:col-span-5">
            <div className="p-7 rounded-3xl bg-white text-slate-900 border border-slate-100 shadow-xl space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700 shadow-sm">
                  <HeartPulse className="w-6 h-6 animate-pulse" />
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-200">
                  ● Live Active
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Instant AI Symptom Analysis</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Speak or type in Hindi, Hinglish, English, Marathi & 5+ Indian languages for safe health guidance.
                </p>
              </div>

              <button
                onClick={() => { window.location.href = 'https://sweet-trifle-eec51b.netlify.app/'; }}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Activity className="w-4 h-4 text-teal-400" />
                <span>Check BMI & Health Score</span>
              </button>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">EMERGENCY CONTACT</p>
                  <p className="text-sm font-extrabold text-slate-900">WhatsApp & Call: 9569141861</p>
                </div>
                <a href="tel:+919569141861" className="p-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md shadow-red-600/30">
                  <PhoneCall className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* HEALTHCARE PLATFORM FEATURES GRID */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold text-slate-900">Ayucare Health Services & Real-World Modules</h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto font-medium">Explore all integrated health monitoring, doctor booking, hospital beds, and digital health locker features.</p>
        </div>

        {/* 4-COLUMN RESPONSIVE FEATURE CARD GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((card) => {
            const Icon = card.icon;
            return (
              <div 
                key={card.id} 
                className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-teal-500 transition-all duration-300 flex flex-col justify-between space-y-5 shadow-sm hover:shadow-xl group"
              >
                <div className="space-y-4">
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center ${card.iconBg} shadow-sm group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="font-extrabold text-xl text-slate-900 group-hover:text-teal-700 transition-colors mb-2">
                      {card.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100">
                  <button
                    onClick={card.onClick}
                    className="px-5 py-2 rounded-xl bg-white hover:bg-teal-700 text-teal-700 hover:text-white border-2 border-teal-600 font-extrabold text-xs shadow-sm transition-all duration-200 flex items-center gap-1.5"
                  >
                    <span>{card.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* STATS COUNTER */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
          <div className="text-3xl font-extrabold text-teal-700">500+</div>
          <div className="text-xs text-slate-600 font-bold">Consultations Completed</div>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
          <div className="text-3xl font-extrabold text-cyan-700">10+</div>
          <div className="text-xs text-slate-600 font-bold">Verified Network Hospitals</div>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
          <div className="text-3xl font-extrabold text-red-600">10+</div>
          <div className="text-xs text-slate-600 font-bold">GPS Ambulances Ready</div>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-sm">
          <div className="text-3xl font-extrabold text-emerald-700">200+</div>
          <div className="text-xs text-slate-600 font-bold">Happy Patients</div>
        </div>
      </section>

      {/* WHO HEALTH CHALLENGES SECTION */}
      <section className="p-8 rounded-3xl bg-white border border-slate-200 space-y-8 shadow-md">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full text-amber-900 text-xs font-extrabold mb-2">
              <Globe className="w-3.5 h-3.5 text-amber-700" /> WHO Healthcare Challenges
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">Global Health Issues & Ayucare Solutions</h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md font-medium">Addressing critical healthcare gaps identified in WHO reports across India.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
            <h4 className="font-extrabold text-slate-900 text-base">Healthcare Access Gap</h4>
            <p className="text-xs text-slate-600 font-medium">WHO Report: 400M+ people lack access to essential health services.</p>
            <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs font-bold text-teal-800">
              ✓ Ayucare Solution: 500+ verified doctors accessible 24/7 via video and chat.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
            <h4 className="font-extrabold text-slate-900 text-base">Emergency Response Delays</h4>
            <p className="text-xs text-slate-600 font-medium">WHO Report: Ambulance delays cause 1M+ preventable deaths yearly.</p>
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-rose-800">
              ✓ Ayucare Solution: Browser GPS tracking with avg 10 min ambulance response.
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-sm">
            <h4 className="font-extrabold text-slate-900 text-base">Medicine Accessibility</h4>
            <p className="text-xs text-slate-600 font-medium">WHO Report: 2B+ people lack timely access to essential medicines.</p>
            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs font-bold text-purple-800">
              ✓ Ayucare Solution: 2-hour home delivery for 100% genuine prescribed medicines.
            </div>
          </div>
        </div>
      </section>

      {/* EMERGENCY BANNER */}
      <section className="p-8 rounded-3xl bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-extrabold">
            <AlertTriangle className="w-4 h-4 animate-bounce" /> Medical Emergency 24/7
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold">Need Immediate Assistance?</h3>
          <p className="text-xs sm:text-sm text-red-100 max-w-xl font-medium">Our emergency response team is live on WhatsApp and phone hotline.</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap justify-center">
          <a
            href="https://wa.me/919569141861"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-2xl bg-white text-red-600 font-extrabold text-sm shadow-xl hover:bg-red-50 transition-all flex items-center gap-2"
          >
            <span>WhatsApp 9569141861</span>
          </a>
          <a
            href="tel:+919569141861"
            className="px-6 py-3.5 rounded-2xl bg-slate-900 text-white font-extrabold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 shadow-md"
          >
            <PhoneCall className="w-4 h-4" /> Call 9569141861
          </a>
        </div>
      </section>

    </div>
  );
}