const express = require('express');
const cors = require('cors');
const path = require('path');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const SARVAM_API_KEY = process.env.SARVAM_API_KEY || 'sk_uvpqaay4_TOrjPEvNceIWLDCsb3fFSQun';

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files (Vite build dist or Ayucare folder)
const fs = require('fs');
const distPath = path.join(__dirname, 'dist');
const frontendPath = fs.existsSync(distPath) ? distPath : path.join(__dirname, 'Ayucare');

// SPA Route Redirect: Ensure /doctor.html, /medicine.html, etc. load the React SPA index.html
app.get('/*.html', (req, res, next) => {
  if (req.path === '/index.html') return next();
  res.sendFile(path.join(frontendPath, 'index.html'));
});

app.use(express.static(frontendPath));

// In-memory data store for submitted records
const database = {
  users: [],
  appointments: [],
  ambulanceRequests: [],
  orders: [],
  healthReports: []
};

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Ayucare Server running smoothly', timestamp: new Date() });
});

// Authentication APIs
app.post('/api/auth/signup', (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Name, email and password are required.' });
  }

  const existing = database.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(400).json({ success: false, message: 'Account with this email already exists.' });
  }

  const user = {
    id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
    name,
    email,
    phone: phone || '9569141861',
    password,
    joinedAt: new Date().toLocaleDateString()
  };

  database.users.push(user);
  const token = 'AYUCARE_TOKEN_' + Math.random().toString(36).substring(2);
  console.log(`[Auth Signup] Created user: ${user.name} (${user.email})`);
  return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, phone: user.phone }, token });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }

  const user = database.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }

  const token = 'AYUCARE_TOKEN_' + Math.random().toString(36).substring(2);
  console.log(`[Auth Login] User logged in: ${user.name}`);
  return res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, phone: user.phone }, token });
});

// Sarvam AI Chatbot Endpoint (Multilingual support)
app.post('/api/chat', async (req, res) => {
  try {
    const { message, language } = req.body;
    if (!message || !message.trim()) {
      return res.status(400).json({ reply: "Kripya apna sawal ya symptoms likhein." });
    }

    const selectedLang = language || 'Hinglish';
    console.log(`[AI Chat] Query: "${message}" | Lang: ${selectedLang}`);

    const systemPrompt = `You are Ayucare AI, an empathetic, highly knowledgeable medical assistant for the Ayucare health-tech platform in India.
User Selected Language: ${selectedLang}.
Your goals:
1. Provide clear, supportive, and safe health guidance for symptoms or general health queries.
2. IMPORTANT: You MUST write your ENTIRE reply in ${selectedLang} language.
3. Recommend relevant Ayucare services when appropriate:
   - Doctor Appointments (Doctor Booking feature)
   - Emergency Ambulance & Hospital Finder (108 Helpline / GPS Ambulance)
   - Online Pharmacy & Medicines Delivery
   - Video Consultation with Specialists
4. Include a standard disclaimer that for serious emergencies, the user should immediately call 108 or visit the nearest hospital.`;

    try {
      const response = await axios.post(
        'https://api.sarvam.ai/v1/chat/completions',
        {
          model: 'sarvam-105b-conversations',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          temperature: 0.3,
          max_tokens: 600
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'api-subscription-key': SARVAM_API_KEY
          },
          timeout: 25000
        }
      );

      const aiReply = response.data?.choices?.[0]?.message?.content || 
                      "Main aapke symptoms samajhta hu. Kripya doctor consultation book karein ya 108 emergency par call karein.";

      return res.json({ reply: aiReply });
    } catch (apiError) {
      console.error("[Sarvam AI Error]:", apiError.response?.data || apiError.message);

      // Rule-based fallback response if Sarvam AI endpoint is down/rate-limited
      let fallbackReply = `[${selectedLang}] Main Ayucare AI Assistant hu. `;
      const lowerMsg = message.toLowerCase();

      if (lowerMsg.includes("fever") || lowerMsg.includes("bukhar")) {
        fallbackReply += "Bukhar (fever) ke liye aaram karein, hydration lein aur Paracetamol 500mg le sakte hain. Agar bukhar 101°F se zyada bane toh turant doctor book karein.";
      } else if (lowerMsg.includes("doctor") || lowerMsg.includes("appointment")) {
        fallbackReply += "Aap humare Doctors page se verified specialists ke sath consultation book kar sakte hain.";
      } else if (lowerMsg.includes("ambulance") || lowerMsg.includes("emergency")) {
        fallbackReply += "Emergency ke liye hamare Ambulance page par jaakar live location share karein ya direct 108 par call karein.";
      } else if (lowerMsg.includes("medicine") || lowerMsg.includes("dawa")) {
        fallbackReply += "Aap humare Online Medicine section se ghar baithe genuine medicines order kar sakte hain.";
      } else {
        fallbackReply += "Kripya thoda vistar se batayein ya hamare Doctors Consultation section se specialist se salah lein.";
      }

      return res.json({ reply: fallbackReply });
    }
  } catch (error) {
    console.error("[Server Error]:", error);
    res.status(500).json({ reply: "Server error. Kripya punah prayas karein." });
  }
});

