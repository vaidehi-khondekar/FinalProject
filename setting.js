// Load saved settings when page opens
window.onload = function() {
  const darkMode = localStorage.getItem("darkMode") === "true";
  const notifSound = localStorage.getItem("notifSound") || "chime";
  const emailUpdates = localStorage.getItem("emailUpdates") === "true";

  document.getElementById("darkMode").checked = darkMode;
  document.getElementById("notifSound").value = notifSound;
  document.getElementById("emailUpdates").checked = emailUpdates;
};

// Save settings
document.getElementById("saveBtn").addEventListener("click", function() {
  const darkMode = document.getElementById("darkMode").checked;
  const notifSound = document.getElementById("notifSound").value;
  const emailUpdates = document.getElementById("emailUpdates").checked;

  // Save in localStorage
  localStorage.setItem("darkMode", darkMode);
  localStorage.setItem("notifSound", notifSound);
  localStorage.setItem("emailUpdates", emailUpdates);

  const msg = document.getElementById("saveMessage");
  msg.innerText = "✅ Settings saved successfully!";
  msg.style.opacity = "1";

  // Hide message after 2 seconds
  setTimeout(() => {
    msg.style.opacity = "0";
  }, 2000);
});
