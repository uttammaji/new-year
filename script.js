// Set the New Year target date
const newYearDate = new Date("January 1, 2025 00:00:00").getTime();

// Get the progress circles and time elements
const progressBars = document.querySelectorAll(".progress-bar");
const timeElements = {
  days: document.getElementById("days-time"),
  hours: document.getElementById("hours-time"),
  minutes: document.getElementById("minutes-time"),
  seconds: document.getElementById("seconds-time")
};

// Update the countdown every second
const countdown = setInterval(function() {
  // Get current date and time
  const now = new Date().getTime();
  
  // Calculate the distance between now and the New Year
  const distance = newYearDate - now;
  
  // Time calculations for days, hours, minutes, and seconds
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
  // Update the countdown time display
  timeElements.days.innerHTML = padZero(days);
  timeElements.hours.innerHTML = padZero(hours);
  timeElements.minutes.innerHTML = padZero(minutes);
  timeElements.seconds.innerHTML = padZero(seconds);
  
  // Calculate the stroke-dashoffset for each circle
  updateCircleProgress(days, "days");
  updateCircleProgress(hours, "hours");
  updateCircleProgress(minutes, "minutes");
  updateCircleProgress(seconds, "seconds");
  
  // If the countdown is finished, display a New Year message
  if (distance < 0) {
    clearInterval(countdown);
    timeElements.days.innerHTML = "00";
    timeElements.hours.innerHTML = "00";
    timeElements.minutes.innerHTML = "00";
    timeElements.seconds.innerHTML = "00";
    alert("Happy New Year 2025 !");
  }
}, 1000);

// Function to update the progress of each circle
function updateCircleProgress(timeValue, unit) {
  const totalTime = unit === "days" ? 365 : (unit === "hours" ? 24 : (unit === "minutes" ? 60 : 60));
  const percentage = (timeValue / totalTime) * 100;
  const dashOffset = 439.82 - (percentage / 100) * 439.82;
  document.querySelector(`#${unit} .progress-bar`).style.strokeDashoffset = dashOffset;
}

// Helper function to pad numbers with leading zeros (e.g., "09" instead of "9")
function padZero(num) {
  return num < 10 ? "0" + num : num;
}
