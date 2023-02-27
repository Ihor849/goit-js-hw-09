import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('.form'),
  inputDelay: document.querySelector('input[name="delay"]'),
  inputStep: document.querySelector('input[name="step"]'),
  inputAmount: document.querySelector('input[name="amount"]'),
  button: document.querySelector('button[type="submit"]'),
};
// refs.formEl.addEventListener('input', e => {
//   console.log(e);
// });

refs.formEl.addEventListener('submit', submitCreatePromise);

function submitCreatePromise(e) {
  e.preventDefault();

  const delayStep = Number(refs.inputDelay.value);
  let delayFirst = Number(refs.inputStep.value);
  const amount = Number(refs.inputAmount.value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayFirst)
      .then(({ position, delayFirst }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delayFirst}ms`);
      })
      .catch(({ position, delayFirst }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delayFirst}ms`);
      });
    delayFirst += delayStep;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
