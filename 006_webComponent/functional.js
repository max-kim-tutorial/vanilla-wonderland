const Max = function(
  {
  selector, 
  props, 
  state,
  template, 
  beforeRender = function(){}, 
  afterRender = function(){},
  eventBind = function(){}
}) {

  // 생성자로 호출할 수 있게만 만들기
  if (new.target !== Max) {
    return new Max({selector, props, state, template, beforeRender, afterRender, eventBind})
  }

  this.init = () => {
    this.$el =  document.querySelector(selector)
    this.$data = new Proxy({...props, ...state}, handler(this))
    this.$template = template
    // 초기 상태로 하는 초기 렌더링
    this.$view = this.$template(this.$data)
  }

  // 렌더함수
  // 프로미스를 리턴하면 비동기 로직으로 처리할 수 있게..
  // 라고는 하지만 이상태로는 잘 작동되지는 않을듯
  this.render = async () => {
    // 인스턴스 만들때 선언한 함수들의 this를 참조할 수 잇게 this 바인딩 (주로 data에 접근하겠지만)
    await beforeRender.call(this)
    this.$view = this.$template(this.$data)
    // 컴포넌트에서 데이터가 바뀌면 프록시가 이를 감지하고
    // render함수를 재실행시켜서 view를 업데이트한다.

    // el이 있는 경우는 뷰를 el에 붙인다
    if (selector) {
      this.$el.innerHTML = this.$view
    } 
    await eventBind.call(this)
    await afterRender.call(this)
  }

  this.init()
  this.render()
}

// 상위 컴포넌트에서 props를 받기위한 래핑 함수
const component = (instanceParam) => (props) => {
  if (props) {
    return new Max({...instanceParam, props})
  }
  return new Max(instanceParam)
}

// $view를 직접 참조하는 것보다 좀더 추상화 단계 높은 자식 컴포넌트 래핑 함수
export const childComponent = component => { 
  return component.$view 
}

// 프록시로 리액티비티
// 프록시 get set 함수의 첫번째 인자는 proxy 첫번째 생성자에 들어간 객체
// 두번째 인자는 뭔가 바뀌거나(set) 조회되는(get) 객체의 프로퍼티
const handler = (instance) => {
  return {
		get: function (obj, prop) {
			if (['[object Object]', '[object Array]'].indexOf(Object.prototype.toString.call(obj[prop])) > -1) {
				return new Proxy(obj[prop], handler(instance));
			}
			return obj[prop];
    },
    // 삭제, 혹은 수정을 watch하게 된다
		set: function (obj, prop, value) {
			console.log('rerender');
      obj[prop] = value;
      instance.render()
			return true;
		},
		deleteProperty: function (obj, prop) {
			console.log('rerender');
      delete obj[prop];
      instance.render()
			return true;
		}
	};
}


export default component