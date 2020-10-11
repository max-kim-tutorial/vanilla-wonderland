# Frontend Super Fundamental_1_컴포넌트

## 컴포넌트를 왜 쓰는걸까?

나름 프론트를 한다는 개발자인데 두리뭉실하게 대답할 수 없다,,

### 컴포넌트의 뜻

하나의 문제를 잘 해결하는 프로그램. 예로부터 모든 공학 분야의 공학자가 자주 사용해오던 문제 해결 방법. divide and conquer

### 장점

- 사고의 분산을 막고 하나의 문제에 집중함으로써 효율적으로 개발할 수 있다
- 설계의 오류를 쉽게 파악할 수 있고 상대적으로 테스트하기 쉽다
- 이식성을 높이고, 변경에 유연하게 대체할 수 있다
- 함수형 프로그래밍과 관련이 깊다 : 예기치 않은 부수효과 없이 **하나의 일을 잘 수행하는 함수** 그러한 함수를 조합/구성함으로써 큰 문제를 해결한다
- 입출력을 뚜렷하게 구분할 수 있다 : 무엇을 넣었을때 무언가를 렌더링한다. state를 넣으면 그에 맞는 view를 렌더링한다
- state = data + time

**View=Function(state)**

<img src="./_img/inputOutput.png" width="400">

### 관심사의 분리

- HTML, CSS, JS를 분리하는게 당연한 관심사의 분리라고 생각했다. 하지만..
- **템플릿은 기술의 분리일뿐 관심사의 분리가 아니다** - Pete Hunt
- 어쨋든 중요한건 **이걸로 무슨 문제를 해결하는가??** 기술이 달라 보여도 같은 문제를 해결한다면 **관심사는 같다.**
- 관심사가 같으니깐 수정시 함께 수정해야 할 확률이 높다. 이때 분리된 환경보다 한 곳에 있는 경우가 수정이 훨씬 용이하다.
- 테스트를 할때 자바스크립트만 테스트하는게 아니고,, View를 테스트하는 것이기 때문에 UI나 Style도 얼마든지 테스트의 대상이 될 수 있다. 
- 따라서 관련있는 것은 최대한 가까이에 두는 구조가 유행하고 있다. 테스트코드까지 포함해서!
- 하나의 파일에 모든 관심사를 작성하는 방식도 선호되고있다. ex)Next.js의 style jsx, Vue.js의 싱글파일컴포넌트

### 설계

- 코딩을 하기 전에 설계를 하는 단계에서, 가장 먼저 한가지 일을 수행하는 최소단위를 분석해야 한다.
- BEM은 컴포넌트에 어울리는 마크업임. 마크업을 짭시다
  - Block : 애플리케이션의 구성 요소로서 독립된 존재
  - Element : 블록을 구성하는 작은 단위, 자식 개체
  - Modifier : 블록이나 요소 테마, 동작을 표현 
- 스타일링은 SASS의 nesting, interpolation(보간)은 컴포넌트 접근법과 잘 어울린다. css도 관심사에 따라 분리할 수 있게 신경쓰자.
- context free : 상위컴포넌트의 스타일이 하위 컴넌에 영향을 주면 안된다 => 컴포넌트는 어떤 문맥에서든 자유로워야 한다.
- 만약 특정 문맥에서 컴포넌트가 변화한다면 해당 컴포넌트에 새로운 modifier를 추가해야한다.(prop)
- **무족권 자유롭게. 가만히 둬도 지혼자 잘 살아남을 수 있게**

## 튜토리얼

바닐라 자바스크립트로 웹 컴포넌트를 구현해볼 것이다

1. Functional Component: proxy 객체의 원리를 이용해 반응성을 구현한 간단한 함수형 컴포넌트 (+대충의 기능 구현)
2. Class Component: htmlElement 클래스를 extend해서 만든 customElement 클래스형 컴포넌트 (맛보기)

### 기능

