import React, { useState } from 'react';
import { X, Flower2, Sparkles, ShieldCheck, Leaf } from 'lucide-react';

export default function AyurvedicWellnessModal({ isOpen, onClose }) {
  const [selectedDosha, setSelectedDosha] = useState('Vata');

  if (!isOpen) return null;

  const remedies = {
    Vata: {
      type: 'Vata (Air & Ether)',
      trait: 'Prone to dry skin, anxiety, cold hands & irregular digestion.',
      herbs: ['Ashwagandha (Warm milk & honey)', 'Sesame oil massage (Abhyanga)', 'Warm ginger & cinnamon tea'],
      diet: 'Warm, cooked, nourishing foods with ghee.'
    },
    Pitta: {
      type: 'Pitta (Fire & Water)',
      trait: 'Prone to acidity, heat flashes, anger & skin rashes.',
      herbs: ['Shatavari & Amla juice', 'Coconut water & mint tea', 'Triphala powder before sleep'],
      diet: 'Cooling, sweet & bitter foods; avoid spicy food.'
    },
    Kapha: {
      type: 'Kapha (Earth & Water)',
      trait: 'Prone to weight gain, lethargy, cold & sinus congestion.',
      herbs: ['Tulsi & Turmeric Kadha', 'Giloy juice immunity shot', 'Dry ginger powder with honey'],
      diet: 'Light, warm, spicy & dry foods; morning walk.'
    }
  };

  const current = remedies[selectedDosha];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Leaf className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">Ayurvedic Dosha & Herbal Care</h3>
            <p className="text-xs text-slate-500 font-medium">Personalized Herbal Wellness Remedies</p>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          {['Vata', 'Pitta', 'Kapha'].map((dosha) => (
            <button
              key={dosha}
              onClick={() => setSelectedDosha(dosha)}
              className={`flex-1 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
                selectedDosha === dosha
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {dosha}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
          <h4 className="font-extrabold text-slate-900 text-sm">{current.type}</h4>
          <p className="text-xs text-slate-600 font-medium">{current.trait}</p>

          <div className="pt-2 border-t border-emerald-200/80">
            <span className="block text-[11px] font-extrabold uppercase text-emerald-900 mb-1">Recommended Herbal Remedies</span>
            <ul className="space-y-1 text-xs text-slate-700 font-medium">
              {current.herbs.map((h, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <span className="text-emerald-600 font-bold">🌿</span> {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-2.5 rounded-xl bg-white border border-emerald-200 text-xs font-bold text-slate-800">
            🥗 Diet Advice: {current.diet}
          </div>
        </div>

      </div>
    </div>
  );
}
