# Frontend Super Fundamental_2_가상 돔

## 가상돔이 무엇인가

### 가상돔의 두가지 컨셉

1. 실제 돔 표현의 모든 종류이다. 실제 돔을 다양한 방식으로 표현한 것이 가상돔이다.
2. 가상돔 트리에서 어떤 것을 변경하면 새로운 가상돔 트리가 나옴. 변경된 새로운 트리와 이전 트리를 비교, 차이를 찾고 실제 DOM에 대해 필요한 최소한의 변경만 수행된다.

### 표현

돔 트리를 메모리에 저장하기 위해 objectify 한다.

```html
<ul class=”list”>
  <li>item 1</li>
  <li>item 2</li>
</ul>
```

```js
{ type: ‘ul’, props: { ‘class’: ‘list’ }, children: [
  { type: ‘li’, props: {}, children: [‘item 1’] },
  { type: ‘li’, props: {}, children: [‘item 2’] }
] }

// 이런식으로 트리를 이루게 만들 수 있다.
{ type: ‘…’, props: { … }, children: [ … ] }

// 큰 트리를 하드코딩 할 수 없으니, 트리를 만들어주는 헬퍼함수
function h(type, props, …children) {
  return { type, props, children };
}

// 헬퍼함수 이용해서 만드는 돔트리는 이런 모습
// 알고있듯 바벨이 JSX를 번역해서 리액트 돔트리로 만든다
h(‘ul’, { ‘class’: ‘list’ },
  h(‘li’, {}, ‘item 1’),
  h(‘li’, {}, ‘item 2’),
);
```

### React가 사용하는 JSX

```js
React.createElement(‘ul’, { className: ‘list’ },
  React.createElement(‘li’, {}, ‘item 1’),
  React.createElement(‘li’, {}, ‘item 2’),
);
```

## 튜토리얼

가상돔의 기본 동작 방식을 이루는 함수들을 자바스크립트로 만들어 보쟈

### 가상돔 노드들의 변화를 catch해야할 지점

1. 리프노드, 즉 문자열의 단순 변화
2. attribute의 변화
3. 태그 이름의 변화
4. 이벤트리스너의 변화

### 동작

> 뭔가 state이 바뀌어서 렌더링이 다시 일어난다 => 가상돔트리화 => 비교 => 반영

0. 없던게 있어지거나 있던게 없어지면 그 이하 노드에 대해서 재귀를 돌리지는 않아도 될것
1. 리액트의 경우에는 일단 JSX코드들을 바벨이 리액트 element 가상돔 트리로 바꾼다.
2. 처음 렌더링시에는 걍 oldNode가 없으므로 걍 newNode로 실제 element가 생성된다 이때 updateElement의 초기 parent는 앱의 최상위 노드

```js
// 쌩초기
updateElement(
  document.querySelector('#app'),   // 진입점
  newNode,  
  oldNode,  // 맨 처음엔 없다
  index
)
```

3. 다음번에 뭔가 state가 바뀌었을 때는 oldNode가 존재하니깐 updateElement가 실질적으로 작동을 하기 시작함. 노드 엘리먼트들을 하나씩하나씩 모두 비교하게 된다 재귀적으로,,
4. 요 예제에서는 노드가 있을때 노드가 없을때 노드의 type이 바뀌었을때 노드가 겉보기엔 다 같을때 로 조건을 분기해서 진행한다.
5. props같은 경우는 맨처음에 가상돔 element일때는 객체였다가 렌더링시에 html element의 attribute로 바뀐다. 그걸 이용해서 element만으로 diff가 있는지 없는지 캐치하는 과정이 끝나면 inspect했던 parent에 props 업뎃을 시킨다(여기서는 뭐 그렇게 했다). 사실 element 자체가 다르면 prop볼필요도 없이 새로 element를 업데이트해야되기 때문에 prop업데이트는 type inspecting이 끝나고 난 다음에 이루어져도 이론상으로는 괜찮을거같다.
6. 이벤트 핸들러 부분은 나중에 시간날때

## reference

- [Ray - Virtual DOM을 직접 만들어보자](https://medium.com/@enro2414_40667/virtual-dom-%EB%B2%84%EC%B6%94%EC%96%BC-%EB%8F%94-%EA%B0%80%EC%83%81-%EB%8F%94-%EC%9D%84-%EC%A7%81%EC%A0%91-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90-1c44606ea9b1)