1. state 입력하면 뷰를 렌더링(ok)
2. 반응성, state 변경되면 재랜더링(ok)
3. 생명주기 + 렌더링 전 후의 비동기, 부수효과 작업(ok, 불완전함)
4. 간단한 이벤트 핸들러(ok, 바닐라로 대충 불안정함)
5. 컴포넌트 중첩(ok)

## 앞으로 정리할 것

- HTML 스크립트 태그 type 종류

## 보너스) Web Component W3C 명세

HTML이 기본적으로 제공하는 엘리먼트는 브라우저와 운영체제에 따라 다르게 보이는 경우도 있고, 더 발전하는 웹 환경에 대응하기에 한계가 있다. 그러나 자바스크립트는 사용이 비교적 어렵고, 크기가 커서 느리다.

### 기존 자바스크립트의 문제점

1. 적용이 힘들다. HTML 문서에 스크립트 파일과 CSS를 포함하고 특정한 마크업 구조를 사용해야 하는 등 개발자도 사용하기 힘들다
2. 느리다. 상당한 크기의 코드 덩어리인 자바스크립트 컴포넌트는 비용이 너무 많다. 그리고 컴포넌트의 작동 방식이 대부분 로드가 완료된 후에 적용하는 방식이라 추가로 비용이 발생한다. 그래서 저사양 기기에서 사용하는데 제약이 존재한다.
3. 이런 이슈들을 개선하고자 웹 컴포넌트라는 명세가 만들어졌다. 개발자가 자체적으로 최소한의 자바스크립트만 이용하여 HTML만으로 컴포넌트를 구성한다.

### 구성요소

#### 1. 템플릿

```html
<!-- 어 이거 Vue 아니냐????? -->
<template>
    <div class="slide">
        <ul>
            <content select="li"></content>
        </ul>
    </div>
</template>  
```

웹 컴포넌트도 특정 엘리먼트 구조가 필요하며 이때 사용하는 것이 템플릿이다. 아래 코드와 같이 템플릿 안에 원하는 엘리먼트 구조를 만들면 된다. 얘는 DOM의 구조를 가지고는 있지만 렌더링되지 않으며 이미지와 같은 리소스 파일도 내려받지 않는다. 그리고 content의 select 속성을 이용해 엘리먼트를 넣을 수 있다.

#### 2. 데코레이터

```HTML
<decorator id="decorator-event-demo">
    <script>
        function h(event) {
            alert(event.target);
        }
        this.listen({selector: "#b", type: "click", handler: h});
    </script>
    <template>
        <content></content>
        <button id="b">Bar</button>
    </template>
</decorator>  
```

데코레이터는 엘리먼트를 오버라이드해 엘리먼트를 꾸미는 역할을 한다. 비교를 하자면 데코레이터는 리모델링이고, 커스텀 엘리먼트는 새로 만드는 것이다.(스크립트를 바로 달아주는게 인상적이군) 데코레이터에는 listen 메서드로 이벤트를 할당할 수 있다. this.listen 메서드는 오브젝트를 인자로 받으며 오브젝트에는 선택자, 타입, 핸들러를 등록하여 이벤트를 관리한다.

#### 3. 커스텀 엘리먼트

```html
<!-- name은 이름, extend는 어떤 속성을 확장했는지, constructor는 생성자 이름 -->
<element name="x-slide" extends="ul" constructor="SlideControl">  
    <template>
        <div class="slide">
            <ul>
                <content select="li"></content>
            </ul>
        </div>
    </template>
    <script>
        SlideControl.prototype = {
            currentNum : function(){},
            lastNum : function(){}
        }
        this.lifecycle({
            created: function(root) {}
        });
    </script>
</element>  

<!-- 이걸 html파일로 만들고 다른 html파일에서 이런식으로 링크를 달아준다 -->
<link rel="components" href="http://helloworld.naver.com/slide-component.html"> 

<!-- content가 li니깐 li 넣어주기 -->
<!-- 엥 이거 완전 Vue Slot 아니냐? -->
<x-slide is="x-slide">  
    <li><img src="http://helloworld.naver.com/img/1.jpeg" alt="1.jpeg" width="500px" height="333px" style=""></li>
    <li><img src="http://helloworld.naver.com/img/2.jpeg" alt="2.jpeg" width="500px" height="333px" style=""></li>
    <li><img src="http://helloworld.naver.com/img/3.jpeg" alt="3.jpeg" width="500px" height="333px" style=""></li>
    <li><img src="http://helloworld.naver.com/img/4.jpeg" alt="4.jpeg" width="500px" height="333px" style=""></li>
</x-slide>  
```

