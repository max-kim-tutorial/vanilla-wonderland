# 👩‍🎤 vanilla-wonderland

바닐라 JS와 DOM API를 연습하는 레포입니다

## 연습 목록

1. [아날로그 타이머](https://github.com/max-kim-tutorial/vanilla-wonderland/tree/master/001_timer) 
2. [니콜라스 영화 앱](https://github.com/max-kim-tutorial/vanilla-wonderland/tree/master/002_movieApp) 
3. [무한 이미지 슬라이더](https://im-developer.tistory.com/97) - 코드출처 :[제이JY님의 블로그, Code Playground](https://im-developer.tistory.com/97)

## DOM API

### DOM이란
[DOM 소개글](https://developer.mozilla.org/ko/docs/Web/API/Document_Object_Model/%EC%86%8C%EA%B0%9C)
```bash
API = DOM + JS
```
- 문서 객체 모델(The Document Object Model)은 HTML, XML 문서의 프로그래밍 인터페이스임(API)
- 문서의 구조화된 표현을 제공하며 프로그래밍 언어가 DOM 구조에 접근할 수 있는 방법을 제공하여 그들이 문서구조, 스타일, 내용등을 변경할 수 있게 돕는다.
- DOM은 구조화된 nodes와 property, method를 갖고 있는 objects로 문서를 표현
- 웹페이지의 객체지향표현
- 브라우저는 html을 파싱해서 돔트리를 만든다 => 그 돔트리에 접근할 수 있는 API
- DOM 이 없다면 자바스크립트 언어는 웹 페이지 또는 XML 페이지 및 요소들과 관련된 모델이나 개념들에 대한 정보를 갖지 못하게 된다. 
- DOM은 프로그래밍 언어와 **독립적(!)** 으로 디자인되었다. 때문에 문서의 구조적인 표현은 단일 API 를 통해 이용가능하다.  이 문서에서는 자바스크립트를 주로 사용하였지만, DOM 의 구현은 어떠한 언어에서도 가능하다. 


### DOM API

모르는거, 정리하고싶은거 나올때 마다 정리하기

- window: document를 포함하는 창, 가장 상위에 위치한 노드, 
- Node : 여러가지 dom 타입들이 상속하는 인터페이스, 그 다양한 타입들을 비슷하게 처리할 수 있게 함
- document : 브라우저가 불러온 웹페이지, 페이지 콘텐츠/돔트리의 **진입점** 역할을 수행
- element : Document 안의 모든 객체가 상속하는 제일 범용적인 기반 클래스, 공통 메서드와 속성만 가지고 있음, 속성값에 접근할 수 있음
- document와 element는 Node로부터 메소드와 프로퍼티를 상속한다!

|                이름                | 객체/역할                                                                                               |
|:----------------------------------:|---------------------------------------------------------------------------------------------------------|
|         querySelector/All          | document/ css 선택자를 기반으로 일치하는 첫 html element를 찾아줌 all은 다찾아줌                        |
|           createElement            | document/지정한 태그이름의 html 요소를 만들어 반환                                                      |
|        classList.add/remove        | element/ 클래스 속성 반환, 읽기전용 객체, add,remove로 수정                                             |
|             innerText              | Node/요소와 그 자손의 렌더링된 텍스트 콘텐츠                                                            |
|             innerHtml              | Element/요소 내에 포함된 HTML/XML 같은 마크업                                                           |
|               append               | parentNode/parentNode의 마지막 자식 뒤에 node, DOMString 객체 삽입                                      |
|               style                | element/요소의 **인라인** 스타일에 접근하거나 설정할 때                                                 |
|      appendChild/removeChild       | Node/한 노드를 특정 부모 노드의 자식 노드 리스트중 가장 마지막에 붙이거나 찾아 삭제                     |
|             matchMedia             | window/주어진 미디어 쿼리 **문자열**의 분석 결과를 나타내는 MediaQueryList객체반환(matches로 타진 가능) |
|             addListner             | mediaQueryList.addListner(callback)/mql상태 변화시마다 호출되는 콜백                                    |
| firstElementChild/lastElementChild | ParentNode/parent 노드에 속한 가장 첫 자식과 가장 마지막 자식 element를 리턴                            |
|             cloneNode              | Node/복제된 노드를 반환                                                                                 |
|            insertBefore            | Node/참조된 노드 앞에 특정 부모 노드의 자식노드 삽입                                                    |


## 발췌

### 1. matchMedia 활용/자스로만 반응형 적용하기

```js

// 미디어 쿼리 리스트
var mql = window.matchMedia(
  "screen and (min-width: 320px) and (max-width: 667px) "
);

// 미디어 쿼리 status 바뀔때마다 실행되는 콜백을 넘긴다
mql.addListener((current) => {
  cardWidthResize(current.matches);
  posterWidthResize(current.matches);
});

//모든 카드들이 width를 조절하는 함수를 호출함
function cardWidthResize(matching) {
  const cards = document.querySelectorAll(".movie-card");

  cards.forEach((card) => {
    cardWidth(card, matching);
  });
}

// width 조절
function cardWidth(card, matching) {
    card.style.width = matching ? "92.5%":"40%"
}
```

### 2. 특정 조건에서 css조작으로 애니메이션 발생시키기

- transform, transition
- 이미지 슬라이더의 다음 버튼 이벤트 핸들러
- 무한 이미지 슬라이더를 구현하기 위해 이미지 슬라이더의 모든 이미지 앞과 끝에 각각 이미지를 하나씩 더 붙였음.

```js
  slideBtnNext.addEventListener("click", function () {
    // 정상적인 이동
    if (curIndex <= slideLen - 1) {
      // transform이 발생하면 transition에 설정한 속도로 transition 발생, transform 0ms 이런식으로 넣어줘도 될듯
      slideList.style.transition = slideSpeed + "ms";
      // 슬라이더 이미지의 이동
      slideList.style.transform = "translate3d(-" + slideWidth * (curIndex + 2) + "px, 0px, 0px)";
    }
    // 맨 끝일때 => 일단은 맨 뒤에 붙여놓은 가짜 첫 이미지로 이동
    if (curIndex === slideLen - 1) {
      // 이동하면서 => 0.3초 뒤 애니메이션을 실행하고 => 원래의 맨 처음으로 바꿔놓는다
      setTimeout(function () {
        slideList.style.transition = "0ms";
        // 슬며시 -300 이지점(첫 지점)으로 이동한후
        slideList.style.transform ="translate3d(-" + slideWidth + "px, 0px, 0px)";
      }, slideSpeed);
      // 현재 인덱스를 바꿔놓는다, 다음에 next 눌렀을때 다시 0에서 1로 넘어갈 수 있도록
      curIndex = -1;
    }

    // 페이지네이션, 슬라이드 active 해제
    curSlide.classList.remove("slide_active");
    pageDots[curIndex === -1 ? slideLen - 1 : curIndex].classList.remove(
      "dot_active"
    );

    // 최종적으로 인덱스는 여기서 바뀜, slide_active 클래스를 추가
    curSlide = slideContents[++curIndex];
    curSlide.classList.add("slide_active");
    pageDots[curIndex].classList.add("dot_active");
  });
```

## clean code 측면에서 의문

- 비슷한 기능을 하는 함수를 분리할때 플래그 변수 사용해 다르게 만드는거 별로인가?
- 추상화 수준 위에서 아래로 갈수록 낮아져야
- 행위 위주로 묶지 말고 대상 위주로 묶기
- 전역변수보다는 함수에 인자를 주는 방식으로 짜야 가독성이 높을 것 같음