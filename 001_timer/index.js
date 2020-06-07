window.onload = () => {
  let time = 0;

  const digital = document.querySelector(".dgt-clock");
  const analog = document.querySelector(".anlg-clock");
  analogClockStyle();

  const timer = document.querySelector(".timer");
  const start = buttonElementUpdate("start-btn", "시작", onStartClick);
  const plus = buttonElementUpdate("plus-btn", "+", onPlusClick);
  const minus = buttonElementUpdate("minus-btn", "-", onMinusClick);

  timer.append(plus, start, minus);
  updateClock();

  function analogClockStyle() {
    analog.style.backgroundColor = "black";
    analog.style.width = "50px";
    analog.style.height = "10px";
    analog.style.marginBottom = "50px";
    analog.style.transform = `rotate(90deg)`;
    analog.style.transformOrigin = "100% 0%";
  }

  function buttonElementUpdate(className, text, callBack) {
    const btn = document.createElement("button");
    btn.classList.add(className);
    btn.innerText = text;
    btn.addEventListener("click", callBack);
    return btn;
  }

  function onPlusClick() {
    time++;
    time > 60 ? (time -= 60) : null;
    updateClock();
  }

  function onMinusClick() {
    time--;
    time < 0 ? (time += 60) : null;
    updateClock();
  }

  function onStartClick() {
    disableButtons(true);
    let repeat = setInterval(function () {
      if (time > 0) {
        time--;
        updateClock();
      } else {
        clearInterval(repeat);
        disableButtons(false);
      }
    }, 1000);
  }

  function updateClock() {
    digital.innerHTML = `${time < 10 ? `0${time}` : time}`;
    sixtime = time * 6;
    analog.style.transform = `rotate(${sixtime + 90}deg)`;
  }

  function disableButtons(order) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => (button.disabled = order));
  }
};