사용 방법이 데코레이터와 유사해 보이는데, 얘는 element 태그로 감싸준다. 개발자가 새로운 엘리먼트를 만드는 것과 같다. 얘는 element를 상속할 수 있어 createElement 메서드나 생성자로 만들 수 있다.

자바스크립트를 통해서 createElement로 엘리먼트를 생성해 appendChild로 추가할 수 있으며 정의 메서드를 사용할 수 있다.

```js
SlideControl.prototype = {  
  currentNum : function(){},
  lastNum : function(){}
}

// 아까 cunstroctor을 지정해놓은 이유가 이렇게 쓰기 위해선가 보다
// programmatic하게
var slide = new SlideControl();  
//var slide = document.createElement("x-slide");
document.body.appendChild(slide);

silde instanceof HTMLElement //true  
silde instanceof HTMLULElement //true

slide.addEventListener("click", function (event) {  
    event.target.currentNum();
});

b.lastNum();  
```

또한 커스텀 엘리먼트는 라이프 사이클이 있기 때문에 특정 시점에 이벤트를 활용할 수 있다. (created, attributeChanged, insterted, removed) lifeCycle 메서드에 오브젝트 형식으로 넣으면 해당 시점에 실행된다.


#### 4. 섀도 DOM

섀도 DOM은 DOM의 구조를 가지고 있지만 외부에는 노출되지 않은 DOM을 말하며 DOM의 구조를 캡슐화할때 사용한다. 추가하거나 접근하기 위해서는 일반 DOM과는 다르게 별도의 방법이 필요하다. 

위에서 설명한 템플릿 엘리먼트를 이용해 만들어진 데코레이터나 커스텀 엘리먼트는 모두 섀도 DOM으로 만들어진다. 다만 데코레이터에서 만들어진 섀도 DOM은 스크립트로 접근하거나 수정할 수 없다. 개발자 도구 보면 희미하게 나온다. 커스텀 엘리먼트에서 커스텀 엘리먼트로 element태그 만든 자체는 렌더링이 안되고 shadow 돔의 서브트리만 렌더링되는 식이다.

## 마치며

현재 웹 컴포넌트 명세는 매우 미흡하며 완벽하게 지원하는 브라우저도 많다. 논란도 많은 명세다. 근데 기존의 외부 라이브러리를 사용해야만 가능했던 기능이 대부분 HTML 5의 기능으로 빠르게 대체되고 있다. 요걸 도입하면 성능이 더 좋아질 가능성도 많다. 무엇보다 사용자가 사용하기 쉽기 때문에 계속 발전될 가능성이 있음.


```html
<element extends="time" name="x-clock">  
<script>  
    // …

    this.lifecycle({
        inserted: function() { this.startUpdatingClock(); },
        removed: function() { this.stopUpdatingClock(); }
    });

    // …
</script>  
</element>  
```

## reference

- [우영주 - 컴포넌트 관점에서 개발하기](https://www.slideshare.net/UyeongJu/ss-77857699)
- [Chris Ferdinandi - How to create a state-based UI component with vanilla JS
](https://gomakethings.com/how-to-create-a-state-based-ui-component-with-vanilla-js/)
- [Chris Ferdinandi -How to create a reactive state-based UI component with vanilla JS Proxies
](https://gomakethings.com/how-to-create-a-reactive-state-based-ui-component-with-vanilla-js-proxies/)
- [A Shot Of Code - How to create a Web Component using Vanilla JS](https://www.youtube.com/watch?v=vLkPBj9ZaU0)
- [네이버 D2 - 웹 컴포넌트](https://d2.naver.com/helloworld/188655)
