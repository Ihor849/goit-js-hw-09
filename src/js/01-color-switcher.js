const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};
refs.startBtn.classList.add('control-btn');
refs.stopBtn.classList.add('control-btn');

const timer = {
  intervalId: null,
  isActive: false,

  onClickButtonStart() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    refs.startBtn.disabled = true;
    refs.stopBtn.disabled = false;

    this.intervalId = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },
  onClickButtonStop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    refs.startBtn.disabled = false;
    refs.stopBtn.disabled = true;
  },
};

refs.startBtn.addEventListener('click', e => {
  timer.onClickButtonStart();
});

refs.stopBtn.addEventListener('click', e => {
  timer.onClickButtonStop();
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
