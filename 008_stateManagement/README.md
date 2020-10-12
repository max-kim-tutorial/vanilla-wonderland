# Frontend Super Fundamental_3_상태관리 어플리케이션

## 상태관리

### 필요성

- 복잡한 상태 업데이트 로직들을 컴포넌트에서 뜯어낼 수 있고 이를 모듈화 하여 여러 파일들로 저장해서 보기좋게 정돈할 수 있다. 이를 통해서 더욱 높은 유지보수성을 일궈낼 수 있다
- 상태 관리 라이브러리가 없다면 컴포넌트의 state을 사용해서 열심히 상태를 조합하고 복잡하게 작업해야하는데 상태관리 라이브러리는 수고를 덜어준다.

## 튜토리얼

- [이 글의](https://css-tricks.com/build-a-state-management-system-with-vanilla-javascript/) 튜토리얼을 따라 하면서 상태관리 라이브러리를 바닐라 js로 만들어 본다.

## 느낀점

- proxy는 갓갓 객체이다. 컴포넌트의 반응성, 가상돔의 반응성, 스토어의 반응성까지 모든 튜토리얼에서 한번씩 다룬듯.
- commit -> mutation 인걸 보니까 이건 뷰엑스에 더 가깝다. 
- 순수함수가 아닌 불순함수로 store을 바꾸고 있고, redux는 프록시가 아니라 직접 과거와 현재의 state를 비교하는 방식으로 상태 업데이트를 하는걸로 알고 있어 redux랑은 거리가 좀 있다.
- 모든 과정이 양방향이 아닌 단방향, 즉 flux 아키텍쳐에 따라 상태 업데이트와 랜더링이 진행되고 있음을 알 수 있다.
- Component -> Store -> Action -> Commit -> Mutation -> Set(Proxy) -> stateChange -> render 
- 뷰와 컨트롤러가 상호작용하는 MVC와 달리 컴포넌트는 직접 state에 접근해서 뭔가를 바꿀수 없고, 컴포넌트에서 액션을 디스패치시켜 state를 바꾼다.
- 스토어가 발행하는 이벤트를 컴포넌트는 구독한다. 구독을 선언할때 컴포넌트단에서는 render 함수를 미리 스토어에 콜백으로 보내놓는다. 나중에 스토어에서 이벤트를 발행할 때 그 콜백을 실행시킨다.
- 함수의 호출 주도권을 가진 주체를 바꾼다는 콜백의 효과를 실감할 수 있었다. 컴포넌트의 렌더 함수를 콜백으로 받은 스토어가 렌더를 실행시킨다.

## reference

- [velopert - 상태 관리 라이브러리의 미학](https://velopert.com/3707)
- [Dan Abramov - You Might Not Need Redux](https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367)