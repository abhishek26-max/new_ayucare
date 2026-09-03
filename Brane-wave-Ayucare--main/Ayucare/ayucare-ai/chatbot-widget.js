(function() {
  // Inject widget CSS
  const style = document.createElement('style');
  style.innerHTML = `
    .ayucare-bot-fab {
      position: fixed;
      bottom: 25px;
      right: 25px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0d9488, #0284c7);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 25px rgba(13, 148, 136, 0.4);
      cursor: pointer;
      z-index: 9999;
      transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .ayucare-bot-fab:hover {
      transform: scale(1.08) rotate(4deg);
    }
    .ayucare-chat-modal {
      position: fixed;
      bottom: 95px;
      right: 25px;
      width: 390px;
      max-width: calc(100vw - 30px);
      height: 540px;
      max-height: calc(100vh - 120px);
      background: #ffffff;
      border-radius: 24px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.22);
      display: none;
      flex-direction: column;
      overflow: hidden;
      z-index: 9999;
      border: 1px solid #e2e8f0;
      animation: botSlideUp 0.3s ease-out;
    }
    @keyframes botSlideUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .ayucare-chat-header {
      background: linear-gradient(135deg, #0d9488, #0891b2);
      color: white;
      padding: 14px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ayucare-lang-select {
      background: rgba(255, 255, 255, 0.2);
      color: white;
      border: 1px solid rgba(255, 255, 255, 0.4);
      border-radius: 12px;
      padding: 3px 8px;
      font-size: 11px;
      outline: none;
      cursor: pointer;
    }
    .ayucare-lang-select option {
      background: #0f172a;
      color: white;
    }
    .ayucare-chat-body {
      flex: 1;
      padding: 14px;
      overflow-y: auto;
      background: #f8fafc;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .ayucare-msg {
      max-width: 84%;
      padding: 10px 14px;
      border-radius: 16px;
      font-size: 13.5px;
      line-height: 1.45;
      word-break: break-word;
    }
    .ayucare-msg.user {
      align-self: flex-end;
      background: #0d9488;
      color: white;
      border-bottom-right-radius: 4px;
    }
    .ayucare-msg.bot {
      align-self: flex-start;
      background: white;
      color: #1e293b;
      border: 1px solid #e2e8f0;
      border-bottom-left-radius: 4px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.03);
    }
    .ayucare-quick-chips {
      display: flex;
      gap: 6px;
      overflow-x: auto;
      padding: 8px 12px;
      background: #f1f5f9;
      border-top: 1px solid #e2e8f0;
    }
    .ayucare-chip {
      white-space: nowrap;
      background: white;
      border: 1px solid #cbd5e1;
      color: #334155;
      font-size: 11.5px;
      padding: 4px 10px;
      border-radius: 12px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .ayucare-chip:hover {
      background: #0d9488;
      color: white;
      border-color: #0d9488;
    }
    .ayucare-chat-input {
      display: flex;
      padding: 10px;
      background: white;
      border-top: 1px solid #e2e8f0;
      gap: 6px;
      align-items: center;
    }
    .ayucare-chat-input input {
      flex: 1;
      padding: 9px 14px;
      border: 1px solid #cbd5e1;
      border-radius: 20px;
      font-size: 13px;
      outline: none;
    }
    .ayucare-chat-input input:focus {
      border-color: #0d9488;
    }
    .ayucare-mic-btn {
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #cbd5e1;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .ayucare-mic-btn.listening {
      background: #ef4444;
      color: white;
      border-color: #ef4444;
      animation: pulseMic 1.2s infinite;
    }
    @keyframes pulseMic {
      0% { transform: scale(1); }
      50% { transform: scale(1.15); }
      100% { transform: scale(1); }
    }
    .ayucare-chat-input button.send-btn {
      background: #0d9488;
      color: white;
      border: none;
      padding: 9px 15px;
      border-radius: 20px;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: background 0.2s;
    }
    .ayucare-chat-input button.send-btn:hover {
      background: #0f766e;
    }
  `;
  document.head.appendChild(style);

  // Inject HTML (WITHOUT "AI" BADGE)
  const container = document.createElement('div');
  container.innerHTML = `
    <div id="ayucare-fab" class="ayucare-bot-fab" title="Chat with Ayucare Assistant">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
    </div>

    <div id="ayucare-chat-modal" class="ayucare-chat-modal">
      <div class="ayucare-chat-header">
        <div style="display:flex; align-items:center; gap:8px;">
          <div style="width:34px; height:34px; background:rgba(255,255,255,0.2); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:18px;">🩺</div>
          <div>
            <div style="font-weight:bold; font-size:14px; leading-height:1.2;">Ayucare Assistant</div>
            <div style="font-size:11px; opacity:0.85;">Sarvam AI Multilingual</div>
          </div>
        </div>
        
        <div style="display:flex; align-items:center; gap:6px;">
          <!-- Language Selector Dropdown -->
          <select id="ayucare-lang-select" class="ayucare-lang-select" onchange="window.ayucareChangeLang(this.value)">
            <option value="Hinglish" selected>🌐 Hinglish</option>
            <option value="Hindi">🇮🇳 Hindi (हिंदी)</option>
            <option value="English">🇬🇧 English</option>
            <option value="Bengali">Bengali (বাংলা)</option>
            <option value="Marathi">Marathi (मराठी)</option>
            <option value="Tamil">Tamil (தமிழ்)</option>
            <option value="Telugu">Telugu (తెలుగు)</option>
            <option value="Gujarati">Gujarati (ગુજરાતી)</option>
          </select>

          <button id="ayucare-close-chat" style="background:none; border:none; color:white; font-size:22px; cursor:pointer; padding:0 4px;">&times;</button>
        </div>
      </div>

      <div id="ayucare-chat-body" class="ayucare-chat-body">
        <div class="ayucare-msg bot">
          Namaste! 🙏 Welcome to Ayucare. AAP kis language me baat karna chahte hain? Top bar se language select karein ya bolkar symptoms batayein.
        </div>
      </div>

      <div class="ayucare-quick-chips">
        <span class="ayucare-chip" onclick="window.ayucareSendChip('Fever & throat pain')">🤒 Fever/Cold</span>
        <span class="ayucare-chip" onclick="window.ayucareSendChip('Book doctor appointment')">👨‍⚕️ Book Doctor</span>
        <span class="ayucare-chip" onclick="window.ayucareSendChip('Emergency Ambulance 9569141861')">🚑 Ambulance</span>
        <span class="ayucare-chip" onclick="window.ayucareSendChip('Order medicine delivery')">💊 Medicines</span>
      </div>

      <div class="ayucare-chat-input">
        <button id="ayucare-mic-btn" class="ayucare-mic-btn" title="Voice Input" onclick="window.ayucareToggleVoice()">
          🎙️
        </button>
        <input type="text" id="ayucare-input" placeholder="Type or speak symptoms..." onkeydown="if(event.key==='Enter') window.ayucareSendMsg()">
        <button class="send-btn" onclick="window.ayucareSendMsg()">Send</button>
      </div>
    </div>
  `;
  document.body.appendChild(container);

  // Widget interactivity
  const fab = document.getElementById('ayucare-fab');
  const modal = document.getElementById('ayucare-chat-modal');
  const closeBtn = document.getElementById('ayucare-close-chat');

  fab.addEventListener('click', () => {
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  let currentLang = localStorage.getItem("ayucare_lang") || "Hinglish";
  const langSelect = document.getElementById('ayucare-lang-select');
  if (langSelect) langSelect.value = currentLang;

  window.ayucareChangeLang = function(lang) {
    currentLang = lang;
    localStorage.setItem("ayucare_lang", lang);
  };

  // Speech Recognition (Voice Input)
  let recognition = null;
  let isListening = false;

  window.ayucareToggleVoice = function() {
    const micBtn = document.getElementById('ayucare-mic-btn');
    const input = document.getElementById('ayucare-input');

    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Voice input is not supported in this browser.");
      return;
    }

    if (isListening) {
      if (recognition) recognition.stop();
      isListening = false;
      micBtn.classList.remove('listening');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = currentLang === 'Hindi' ? 'hi-IN' : 'en-IN';

    recognition.onstart = function() {
      isListening = true;
      micBtn.classList.add('listening');
      input.placeholder = "Listening... Speak now 🎙️";
    };

    recognition.onresult = function(event) {
      const transcript = event.results[0][0].transcript;
      input.value = transcript;
      micBtn.classList.remove('listening');
      isListening = false;
      input.placeholder = "Type or speak symptoms...";
      window.ayucareSendMsg();
    };

    recognition.onerror = function() {
      micBtn.classList.remove('listening');
      isListening = false;
      input.placeholder = "Type or speak symptoms...";
    };

    recognition.start();
  };

  window.ayucareSendChip = function(text) {
    const input = document.getElementById('ayucare-input');
    input.value = text;
    window.ayucareSendMsg();
  };

  window.ayucareSendMsg = async function() {
    const input = document.getElementById('ayucare-input');
    const msg = input.value.trim();
    if (!msg) return;

    const chatBody = document.getElementById('ayucare-chat-body');

    // Add User message
    const userDiv = document.createElement('div');
    userDiv.className = 'ayucare-msg user';
    userDiv.textContent = msg;
    chatBody.appendChild(userDiv);
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Add Typing placeholder
    const botDiv = document.createElement('div');
    botDiv.className = 'ayucare-msg bot';
    botDiv.textContent = `Analyzing in ${currentLang}... ⌛`;
    chatBody.appendChild(botDiv);
    chatBody.scrollTop = chatBody.scrollHeight;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, language: currentLang })
      });
      const data = await res.json();
      botDiv.textContent = data.reply || 'Main aapki zaroorat samajhta hu. Doctor consultation book karein ya 108 helpline par call karein.';
    } catch (err) {
      botDiv.textContent = 'Health Tip: Bukhar ya cold me aaram karein aur doctor appointment book karein.';
    }
    chatBody.scrollTop = chatBody.scrollHeight;
  };
})();
