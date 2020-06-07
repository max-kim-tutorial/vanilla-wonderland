# 👩‍🎤 vanilla-wonderland

바닐라 JS와 DOM API를 연습하는 레포입니다

## 연습 목록

1. [아날로그 타이머](https://github.com/max-kim-tutorial/vanilla-wonderland/tree/master/001_timer) 
2. [니콜라스 영화 앱](https://github.com/max-kim-tutorial/vanilla-wonderland/tree/master/002_movieApp) 
3. 무한 이미지 슬라이더

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
- document : 브라우저가 불러온 웹페이지, 페이지 콘텐츠/돔트리의 **진입점** 역할을 수행
- element : Document 안의 모든 객체가 상속하는 제일 범용적인 기반 클래스, 공통 메서드와 속성만 가지고 있음, 속성값에 접근할 수 있음

|          이름           | 객체/역할                                                                                               |
|:-----------------------:|---------------------------------------------------------------------------------------------------------|
|    querySelector/All    | document/ css 선택자를 기반으로 일치하는 첫 html element를 찾아줌 all은 다찾아줌                        |
|      createElement      | document/지정한 태그이름의 html 요소를 만들어 반환                                                      |
|  classList.add/remove   | element/ 클래스 속성 반환, 읽기전용 객체, add,remove로 수정                                             |
|        innerText        | Node/요소와 그 자손의 렌더링된 텍스트 콘텐츠                                                            |
|        innerHtml        | Element/요소 내에 포함된 HTML/XML 같은 마크업                                                           |
|         append          | parentNode/parentNode의 마지막 자식 뒤에 node, DOMString 객체 삽입                                      |
|          style          | element/요소의 **인라인** 스타일에 접근하거나 설정할 때                                                 |
| appendChild/removeChild | Node/한 노드를 특정 부모 노드의 자식 노드 리스트중 가장 마지막에 붙이거나 찾아 삭제                     |
|       matchMedia        | window/주어진 미디어 쿼리 **문자열**의 분석 결과를 나타내는 MediaQueryList객체반환(matches로 타진 가능) |
|       addListner        | mediaQueryList.addListner(callback)/mql상태 변화시마다 호출되는 콜백                                    |


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

## clean code 측면에서 의문

- 비슷한 기능을 하는 함수를 분리할때 플래그 변수 사용해 다르게 만드는거 별로인가?
- 추상화 수준 위에서 아래로 갈수록 낮아져야
- 행위 위주로 묶지 말고 대상 위주로 묶기
- 전역변수보다는 함수에 인자를 주는 방식으로 짜야 가독성이 높을 것 같음