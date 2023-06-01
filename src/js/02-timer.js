import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let timerId = null;
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (new Date() >= selectedDates[0]) {
      return window.alert('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }
  },
};
flatpickr(refs.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addZero(value) {
  return String(value).padStart(2, '0');
}

function render({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

function endTimer() {
  clearInterval(timer);
  refs.input.disabled = false;
}

function timer() {
  const differenceMs = new Date(refs.input.value) - new Date();
  if (differenceMs <= 0) return endTimer();
  render(convertMs(differenceMs));
}

function startTimer() {
  refs.startBtn.disabled = true;
  if (new Date(refs.input.value) - new Date() <= 0) return endTimer();
  refs.input.disabled = true;
  timer();
  timerId = setInterval(timer, 1000);
}

refs.startBtn.addEventListener('click', startTimer);
