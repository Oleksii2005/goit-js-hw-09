function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
let intervalId = null;

startBtn.addEventListener('click', startColorSwitcher);
stopBtn.addEventListener('click', stopColorSwitcher);

function startColorSwitcher() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  intervalId = setInterval(changeBgColor, 1000);
}
function stopColorSwitcher() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(intervalId);
}
function changeBgColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}
