import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, Mic, MicOff, Globe, Sparkles, User } from 'lucide-react';

export default function SarvamAiChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState('Hinglish');
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      text: 'Namaste! 🙏 Welcome to Ayucare. Aap apni bhasha select karke symptoms batayein ya Mic 🎙️ button press karke bolei.'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const languages = [
    { code: 'Hinglish', name: '🌐 Hinglish' },
    { code: 'Hindi', name: '🇮🇳 Hindi (हिंदी)' },
    { code: 'English', name: '🇬🇧 English' },
    { code: 'Bengali', name: 'Bengali (বাংলা)' },
    { code: 'Marathi', name: 'Marathi (मराठी)' },
    { code: 'Tamil', name: 'Tamil (தமிழ்)' },
    { code: 'Telugu', name: 'Telugu (తెలుగు)' },
    { code: 'Gujarati', name: 'Gujarati (ગુજરાતી)' },
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { role: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query, language })
      });
      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: data.reply || 'Main aapki zaroorat samajhta hu. Kripya humare doctor ya emergency helpline par contact karein.' }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'Swasthya salah: Kripya hydrated rahein, aaram karein aur zarurat par hamare doctors se sampark karein.' }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleVoice = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert('Voice recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = language === 'Hindi' ? 'hi-IN' : 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (e) => {
      const speech = e.results[0][0].transcript;
      setInput(speech);
      setIsListening(false);
      handleSend(speech);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
      {/* Floating FAB Button (NO AI TEXT BADGE) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-tr from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-2xl shadow-teal-600/40 hover:scale-110 active:scale-95 transition-all z-50 group border-2 border-white"
        title="Chat with Ayucare Assistant"
      >
        <Bot className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
      </button>

      {/* Chat Modal Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[390px] max-w-[calc(100vw-32px)] h-[560px] max-h-[calc(100vh-120px)] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-6 duration-200">
          
          {/* Top Header */}
          <div className="bg-gradient-to-r from-teal-600 to-emerald-600 text-white p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-lg shadow-inner">
                🩺
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight flex items-center gap-1">
                  Ayucare Chatbot
                </h3>
                <span className="text-[11px] text-teal-100 flex items-center gap-1 font-medium">
                  <Sparkles className="w-3 h-3 text-amber-300" /> Ayucare AI Health Assistant
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-black/20 text-white text-xs px-2.5 py-1 rounded-xl border border-white/30 outline-none cursor-pointer font-bold"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code} className="bg-white text-slate-900">
                    {l.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Message Body */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50/80 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex gap-2 text-xs leading-relaxed max-w-[85%] ${
                  m.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                    m.role === 'user'
                      ? 'bg-teal-600 text-white'
                      : 'bg-white text-teal-700 border border-slate-200 shadow-sm'
                  }`}
                >
                  {m.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`p-3 rounded-2xl ${
                    m.role === 'user'
                      ? 'bg-teal-600 text-white rounded-tr-none shadow-sm font-medium'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-none shadow-sm font-medium'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-500 p-2 font-semibold">
                <span className="w-2 h-2 bg-teal-600 rounded-full animate-ping"></span>
                <span>Responding in {language}...</span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-200 flex gap-2 overflow-x-auto text-[11px]">
            <button
              onClick={() => handleSend('Fever and cold symptoms')}
              className="bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 px-3 py-1 rounded-xl border border-slate-200 whitespace-nowrap font-bold transition-colors"
            >
              🤒 Fever/Cold
            </button>
            <button
              onClick={() => handleSend('How to book doctor?')}
              className="bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 px-3 py-1 rounded-xl border border-slate-200 whitespace-nowrap font-bold transition-colors"
            >
              👨‍⚕️ Book Doctor
            </button>
            <button
              onClick={() => handleSend('Emergency Ambulance 108')}
              className="bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700 px-3 py-1 rounded-xl border border-slate-200 whitespace-nowrap font-bold transition-colors"
            >
              🚑 Ambulance
            </button>
          </div>

          {/* Input Footer */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <button
              onClick={toggleVoice}
              className={`p-2.5 rounded-xl border transition-all ${
                isListening
                  ? 'bg-red-600 text-white border-red-500 animate-pulse'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:text-slate-900'
              }`}
              title="Voice Input"
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </button>

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isListening ? 'Listening...' : `Speak or type in ${language}...`}
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-teal-600 font-medium"
            />

            <button
              onClick={() => handleSend()}
              className="p-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}
    </>
  );
}
