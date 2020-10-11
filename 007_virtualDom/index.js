// 가상 돔 트리를 실제 element로 변환하는 함수
// { type: ‘…’, props: { … }, children: [ … ] } 요거 처리
function createElement(node) {
  // 재귀의 종결 조건, type이 없는 경우에 문자열 노드만
  // 문자열이 태그 내부에 존재한다면 그것도 children이기 때무네
  if (typeof node === 'string') {
    return document.createTextNode(node);
  }
  // 타입에 맞는 실제 element 만들기
  const $el = document.createElement(node.type);
  // props 세팅
  setProps($el, node.props);
  // children 순회 처리해서 el에 붙인다
  node.children
    // children 모두에 대해 재귀적으로 함수를 호출함
    .map(createElement)
    .forEach($el.appendChild.bind($el));

  // 실제 element 리턴
  return $el;
}

// props을 html의 속성으로 바꿔주는 함수
function setProps($target, props) {
  Object.keys(props).forEach(name => {
    setProp($target, name, props[name]);
  });
}

// 이미 element가 되는 타겟의 html에 속성을 더하는작업임
function setProp($target, name, value) {
  if (isCustomProp(name)) {
    return;
  } else if (name === 'className') {
    $target.setAttribute('class', value);
  } else if (typeof value === 'boolean') {
    setBooleanProp($target, name, value);
  } else {
    $target.setAttribute(name, value);
  }
}

// prop마다 특성이 다르므로 고려해서 처리
function setBooleanProp($target, name, value) {
  if (value) {
    $target.setAttribute(name, value);
    $target[name] = true;
  } else {
    $target[name] = false;
  }
}

function removeBooleanProp($target, name) {
  $target.removeAttribute(name);
  // 가상돔의 프로퍼티로 넣는듯
  $target[name] = false;
}

function isCustomProp(name) {
  return false;
}

function updateProps($target, newProps, oldProps = {}) {
  // 프로퍼티들의 diff를 해결
  const props = Object.assign({}, newProps, oldProps);
  Object.keys(props).forEach(name => {
    updateProp($target, name, newProps[name], oldProps[name]);
  });
}

function updateProp($target, name, newVal, oldVal) {
  if (!newVal) {
    removeProp($target, name, oldVal);
  } else if (!oldVal || newVal !== oldVal) {
    setProp($target, name, newVal);
  }
}

// 가상돔이 변화를 감지하게 하는 함수
// 두개의 노드를 비교
// 1)노드의 타입이 바뀌거나 2) 가상돔 element가 객체가 아니라 문자열이거나 3) 문자열인데 내용이 다르거나
function changed(node1, node2) {
  return typeof node1 !== typeof node2 || typeof node1 === 'string' && node1 !== node2 ||
    node1.type !== node2.type
}

// index는 제거에 쓰인다. 바뀐 노드의 위치가 children 배열에서 어딘지 인자로 넘겨주기
// 각 노드마다 updateElement를 호출한다.
// 부모는 이미 element이다!!!
function updateElement($parent, newNode, oldNode, index = 0) {
  // 이전 노드가 없는 경우(노드의 새로운 추가)
  if (!oldNode) {
    // 부모에다가 변경된 노드를 붙인다
    $parent.appendChild(
      createElement(newNode)
    );
  // 새 노드가 없는 경우(부모 노드에서 제거)
  } else if (!newNode) {
    $parent.removeChild(
      $parent.childNodes[index]
    );
    // 가상돔 element 만으로 캐치할 수 있는 변화를 캐치
  } else if (changed(newNode, oldNode)) {
    $parent.replaceChild(
      createElement(newNode),
      $parent.childNodes[index]
    );
  // old도 있고 new도 있는데 차이가 없는 경우 => 그래 여기까지는 없네 deep하게 ㄱ, 자식을 까봐야 한다
  // newNode가 아직 resolve가 안되었을 경우(내용을 비교하기 위해서는 문자열까지)
  // node가 element일때만 children을 고려한다
  } else if (newNode.type) {
    // 비교할수 있도록 가상돔의 프로퍼티에다가 넣는것도 있고

    // 바뀐 노드의 props를 반영시켜서 createElement함
    // 이렇게 하면 prop이 렌더링에 실질적으로 반영됨
    updateProps(
      $parent.childNodes[index],
      newNode.props,
      oldNode.props
    );
    const newLength = newNode.children.length;
    const oldLength = oldNode.children.length;
    // 있는거 기준 모두순회하면서 update를 재귀적으로 호출한다
    for (let i = 0; i < newLength || i < oldLength; i++) {
      updateElement(
        $parent.childNodes[index],
        newNode.children[i],
        oldNode.children[i],
        i
      );
    }
  }
}