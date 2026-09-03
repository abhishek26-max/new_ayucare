function openAmbulanceModal() {
  const modal = document.getElementById('ambulanceModal');
  if (modal) {
    modal.style.display = 'flex';
  }
}

function closeAmbulanceModal() {
  const modal = document.getElementById('ambulanceModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

async function submitAmbulanceRequest(event) {
  event.preventDefault();

  const patientName = document.getElementById('patientName').value.trim();
  const patientPhone = document.getElementById('patientPhone').value.trim();
  const patientEmail = document.getElementById('patientEmail').value.trim();
  const emergencyDetails = document.getElementById('emergencyDetails').value.trim();

  if (!patientName || !patientPhone) {
    alert("Kripya patient ka naam aur phone number bharein.");
    return;
  }

  const sendWithCoords = async (lat, lon) => {
    const mapUrl = lat && lon ? `https://www.google.com/maps?q=${lat},${lon}` : "Location access not granted";
    const whatsappNumber = "919569141861";

    // Save to server API
    try {
      await fetch('/api/ambulance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientName,
          patientPhone,
          patientEmail,
          emergencyDetails,
          lat,
          lon
        })
      });
    } catch(err) {
      console.log("Server API offline, opening WhatsApp emergency request");
    }

    const msg =
      `🚑 *AYUCARE EMERGENCY AMBULANCE DISPATCH*%0A%0A` +
      `*Patient Name:* ${patientName}%0A` +
      `*Phone:* ${patientPhone}%0A` +
      `*Email:* ${patientEmail}%0A%0A` +
      `*Emergency Details:* ${emergencyDetails}%0A%0A` +
      `*Live Location Map:*%0A${mapUrl}`;

    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
    alert(`🚨 Emergency Alert Dispatched to WhatsApp (+${whatsappNumber})!`);
    closeAmbulanceModal();
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        sendWithCoords(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        sendWithCoords(null, null);
      },
      { timeout: 7000 }
    );
  } else {
    sendWithCoords(null, null);
  }
}

function findHospitals() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        window.open(`https://www.google.com/maps/search/nearby+hospitals/@${lat},${lon},14z`, "_blank");
      },
      () => {
        window.open(`https://www.google.com/maps/search/hospitals+in+Kanpur`, "_blank");
      }
    );
  } else {
    window.open(`https://www.google.com/maps/search/hospitals+in+Kanpur`, "_blank");
  }
}

// Close modal when clicking outside
window.addEventListener("click", function(event) {
  const modal = document.getElementById('ambulanceModal');
  if (modal && event.target === modal) {
    modal.style.display = 'none';
  }
});