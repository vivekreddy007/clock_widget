const canvas = document.getElementById("clock");
const ctx = canvas.getContext("2d");
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 250;

const tasks = {
  1: ["Creative Work"],
  2: ["Client Meeting"],
  3: ["Design Review"],
  4: ["Break"],
  5: ["Emails"],
  6: ["Dinner"],
  7: ["Research"],
  8: ["Deep Work"],
  9: ["Workout"],
  10: ["Standup"],
  11: ["Planning"],
  12: ["Lunch"]
};

function drawClock() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Outer clock circle
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = "#ffffff55";
  ctx.lineWidth = 4;
  ctx.stroke();

  // Hour numbers & Tasks outside the clock
  for (let hour = 1; hour <= 12; hour++) {
    const angle = (Math.PI / 6) * (hour - 3);
    const innerX = centerX + Math.cos(angle) * (radius - 30);
    const innerY = centerY + Math.sin(angle) * (radius - 30);
    const outerX = centerX + Math.cos(angle) * (radius + 25);
    const outerY = centerY + Math.sin(angle) * (radius + 25);

    // Hour numbers inside ring
    ctx.fillStyle = "#ffffffcc";
    ctx.font = "18px 'Segoe UI'";
    ctx.textAlign = "center";
    ctx.fillText(hour, innerX, innerY + 5);

    // Task outside ring
    const task = (tasks[hour] || []).join(", ");
    ctx.fillStyle = "#00f0ff";
    ctx.font = "12px 'Segoe UI'";
    ctx.fillText(task, outerX, outerY + 5);
  }

  const now = new Date();
  const hour = now.getHours() % 12;
  const minute = now.getMinutes();
  const second = now.getSeconds();

  // Hour, minute, second hands
  drawHand((Math.PI / 6) * hour + (Math.PI / 360) * minute, radius * 0.4, "#ffdd00", 6);
  drawHand((Math.PI / 30) * minute + (Math.PI / 1800) * second, radius * 0.6, "#00ffaa", 4);
  drawHand((Math.PI / 30) * second, radius * 0.7, "#ff4b4b", 2);

  // Center dot
  ctx.beginPath();
  ctx.arc(centerX, centerY, 6, 0, 2 * Math.PI);
  ctx.fillStyle = "#fff";
  ctx.fill();
}

function drawHand(angle, length, color, width) {
  const x = centerX + Math.cos(angle - Math.PI / 2) * length;
  const y = centerY + Math.sin(angle - Math.PI / 2) * length;
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(x, y);
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.shadowBlur = 10;
  ctx.shadowColor = color;
  ctx.stroke();
  ctx.shadowBlur = 0;
}

setInterval(drawClock, 1000);