// Backward Compatibility for /chat
app.post('/chat', async (req, res) => {
  try {
    const { message, language } = req.body;
    const response = await axios.post(
      'https://api.sarvam.ai/v1/chat/completions',
      {
        model: 'sarvam-105b',
        messages: [
          { role: 'system', content: `You are Ayucare AI Medical Assistant. Reply in ${language || 'Hinglish'}.` },
          { role: 'user', content: message || "" }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': SARVAM_API_KEY
        },
        timeout: 10000
      }
    );
    res.json({ reply: response.data?.choices?.[0]?.message?.content || "Healthcare assistant ready." });
  } catch (err) {
    res.json({ reply: "Ayucare AI Healthcare Assistant: Aapki madad ke liye hum hamesha taiyaar hain." });
  }
});

// API: Save Doctor Appointment
app.post('/api/appointments', (req, res) => {
  const { doctorName, specialty, fee, patientName, patientPhone, patientEmail, symptoms } = req.body;
  const newAppointment = {
    id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
    doctorName,
    specialty,
    fee,
    patientName,
    patientPhone,
    patientEmail,
    symptoms,
    createdAt: new Date().toISOString(),
    status: 'Confirmed'
  };
  database.appointments.push(newAppointment);
  res.json({ success: true, appointment: newAppointment, message: 'Appointment booked successfully!' });
});

// API: Save Ambulance Emergency Request
app.post('/api/ambulance', (req, res) => {
  const { patientName, patientPhone, patientEmail, emergencyDetails, lat, lon } = req.body;
  const newRequest = {
    id: 'AMB-' + Math.floor(1000 + Math.random() * 9000),
    patientName,
    patientPhone,
    patientEmail,
    emergencyDetails,
    location: lat && lon ? { lat, lon, mapUrl: `https://www.google.com/maps?q=${lat},${lon}` } : null,
    createdAt: new Date().toISOString(),
    status: 'Dispatched'
  };
  database.ambulanceRequests.push(newRequest);
  res.json({ success: true, request: newRequest, message: 'Emergency Ambulance Dispatched!' });
});

// API: Submit Medicine Order
app.post('/api/orders', (req, res) => {
  const { customerName, customerPhone, customerAddress, items, totalAmount } = req.body;
  const newOrder = {
    id: 'ORD-' + Math.floor(10000 + Math.random() * 90000),
    customerName,
    customerPhone,
    customerAddress,
    items,
    totalAmount,
    createdAt: new Date().toISOString(),
    status: 'Processing'
  };
  database.orders.push(newOrder);
  res.json({ success: true, order: newOrder, message: 'Order Placed Successfully!' });
});

// API: Health Reports
app.post('/api/reports', (req, res) => {
  const { patient_name, service_type, amount, date, status } = req.body;
  const newReport = {
    id: 'REP-' + Math.floor(1000 + Math.random() * 9000),
    patient_name,
    service_type,
    amount,
    date: date || new Date().toISOString().split('T')[0],
    status: status || 'Completed',
    createdAt: new Date().toISOString()
  };
  database.healthReports.push(newReport);
  res.json({ success: true, report: newReport, message: 'Health report added successfully!' });
});

app.get('/api/reports', (req, res) => {
  res.json({ success: true, reports: database.healthReports });
});

// Fallback route to serve index.html for non-API routes
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`================================================`);
  console.log(` 🩺 Ayucare Healthcare Platform Server Running!`);
  console.log(` 🌐 Server URL: http://localhost:${PORT}`);
  console.log(` 🤖 Sarvam AI Chatbot active on /api/chat`);
  console.log(`================================================`);
});
