import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Stethoscope, 
  Truck, 
  ShoppingBag, 
  Video, 
  Bot, 
  PhoneCall, 
  History, 
  Menu, 
  X,
  Sparkles,
  User,
  ShieldCheck,
  LogOut
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  cartCount, 
  onOpenHistory,
  adminUser,
  onOpenAdminAuth,
  onAdminLogout
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'doctors', label: 'Doctors', icon: Stethoscope },
    { id: 'ambulance', label: 'Ambulance', icon: Truck, highlight: 'red' },
    { id: 'pharmacy', label: 'Pharmacy', icon: ShoppingBag },
    { id: 'cart', label: 'Cart', icon: ShoppingBag, badge: cartCount },
    { id: 'video', label: 'Video Consult', icon: Video },
    { id: 'ai', label: 'AI Assistant', icon: Bot, isSparkle: true },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-md py-3' 
        : 'bg-white/85 backdrop-blur-sm border-b border-slate-200/60 py-4'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <button 
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-teal-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-600/20 group-hover:scale-105 transition-transform">
            <Heart className="w-6 h-6 text-white fill-white" />
          </div>
          <div className="text-left">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
              Ayucare <span className="text-teal-700 font-extrabold text-[11px] px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200">HEALTH</span>
            </span>
            <span className="block text-[10px] text-slate-500 tracking-wider uppercase font-bold">24X7 DIGITAL HEALTHCARE</span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 shadow-inner">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                  isActive 
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-600/25'
                    : 'text-slate-700 hover:text-teal-700 hover:bg-white/80'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight === 'red' ? 'text-red-500' : 'text-slate-500'}`} />
                <span>{item.label}</span>

                {item.badge > 0 && (
                  <span className="ml-1 bg-teal-600 text-white text-[11px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                    {item.badge}
                  </span>
                )}

                {item.isSparkle && !isActive && (
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Quick Actions & Authentication Pill */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Admin Login / Login Button Pill */}
          {adminUser ? (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <button
                onClick={onOpenHistory}
                className="text-xs font-extrabold text-emerald-900 hover:underline flex items-center gap-1"
                title="Open Admin History Dashboard"
              >
                Admin Panel
              </button>
              <button
                onClick={onAdminLogout}
                className="p-1 text-emerald-700 hover:text-red-600 transition-colors ml-1"
                title="Logout Admin Session"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAdminAuth}
              className="px-3.5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-extrabold transition-all shadow-md shadow-teal-600/20 flex items-center gap-1.5"
            >
              <User className="w-4 h-4" />
              <span>Login / Sign Up</span>
            </button>
          )}



          <a
            href="tel:108"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-xs font-extrabold transition-all shadow-md shadow-red-600/20 flex items-center gap-2"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
            <span>108</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top-4">
          
          {adminUser ? (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-emerald-700" />
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900">Admin Session Active</h4>
                  <p className="text-[10px] text-slate-500">System Administrator</p>
                </div>
              </div>
              <button onClick={onAdminLogout} className="text-xs text-red-600 font-bold px-2 py-1 bg-white rounded-lg border border-red-200">
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={() => { onOpenAdminAuth(); setMobileMenuOpen(false); }}
              className="w-full py-2.5 rounded-xl bg-teal-600 text-white text-xs font-extrabold flex items-center justify-center gap-2 mb-2 shadow-sm"
            >
              <User className="w-4 h-4" />
              <span>Login / Sign Up Account</span>
            </button>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold transition-all ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="bg-teal-600 text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-200">
            <a
              href="tel:108"
              className="w-full py-2.5 rounded-xl bg-red-600 text-white text-xs font-extrabold flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>108</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
