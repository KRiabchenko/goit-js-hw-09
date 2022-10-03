import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const timerRef = document.querySelector('.timer');
const startBtn = document.querySelector('[data-start]');

let timerDeadline = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        timerDeadline = selectedDates[0].getTime();
    if (timerDeadline - Date.now() <= 0) {
        Notiflix.Notify.failure('Please choose a date in the future', {
            position: 'center-center',
            backOverlay: true,
            clickToClose: true,   
      });
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
};

flatpickr('#datetime-picker', options);

const timer = {
    intervalId: null,
    refs: {
        days: document.querySelector('[data-days]'),
        hours: document.querySelector('[data-hours]'),
        minutes: document.querySelector('[data-minutes]'),
        seconds: document.querySelector('[data-seconds]'),
    },
    notifyOptions: {
    position: 'center-center',
    backOverlay: true,
    clickToClose: true,
    },
    start() {
        Notiflix.Notify.success('The countdown is on!', this.notifyOptions)
        this.intervalId = setInterval(() => {
            const ms = timerDeadline - Date.now();

            if (ms <= 1000) {
                clearInterval(this.intervalId);
                Notiflix.Notify.success('Time is come!', this.notifyOptions)
            }

            const data = convertMs(ms);
            const { days, hours, minutes, seconds } = this.refs;
            this.refs.days.textContent = addLeadinZero(data.days);
            this.refs.hours.textContent = addLeadinZero(data.hours);
            this.refs.minutes.textContent = addLeadinZero(data.minutes);
            this.refs.seconds.textContent = addLeadinZero(data.seconds);
        }, 1000);
  },
};

startBtn.addEventListener('click', 
  timer.start.bind(timer));
startBtn.setAttribute('disabled', ' ');
 
function addLeadinZero(value) {
    return String(value).padStart(2, '0')
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

