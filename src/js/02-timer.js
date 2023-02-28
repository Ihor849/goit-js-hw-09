require('flatpickr/dist/themes/material_green.css');
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDatetime: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  spanDays: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++
refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  //   time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (refs.inputDatetime.value === '' || selectedDates[0] < new Date()) {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure(
        'Please choose a date in the future! Do not look back..'
      );
      //   alert('Please choose a date in the future! Do not look back..');
      return;
    } else if (refs.inputDatetime === '') {
      refs.startBtn.disabled = true;
      Notiflix.Notify.failure(
        'Please choose a date in the future! Do not look back..'
      );
    }
    refs.startBtn.disabled = false;
    refs.startBtn.addEventListener('click', () => {
      let timerId = null;
      timerId = setInterval(() => {
        const timeDelta = selectedDates[0] - new Date();
        if (timeDelta < 1000) {
          clearInterval(timerId);
        }
        const result = convertMs(timeDelta);
        updatesGraphicalTimer(result);
      });
    });
  },
};
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / `${day}`));
  // Remaining hours
  const hours = Math.floor((ms % `${day}`) / `${hour}`);
  // Remaining minutes
  const minutes = Math.floor(((ms % `${day}`) % `${hour}`) / `${minute}`);
  // Remaining seconds
  const seconds = Math.floor(
    (((ms % `${day}`) % `${hour}`) % `${minute}`) / `${second}`
  );

  return { days, hours, minutes, seconds };
}

function updatesGraphicalTimer(result) {
  const { days, hours, minutes, seconds } = result;
  refs.spanDays.textContent = `${days}`;
  refs.spanHours.textContent = `${hours}`;
  refs.spanMinutes.textContent = `${minutes}`;
  refs.spanSeconds.textContent = `${seconds}`;
}

flatpickr('#datetime-picker', options);
