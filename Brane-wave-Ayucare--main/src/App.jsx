import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import SarvamAiChatbot from './components/SarvamAiChatbot.jsx';
import BmiCalculatorModal from './components/BmiCalculatorModal.jsx';
import AdminAuthModal from './components/AdminAuthModal.jsx';
import AdminHistoryModal from './components/AdminHistoryModal.jsx';

import SmartWearableModal from './components/SmartWearableModal.jsx';
import LabTestModal from './components/LabTestModal.jsx';
import BloodBankModal from './components/BloodBankModal.jsx';
import AyurvedicWellnessModal from './components/AyurvedicWellnessModal.jsx';

import HealthLockerModal from './components/HealthLockerModal.jsx';
import PillReminderModal from './components/PillReminderModal.jsx';
import HospitalBedModal from './components/HospitalBedModal.jsx';
import DonorRegistryModal from './components/DonorRegistryModal.jsx';

import Home from './pages/Home.jsx';
import Doctors from './pages/Doctors.jsx';
import Ambulance from './pages/Ambulance.jsx';
import Pharmacy from './pages/Pharmacy.jsx';
import Cart from './pages/Cart.jsx';
import VideoConsult from './pages/VideoConsult.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  });
  
  const [adminUser, setAdminUser] = useState(() => {
    return JSON.parse(localStorage.getItem('ayucare_admin_user') || 'null');
  });

  const [isAdminAuthOpen, setIsAdminAuthOpen] = useState(false);
  const [isAdminHistoryOpen, setIsAdminHistoryOpen] = useState(false);
  const [isBmiOpen, setIsBmiOpen] = useState(false);
  const [isWearableOpen, setIsWearableOpen] = useState(false);
  const [isLabTestOpen, setIsLabTestOpen] = useState(false);
  const [isBloodBankOpen, setIsBloodBankOpen] = useState(false);
  const [isAyurvedaOpen, setIsAyurvedaOpen] = useState(false);

  const [isLockerOpen, setIsLockerOpen] = useState(false);
  const [isPillsOpen, setIsPillsOpen] = useState(false);
  const [isBedsOpen, setIsBedsOpen] = useState(false);
  const [isDonorOpen, setIsDonorOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const handleAdminLoginSuccess = (admin) => {
    setAdminUser(admin);
    localStorage.setItem('ayucare_admin_user', JSON.stringify(admin));
    setIsAdminHistoryOpen(true);
  };

  const handleAdminLogout = () => {
    setAdminUser(null);
    localStorage.removeItem('ayucare_admin_user');
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col justify-between selection:bg-teal-600 selection:text-white">
      
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        onOpenHistory={() => setIsAdminHistoryOpen(true)}
        adminUser={adminUser}
        onOpenAdminAuth={() => setIsAdminAuthOpen(true)}
        onAdminLogout={handleAdminLogout}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1 w-full">
        {activeTab === 'home' && (
          <Home 
            setActiveTab={setActiveTab} 
            onOpenBmi={() => setIsBmiOpen(true)}
            onOpenWearable={() => setIsWearableOpen(true)}
            onOpenLabTest={() => setIsLabTestOpen(true)}
            onOpenBloodBank={() => setIsBloodBankOpen(true)}
            onOpenAyurveda={() => setIsAyurvedaOpen(true)}
            onOpenLocker={() => setIsLockerOpen(true)}
            onOpenPills={() => setIsPillsOpen(true)}
            onOpenBeds={() => setIsBedsOpen(true)}
            onOpenDonor={() => setIsDonorOpen(true)}
          />
        )}
        {activeTab === 'doctors' && <Doctors />}
        {activeTab === 'ambulance' && <Ambulance />}
        {activeTab === 'pharmacy' && <Pharmacy addToCart={addToCart} setActiveTab={setActiveTab} />}
        {activeTab === 'cart' && (
          <Cart
            cart={cart}
            updateQty={updateQty}
            removeItem={removeItem}
            clearCart={clearCart}
            setActiveTab={setActiveTab}
          />
        )}
        {activeTab === 'video' && <VideoConsult />}
        {activeTab === 'ai' && (
          <div className="py-12 text-center space-y-4 max-w-xl mx-auto">
            <h2 className="text-3xl font-extrabold text-slate-900">Ayucare Chatbot</h2>
            <p className="text-sm text-slate-600 font-medium">Click the floating chatbot icon at the bottom-right of your screen to speak or type your health queries in 8+ languages!</p>
          </div>
        )}
      </main>

      <Footer setActiveTab={setActiveTab} />

      <SarvamAiChatbot />
      
      <AdminAuthModal
        isOpen={isAdminAuthOpen}
        onClose={() => setIsAdminAuthOpen(false)}
        onAdminLoginSuccess={handleAdminLoginSuccess}
      />
      
      <AdminHistoryModal
        isOpen={isAdminHistoryOpen}
        onClose={() => setIsAdminHistoryOpen(false)}
      />

      <BmiCalculatorModal isOpen={isBmiOpen} onClose={() => setIsBmiOpen(false)} />
      <SmartWearableModal isOpen={isWearableOpen} onClose={() => setIsWearableOpen(false)} />
      <LabTestModal isOpen={isLabTestOpen} onClose={() => setIsLabTestOpen(false)} />
      <BloodBankModal isOpen={isBloodBankOpen} onClose={() => setIsBloodBankOpen(false)} />
      <AyurvedicWellnessModal isOpen={isAyurvedaOpen} onClose={() => setIsAyurvedaOpen(false)} />

      <HealthLockerModal isOpen={isLockerOpen} onClose={() => setIsLockerOpen(false)} />
      <PillReminderModal isOpen={isPillsOpen} onClose={() => setIsPillsOpen(false)} />
      <HospitalBedModal isOpen={isBedsOpen} onClose={() => setIsBedsOpen(false)} />
      <DonorRegistryModal isOpen={isDonorOpen} onClose={() => setIsDonorOpen(false)} />

    </div>
  );
}
