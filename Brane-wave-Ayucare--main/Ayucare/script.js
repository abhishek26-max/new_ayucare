let currentSlide = 0;
const totalSlides = 3;
let autoSlideInterval;

function goToSlide(index) {
  currentSlide = index;
  const track = document.getElementById("sliderTrack");
  if (track) {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
  }
  document.querySelectorAll(".slider-dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function nextSlide() {
  goToSlide((currentSlide + 1) % totalSlides);
}

function startAutoSlide() {
  autoSlideInterval = setInterval(nextSlide, 5000);
}

function showTransactionModal() {
  const backdrop = document.getElementById("modal-backdrop");
  if (backdrop) backdrop.classList.remove("hidden");
}

function closeTransactionModal() {
  const backdrop = document.getElementById("modal-backdrop");
  if (backdrop) backdrop.classList.add("hidden");
}

async function submitTransaction(event) {
  if (event) event.preventDefault();

  const patient_name = document.getElementById("patient_name").value.trim();
  const service_type = document.getElementById("service_type").value;
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;
  const status = document.getElementById("status").value;

  if (!patient_name || !service_type || !amount) {
    showErrorMessage("Kripya sabhi fields bharein.");
    return;
  }

  // Save via API
  try {
    await fetch("/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patient_name, service_type, amount, date, status })
    });
  } catch (err) {
    console.log("Local offline mode");
  }

  showSuccessMessage(`Health Report for ${patient_name} Added Successfully!`);
  closeTransactionModal();
}

// BMI & Health Score Calculator Logic
function calculateBMI(event) {
  if (event) event.preventDefault();
  const weight = parseFloat(document.getElementById("bmiWeight").value);
  const heightCm = parseFloat(document.getElementById("bmiHeight").value);

  if (!weight || !heightCm) {
    showErrorMessage("Please enter valid weight and height.");
    return;
  }

  const heightM = heightCm / 100;
  const bmi = (weight / (heightM * heightM)).toFixed(1);
  const resultDiv = document.getElementById("bmiResult");

  let status = "";
  let colorClass = "";
  let advice = "";

  if (bmi < 18.5) {
    status = "Underweight";
    colorClass = "text-amber-600 bg-amber-50 border-amber-200";
    advice = "Try a nutrient-rich diet to build healthy mass.";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    status = "Normal / Healthy Weight";
    colorClass = "text-green-600 bg-green-50 border-green-200";
    advice = "Great job! Maintain your balanced diet and regular exercise.";
  } else if (bmi >= 25 && bmi <= 29.9) {
    status = "Overweight";
    colorClass = "text-orange-600 bg-orange-50 border-orange-200";
    advice = "Incorporate 30 mins daily walking & stay hydrated.";
  } else {
    status = "Obese";
    colorClass = "text-red-600 bg-red-50 border-red-200";
    advice = "Consider consulting our certified Ayucare doctors for guidance.";
  }

  if (resultDiv) {
    resultDiv.className = `p-4 rounded-xl border mt-4 ${colorClass}`;
    resultDiv.innerHTML = `
      <div class="font-bold text-lg">Your BMI: ${bmi} (${status})</div>
      <p class="text-xs mt-1">${advice}</p>
    `;
    resultDiv.classList.remove("hidden");
  }
}

// My Bookings & History Drawer
function showHistoryModal() {
  const appointments = JSON.parse(localStorage.getItem("ayucare_appointments") || "[]");
  const cartOrders = JSON.parse(localStorage.getItem("cart") || "[]");

  let html = `<h3 class="text-xl font-bold text-slate-800 mb-4">My Saved Bookings & History</h3>`;

  if (appointments.length === 0) {
    html += `<p class="text-sm text-slate-500 py-4">No doctor appointments booked yet.</p>`;
  } else {
    html += `<h4 class="font-bold text-sm text-teal-700 mb-2">Doctor Appointments:</h4><div class="space-y-2 mb-4">`;
    appointments.forEach(apt => {
      html += `
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
          <div class="font-bold text-slate-800">${apt.doctorName} (${apt.specialty})</div>
          <div class="text-slate-500">Patient: ${apt.patientName} | Fee: ${apt.fee}</div>
          <div class="text-teal-600 font-semibold mt-1">Status: Confirmed (${apt.date})</div>
        </div>
      `;
    });
    html += `</div>`;
  }

  const container = document.getElementById("history-content");
  if (container) {
    container.innerHTML = html;
  }
  const modal = document.getElementById("historyModal");
  if (modal) modal.style.display = "flex";
}

function closeHistoryModal() {
  const modal = document.getElementById("historyModal");
  if (modal) modal.style.display = "none";
}

function showSuccessMessage(text) {
  const msg = document.createElement("div");
  msg.className = "fixed top-4 right-4 bg-teal-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-bold text-sm";
  msg.textContent = text;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

function showErrorMessage(text) {
  const msg = document.createElement("div");
  msg.className = "fixed top-4 right-4 bg-red-600 text-white px-6 py-3 rounded-xl shadow-lg z-50 font-bold text-sm";
  msg.textContent = text;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slider-dot").forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(autoSlideInterval);
      goToSlide(index);
      startAutoSlide();
    });
  });
  startAutoSlide();
});