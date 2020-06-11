const reviews = [
  {
    id: 0,
    title: "너무 좋아요",
    content:
      "너무너무 좋아서 정말 더 사고 싶어요. 효과가 너무 좋아요 효과가 이렇게 좋아도 되는건가요? 품절되면 재입고 될때까지 너무나 기다릴 거에요.너무너무 좋아서 정말 더 사고 싶어요. 품절되면 재입고 될때까지 너무나 기다릴 거에요.너무너무 좋아서 정말 더 사고 싶어요. 품절되면 재입고 될때까지 너무나 기다릴 거에요.",
  },
  {
    id: 1,
    title: "정말 좋아요",
    content:
      "너무너무 좋아서 정말 더 사고 싶어요. 품절되면 재입고 될때까지 너무나 기다릴 거에요.너무너무 좋아서 정말 더 사고 싶어요. 품절되면 재입고 될때까지 너무나 기다릴 거에요.너무너무 좋아서 정말 더 사고 싶어요. 품절되면 재입고 될때까지 너무나 기다릴 거에요.",
  },
  {
    id: 2,
    title: "왜이렇게 좋아요",
    content:
      "너무너무 좋아서 정말 더 사고 싶어요. 다시 사서 친구들한테 선물할거에요. 너무너무 좋아서 정말 더 사고 싶어요. 품절되면 재입고 될때까지 너무나 기다릴 거에요.너무너무 좋아서 정말 더 사고 싶어요. 품절되면 재입고 될때까지 너무나 기다릴 거에요.",
  },
  {
    id: 3,
    title: "말이 안되네요",
    content:
      "너무너무 좋아서 정말 더 사고 싶어요. 다시 사서 친구들한테 선물할거에요. 너무너무 좋아서 정말 더 사고 싶어요. 품절되면 재입고 될때까지 너무나 기다릴 거에요.너무너무 좋아서 정말 더 사고 싶어요. 품절되면 재입고 될때까지 너무나 기다릴 거에요.",
  },
  {
    id: 4,
    title: "배송도 너무 빠르네요",
    content:
      "너무너무 좋아서 정말 더 사고 싶어요. 다시 사서 친구들한테 선물할거에요. 너무너무 좋아서 정말 더 사고 싶어요. 품절되면 재입고 될때까지 너무나 기다릴 거에요.너무너무 좋아서 정말 더 사고 싶어요. 품절되면 재입고 될때까지 너무나 기다릴 거에요.",
  },
];

window.onload = () => {
  const reviewList = document.querySelector(".list");

  reviews.forEach((review, idx) => {
    const reviewSection = makeReviewSection(review, idx);
    reviewList.appendChild(reviewSection);
  });

  function makeReviewSection(review, idx) {
    const reviewSection = document.createElement("div");
    reviewSection.classList.add("review-section");

    const { id, title, content } = review;

    const reviewId = document.createElement("div");
    reviewId.className = "review-id";
    reviewId.innerText = `${id}번 리뷰`;

    const reviewTitle = document.createElement("div");
    reviewTitle.className = "review-title";
    reviewTitle.innerText = title;

    const reviewContent = document.createElement("div");
    reviewContent.className = "review-content";
    reviewContent.innerText = content;

    const reviewImg = document.createElement("img");
    reviewImg.src = "./thumbnail.png";
    reviewImg.className = "revire-img";

    const moreBtn = document.createElement("div");
    moreBtn.className = "review-more";
    moreBtn.innerText = "더보기";
    moreBtn.setAttribute("idx", idx);
    moreBtn.addEventListener("click", showMore);

    const reviewLine = document.createElement("hr");

    reviewSection.append(
      reviewId,
      reviewTitle,
      reviewContent,
      moreBtn,
      reviewImg,
      reviewLine
    );

    return reviewSection;
  }

  function showMore(e) {
    const idx = e.target.getAttribute("idx");
    const sections = document.querySelectorAll(".review-section");
    const contents = document.querySelectorAll(".review-content");
    const content = contents[idx];
    const reviewSection = sections[idx];
    if (content.classList.contains("active")) {
      content.classList.remove("active");
      e.target.innerText = "더보기";
      moveScrollToTop(reviewSection);
    } else {
      content.classList.add("active");
      e.target.innerText = "접기";
    }
  }

  function moveScrollToTop(reviewSection) {
    const distance = reviewSection.getBoundingClientRect().top;
    const scrollLength = window.pageYOffset;
    window.scrollTo(0, distance + scrollLength);
  }
};
