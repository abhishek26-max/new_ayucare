import React, { useState } from 'react';
import { X, Activity, Scale, ArrowUpRight } from 'lucide-react';

export default function BmiCalculatorModal({ isOpen, onClose }) {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState(null);

  if (!isOpen) return null;

  const handleCalculate = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!w || !h) return;

    const hM = h / 100;
    const bmiVal = (w / (hM * hM)).toFixed(1);

    let status = '';
    let category = '';
    let advice = '';

    if (bmiVal < 18.5) {
      status = 'Underweight';
      category = 'yellow';
      advice = 'Focus on balanced calorie intake & protein rich meals.';
    } else if (bmiVal >= 18.5 && bmiVal <= 24.9) {
      status = 'Healthy Weight';
      category = 'green';
      advice = 'Excellent! Keep up your physical activity & balanced lifestyle.';
    } else if (bmiVal >= 25 && bmiVal <= 29.9) {
      status = 'Overweight';
      category = 'orange';
      advice = 'Incorporate 30 mins daily walking & stay hydrated.';
    } else {
      status = 'Obese';
      category = 'red';
      advice = 'Consider consulting our Ayucare doctors for guidance.';
    }

    setResult({ bmi: bmiVal, status, category, advice });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-md w-full shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 text-slate-400 hover:text-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-11 h-11 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">BMI & Health Meter</h3>
            <p className="text-xs text-slate-500 font-medium">Calculate Body Mass Index instantly</p>
          </div>
        </div>

        <form onSubmit={handleCalculate} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              placeholder="e.g. 68"
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600 font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Height (cm)</label>
            <input
              type="number"
              step="0.1"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 172"
              required
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-teal-600 font-semibold"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-extrabold text-sm shadow-md shadow-teal-600/25 hover:from-teal-700 hover:to-emerald-700 transition-all"
          >
            Calculate Health Score
          </button>
        </form>

        {result && (
          <div className={`mt-6 p-4 rounded-2xl border ${
            result.category === 'green' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' :
            result.category === 'yellow' ? 'bg-amber-50 border-amber-200 text-amber-900' :
            result.category === 'orange' ? 'bg-orange-50 border-orange-200 text-orange-900' :
            'bg-rose-50 border-rose-200 text-rose-900'
          }`}>
            <div className="font-extrabold text-xl">BMI: {result.bmi} ({result.status})</div>
            <p className="text-xs mt-1 text-slate-700 font-medium">{result.advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}
