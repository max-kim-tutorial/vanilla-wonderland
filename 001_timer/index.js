window.onload = () => {
  init();
};

function init() {
  let time = 0;

  // 버튼, 디지털 시계 돔 조작
  const timer = document.querySelector(".timer");
  const start = document.createElement("button");
  const plus = document.createElement("button");
  const minus = document.createElement("button");

  start.classList.add("start");
  plus.classList.add("plus");
  minus.classList.add("minus");

  plus.innerText = "+";
  minus.innerText = "-";
  start.innerText = "시작";

  timer.append(plus, start, minus);

  // 아날로그 시계 돔 조작 + 초기화
  const analog = document.querySelector(".anlg-clock");
  analog.style.backgroundColor = "black";
  analog.style.width = "50px";
  analog.style.height = "10px";
  analog.style.marginBottom = "50px";
  analog.style.transform = `rotate(90deg)`;
  analog.style.transformOrigin = "100% 0%";
  const dgt_clock = document.querySelector(".dgt-clock");
  updateClock();

  // 이벤트 리스너 바인딩
  plus.addEventListener("click", function () {
    time++;
    time > 60 ? (time -= 60) : null;
    updateClock();
  });

  minus.addEventListener("click", function () {
    time--;
    time < 0 ? (time += 60) : null;
    updateClock();
  });

  start.addEventListener("click", function () {
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
  });

  // 추상화단계 가장 낮은 함수
  function updateClock() {
    dgt_clock.innerHTML = `${time < 10 ? `0${time}` : time}`;
    sixtime = time * 6;
    analog.style.transform = `rotate(${sixtime + 90}deg)`;
  }

  function disableButtons(order) {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => (button.disabled = order));
  }
}
