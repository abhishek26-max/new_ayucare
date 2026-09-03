import React, { useState, useEffect } from 'react';
import { X, Calendar, Truck, ShoppingBag, Trash2, CheckCircle2, Shield, Search, RefreshCw } from 'lucide-react';

export default function AdminHistoryModal({ isOpen, onClose }) {
  const [activeSubTab, setActiveSubTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [ambulanceRequests, setAmbulanceRequests] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const loadAllHistory = () => {
    const savedApts = JSON.parse(localStorage.getItem('ayucare_appointments') || '[]');
    setAppointments(savedApts);

    const savedAmb = JSON.parse(localStorage.getItem('ayucare_ambulance') || '[]');
    setAmbulanceRequests(savedAmb);

    const savedOrd = JSON.parse(localStorage.getItem('ayucare_orders') || '[]');
    setOrders(savedOrd);
  };

  useEffect(() => {
    if (isOpen) {
      loadAllHistory();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClearHistory = () => {
    if (window.confirm('Kya aap saare history records ko clear karna chahte hain?')) {
      if (activeSubTab === 'appointments') {
        localStorage.removeItem('ayucare_appointments');
        setAppointments([]);
      } else if (activeSubTab === 'ambulance') {
        localStorage.removeItem('ayucare_ambulance');
        setAmbulanceRequests([]);
      } else if (activeSubTab === 'orders') {
        localStorage.removeItem('ayucare_orders');
        setOrders([]);
      }
    }
  };

  const handleDeleteItem = (index) => {
    if (activeSubTab === 'appointments') {
      const updated = appointments.filter((_, i) => i !== index);
      setAppointments(updated);
      localStorage.setItem('ayucare_appointments', JSON.stringify(updated));
    } else if (activeSubTab === 'ambulance') {
      const updated = ambulanceRequests.filter((_, i) => i !== index);
      setAmbulanceRequests(updated);
      localStorage.setItem('ayucare_ambulance', JSON.stringify(updated));
    } else if (activeSubTab === 'orders') {
      const updated = orders.filter((_, i) => i !== index);
      setOrders(updated);
      localStorage.setItem('ayucare_orders', JSON.stringify(updated));
    }
  };

  const filteredAppointments = appointments.filter(apt => 
    apt.patientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    apt.patientPhone?.includes(searchTerm) ||
    apt.specialty?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-4xl w-full shadow-2xl relative max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-lg shadow-teal-600/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-xl text-slate-900 flex items-center gap-2">
                Admin Patient Records & History
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200">ADMIN ONLY</span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">Complete record of Doctor Appointments, Ambulance dispatches & Orders</p>
            </div>
          </div>

          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Stat Summary Cards */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-3.5 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-between">
            <div>
              <span className="block text-[11px] font-bold text-teal-800 uppercase tracking-wider">Doctor Appointments</span>
              <span className="text-2xl font-extrabold text-teal-900">{appointments.length}</span>
            </div>
            <Calendar className="w-7 h-7 text-teal-600 opacity-80" />
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-between">
            <div>
              <span className="block text-[11px] font-bold text-rose-800 uppercase tracking-wider">Ambulance Dispatches</span>
              <span className="text-2xl font-extrabold text-rose-900">{ambulanceRequests.length}</span>
            </div>
            <Truck className="w-7 h-7 text-rose-600 opacity-80" />
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
            <div>
              <span className="block text-[11px] font-bold text-amber-800 uppercase tracking-wider">Pharmacy Orders</span>
              <span className="text-2xl font-extrabold text-amber-900">{orders.length}</span>
            </div>
            <ShoppingBag className="w-7 h-7 text-amber-600 opacity-80" />
          </div>
        </div>

        {/* Filter / Search & Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4">
          <div className="flex bg-slate-100 p-1 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => setActiveSubTab('appointments')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'appointments' ? 'bg-teal-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" /> Doctor Appointments ({appointments.length})
            </button>
            <button
              onClick={() => setActiveSubTab('ambulance')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'ambulance' ? 'bg-red-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Truck className="w-4 h-4" /> Ambulance ({ambulanceRequests.length})
            </button>
            <button
              onClick={() => setActiveSubTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                activeSubTab === 'orders' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Orders ({orders.length})
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-56">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Filter patient/doctor..."
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium text-slate-900 focus:outline-none focus:border-teal-600"
              />
            </div>
            <button
              onClick={handleClearHistory}
              className="p-2 rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 transition-colors text-xs font-bold flex items-center gap-1"
              title="Clear current tab history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          
          {activeSubTab === 'appointments' && (
            filteredAppointments.length === 0 ? (
              <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-sm font-semibold">Koi Doctor Appointment record nahi mila.</p>
                <p className="text-xs text-slate-400 mt-1">Jab patients appointments book karenge toh unki history yahan dikhegi.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredAppointments.map((apt, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-teal-400 transition-all shadow-sm space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-extrabold text-teal-700 px-2 py-0.5 rounded-full bg-teal-50 border border-teal-200 mr-2">
                          {apt.specialty || 'Specialist'}
                        </span>
                        <h4 className="font-extrabold text-base text-slate-900 inline-block">{apt.doctorName}</h4>
                        <span className="text-xs font-bold text-slate-500 ml-2">Fee: {apt.fee}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Booked
                        </span>
                        <button
                          onClick={() => handleDeleteItem(idx)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                          title="Delete Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-2 text-xs bg-white p-3 rounded-xl border border-slate-200/80">
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px] uppercase">Patient Name</span>
                        <span className="font-bold text-slate-900">{apt.patientName || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px] uppercase">Phone Number</span>
                        <span className="font-bold text-teal-800">{apt.patientPhone || 'N/A'}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px] uppercase">Email</span>
                        <span className="font-medium text-slate-700">{apt.patientEmail || 'N/A'}</span>
                      </div>
                    </div>

                    {apt.symptoms && (
                      <div className="text-xs text-slate-600 bg-amber-50/50 p-2.5 rounded-xl border border-amber-200/60 font-medium">
                        <strong className="text-amber-900">Symptoms:</strong> {apt.symptoms}
                      </div>
                    )}

                    <div className="text-[11px] text-slate-400 text-right font-medium">
                      Date Booked: {apt.date || new Date().toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {activeSubTab === 'ambulance' && (
            ambulanceRequests.length === 0 ? (
              <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-sm font-semibold">Koi Emergency Ambulance record nahi mila.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {ambulanceRequests.map((amb, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-rose-50/40 border border-rose-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-sm text-slate-900">Patient: {amb.patientName} ({amb.patientPhone})</h4>
                      <button onClick={() => handleDeleteItem(idx)} className="p-1 text-slate-400 hover:text-red-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-700 font-medium"><strong>Emergency Info:</strong> {amb.emergencyDetails}</p>
                    <div className="text-[11px] text-slate-400">Date: {amb.date || new Date().toLocaleDateString()}</div>
                  </div>
                ))}
              </div>
            )
          )}

          {activeSubTab === 'orders' && (
            orders.length === 0 ? (
              <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                <p className="text-sm font-semibold">Koi Pharmacy Order record nahi mila.</p>
                <p className="text-xs text-slate-400 mt-1">Jab customers medicine order karenge toh unki history yahan dikhegi.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.map((ord, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200 shadow-sm space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                          {ord.id || 'ORDER'}
                        </span>
                        <h4 className="font-extrabold text-sm text-slate-900">Customer: {ord.customerName}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
                          {ord.totalAmount}
                        </span>
                        <button onClick={() => handleDeleteItem(idx)} className="p-1 text-slate-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-2 text-xs bg-white p-3 rounded-xl border border-amber-200/60 font-medium">
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px] uppercase">Customer Contact</span>
                        <span className="font-bold text-slate-900">{ord.customerPhone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold block text-[10px] uppercase">Delivery Address</span>
                        <span className="text-slate-700">{ord.customerAddress}</span>
                      </div>
                    </div>

                    {ord.items && ord.items.length > 0 && (
                      <div className="text-xs text-slate-700 bg-white p-2.5 rounded-xl border border-amber-200/60 font-medium">
                        <strong className="text-amber-900">Ordered Items: </strong> 
                        {Array.isArray(ord.items) 
                          ? ord.items.map(i => `${i.name || i} (x${i.qty || 1})`).join(', ')
                          : JSON.stringify(ord.items)}
                      </div>
                    )}

                    <div className="text-[11px] text-slate-400 text-right font-medium">
                      Date Ordered: {ord.date || new Date().toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

        </div>

      </div>
    </div>
  );
}
