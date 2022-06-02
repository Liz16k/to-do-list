import { templateTodo } from "./templates.js"
import { Todo } from "./constructors.js"
import { data } from './storage.js'

export {
  handleSubmitForm,
  handleInputChange,
  handleChangeSearchForm,
  handleClickBtnDel,
  handleClickBtnDelAll,
  handleClickBtnShowAll,
  handleClickBtnShowDone,
  handleClickBtnLast,
  render
}

let list = document.querySelector('.task-list')
let counters = [...document.querySelectorAll('#counter')]

function handleSubmitForm (e) {
  e.preventDefault()
  const content = e.target.children[0].value
  if (content) {    
    const task = new Todo(content)
    data.push(task)
    e.currentTarget.reset()
    render()
  } else alert('Enter to do...');
}

function handleInputChange (e) {
  if (e.target.classList.contains('form-check-input')) {
    const task = e.target.closest('.task-body')
    const id = task.id
    data.forEach(task => {
      if (task.id == id) {
        task.isChecked = e.target.checked
        render()
      }
    })
  }
}

function handleChangeSearchForm (e) {
  const content = e.target.value
  if (content) {
    render('search', content)
  } else render()
}

function handleClickBtnDel (e) {
  if (e.target.classList.contains('delete')) {
    const task = e.target.closest('.task-body')
    const id = task.id
    data.forEach((task, index) => {
      if (task.id == id) {
        data.splice(index, 1)
        render()
      }
    }) 
  }
}

function handleClickBtnDelAll () {
  data.length = 0
  render()
}

function handleClickBtnLast () {
  if (data.length) {
    data.length -= 1
    render()
  }
}

function handleClickBtnShowAll () {
  render()
}

function handleClickBtnShowDone () {
  render(true)
}

function render (filter = false, content = '') {
  let dataRender = data;
  if (filter) {
    dataRender = (filter == 'search') ?
      data.filter(task => task.content.includes(content)) :
      data.filter(task => task.isChecked)
  }

  list.innerHTML = ''
  list.innerHTML = dataRender.reduce((html, task) => templateTodo(task) + html , '')

  localStorage.setItem('todos', JSON.stringify(data))

  counters[0].textContent = `All: ${data.length}`
  counters[1].textContent = `Completed: ${data.reduce((count, task) => count += task.isChecked, 0)}`
}
