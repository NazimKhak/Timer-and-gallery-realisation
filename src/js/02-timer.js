import flatpickr from 'flatpickr';
// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';
import { ref } from 'joi';
let calander = flatpickr('#datetime-picker');
import swal from 'sweetalert';

const refs = {
  buttonStart: document.querySelector('button[data-start]'),
  buttonReset: document.querySelector('button[data-reset]'),
  input: document.querySelector('#datetime-picker'),
  massiveOfspans: document.querySelectorAll('.value'),
};
refs.buttonReset.disabled = true;
refs.input.addEventListener('change', ev => {
  time = calander.selectedDates[0];
});

refs.buttonStart.addEventListener('click', () => {
  if (refs.input.value === '') {
    swal('Будь ласка, виберіть вашу дату');

    return;
  }

  if (time <= Date.now()) {
    swal('Вибрана дата не може бути використана');
    refs.buttonStart.disabled = false;
    refs.buttonReset.disabled = true;
    return;
  }
  timer.start();
  refs.buttonReset.disabled = false;
  refs.buttonStart.disabled = true;
});
refs.buttonReset.addEventListener('click', () => {
  timer.reset();
  refs.massiveOfspans[0].textContent = pad(0);
  refs.massiveOfspans[1].textContent = pad(0);
  refs.massiveOfspans[2].textContent = pad(0);
  refs.massiveOfspans[3].textContent = pad(0);
  refs.buttonStart.disabled = false;
  refs.buttonReset.disabled = true;
});

const timer = {
  intervalId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }

    const startTime = time;

    this.isActive = true;

    this.intervalId = setInterval(() => {
      const curentTime = Date.now();
      if (startTime <= curentTime) {
        this.isActive = false;

        clearInterval(this.intervalId);
        return;
      }

      const deltaTime = startTime - curentTime;

      const timeForInterface = convertMs(deltaTime);
      makeInterfaceOfClock(timeForInterface);
    }, 1000);
  },

  reset() {
    this.isActive = false;
    clearInterval(this.intervalId);
  },
};

function makeInterfaceOfClock({ days, hours, minutes, seconds }) {
  (refs.massiveOfspans[0].textContent = days),
    (refs.massiveOfspans[1].textContent = hours),
    (refs.massiveOfspans[2].textContent = minutes);
  refs.massiveOfspans[3].textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function pad(value) {
  return String(value).padStart(2, '0');
}
