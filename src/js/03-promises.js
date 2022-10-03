import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onSuccess(result){
  Notiflix.Notify.success(result);
};

  function onError(error){
    Notiflix.Notify.failure(error);
  };

function onFormSubmit(evt) {
  evt.preventDefault();
  const delayEl = event.currentTarget.elements.delay;
  const stepEl = event.currentTarget.elements.step;
  const amountEl = event.currentTarget.elements.amount;
 
  let delayPromise = Number(delayEl.value);
  
  for (let i = 0; i < amountEl.value; i += 1) {
    createPromise(i + 1, delayPromise).then(onSuccess).catch(onError);
    delayPromise += Number(stepEl.value); 
  }
};

  function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (shouldResolve) {
          resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
        } else {
          reject(`❌ Rejected promise ${position} in ${delay}ms`);
        }
      }, delay);
    })
};


