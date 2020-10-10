import component, {childComponent} from "../functional.js"

// 비동기 로직이 이루어지는 생명주기훅은??
// 어렵다
// 이벤트 핸들러

const todoClickCounter = {
  props:['number'],
  template: (data) => {
		return `
      <div>click: ${data.number}</div>
    `
	}
}

// prop을 받아야 하는 컴포넌트
const TodoClickCounter = component(todoClickCounter)

const todoInstance = {
	selector: '#app',
  state: {
		heading: 'My Todos',
    todos: ['Swim', 'Climb', 'Jump', 'Play'],
    number: 0,
  },
  beforeRender: function() {
    console.log('start render')
    const result = new Promise((resolve) => resolve('1'))
    return result
  },
  afterRender: function() {
    console.log('end render')
  },
  eventBind: function() {
    console.log('event bind')
    const todos = document.querySelector('.todos')
    todos.addEventListener('click', () => {
      this.$data.number += 1
    })
  },
	template: (data) => {
    const { heading, todos, number } = data
		return `
			<h1>${heading}</h1>
			<ul class="todos">
				${todos.map(function (todo) {
					return `<li class="todo">${todo}</li>`;
				}).join('')}
      </ul>
      ${childComponent(TodoClickCounter({number}))}
    `
	}
}

// prop이 없는 컴포넌트
const TodoList = component(todoInstance)()


export default TodoList