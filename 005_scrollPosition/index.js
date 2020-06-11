window.onload = () => {
  const parent = document.querySelector(".parent");
  const child = document.querySelector(".child");

  window.addEventListener("scroll", function () {
    console.log("스크롤 이벤트 감지!!");
    // 뷰포트 시작점과의 거리
    console.log(
      "뷰포트 시작점으로부터의 거리",
      child.getBoundingClientRect().top
    );

    // HTML 시작점으로부터의 거리
    console.log(
      "HTML 시작점으로부터의 거리",
      child.getBoundingClientRect().top - window.pageYOffset
    );

    // 부모 요소와의 거리
    console.log(
      "부모 요소와의 거리",
      child.getBoundingClientRect().top - parent.getBoundingClientRect().top
    );
  });
};
