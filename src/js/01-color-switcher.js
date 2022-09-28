function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    bodyRef: document.querySelector('body'),
}

let timerId = null;

const backgroundColorSwitcher = function () {
  refs.bodyRef.style.backgroundColor = getRandomHexColor();
};

refs.startBtn.addEventListener("click", () => {
    timerId = setInterval(backgroundColorSwitcher, 1000);
    refs.startBtn.disabled = true;
});


refs.stopBtn.addEventListener("click", () => {
   clearInterval(timerId);
  refs.startBtn.disabled = false;
});
