let selectedDoctorName = "";
let selectedSpecialty = "";
let selectedFee = "";

function openAppointmentModal(docName, spec, fee) {
  selectedDoctorName = docName;
  selectedSpecialty = spec;
  selectedFee = fee;

  const modal = document.getElementById("appointmentModal");
  if (modal) {
    modal.style.display = "flex";
  }
}

function closeAppointmentModal() {
  const modal = document.getElementById("appointmentModal");
  if (modal) {
    modal.style.display = "none";
  }
}

async function submitAppointment(event) {
  event.preventDefault();

  const userName = document.getElementById("userName").value.trim();
  const userPhone = document.getElementById("userPhone").value.trim();
  const userEmail = document.getElementById("userEmail").value.trim();
  const userSymptoms = document.getElementById("userSymptoms").value.trim();

  if (!userName || !userPhone || !userSymptoms) {
    alert("Kripya sabhi zaroori jankari bharein.");
    return;
  }

  const appointmentData = {
    id: 'APT-' + Math.floor(1000 + Math.random() * 9000),
    doctorName: selectedDoctorName,
    specialty: selectedSpecialty,
    fee: selectedFee,
    patientName: userName,
    patientPhone: userPhone,
    patientEmail: userEmail,
    symptoms: userSymptoms,
    date: new Date().toLocaleDateString()
  };

  // Save in LocalStorage history
  const history = JSON.parse(localStorage.getItem("ayucare_appointments") || "[]");
  history.push(appointmentData);
  localStorage.setItem("ayucare_appointments", JSON.stringify(history));

  // 1. Send data to server API
  try {
    await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData)
    });
  } catch (err) {
    console.log("Appointment API offline, sending via WhatsApp");
  }

  // 2. Formulate WhatsApp Booking Request (Direct to user's number: 9195914181)
  const whatsappNumber = "919569141861";
  const message = 
    `🩺 *Ayucare Doctor Appointment Booking*%0A%0A` +
    `*Doctor:* ${selectedDoctorName} (${selectedSpecialty})%0A` +
    `*Fee:* ${selectedFee}%0A%0A` +
    `*Patient Name:* ${userName}%0A` +
    `*Phone:* ${userPhone}%0A` +
    `*Email:* ${userEmail}%0A` +
    `*Symptoms:* ${userSymptoms}%0A%0A` +
    `*Date:* ${new Date().toLocaleDateString()}`;

  // Open WhatsApp directly to target number 9195914181
  window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");

  // Show Confirmation
  alert(`✅ Appointment Request Sent for ${selectedDoctorName}!\nDetails sent directly to WhatsApp (${whatsappNumber}).`);
  closeAppointmentModal();
}

// Doctor Filter functionality
function filterDoctors() {
  const input = document.getElementById("doctorSearch");
  if (!input) return;
  const filter = input.value.toLowerCase();
  const cards = document.querySelectorAll(".doctor-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    if (text.includes(filter)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

// Close modal when clicking backdrop
window.addEventListener("click", function(e) {
  const modal = document.getElementById("appointmentModal");
  if (modal && e.target === modal) {
    modal.style.display = "none";
  }
});
