const body = document.querySelector('body');
// console.log(bodyRefs);
const startBtn = document.querySelector('button[data-start]');
// console.log(buttonStartRefs);
const stopBtn = document.querySelector('button[data-stop]');
// console.log(buttonStopRefs);

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const timer = {
  intervalId: null,
  isActive: false,

  onClickButtonStart() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;

    this.intervalId = setInterval(() => {
      refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },
  onClickButtonStop() {
    clearInterval(this.intervalId);
    this.isActive = false;
  },
};

refs.startBtn.addEventListener('click', e => {
  timer.onClickButtonStart();
});

refs.stopBtn.addEventListener('click', e => {
  timer.onClickButtonStop();
});

function getRandomHexColor() {
  console.log(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
